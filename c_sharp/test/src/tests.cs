using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.Runtime.InteropServices;
using org.ldk.enums;
using org.ldk.util;
using org.ldk.structs;

namespace tests {
	static class Tests {
		static void Assert(bool a, int assertion) {
			if (!a) {
				Console.WriteLine("Assertion " + assertion + " failed at");
				Console.WriteLine(new StackTrace().ToString());
				Environment.Exit(45);
			}
		}

		static void SimpleConstructionTest() {
			Ping ping = Ping.of(42, 43);
			Assert(ping.get_ponglen() == 42, 0);
		}

		class TestBroadcaster : BroadcasterInterfaceInterface {
			public int broadcasted_len = 0;
			public void broadcast_transactions(byte[][] txn) {
				Assert(txn.Length == 1, 1);
				broadcasted_len = txn[0].Length;
			}
		}

		static void SimpleTraitTest() {
			TestBroadcaster impl = new TestBroadcaster();
			BroadcasterInterface broadcaster = BroadcasterInterface.new_impl(impl);
			byte[][] txn = new byte[1][];
			txn[0] = new byte[42];
			broadcaster.broadcast_transactions(txn);
			Assert(impl.broadcasted_len == 42, 3);
		}

		class TestEstimator : FeeEstimatorInterface {
			public int get_est_sat_per_1000_weight(ConfirmationTarget confirmation_target) {
				if (confirmation_target == ConfirmationTarget.LDKConfirmationTarget_MinAllowedNonAnchorChannelRemoteFee) {
					return 253;
				} else {
					return 300;
				}
			}
		}

		class TestLogger : LoggerInterface {
			public void log(Record record) {
				Console.WriteLine(record.get_module_path() + ":" + record.get_line() + " " + record.get_args());
			}
		}

		class TestPersister : PersistInterface {
			public ChannelMonitorUpdateStatus persist_new_channel(MonitorName monitor_name, ChannelMonitor data) {
				return ChannelMonitorUpdateStatus.LDKChannelMonitorUpdateStatus_Completed;
			}
			public ChannelMonitorUpdateStatus update_persisted_channel(MonitorName monitor_name, ChannelMonitorUpdate update, ChannelMonitor data) {
				return ChannelMonitorUpdateStatus.LDKChannelMonitorUpdateStatus_Completed;
			}
			public void archive_persisted_channel(MonitorName monitor_name) { }
			public TwoTuple_ChannelIdu64Z[] get_and_clear_completed_updates() {
				return new TwoTuple_ChannelIdu64Z[0];
			}
		}

		class TestEventHandler : EventHandlerInterface {
			public List<Event> events = new List<Event>();
			public Result_NoneReplayEventZ handle_event(Event ev) {
				events.Add(ev);
				return Result_NoneReplayEventZ.ok();
			}
		}
		static Event get_event(ChannelManager manager) {
			TestEventHandler impl = new TestEventHandler();
			org.ldk.structs.EventHandler handler = org.ldk.structs.EventHandler.new_impl(impl);
			manager.as_EventsProvider().process_pending_events(handler);
			Assert(impl.events.Count == 1, 100);
			return impl.events[0];
		}

