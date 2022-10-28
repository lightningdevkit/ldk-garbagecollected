import * as rawldk from "../bindings.mjs";
import * as ldk from "../index.mjs";

const tests: Array<Function> = [];

function array_eq(a: Uint8Array, b: Uint8Array): boolean {
	return a.length == b.length && a.every((v, idx) => v == b[idx]);
}

tests.push(async () => {
	const result = rawldk.CResult_boolLightningErrorZ_ok(true);
	console.assert(rawldk.CResult_boolLightningErrorZ_is_ok(result));
	console.assert(rawldk.CResult_boolLightningErrorZ_get_ok(result));
	rawldk.CResult_boolLightningErrorZ_free(result);
	const second_res = rawldk.CResult_boolLightningErrorZ_ok(false);
	console.assert(rawldk.CResult_boolLightningErrorZ_is_ok(second_res));
	console.assert(!rawldk.CResult_boolLightningErrorZ_get_ok(second_res));
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
	node_secret: Uint8Array;
	constructor(public chan_man: ldk.ChannelManager, public tx_broadcasted: Promise<Uint8Array>,
	public logger: ldk.Logger, public keys_interface: ldk.KeysInterface) {
		this.node_id = chan_man.get_our_node_id();
		this.node_secret = (keys_interface.get_node_secret(ldk.Recipient.LDKRecipient_Node) as ldk.Result_SecretKeyNoneZ_OK).res;
	}
}
function get_chanman(): Node {
	const fee_est = ldk.FeeEstimator.new_impl({
		get_est_sat_per_1000_weight(confirmation_target: ldk.ConfirmationTarget): number {
			return 253;
		}
	} as ldk.FeeEstimatorInterface);
	var tx_broadcaster;
	const tx_broadcasted: Promise<Uint8Array> = new Promise((resolve, reject) => {
		tx_broadcaster = ldk.BroadcasterInterface.new_impl({
			broadcast_transaction(tx: Uint8Array): void { console.log("Tx Broadcast: " + tx); resolve(tx); }
		} as ldk.BroadcasterInterfaceInterface);
	});
	const logger = ldk.Logger.new_impl({
		log(record: ldk.Record): void {
			console.log(record.get_module_path() + ": " + record.get_args());
		}
	} as ldk.LoggerInterface);

	const persister = ldk.Persist.new_impl({
		persist_new_channel(channel_id: ldk.OutPoint, data: ldk.ChannelMonitor, update_id: ldk.MonitorUpdateId): ldk.ChannelMonitorUpdateStatus {
			return ldk.ChannelMonitorUpdateStatus.LDKChannelMonitorUpdateStatus_Completed;
		},
		update_persisted_channel(channel_id: ldk.OutPoint, update: ldk.ChannelMonitorUpdate, data: ldk.ChannelMonitor, update_id: ldk.MonitorUpdateId): ldk.ChannelMonitorUpdateStatus {
			return ldk.ChannelMonitorUpdateStatus.LDKChannelMonitorUpdateStatus_Completed;
		}
	} as ldk.PersistInterface);

	const chain_monitor = ldk.ChainMonitor.constructor_new(ldk.Option_FilterZ.constructor_none(), tx_broadcaster, logger, fee_est, persister);
	const chain_watch: ldk.Watch = chain_monitor.as_Watch();

	const seed = new Uint8Array(32);
	seed.fill(seed_counter);
	seed_counter++;
	const keys_manager = ldk.KeysManager.constructor_new(seed, BigInt(42), 42);
	const keys_interface = keys_manager.as_KeysInterface();
	const config = ldk.UserConfig.constructor_default();
	const params = ldk.ChainParameters.constructor_new(ldk.Network.LDKNetwork_Testnet, ldk.BestBlock.constructor_from_genesis(ldk.Network.LDKNetwork_Testnet));

	const chan_man = ldk.ChannelManager.constructor_new(fee_est, chain_watch, tx_broadcaster, logger, keys_interface, config, params);
	return new Node(chan_man, tx_broadcasted, logger, keys_interface);
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
					const features = from.as_ChannelMessageHandler().provided_init_features(to.get_our_node_id());
					to.as_ChannelMessageHandler().handle_open_channel(from.get_our_node_id(), features, msg.msg);
				} else if (msg instanceof ldk.MessageSendEvent_SendAcceptChannel) {
					if (!array_eq(msg.node_id, to.get_our_node_id())) return false;
					const features = from.as_ChannelMessageHandler().provided_init_features(to.get_our_node_id());
					to.as_ChannelMessageHandler().handle_accept_channel(from.get_our_node_id(), features, msg.msg);
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
	console.assert(events.length == 1);
	return events[0];
}

tests.push(async () => {
	const a = get_chanman();
	const b = get_chanman();

	const features = a.chan_man.as_ChannelMessageHandler().provided_init_features(b.chan_man.get_our_node_id());

	a.chan_man.as_ChannelMessageHandler().peer_connected(b.chan_man.get_our_node_id(), ldk.Init.constructor_new(features, ldk.Option_NetAddressZ.constructor_none()));
	b.chan_man.as_ChannelMessageHandler().peer_connected(a.chan_man.get_our_node_id(), ldk.Init.constructor_new(features, ldk.Option_NetAddressZ.constructor_none()));

	const chan_create_err = a.chan_man.create_channel(b.chan_man.get_our_node_id(), BigInt(0), BigInt(400), BigInt(0), ldk.UserConfig.constructor_default());
	if (chan_create_err.is_ok()) return false;
	if (!(chan_create_err instanceof ldk.Result__u832APIErrorZ_Err)) return false;
	if (!(chan_create_err.err instanceof ldk.APIError_APIMisuseError)) return false;
	if (chan_create_err.err.err != "Channel value must be at least 1000 satoshis. It was 0") return false;

	const chan_create_res = a.chan_man.create_channel(b.chan_man.get_our_node_id(), BigInt(1000000), BigInt(400), BigInt(0), ldk.UserConfig.constructor_default());
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
	const pm_a = ldk.PeerManager.constructor_new(a.chan_man.as_ChannelMessageHandler(), ignorer.as_RoutingMessageHandler(), ignorer.as_OnionMessageHandler(), a.node_secret, 0xdeadbeef, a.node_secret, a.logger, ignorer.as_CustomMessageHandler());
	const pm_b = ldk.PeerManager.constructor_new(b.chan_man.as_ChannelMessageHandler(), ignorer.as_RoutingMessageHandler(), ignorer.as_OnionMessageHandler(), b.node_secret, 0xdeadbeef, b.node_secret, b.logger, ignorer.as_CustomMessageHandler());

	var sock_b: ldk.SocketDescriptor;
	const sock_a = ldk.SocketDescriptor.new_impl({
		send_data(data: Uint8Array, resume_read: boolean): number {
			console.assert(pm_b.read_event(sock_b, data) instanceof ldk.Result_boolPeerHandleErrorZ_OK);
			return data.length;
		},
		disconnect_socket(): void {
			console.assert(false);
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
			console.assert(pm_a.read_event(sock_a, data) instanceof ldk.Result_boolPeerHandleErrorZ_OK);
			return data.length;
		},
		disconnect_socket(): void {
			console.assert(false);
		},
		eq(other: ldk.SocketDescriptor): boolean {
			return other.hash() == this.hash();
		},
		hash(): bigint {
			return BigInt(2);
		}
	} as ldk.SocketDescriptorInterface);

	const update_fut = a.chan_man.get_persistable_update_future();
	var update_done = false;
	update_fut.register_callback_fn(ldk.FutureCallback.new_impl({
		call(): void { update_done = true; }
	}));
	if (update_done) return false;

	const v4_netaddr = ldk.NetAddress.constructor_ipv4(Uint8Array.from([42,0,42,1]), 9735);
	console.assert(pm_b.new_inbound_connection(sock_b, ldk.Option_NetAddressZ.constructor_some(v4_netaddr)) instanceof ldk.Result_NonePeerHandleErrorZ_OK);
	const init_bytes = pm_a.new_outbound_connection(b.node_id, sock_a, ldk.Option_NetAddressZ.constructor_none());
	if (!(init_bytes instanceof ldk.Result_CVec_u8ZPeerHandleErrorZ_OK)) return false;
	console.assert(pm_b.read_event(sock_b, init_bytes.res) instanceof ldk.Result_boolPeerHandleErrorZ_OK);

	console.assert(pm_a.get_peer_node_ids().length == 0);
	console.assert(pm_b.get_peer_node_ids().length == 0);

	pm_b.process_events();
	pm_a.process_events();
	pm_b.process_events();

	console.assert(pm_a.get_peer_node_ids().length == 1);
	console.assert(pm_b.get_peer_node_ids().length == 1);

	const chan_create_res = a.chan_man.create_channel(b.node_id, BigInt(1000000), BigInt(400), BigInt(0), ldk.UserConfig.constructor_default());
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
		read_custom_message(message_type: bigint, buffer: Uint8Array): ldk.Result_COption_CustomOnionMessageContentsZDecodeErrorZ {
			console.assert(message_type == 4343n);
			console.assert(buffer.length == 44);
			for (var i = 0; i < 44; i++) console.assert(buffer[i] == 67);
			return ldk.Result_COption_CustomOnionMessageContentsZDecodeErrorZ.constructor_ok(ldk.Option_CustomOnionMessageContentsZ.constructor_some(ldk.CustomOnionMessageContents.new_impl({
				tlv_type(): bigint { return 9998n; },
				write(): Uint8Array { console.assert(false); return null; }
			} as ldk.CustomOnionMessageContentsInterface)));
		},
		handle_custom_message(msg: ldk.CustomOnionMessageContents) {
			console.assert(msg.tlv_type() == 9998n);
			a_handled_msg = true;
		},
	} as ldk.CustomOnionMessageHandlerInterface);

	const underlying_om_a = ldk.OnionMessenger.constructor_new(a.keys_interface, a.logger, om_handler_a);
	const om_provider_a = {
		next_onion_message_for_peer(peer_node_id: Uint8Array): ldk.OnionMessage {
			return underlying_om_a.as_OnionMessageProvider().next_onion_message_for_peer(peer_node_id);
		}
	} as ldk.OnionMessageProviderInterface;
	const om_a = ldk.OnionMessageHandler.new_impl({
		handle_onion_message(peer_node_id: Uint8Array, msg: ldk.OnionMessage) {
			underlying_om_a.as_OnionMessageHandler().handle_onion_message(peer_node_id, msg);
		},
		peer_connected(their_node_id: Uint8Array, init: ldk.Init): ldk.Result_NoneNoneZ {
			return underlying_om_a.as_OnionMessageHandler().peer_connected(their_node_id, init)
		},
		peer_disconnected(their_node_id: Uint8Array, no_connection_possible: boolean) {
			underlying_om_a.as_OnionMessageHandler().peer_disconnected(their_node_id, no_connection_possible);
		},
		provided_node_features(): ldk.NodeFeatures {
			return underlying_om_a.as_OnionMessageHandler().provided_node_features();
		},
		provided_init_features(their_node_id: Uint8Array): ldk.InitFeatures {
			return underlying_om_a.as_OnionMessageHandler().provided_init_features(their_node_id);
		}
	} as ldk.OnionMessageHandlerInterface, om_provider_a);

	var b_handled_msg = false;
	const om_handler_b = ldk.CustomOnionMessageHandler.new_impl({
		read_custom_message(message_type: bigint, buffer: Uint8Array): ldk.Result_COption_CustomOnionMessageContentsZDecodeErrorZ {
			console.assert(message_type == 4242n);
			console.assert(buffer.length == 43);
			for (var i = 0; i < 43; i++) console.assert(buffer[i] == 66);
			return ldk.Result_COption_CustomOnionMessageContentsZDecodeErrorZ.constructor_ok(ldk.Option_CustomOnionMessageContentsZ.constructor_some(ldk.CustomOnionMessageContents.new_impl({
				tlv_type(): bigint { return 9999n; },
				write(): Uint8Array { console.assert(false); return null; }
			} as ldk.CustomOnionMessageContentsInterface)));
		},
		handle_custom_message(msg: ldk.CustomOnionMessageContents) {
			console.assert(msg.tlv_type() == 9999n);
			b_handled_msg = true;
		},
	} as ldk.CustomOnionMessageHandlerInterface);
	const om_b = ldk.OnionMessenger.constructor_new(b.keys_interface, b.logger, om_handler_b);

	const pm_a = ldk.PeerManager.constructor_new(a.chan_man.as_ChannelMessageHandler(), ignorer.as_RoutingMessageHandler(), om_a, a.node_secret, 0xdeadbeef, a.node_secret, a.logger, ignorer.as_CustomMessageHandler());
	const pm_b = ldk.PeerManager.constructor_new(b.chan_man.as_ChannelMessageHandler(), ignorer.as_RoutingMessageHandler(), om_b.as_OnionMessageHandler(), b.node_secret, 0xdeadbeef, b.node_secret, b.logger, ignorer.as_CustomMessageHandler());

	var sock_b: ldk.SocketDescriptor;
	const sock_a = ldk.SocketDescriptor.new_impl({
		send_data(data: Uint8Array, resume_read: boolean): number {
			console.assert(pm_b.read_event(sock_b, data) instanceof ldk.Result_boolPeerHandleErrorZ_OK);
			return data.length;
		},
		disconnect_socket(): void {
			console.assert(false);
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
			console.assert(pm_a.read_event(sock_a, data) instanceof ldk.Result_boolPeerHandleErrorZ_OK);
			return data.length;
		},
		disconnect_socket(): void {
			console.assert(false);
		},
		eq(other: ldk.SocketDescriptor): boolean {
			return other.hash() == this.hash();
		},
		hash(): bigint {
			return BigInt(2);
		}
	} as ldk.SocketDescriptorInterface);

	const v4_netaddr = ldk.NetAddress.constructor_ipv4(Uint8Array.from([42,0,42,1]), 9735);
	console.assert(pm_b.new_inbound_connection(sock_b, ldk.Option_NetAddressZ.constructor_some(v4_netaddr)) instanceof ldk.Result_NonePeerHandleErrorZ_OK);
	const init_bytes = pm_a.new_outbound_connection(b.node_id, sock_a, ldk.Option_NetAddressZ.constructor_none());
	if (!(init_bytes instanceof ldk.Result_CVec_u8ZPeerHandleErrorZ_OK)) return false;
	console.assert(pm_b.read_event(sock_b, init_bytes.res) instanceof ldk.Result_boolPeerHandleErrorZ_OK);

	console.assert(pm_a.get_peer_node_ids().length == 0);
	console.assert(pm_b.get_peer_node_ids().length == 0);

	pm_b.process_events();
	pm_a.process_events();
	pm_b.process_events();

	console.assert(pm_a.get_peer_node_ids().length == 1);
	console.assert(pm_b.get_peer_node_ids().length == 1);

	underlying_om_a.send_custom_onion_message([], ldk.Destination.constructor_node(b.node_id), ldk.CustomOnionMessageContents.new_impl({
			tlv_type(): bigint { return 4242n; },
			write(): Uint8Array {
				const ret = new Uint8Array(43);
				for (var i = 0; i < 43; i++) ret[i] = 66;
				return ret;
			}
		} as ldk.CustomOnionMessageContentsInterface), null);
	pm_a.process_events();
	console.assert(b_handled_msg);

	om_b.send_custom_onion_message([], ldk.Destination.constructor_node(a.node_id), ldk.CustomOnionMessageContents.new_impl({
			tlv_type(): bigint { return 4343n; },
			write(): Uint8Array {
				const ret = new Uint8Array(44);
				for (var i = 0; i < 44; i++) ret[i] = 67;
				return ret;
			}
		} as ldk.CustomOnionMessageContentsInterface), null);
	pm_b.process_events();
	console.assert(a_handled_msg);

	return true;
});

tests.push(async () => {
	// Test that we can do basic locking of a NetworkGraph
	const genesis_hash = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x19, 0xd6, 0x68, 0x9c, 0x08, 0x5a, 0xe1, 0x65, 0x83, 0x1e, 0x93, 0x4f, 0xf7, 0x63, 0xae, 0x46, 0xa2, 0xa6, 0xc1, 0x72, 0xb3, 0xf1, 0xb6, 0x0a, 0x8c, 0xe2, 0x6f]);
	const logger = ldk.Logger.new_impl({
		log(record: ldk.Record): void {
			if (record.get_level() != ldk.Level.LDKLevel_Gossip)
				console.log(record.get_module_path() + ": " + record.get_args());
		}
	} as ldk.LoggerInterface);
	const network_graph = ldk.NetworkGraph.constructor_new(genesis_hash, logger);
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

	const allocs_finished = new Promise((resolve, reject) => {
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
