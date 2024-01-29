import * as rawldk from "../bindings.mjs";
import * as ldk from "../index.mjs";

const tests: Array<Function> = [];

function assert(val: boolean) {
	if (!val) throw new Error("Assertion failed");
}
function array_eq(a: Uint8Array, b: Uint8Array): boolean {
	return a.length == b.length && a.every((v, idx) => v == b[idx]);
}

tests.push(async () => {
	const result = rawldk.CResult_boolLightningErrorZ_ok(true);
	assert(rawldk.CResult_boolLightningErrorZ_is_ok(result));
	assert(rawldk.CResult_boolLightningErrorZ_get_ok(result));
	rawldk.CResult_boolLightningErrorZ_free(result);
	const second_res = rawldk.CResult_boolLightningErrorZ_ok(false);
	assert(rawldk.CResult_boolLightningErrorZ_is_ok(second_res));
	assert(!rawldk.CResult_boolLightningErrorZ_get_ok(second_res));
	rawldk.CResult_boolLightningErrorZ_free(second_res);

	return true;
});

tests.push(async () => {
	const ping = ldk.Ping.constructor_new(10, 2);
	const new_ping = ldk.Ping.constructor_read(ping.write());
	if (!(new_ping instanceof ldk.Result_PingDecodeErrorZ_OK)) return false;
	if (!new_ping.is_ok()) return false;
	if (new_ping.res.get_byteslen() != 2) return false;
	if (new_ping.res.get_ponglen() != 10) return false;
	return true;
});

tests.push(async () => {
	const outpoint = ldk.OutPoint.constructor_new(new Uint8Array(32), 4);
	const read_outpoint = ldk.OutPoint.constructor_read(outpoint.write());
	if (!(read_outpoint instanceof ldk.Result_OutPointDecodeErrorZ_OK)) return false;
	if (!read_outpoint.res.eq(outpoint)) return false;
	if (read_outpoint.res.hash() != outpoint.hash()) return false;
	const chan_id = read_outpoint.res.to_channel_id();
	if (chan_id.length != 32) return false;
	if (chan_id[31] != 4) return false;
	return true;
});

tests.push(async () => {
	const outpoint = ldk.OutPoint.constructor_new(new Uint8Array(32), 4);
	const read_outpoint = ldk.OutPoint.constructor_read(outpoint.write());
	if (!(read_outpoint instanceof ldk.Result_OutPointDecodeErrorZ_OK)) return false;
	if (!read_outpoint.res.eq(outpoint)) return false;
	if (read_outpoint.res.hash() != outpoint.hash()) return false;
	const chan_id = read_outpoint.res.to_channel_id();
	if (chan_id.length != 32) return false;
	if (chan_id[31] != 4) return false;
	return true;
});