		class TestRouter : RouterInterface, MessageRouterInterface {
			DefaultRouter inner;
			DefaultMessageRouter inner_msg;
			EntropySource entropy;
			public TestRouter(DefaultRouter inner, DefaultMessageRouter inner_msg, EntropySource entropy) {
				this.inner = inner;
				this.inner_msg = inner_msg;
				this.entropy = entropy;
			}
			public Result_RouteStrZ find_route(byte[] payer, RouteParameters param, ChannelDetails[] chans, InFlightHtlcs htlcs) {
				return inner.as_Router().find_route(payer, param, chans, htlcs);
			}
			public Result_RouteStrZ find_route_with_id(byte[] payer, RouteParameters param, ChannelDetails[] chans, InFlightHtlcs htlcs, byte[] payment_hash, byte[] payment_id) {
				return inner.as_Router().find_route_with_id(payer, param, chans, htlcs, payment_hash, payment_id);
			}
			public Result_CVec_BlindedPaymentPathZNoneZ create_blinded_payment_paths(byte[] recipient, ChannelDetails[] first_hops, ReceiveTlvs tlvs, Option_u64Z amount_msats) {
				Result_BlindedPaymentPathNoneZ info_path = BlindedPaymentPath.one_hop(recipient, tlvs, 40, entropy);
				BlindedPaymentPath hop = ((Result_BlindedPaymentPathNoneZ.Result_BlindedPaymentPathNoneZ_OK)info_path).res;
				BlindedPaymentPath[] hops = new BlindedPaymentPath[1];
				hops[0] = hop;
				return Result_CVec_BlindedPaymentPathZNoneZ.ok(hops);
			}

			public Result_OnionMessagePathNoneZ find_path(byte[] sender, byte[][] peers, Destination dest) {
				return inner_msg.as_MessageRouter().find_path(sender, peers, dest);
			}
			public Result_CVec_BlindedMessagePathZNoneZ create_blinded_paths(byte[] recipient, ReceiveAuthKey auth_key, MessageContext ctx, MessageForwardNode[] peers) {
				BlindedMessagePath[] paths = new BlindedMessagePath[1];
				paths[0] = BlindedMessagePath.one_hop(recipient, auth_key, ctx, entropy);
				return Result_CVec_BlindedMessagePathZNoneZ.ok(paths);
			}
		}

		class Node {
			public TestBroadcaster broadcaster = new TestBroadcaster();
			public FeeEstimator estimator = FeeEstimator.new_impl(new TestEstimator());
			public Logger logger = Logger.new_impl(new TestLogger());
			public Persist persister = Persist.new_impl(new TestPersister());
			public ChainParameters chain_params = ChainParameters.of(Network.LDKNetwork_Bitcoin, BestBlock.from_network(Network.LDKNetwork_Bitcoin));

			public BroadcasterInterface ldk_broadcaster;
			public ChainMonitor chain_monitor;
			public NetworkGraph graph;
			public MultiThreadedLockableScore scorer;
			public Router router;
			public KeysManager keys;
			public ChannelManager manager;
			public OnionMessenger messenger;

			public Node(byte seed) {
				byte[] seed_bytes = new byte[32];
				for (int i = 0; i < 32; i++) seed_bytes[i] = seed;
				keys = KeysManager.of(seed_bytes, 42, 43, true);

				ldk_broadcaster = BroadcasterInterface.new_impl(broadcaster);
				chain_monitor = ChainMonitor.of(Option_FilterZ.none(), ldk_broadcaster, logger, estimator, persister, keys.as_EntropySource(), keys.as_NodeSigner().get_peer_storage_key());
				graph = NetworkGraph.of(Network.LDKNetwork_Bitcoin, logger);
				scorer = MultiThreadedLockableScore.of(ProbabilisticScorer.of(ProbabilisticScoringDecayParameters.with_default(), graph, logger).as_Score());

				DefaultRouter router_impl = DefaultRouter.of(graph, logger, keys.as_EntropySource(), scorer.as_LockableScore(), ProbabilisticScoringFeeParameters.with_default());
				DefaultMessageRouter msg_router_impl = DefaultMessageRouter.of(graph, keys.as_EntropySource());
				TestRouter router_wrapper = new TestRouter(router_impl, msg_router_impl, keys.as_EntropySource());
				router = Router.new_impl(router_wrapper);
				MessageRouter msg_router = MessageRouter.new_impl(router_wrapper);

				UserConfig config = UserConfig.with_default();
				config.set_manually_accept_inbound_channels(true);

				manager = ChannelManager.of(estimator, chain_monitor.as_Watch(), ldk_broadcaster, router, msg_router, logger, keys.as_EntropySource(), keys.as_NodeSigner(), keys.as_SignerProvider(), config, chain_params, 42);

				messenger = OnionMessenger.of(keys.as_EntropySource(), keys.as_NodeSigner(), logger, manager.as_NodeIdLookUp(), MessageRouter.new_impl(router_wrapper), manager.as_OffersMessageHandler(), IgnoringMessageHandler.of().as_AsyncPaymentsMessageHandler(), manager.as_DNSResolverMessageHandler(), IgnoringMessageHandler.of().as_CustomOnionMessageHandler());
			}
		}

