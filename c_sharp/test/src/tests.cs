using System;
using System.Collections.Generic;
using System.Diagnostics;
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
			public bool broadcasted = false;
			public void broadcast_transactions(byte[][] txn) {
				Assert(txn.Length == 1, 1);
				Assert(txn[0].Length == 42, 2);
				broadcasted = true;
			}
		}

		static void SimpleTraitTest() {
			TestBroadcaster impl = new TestBroadcaster();
			BroadcasterInterface broadcaster = BroadcasterInterface.new_impl(impl);
			byte[][] txn = new byte[1][];
			txn[0] = new byte[42];
			broadcaster.broadcast_transactions(txn);
			Assert(impl.broadcasted == true, 3);
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
			public ChannelMonitorUpdateStatus persist_new_channel(OutPoint channel_id, ChannelMonitor data, MonitorUpdateId update_id) {
				return ChannelMonitorUpdateStatus.LDKChannelMonitorUpdateStatus_Completed;
			}
			public ChannelMonitorUpdateStatus update_persisted_channel(OutPoint channel_id, ChannelMonitorUpdate update, ChannelMonitor data, MonitorUpdateId update_id) {
				return ChannelMonitorUpdateStatus.LDKChannelMonitorUpdateStatus_Completed;
			}
		}

		class TestEventHandler : EventHandlerInterface {
			public List<Event> events = new List<Event>();
			public void handle_event(Event ev) {
				events.Add(ev);
			}
		}
		static Event get_event(ChannelManager manager) {
			TestEventHandler impl = new TestEventHandler();
			org.ldk.structs.EventHandler handler = org.ldk.structs.EventHandler.new_impl(impl);
			manager.as_EventsProvider().process_pending_events(handler);
			Assert(impl.events.Count == 1, 100);
			return impl.events[0];
		}

		class Node {
			public BroadcasterInterface broadcaster = BroadcasterInterface.new_impl(new TestBroadcaster());
			public FeeEstimator estimator = FeeEstimator.new_impl(new TestEstimator());
			public Logger logger = Logger.new_impl(new TestLogger());
			public Persist persister = Persist.new_impl(new TestPersister());
			public ChainParameters chain_params = ChainParameters.of(Network.LDKNetwork_Bitcoin, BestBlock.from_network(Network.LDKNetwork_Bitcoin));

			public ChainMonitor chain_monitor;
			public NetworkGraph graph;
			public MultiThreadedLockableScore scorer;
			public DefaultRouter router;
			public KeysManager keys;
			public ChannelManager manager;

			public Node(byte seed) {
				chain_monitor = ChainMonitor.of(Option_FilterZ.none(), broadcaster, logger, estimator, persister);
				graph = NetworkGraph.of(Network.LDKNetwork_Bitcoin, logger);
				scorer = MultiThreadedLockableScore.of(ProbabilisticScorer.of(ProbabilisticScoringDecayParameters.with_default(), graph, logger).as_Score());
				router = DefaultRouter.of(graph, logger, new byte[32], scorer.as_LockableScore(), ProbabilisticScoringFeeParameters.with_default());

				byte[] seed_bytes = new byte[32];
				for (int i = 0; i < 32; i++) seed_bytes[i] = seed;
				keys = KeysManager.of(seed_bytes, 42, 43);

				manager = ChannelManager.of(estimator, chain_monitor.as_Watch(), broadcaster, router.as_Router(), logger, keys.as_EntropySource(), keys.as_NodeSigner(), keys.as_SignerProvider(), UserConfig.with_default(), chain_params, 42);
			}
		}

		static void NodeTest() {
			Node node_a = new Node(1);
			Node node_b = new Node(2);

			InitFeatures init_features = node_a.manager.as_ChannelMessageHandler().provided_init_features(node_b.manager.get_our_node_id());
			Init init_msg = Init.of(init_features, Option_CVec_ThirtyTwoBytesZZ.none(), Option_SocketAddressZ.none());
			node_a.manager.as_ChannelMessageHandler().peer_connected(node_b.manager.get_our_node_id(), init_msg, false);
			node_b.manager.as_ChannelMessageHandler().peer_connected(node_a.manager.get_our_node_id(), init_msg, false);

			Result_ThirtyTwoBytesAPIErrorZ res = node_a.manager.create_channel(node_b.manager.get_our_node_id(), 100000, 42, new UInt128(43), UserConfig.with_default());
			Assert(res.is_ok(), 4);

			MessageSendEvent[] msgs = node_a.manager.as_MessageSendEventsProvider().get_and_clear_pending_msg_events();
			Assert(msgs.Length == 1, 5);
			Assert(msgs[0] is MessageSendEvent.MessageSendEvent_SendOpenChannel, 6);
			node_b.manager.as_ChannelMessageHandler().handle_open_channel(node_a.manager.get_our_node_id(), ((MessageSendEvent.MessageSendEvent_SendOpenChannel) msgs[0]).msg);

			MessageSendEvent[] response_msgs = node_b.manager.as_MessageSendEventsProvider().get_and_clear_pending_msg_events();
			Assert(response_msgs.Length == 1, 7);
			Assert(response_msgs[0] is MessageSendEvent.MessageSendEvent_SendAcceptChannel, 8);
			node_a.manager.as_ChannelMessageHandler().handle_accept_channel(node_b.manager.get_our_node_id(), ((MessageSendEvent.MessageSendEvent_SendAcceptChannel) response_msgs[0]).msg);

			Event funding_ready = get_event(node_a.manager);
			Assert(funding_ready is Event.Event_FundingGenerationReady, 9);

			// We could use funding_transaction_generated here, but test batching
			TwoTuple_ThirtyTwoBytesPublicKeyZ[] channel = new TwoTuple_ThirtyTwoBytesPublicKeyZ[1];
			channel[0] = TwoTuple_ThirtyTwoBytesPublicKeyZ.of(((Event.Event_FundingGenerationReady) funding_ready).temporary_channel_id, ((Event.Event_FundingGenerationReady) funding_ready).counterparty_node_id);

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
			transaction[49] = 34;
			transaction[50] = 2;
			transaction[51] = 0;
			transaction[52] = 0;
			transaction[53] = 0;
			transaction[54] = 0;
			transaction[55] = 0;
			transaction[56] = 0;
			transaction[57] = 34;

			Assert(((Event.Event_FundingGenerationReady) funding_ready).output_script.Length == 34, 10);
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
		}

		static void Main(string[] args) {
			SimpleConstructionTest();
			SimpleTraitTest();
			NodeTest();

			Console.WriteLine("\n\nTESTS PASSED\n\n");
			System.GC.Collect();
			GC.WaitForPendingFinalizers();
		}
	}
}