var seed_counter = 0;
class Node {
	node_id: Uint8Array;
	constructor(public chan_man: ldk.ChannelManager, public tx_broadcasted: Promise<Uint8Array>,
		public logger: ldk.Logger, public keys_manager: ldk.KeysManager,
		public net_graph: ldk.NetworkGraph
	) {
		this.node_id = chan_man.get_our_node_id();
	}
}
function get_chanman(): Node {
	const fee_est = ldk.FeeEstimator.new_impl({
		get_est_sat_per_1000_weight(_confirmation_target: ldk.ConfirmationTarget): number {
			return 253;
		}
	} as ldk.FeeEstimatorInterface);
	var tx_broadcaster: ldk.BroadcasterInterface;
	const tx_broadcasted: Promise<Uint8Array> = new Promise((resolve, _reject) => {
		tx_broadcaster = ldk.BroadcasterInterface.new_impl({
			broadcast_transactions(txn: Uint8Array[]): void {
				for (const tx of txn) {
					console.log("Tx Broadcast: " + tx); resolve(tx);
				}
			}
		} as ldk.BroadcasterInterfaceInterface);
	});
	const logger = ldk.Logger.new_impl({
		log(record: ldk.Record): void {
			console.log(record.get_module_path() + ": " + record.get_args());
		}
	} as ldk.LoggerInterface);

	const persister = ldk.Persist.new_impl({
		persist_new_channel(_channel_id: ldk.OutPoint, _data: ldk.ChannelMonitor, _update_id: ldk.MonitorUpdateId): ldk.ChannelMonitorUpdateStatus {
			return ldk.ChannelMonitorUpdateStatus.LDKChannelMonitorUpdateStatus_Completed;
		},
		update_persisted_channel(_channel_id: ldk.OutPoint, _update: ldk.ChannelMonitorUpdate, _data: ldk.ChannelMonitor, _update_id: ldk.MonitorUpdateId): ldk.ChannelMonitorUpdateStatus {
			return ldk.ChannelMonitorUpdateStatus.LDKChannelMonitorUpdateStatus_Completed;
		}
	} as ldk.PersistInterface);

	const chain_monitor = ldk.ChainMonitor.constructor_new(ldk.Option_FilterZ.constructor_none(), tx_broadcaster!, logger, fee_est, persister);
	const chain_watch: ldk.Watch = chain_monitor.as_Watch();

	const seed = new Uint8Array(32);
	seed.fill(seed_counter);
	seed_counter++;
	const keys_manager = ldk.KeysManager.constructor_new(seed, BigInt(42), 42);

	const net_graph = ldk.NetworkGraph.constructor_new(ldk.Network.LDKNetwork_Testnet, logger);
	const scorer = ldk.ProbabilisticScorer.constructor_new(ldk.ProbabilisticScoringDecayParameters.constructor_default(), net_graph, logger);
	const lockable_score = ldk.MultiThreadedLockableScore.constructor_new(scorer.as_Score());
	const router = ldk.DefaultRouter.constructor_new(net_graph, logger, keys_manager.as_EntropySource(), lockable_score.as_LockableScore(), ldk.ProbabilisticScoringFeeParameters.constructor_default());

	const config = ldk.UserConfig.constructor_default();
	const params = ldk.ChainParameters.constructor_new(ldk.Network.LDKNetwork_Testnet, ldk.BestBlock.constructor_from_network(ldk.Network.LDKNetwork_Testnet));
	const chan_man = ldk.ChannelManager.constructor_new(fee_est, chain_watch, tx_broadcaster!, router.as_Router(),
		logger, keys_manager.as_EntropySource(), keys_manager.as_NodeSigner(), keys_manager.as_SignerProvider(),
		config, params, 42);
	return new Node(chan_man, tx_broadcasted, logger, keys_manager, net_graph);
}

function exchange_messages(a: ldk.ChannelManager, b: ldk.ChannelManager) {
	var found_msgs = true;
	while (found_msgs) {
		const as_msgs = a.as_MessageSendEventsProvider().get_and_clear_pending_msg_events();
		const bs_msgs = b.as_MessageSendEventsProvider().get_and_clear_pending_msg_events();
		found_msgs = as_msgs.length != 0 || bs_msgs.length != 0;
		for (var i = 0; i < 2; i++) {
			var to: ldk.ChannelManager; var from: ldk.ChannelManager; var msgs: ldk.MessageSendEvent[];
			if (i == 0) { from = a; to = b; msgs = as_msgs; } else { from = b; to = a; msgs = bs_msgs; }
			for (var j = 0; j < msgs.length; j++) {
				const msg = msgs[j];
				if (msg instanceof ldk.MessageSendEvent_SendOpenChannel) {
					if (!array_eq(msg.node_id, to.get_our_node_id())) return false;
					to.as_ChannelMessageHandler().handle_open_channel(from.get_our_node_id(), msg.msg);
				} else if (msg instanceof ldk.MessageSendEvent_SendAcceptChannel) {
					if (!array_eq(msg.node_id, to.get_our_node_id())) return false;
					to.as_ChannelMessageHandler().handle_accept_channel(from.get_our_node_id(), msg.msg);
				} else if (msg instanceof ldk.MessageSendEvent_SendFundingCreated) {
					if (!array_eq(msg.node_id, to.get_our_node_id())) return false;
					to.as_ChannelMessageHandler().handle_funding_created(from.get_our_node_id(), msg.msg);
				} else if (msg instanceof ldk.MessageSendEvent_SendFundingSigned) {
					if (!array_eq(msg.node_id, to.get_our_node_id())) return false;
					to.as_ChannelMessageHandler().handle_funding_signed(from.get_our_node_id(), msg.msg);
				} else {
					return false;
				}
			}
		}
	}
	return true;
}