		static void NodeTest() {
			Node node_a = new Node(1);
			Node node_b = new Node(2);

			InitFeatures init_features = node_a.manager.as_BaseMessageHandler().provided_init_features(node_b.manager.get_our_node_id());
			init_features.set_onion_messages_optional();
			Init init_msg = Init.of(init_features, Option_CVec_ThirtyTwoBytesZZ.none(), Option_SocketAddressZ.none());
			node_a.manager.as_BaseMessageHandler().peer_connected(node_b.manager.get_our_node_id(), init_msg, false);
			node_b.manager.as_BaseMessageHandler().peer_connected(node_a.manager.get_our_node_id(), init_msg, false);
			node_a.messenger.as_BaseMessageHandler().peer_connected(node_b.manager.get_our_node_id(), init_msg, false);
			node_b.messenger.as_BaseMessageHandler().peer_connected(node_a.manager.get_our_node_id(), init_msg, false);

			Result_ChannelIdAPIErrorZ res = node_a.manager.create_channel(node_b.manager.get_our_node_id(), 100000, 42, new org.ldk.util.UInt128(43), null, null);
			Assert(res.is_ok(), 4);

			MessageSendEvent[] msgs = node_a.manager.as_BaseMessageHandler().get_and_clear_pending_msg_events();
			Assert(msgs.Length == 1, 5);
			Assert(msgs[0] is MessageSendEvent.MessageSendEvent_SendOpenChannel, 6);
			node_b.manager.as_ChannelMessageHandler().handle_open_channel(node_a.manager.get_our_node_id(), ((MessageSendEvent.MessageSendEvent_SendOpenChannel) msgs[0]).msg);

			Event inbound_chan = get_event(node_b.manager);
			Assert(inbound_chan is Event.Event_OpenChannelRequest, 7);
			Event.Event_OpenChannelRequest chan_request = (Event.Event_OpenChannelRequest)inbound_chan;
			Result_NoneAPIErrorZ accept_res = node_b.manager.accept_inbound_channel_from_trusted_peer_0conf(chan_request.temporary_channel_id, chan_request.counterparty_node_id, new org.ldk.util.UInt128(42), null);
			Assert(accept_res.is_ok(), 8);

			MessageSendEvent[] response_msgs = node_b.manager.as_BaseMessageHandler().get_and_clear_pending_msg_events();
			Assert(response_msgs.Length == 1, 9);
			Assert(response_msgs[0] is MessageSendEvent.MessageSendEvent_SendAcceptChannel, 10);
			node_a.manager.as_ChannelMessageHandler().handle_accept_channel(node_b.manager.get_our_node_id(), ((MessageSendEvent.MessageSendEvent_SendAcceptChannel) response_msgs[0]).msg);

			Event funding_ready = get_event(node_a.manager);
			Assert(funding_ready is Event.Event_FundingGenerationReady, 11);

			// We could use funding_transaction_generated here, but test batching
			TwoTuple_ChannelIdPublicKeyZ[] channel = new TwoTuple_ChannelIdPublicKeyZ[1];
			channel[0] = TwoTuple_ChannelIdPublicKeyZ.of(((Event.Event_FundingGenerationReady) funding_ready).temporary_channel_id, ((Event.Event_FundingGenerationReady) funding_ready).counterparty_node_id);

			// Hand-crafted transaction which has a dummy witness and can pay to our script
			byte[] transaction = new byte[99];
			transaction[0] = 2;
			transaction[1] = 0;
			transaction[2] = 0;
			transaction[3] = 0;
			transaction[4] = 0;
			transaction[5] = 1;
			transaction[6] = 1;
			transaction[7] = 66;
			transaction[8] = 66;
			transaction[9] = 66;
			transaction[10] = 66;
			transaction[11] = 66;
			transaction[12] = 66;
			transaction[13] = 66;
			transaction[14] = 66;
			transaction[15] = 66;
			transaction[16] = 66;
			transaction[17] = 66;
			transaction[18] = 66;
			transaction[19] = 66;
			transaction[20] = 66;
			transaction[21] = 66;
			transaction[22] = 66;
			transaction[23] = 66;
			transaction[24] = 66;
			transaction[25] = 66;
			transaction[26] = 66;
			transaction[27] = 66;
			transaction[28] = 66;
			transaction[29] = 66;
			transaction[30] = 66;
			transaction[31] = 66;
			transaction[32] = 66;
			transaction[33] = 66;
			transaction[34] = 66;
			transaction[35] = 66;
			transaction[36] = 66;
			transaction[37] = 66;
			transaction[38] = 66;
			transaction[39] = 18;
			transaction[40] = 0;
			transaction[41] = 0;
			transaction[42] = 0;
			transaction[43] = 0;
			transaction[44] = 253;
			transaction[45] = 255;
			transaction[46] = 255;
			transaction[47] = 255;
			transaction[48] = 1;
			transaction[49] = 160;
			transaction[50] = 134;
			transaction[51] = 1;
			transaction[52] = 0;
			transaction[53] = 0;
			transaction[54] = 0;
			transaction[55] = 0;
			transaction[56] = 0;
			transaction[57] = 34;

			Assert(((Event.Event_FundingGenerationReady) funding_ready).output_script.Length == 34, 12);
			for (int i = 0; i < 34; i++) {
				transaction[58 + i] = ((Event.Event_FundingGenerationReady) funding_ready).output_script[i];
			}

			transaction[92] = 1;
			transaction[93] = 1;
			transaction[94] = 1;
			transaction[95] = 0;
			transaction[96] = 0;
			transaction[97] = 0;
			transaction[98] = 0;

			node_a.manager.batch_funding_transaction_generated(channel, transaction);

			MessageSendEvent[] funding_msg = node_a.manager.as_BaseMessageHandler().get_and_clear_pending_msg_events();
			Assert(funding_msg.Length == 1, 13);
			Assert(funding_msg[0] is MessageSendEvent.MessageSendEvent_SendFundingCreated, 14);
			node_b.manager.as_ChannelMessageHandler().handle_funding_created(node_a.manager.get_our_node_id(), ((MessageSendEvent.MessageSendEvent_SendFundingCreated) funding_msg[0]).msg);

			Event bs_chan_pending = get_event(node_b.manager);
			Assert(bs_chan_pending is Event.Event_ChannelPending, 15);

			MessageSendEvent[] signed_ready_msgs = node_b.manager.as_BaseMessageHandler().get_and_clear_pending_msg_events();
			Assert(signed_ready_msgs.Length == 2, 16);
			Assert(signed_ready_msgs[0] is MessageSendEvent.MessageSendEvent_SendFundingSigned, 17);
			node_a.manager.as_ChannelMessageHandler().handle_funding_signed(node_b.manager.get_our_node_id(), ((MessageSendEvent.MessageSendEvent_SendFundingSigned) signed_ready_msgs[0]).msg);
			Assert(node_a.broadcaster.broadcasted_len == 99, 18);

			Event as_chan_pending = get_event(node_a.manager);
			Assert(as_chan_pending is Event.Event_ChannelPending, 19);

			MessageSendEvent[] as_ready = node_a.manager.as_BaseMessageHandler().get_and_clear_pending_msg_events();
			Assert(as_ready.Length == 1, 20);
			Assert(as_ready[0] is MessageSendEvent.MessageSendEvent_SendChannelReady, 21);

			Assert(signed_ready_msgs[1] is MessageSendEvent.MessageSendEvent_SendChannelReady, 22);
			node_a.manager.as_ChannelMessageHandler().handle_channel_ready(node_b.manager.get_our_node_id(), ((MessageSendEvent.MessageSendEvent_SendChannelReady) signed_ready_msgs[1]).msg);

			MessageSendEvent[] as_chan_update = node_a.manager.as_BaseMessageHandler().get_and_clear_pending_msg_events();
			Assert(as_chan_update.Length == 1, 23);
			Assert(as_chan_update[0] is MessageSendEvent.MessageSendEvent_SendChannelUpdate, 24);

			node_b.manager.as_ChannelMessageHandler().handle_channel_ready(node_a.manager.get_our_node_id(), ((MessageSendEvent.MessageSendEvent_SendChannelReady) as_ready[0]).msg);

			Event as_chan_ready = get_event(node_a.manager);
			Assert(as_chan_ready is Event.Event_ChannelReady, 25);

			Event bs_chan_ready = get_event(node_b.manager);
			Assert(bs_chan_ready is Event.Event_ChannelReady, 26);

			MessageSendEvent[] bs_chan_update = node_b.manager.as_BaseMessageHandler().get_and_clear_pending_msg_events();
			Assert(bs_chan_update.Length == 1, 27);
			Assert(bs_chan_update[0] is MessageSendEvent.MessageSendEvent_SendChannelUpdate, 28);

			// Now that we have a channel, pay using a BOLT12 offer!

			Result_OfferWithDerivedMetadataBuilderBolt12SemanticErrorZ builder_res = node_b.manager.create_offer_builder();
			Assert(builder_res.is_ok(), 29);
			Result_OfferBolt12SemanticErrorZ offer_res = ((Result_OfferWithDerivedMetadataBuilderBolt12SemanticErrorZ.Result_OfferWithDerivedMetadataBuilderBolt12SemanticErrorZ_OK)builder_res).res.build();
			Assert(offer_res.is_ok(), 30);
			Offer offer = ((Result_OfferBolt12SemanticErrorZ.Result_OfferBolt12SemanticErrorZ_OK)offer_res).res;

			Result_NoneBolt12SemanticErrorZ pay_res = node_a.manager.pay_for_offer(offer, Option_u64Z.some(42000), new byte[32], Option_StrZ.none(), RouteParametersConfig.with_default(), Retry.attempts(0));
			Assert(pay_res.is_ok(), 31);

			OnionMessage as_invreq = node_a.messenger.as_OnionMessageHandler().next_onion_message_for_peer(node_b.manager.get_our_node_id());
			node_b.messenger.as_OnionMessageHandler().handle_onion_message(node_a.manager.get_our_node_id(), as_invreq);

			OnionMessage bs_inv = node_b.messenger.as_OnionMessageHandler().next_onion_message_for_peer(node_a.manager.get_our_node_id());
			node_a.messenger.as_OnionMessageHandler().handle_onion_message(node_b.manager.get_our_node_id(), bs_inv);

			// At this point node_a will generate a commitment update for node_b, which we check exists but don't bother to handle:
			MessageSendEvent[] as_commit = node_a.manager.as_BaseMessageHandler().get_and_clear_pending_msg_events();
			Assert(as_commit.Length == 1, 32);
			Assert(as_commit[0] is MessageSendEvent.MessageSendEvent_UpdateHTLCs, 33);
		}

		static void Bolt12ParseTest() {
			// Parse a random BOLT12 offer from the BOLT12 test cases
			const string offerStr = "lno1pgx9getnwss8vetrw3hhyuckyypwa3eyt44h6txtxquqh7lz5djge4afgfjn7k4rgrkuag0jsd5xvxg";
			const string expectedPubkey = "02eec7245d6b7d2ccb30380bfbe2a3648cd7a942653f5aa340edcea1f283686619";
			const string expectedDescription = "Test vectors";

			Result_OfferBolt12ParseErrorZ offer_res = Offer.from_str(offerStr);
			Assert(offer_res.is_ok(), 100);
			Offer offer = ((Result_OfferBolt12ParseErrorZ.Result_OfferBolt12ParseErrorZ_OK)offer_res).res;
			Assert(BitConverter.ToString(offer.issuer_signing_pubkey()).Replace("-", "").ToLower() == expectedPubkey, 101);
			Assert(offer.description().get_a() == expectedDescription, 102);
			Assert(offer.issuer() == null, 103);
			Assert(!offer.is_expired(), 104);
			Assert(!offer.expects_quantity(), 105);
			Assert(offer.supported_quantity() is Quantity.Quantity_One, 106);
			Assert(offer.amount() is Option_AmountZ.Option_AmountZ_None, 107);
			Assert(offer.supported_quantity() is Quantity.Quantity_One, 108);
			Assert(offer.to_str() == offerStr, 109);
		}