function assign_u64(arr: Uint8Array, offset: number, value: bigint) {
	arr[offset + 0] = Number((value >> BigInt(8 * 0)) & BigInt(0xff));
	arr[offset + 1] = Number((value >> BigInt(8 * 1)) & BigInt(0xff));
	arr[offset + 2] = Number((value >> BigInt(8 * 2)) & BigInt(0xff));
	arr[offset + 3] = Number((value >> BigInt(8 * 3)) & BigInt(0xff));
	arr[offset + 4] = Number((value >> BigInt(8 * 4)) & BigInt(0xff));
	arr[offset + 5] = Number((value >> BigInt(8 * 5)) & BigInt(0xff));
	arr[offset + 6] = Number((value >> BigInt(8 * 6)) & BigInt(0xff));
	arr[offset + 7] = Number((value >> BigInt(8 * 7)) & BigInt(0xff));
}

function get_event(chan_man: ldk.ChannelManager): ldk.Event {
	const events: Array<ldk.Event> = [];
	const event_handler = ldk.EventHandler.new_impl({
		handle_event(event: ldk.Event): void {
			events.push(event);
		}
	} as ldk.EventHandlerInterface);

	chan_man.as_EventsProvider().process_pending_events(event_handler);
	assert(events.length == 1);
	return events[0]!;
}

tests.push(async () => {
	const a = get_chanman();
	const b = get_chanman();

	const features = a.chan_man.as_ChannelMessageHandler().provided_init_features(b.chan_man.get_our_node_id());

	a.chan_man.as_ChannelMessageHandler().peer_connected(b.chan_man.get_our_node_id(), ldk.Init.constructor_new(features, ldk.Option_CVec_ThirtyTwoBytesZZ.constructor_none(), ldk.Option_SocketAddressZ.constructor_none()), false);
	b.chan_man.as_ChannelMessageHandler().peer_connected(a.chan_man.get_our_node_id(), ldk.Init.constructor_new(features, ldk.Option_CVec_ThirtyTwoBytesZZ.constructor_none(), ldk.Option_SocketAddressZ.constructor_none()), true);

	const chan_create_err = a.chan_man.create_channel(b.chan_man.get_our_node_id(), BigInt(0), BigInt(400), BigInt(0), ldk.Option_ThirtyTwoBytesZ.constructor_none(), null);
	if (chan_create_err.is_ok()) return false;
	if (!(chan_create_err instanceof ldk.Result_ThirtyTwoBytesAPIErrorZ_Err)) return false;
	if (!(chan_create_err.err instanceof ldk.APIError_APIMisuseError)) return false;
	if (chan_create_err.err.err != "Channel value must be at least 1000 satoshis. It was 0") return false;

	const chan_create_res = a.chan_man.create_channel(b.chan_man.get_our_node_id(), BigInt(1000000), BigInt(400), BigInt(0), ldk.Option_ThirtyTwoBytesZ.constructor_none(), null);
	if (!chan_create_res.is_ok()) return false;

	if (!exchange_messages(a.chan_man, b.chan_man)) return false;

	const event = get_event(a.chan_man) as ldk.Event_FundingGenerationReady;

	// (very) manually create a funding transaction
	const witness_pos = event.output_script.length + 58;
	const funding_tx = new Uint8Array(witness_pos + 7);
	funding_tx[0] = 2; // 4-byte tx version 2
	funding_tx[4] = 0; funding_tx[5] = 1; // segwit magic bytes
	funding_tx[6] = 1; // 1-byte input count 1
	// 36 bytes previous outpoint all-0s
	funding_tx[43] = 0; // 1-byte input script length 0
	funding_tx[44] = 0xff; funding_tx[45] = 0xff; funding_tx[46] = 0xff; funding_tx[47] = 0xff; // 4-byte nSequence
	funding_tx[48] = 1; // one output
	assign_u64(funding_tx, 49, event.channel_value_satoshis);
	funding_tx[57] = event.output_script.length; // 1-byte output script length
	funding_tx.set(event.output_script, 58);
	funding_tx[witness_pos] = 1; funding_tx[witness_pos + 1] = 1; funding_tx[witness_pos + 2] = 0xff; // one witness element of size 1 with contents 0xff
	funding_tx[witness_pos + 3] = 0; funding_tx[witness_pos + 4] = 0; funding_tx[witness_pos + 5] = 0; funding_tx[witness_pos + 6] = 0; // lock time 0

	const funding_res = a.chan_man.funding_transaction_generated(event.temporary_channel_id, event.counterparty_node_id, funding_tx);
	if (!(funding_res instanceof ldk.Result_NoneAPIErrorZ_OK)) return false;

	if (!exchange_messages(a.chan_man, b.chan_man)) return false;

	const tx_broadcasted: Uint8Array = (await a.tx_broadcasted);
	if (!array_eq(tx_broadcasted, funding_tx)) return false;

	return true;
});