		static Offer BuildOffer(Nonce nonce, KeysManager keys) {
			Result_PublicKeyNoneZ id_res = keys.as_NodeSigner().get_node_id(Recipient.LDKRecipient_Node);
			byte[] node_id = ((Result_PublicKeyNoneZ.Result_PublicKeyNoneZ_OK)id_res).res;
			ExpandedKey inb_key = keys.as_NodeSigner().get_expanded_key();
			OfferWithDerivedMetadataBuilder builder = OfferWithDerivedMetadataBuilder.deriving_signing_pubkey(node_id, inb_key, nonce);
			Result_OfferBolt12SemanticErrorZ res = builder.build();
			return ((Result_OfferBolt12SemanticErrorZ.Result_OfferBolt12SemanticErrorZ_OK) res).res;
		}

		static InvoiceRequestWithDerivedPayerSigningPubkeyBuilder InvReqBuilderFromOffer(Offer offer, KeysManager keys) {
			ExpandedKey inb_key = keys.as_NodeSigner().get_expanded_key();
			Nonce nonce = Nonce.from_entropy_source(keys.as_EntropySource());
			Result_InvoiceRequestWithDerivedPayerSigningPubkeyBuilderBolt12SemanticErrorZ builder_res =
				offer.request_invoice(inb_key, nonce, new byte[32]);
			InvoiceRequestWithDerivedPayerSigningPubkeyBuilder builder =
				((Result_InvoiceRequestWithDerivedPayerSigningPubkeyBuilderBolt12SemanticErrorZ.Result_InvoiceRequestWithDerivedPayerSigningPubkeyBuilderBolt12SemanticErrorZ_OK)builder_res).res;
			return builder;
		}

		static InvoiceRequest BuildInvReq(InvoiceRequestWithDerivedPayerSigningPubkeyBuilder builder) {
			Result_InvoiceRequestBolt12SemanticErrorZ res = builder.build_and_sign();
			return ((Result_InvoiceRequestBolt12SemanticErrorZ.Result_InvoiceRequestBolt12SemanticErrorZ_OK)res).res;
		}

		static InvoiceWithDerivedSigningPubkeyBuilder InvBuilderFromInvReq(Nonce receiver_nonce, InvoiceRequest invreq, KeysManager keys) {
			ExpandedKey inb_key = keys.as_NodeSigner().get_expanded_key();
			Result_VerifiedInvoiceRequestNoneZ verified_res = invreq.verify_using_recipient_data(receiver_nonce, inb_key);
			VerifiedInvoiceRequest verified_invreq =
				((Result_VerifiedInvoiceRequestNoneZ.Result_VerifiedInvoiceRequestNoneZ_OK)verified_res).res;
			Result_InvoiceWithDerivedSigningPubkeyBuilderBolt12SemanticErrorZ builder_res =
				verified_invreq.respond_using_derived_keys(new BlindedPaymentPath[0], new byte[32]);
			InvoiceWithDerivedSigningPubkeyBuilder builder =
				((Result_InvoiceWithDerivedSigningPubkeyBuilderBolt12SemanticErrorZ.Result_InvoiceWithDerivedSigningPubkeyBuilderBolt12SemanticErrorZ_OK)builder_res).res;
			return builder;
		}