tests.push(async () => {
	const a = get_chanman();
	const b = get_chanman();

	const ignorer = ldk.IgnoringMessageHandler.constructor_new();
	const pm_a = ldk.PeerManager.constructor_new(a.chan_man.as_ChannelMessageHandler(), ignorer.as_RoutingMessageHandler(),
		ignorer.as_OnionMessageHandler(), ignorer.as_CustomMessageHandler(),
		0xdeadbeef, a.keys_manager.as_EntropySource().get_secure_random_bytes(), a.logger, a.keys_manager.as_NodeSigner());
	const pm_b = ldk.PeerManager.constructor_new(b.chan_man.as_ChannelMessageHandler(), ignorer.as_RoutingMessageHandler(),
		ignorer.as_OnionMessageHandler(), ignorer.as_CustomMessageHandler(),
		0xdeadbeef, b.keys_manager.as_EntropySource().get_secure_random_bytes(), b.logger, b.keys_manager.as_NodeSigner());

	var sock_b: ldk.SocketDescriptor;
	const sock_a = ldk.SocketDescriptor.new_impl({
		send_data(data: Uint8Array, resume_read: boolean): number {
			assert(pm_b.read_event(sock_b, data) instanceof ldk.Result_boolPeerHandleErrorZ_OK);
			assert(resume_read);
			return data.length;
		},
		disconnect_socket(): void {
			assert(false);
		},
		eq(other: ldk.SocketDescriptor): boolean {
			return other.hash() == this.hash();
		},
		hash(): bigint {
			return BigInt(1);
		}
	} as ldk.SocketDescriptorInterface);
	sock_b = ldk.SocketDescriptor.new_impl({
		send_data(data: Uint8Array, resume_read: boolean): number {
			assert(pm_a.read_event(sock_a, data) instanceof ldk.Result_boolPeerHandleErrorZ_OK);
			assert(resume_read);
			return data.length;
		},
		disconnect_socket(): void {
			assert(false);
		},
		eq(other: ldk.SocketDescriptor): boolean {
			return other.hash() == this.hash();
		},
		hash(): bigint {
			return BigInt(2);
		}
	} as ldk.SocketDescriptorInterface);

	const update_fut = a.chan_man.get_event_or_persistence_needed_future();
	var update_done = false;
	update_fut.register_callback_fn(ldk.FutureCallback.new_impl({
		call(): void { update_done = true; }
	}));
	if (update_done) return false;

	const v4_netaddr = ldk.SocketAddress.constructor_tcp_ip_v4(Uint8Array.from([42,0,42,1]), 9735);
	assert(pm_b.new_inbound_connection(sock_b, ldk.Option_SocketAddressZ.constructor_some(v4_netaddr)) instanceof ldk.Result_NonePeerHandleErrorZ_OK);
	const init_bytes = pm_a.new_outbound_connection(b.node_id, sock_a, ldk.Option_SocketAddressZ.constructor_none());
	if (!(init_bytes instanceof ldk.Result_CVec_u8ZPeerHandleErrorZ_OK)) return false;
	assert(pm_b.read_event(sock_b, init_bytes.res) instanceof ldk.Result_boolPeerHandleErrorZ_OK);

	assert(pm_a.get_peer_node_ids().length == 0);
	assert(pm_b.get_peer_node_ids().length == 0);

	pm_b.process_events();
	pm_a.process_events();
	pm_b.process_events();

	assert(pm_a.get_peer_node_ids().length == 1);
	assert(pm_b.get_peer_node_ids().length == 1);

	const chan_create_res = a.chan_man.create_channel(b.node_id, BigInt(1000000), BigInt(400), BigInt(0), ldk.Option_ThirtyTwoBytesZ.constructor_none(), ldk.UserConfig.constructor_default());
	if (!chan_create_res.is_ok()) return false;
	if (!update_done) return false;

	pm_a.process_events();
	pm_b.process_events();

	const event = get_event(a.chan_man);
	if (!(event instanceof ldk.Event_FundingGenerationReady)) return false;

	return true;
});