		static InvoiceRequestWithDerivedPayerSigningPubkeyBuilder InvReqBuilder(Nonce receiver_nonce, KeysManager payer, KeysManager recipient) {
			// Under the hood, InvoiceRequestWithDerivedPayerSigningPubkeyBuilder holds a reference to some
			// fields in the Offer. Thus, we build an Offer here, then return only the builder,
			// hoping the GC will cause us to free the Offer and use-after-free.
			Offer offer = BuildOffer(receiver_nonce, payer);
			return InvReqBuilderFromOffer(offer, recipient);
		}

		static InvoiceWithDerivedSigningPubkeyBuilder InvBuilderFromInvReqBuilder(Nonce receiver_nonce, InvoiceRequestWithDerivedPayerSigningPubkeyBuilder builder, KeysManager payer, KeysManager recipient) {
			// Same as above, but for the Invoice itself
			InvoiceRequest invreq = BuildInvReq(builder);
			return InvBuilderFromInvReq(receiver_nonce, invreq, recipient);
		}

		static void Bolt12RespondTest() {
			// Build an Invoice out of an Offer, step by step. We do each step in its own function
			// to give the background GC a chance to free things out from under us.
			KeysManager sender = KeysManager.of(new byte[32], 42, 42, true);
			byte[] receiver_keys = new byte[32];
			receiver_keys[10] = 42;
			KeysManager receiver = KeysManager.of(receiver_keys, 42, 42, true);

			// Run the GC between each step to see if the reference the builders hold to the
			// original Offer/InvoiceRequest is freed out from under us before building.
			Nonce receiver_nonce = Nonce.from_entropy_source(receiver.as_EntropySource());
			InvoiceRequestWithDerivedPayerSigningPubkeyBuilder invreq_builder = InvReqBuilder(receiver_nonce, sender, receiver);
			System.GC.Collect();
			GC.WaitForPendingFinalizers();
			InvoiceWithDerivedSigningPubkeyBuilder inv_builder = InvBuilderFromInvReqBuilder(receiver_nonce, invreq_builder, sender, receiver);
			System.GC.Collect();
			GC.WaitForPendingFinalizers();
			Result_Bolt12InvoiceBolt12SemanticErrorZ inv_res = inv_builder.build_and_sign();
			Assert(inv_res.is_ok(), 200);
		}

		static void SimpleAddressTest() {
			// Test parsing Address
			String valid_addr = "bc1qprzyshqx2qlyrur5pyx9s3tg6y4m5lfwkcls38";
			Assert(Address.from_string(valid_addr).address == valid_addr, 300);
			try {
				Address.from_string("");
				Assert(false, 301);
			} catch (ArgumentException e) {}
		}

		static void GCLoop() {
			while (Thread.CurrentThread.IsAlive) {
				System.GC.Collect();
				try {
					GC.WaitForPendingFinalizers();
					Thread.Sleep(new TimeSpan(1));
				} catch (ThreadInterruptedException _) {
					break;
				}
			}
		}

		static void Main(string[] args) {
			Thread gc_thread = null;
			if (!RuntimeInformation.IsOSPlatform(OSPlatform.OSX)) {
				// No idea why this dies on macOS, but it does, so disable it.
				gc_thread = new Thread(GCLoop);
				gc_thread.Start();
			}

			SimpleConstructionTest();
			SimpleTraitTest();
			NodeTest();
			Bolt12ParseTest();
			SimpleAddressTest();

			if (!RuntimeInformation.IsOSPlatform(OSPlatform.OSX)) {
				gc_thread.Interrupt();
				gc_thread.Join();
			}

			Console.WriteLine("\n\nTESTS PASSED\n\n");
			System.GC.Collect();
			GC.WaitForPendingFinalizers();
		}
	}
}