tests.push(async () => {
	// Test passing onion messages through a custom trait implementation.
	const a = get_chanman();
	const b = get_chanman();

	const ignorer = ldk.IgnoringMessageHandler.constructor_new();

	var a_handled_msg = false;
	const om_handler_a = ldk.CustomOnionMessageHandler.new_impl({
		read_custom_message(message_type: bigint, buffer: Uint8Array): ldk.Result_COption_OnionMessageContentsZDecodeErrorZ {
			assert(message_type == 4343n);
			assert(buffer.length == 44);
			for (var i = 0; i < 44; i++) assert(buffer[i] == 67);
			return ldk.Result_COption_OnionMessageContentsZDecodeErrorZ.constructor_ok(ldk.Option_OnionMessageContentsZ.constructor_some(ldk.OnionMessageContents.new_impl({
				tlv_type(): bigint { return 9998n; },
				write(): Uint8Array { throw new Error(); },
				debug_str(): string { return "Message Contents"; }
			} as ldk.OnionMessageContentsInterface)));
		},
		handle_custom_message(msg: ldk.OnionMessageContents) {
			assert(msg.tlv_type() == 9998n);
			a_handled_msg = true;
		},
		release_pending_custom_messages(): ldk.ThreeTuple_OnionMessageContentsDestinationBlindedPathZ[] {
			return [];
		},
	} as ldk.CustomOnionMessageHandlerInterface);

	const a_msg_router = ldk.DefaultMessageRouter
		.constructor_new(a.net_graph, a.keys_manager.as_EntropySource()).as_MessageRouter();
	const underlying_om_a = ldk.OnionMessenger.constructor_new(
		a.keys_manager.as_EntropySource(), a.keys_manager.as_NodeSigner(), a.logger,
		a_msg_router, ignorer.as_OffersMessageHandler(), om_handler_a);
	const om_a = ldk.OnionMessageHandler.new_impl({
		handle_onion_message(peer_node_id: Uint8Array, msg: ldk.OnionMessage) {
			underlying_om_a.as_OnionMessageHandler().handle_onion_message(peer_node_id, msg);
		},
		peer_connected(their_node_id: Uint8Array, init: ldk.Init, inbound: boolean): ldk.Result_NoneNoneZ {
			return underlying_om_a.as_OnionMessageHandler().peer_connected(their_node_id, init, inbound)
		},
		peer_disconnected(their_node_id: Uint8Array) {
			underlying_om_a.as_OnionMessageHandler().peer_disconnected(their_node_id);
		},
		provided_node_features(): ldk.NodeFeatures {
			return underlying_om_a.as_OnionMessageHandler().provided_node_features();
		},
		provided_init_features(their_node_id: Uint8Array): ldk.InitFeatures {
			return underlying_om_a.as_OnionMessageHandler().provided_init_features(their_node_id);
		},
		next_onion_message_for_peer(peer_node_id: Uint8Array): ldk.OnionMessage {
			return underlying_om_a.as_OnionMessageHandler().next_onion_message_for_peer(peer_node_id);
		},
	} as ldk.OnionMessageHandlerInterface);

	var b_handled_msg = false;
	const om_handler_b = ldk.CustomOnionMessageHandler.new_impl({
		read_custom_message(message_type: bigint, buffer: Uint8Array): ldk.Result_COption_OnionMessageContentsZDecodeErrorZ {
			assert(message_type == 4242n);
			assert(buffer.length == 43);
			for (var i = 0; i < 43; i++) assert(buffer[i] == 66);
			return ldk.Result_COption_OnionMessageContentsZDecodeErrorZ.constructor_ok(ldk.Option_OnionMessageContentsZ.constructor_some(ldk.OnionMessageContents.new_impl({
				tlv_type(): bigint { return 9999n; },
				write(): Uint8Array { throw new Error(); },
				debug_str(): string { return "Message Contents"; }
			} as ldk.OnionMessageContentsInterface)));
		},
		handle_custom_message(msg: ldk.OnionMessageContents) {
			assert(msg.tlv_type() == 9999n);
			b_handled_msg = true;
		},
		release_pending_custom_messages(): ldk.ThreeTuple_OnionMessageContentsDestinationBlindedPathZ[] {
			return [];
		}
	} as ldk.CustomOnionMessageHandlerInterface);
	const msg_router_b = ldk.DefaultMessageRouter
		.constructor_new(b.net_graph, b.keys_manager.as_EntropySource()).as_MessageRouter();
	const om_b = ldk.OnionMessenger.constructor_new(b.keys_manager.as_EntropySource(), b.keys_manager.as_NodeSigner(),
		b.logger, msg_router_b, ignorer.as_OffersMessageHandler(), om_handler_b);

	const pm_a = ldk.PeerManager.constructor_new(a.chan_man.as_ChannelMessageHandler(), ignorer.as_RoutingMessageHandler(),
		om_a, ignorer.as_CustomMessageHandler(), 0xdeadbeef,
		a.keys_manager.as_EntropySource().get_secure_random_bytes(), a.logger, a.keys_manager.as_NodeSigner());
	const pm_b = ldk.PeerManager.constructor_new(b.chan_man.as_ChannelMessageHandler(), ignorer.as_RoutingMessageHandler(),
		om_b.as_OnionMessageHandler(), ignorer.as_CustomMessageHandler(), 0xdeadbeef,
		b.keys_manager.as_EntropySource().get_secure_random_bytes(), b.logger, b.keys_manager.as_NodeSigner());

	var sock_b: ldk.SocketDescriptor;
	const sock_a = ldk.SocketDescriptor.new_impl({
		send_data(data: Uint8Array, resume_read: boolean): number {
			assert(pm_b.read_event(sock_b, data) instanceof ldk.Result_boolPeerHandleErrorZ_OK);
			assert(resume_read);
			return data.length;
		},
		disconnect_socket(): void {
			assert(false);
		},
		eq(other: ldk.SocketDescriptor): boolean {
			return other.hash() == this.hash();
		},
		hash(): bigint {
			return BigInt(1);
		}
	} as ldk.SocketDescriptorInterface);
	sock_b = ldk.SocketDescriptor.new_impl({
		send_data(data: Uint8Array, resume_read: boolean): number {
			assert(pm_a.read_event(sock_a, data) instanceof ldk.Result_boolPeerHandleErrorZ_OK);
			assert(resume_read);
			return data.length;
		},
		disconnect_socket(): void {
			assert(false);
		},
		eq(other: ldk.SocketDescriptor): boolean {
			return other.hash() == this.hash();
		},
		hash(): bigint {
			return BigInt(2);
		}
	} as ldk.SocketDescriptorInterface);

	const v4_netaddr = ldk.SocketAddress.constructor_tcp_ip_v4(Uint8Array.from([42,0,42,1]), 9735);
	assert(pm_b.new_inbound_connection(sock_b, ldk.Option_SocketAddressZ.constructor_some(v4_netaddr)) instanceof ldk.Result_NonePeerHandleErrorZ_OK);
	const init_bytes = pm_a.new_outbound_connection(b.node_id, sock_a, ldk.Option_SocketAddressZ.constructor_none());
	if (!(init_bytes instanceof ldk.Result_CVec_u8ZPeerHandleErrorZ_OK)) return false;
	assert(pm_b.read_event(sock_b, init_bytes.res) instanceof ldk.Result_boolPeerHandleErrorZ_OK);

	assert(pm_a.get_peer_node_ids().length == 0);
	assert(pm_b.get_peer_node_ids().length == 0);

	pm_b.process_events();
	pm_a.process_events();
	pm_b.process_events();

	assert(pm_a.get_peer_node_ids().length == 1);
	assert(pm_b.get_peer_node_ids().length == 1);

	underlying_om_a.send_onion_message(
		ldk.OnionMessageContents.new_impl({
			tlv_type(): bigint { return 4242n; },
			write(): Uint8Array {
				const ret = new Uint8Array(43);
				for (var i = 0; i < 43; i++) ret[i] = 66;
				return ret;
			},
			debug_str(): string { return "Onion Message A Contents"; }
		} as ldk.OnionMessageContentsInterface), ldk.Destination.constructor_node(b.node_id), null);
	pm_a.process_events();
	assert(b_handled_msg);

	om_b.send_onion_message(
		ldk.OnionMessageContents.new_impl({
			tlv_type(): bigint { return 4343n; },
			write(): Uint8Array {
				const ret = new Uint8Array(44);
				for (var i = 0; i < 44; i++) ret[i] = 67;
				return ret;
			},
			debug_str(): string { return "Onion Message A Contents"; }
		} as ldk.OnionMessageContentsInterface), ldk.Destination.constructor_node(a.node_id), null);
	pm_b.process_events();
	assert(a_handled_msg);

	return true;
});

tests.push(async () => {
	// Test that we can do basic locking of a NetworkGraph
	const logger = ldk.Logger.new_impl({
		log(record: ldk.Record): void {
			if (record.get_level() != ldk.Level.LDKLevel_Gossip)
				console.log(record.get_module_path() + ": " + record.get_args());
		}
	} as ldk.LoggerInterface);
	const network_graph = ldk.NetworkGraph.constructor_new(ldk.Network.LDKNetwork_Testnet, logger);
	const graph_lock_1 = network_graph.read_only();
	graph_lock_1.free();
	const graph_lock_2 = network_graph.read_only();
	graph_lock_2.free();

	return true;
});

async function run_tests(check_leaks: boolean) {
	var test_runs = [];
	for (const test of tests) {
		test_runs.push(test());
	}
	const results = await Promise.all(test_runs);
	console.log("test results: " + results);
	const result = results.every((v) => { return v === true });
	console.log("all tests passed: " + result);
	if (result !== true || !check_leaks) { return result; }

	const allocs_finished = new Promise((resolve, _reject) => {
		var loop_count = 0;
		const interval_id = setInterval(() => {
			const alloc_count = rawldk.getRemainingAllocationCount();
			if (loop_count % 20 == 0)
				console.log("Remaining LDK allocation count: " + alloc_count);

			// chromium with --js-flags="--expose-gc" exposes a `window.gc()` which we call if we can
			// @ts-ignore window.gc is considered a type error in TS
			if (typeof window !== "undefined" && typeof window.gc !== "undefined") window.gc();

			// Note that there are currently 9 leaks in the above tests. At least some are known - look for XXX in bindings.c
			if (alloc_count <= 10) { clearInterval(interval_id); rawldk.debugPrintRemainingAllocs(); resolve(true); }
			loop_count += 1;
			if (loop_count > 30*2) { clearInterval(interval_id); rawldk.debugPrintRemainingAllocs(); resolve(false); }
		}, 500);
	});
	return allocs_finished;
}

export async function run_tests_web(wasm_path: string, check_leaks: boolean = true) {
	await ldk.initializeWasmWebFetch(wasm_path);
	return await run_tests(check_leaks);
}

export async function run_tests_node(wasm_file: Uint8Array, check_leaks: boolean = true) {
	await ldk.initializeWasmFromBinary(wasm_file);
	return await run_tests(check_leaks);
}
