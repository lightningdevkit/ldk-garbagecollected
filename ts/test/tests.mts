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
function get_chanman() {
	const fee_est = ldk.FeeEstimator.new_impl({
		get_est_sat_per_1000_weight(confirmation_target: ldk.ConfirmationTarget): number {
			return 253;
		}
	} as ldk.FeeEstimatorInterface);
	const tx_broadcaster = ldk.BroadcasterInterface.new_impl({
		broadcast_transaction(tx: Uint8Array): void { console.log("Tx Broadcast: " + tx); }
	} as ldk.BroadcasterInterfaceInterface);
	const logger = ldk.Logger.new_impl({
		log(record: ldk.Record): void {
			console.log(record.get_module_path() + ": " + record.get_args());
		}
	} as ldk.LoggerInterface);

	const persister = ldk.Persist.new_impl({
		persist_new_channel(channel_id: ldk.OutPoint, data: ldk.ChannelMonitor, update_id: ldk.MonitorUpdateId): ldk.Result_NoneChannelMonitorUpdateErrZ {
			return ldk.Result_NoneChannelMonitorUpdateErrZ.constructor_ok();
		},
		update_persisted_channel(channel_id: ldk.OutPoint, update: ldk.ChannelMonitorUpdate, data: ldk.ChannelMonitor, update_id: ldk.MonitorUpdateId): ldk.Result_NoneChannelMonitorUpdateErrZ {
			return ldk.Result_NoneChannelMonitorUpdateErrZ.constructor_ok();
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

	return ldk.ChannelManager.constructor_new(fee_est, chain_watch, tx_broadcaster, logger, keys_interface, config, params);
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
					to.as_ChannelMessageHandler().handle_open_channel(from.get_our_node_id(), ldk.InitFeatures.constructor_known(), msg.msg);
				} else if (msg instanceof ldk.MessageSendEvent_SendAcceptChannel) {
					if (!array_eq(msg.node_id, to.get_our_node_id())) return false;
					to.as_ChannelMessageHandler().handle_accept_channel(from.get_our_node_id(), ldk.InitFeatures.constructor_known(), msg.msg);
				} else {
					return false;
				}
			}
		}
	}
	return true;
}

tests.push(async () => {
	const chan_man_a = get_chanman();
	const chan_man_b = get_chanman();

	chan_man_a.as_ChannelMessageHandler().peer_connected(chan_man_b.get_our_node_id(), ldk.Init.constructor_new(ldk.InitFeatures.constructor_known()));
	chan_man_b.as_ChannelMessageHandler().peer_connected(chan_man_a.get_our_node_id(), ldk.Init.constructor_new(ldk.InitFeatures.constructor_known()));

	const chan_create_err = chan_man_a.create_channel(chan_man_b.get_our_node_id(), BigInt(0), BigInt(400), BigInt(0), ldk.UserConfig.constructor_default());
	if (chan_create_err.is_ok()) return false;
	if (!(chan_create_err instanceof ldk.Result__u832APIErrorZ_Err)) return false;
	if (!(chan_create_err.err instanceof ldk.APIError_APIMisuseError)) return false;
	if (chan_create_err.err.err != "Channel value must be at least 1000 satoshis. It was 0") return false;

	const chan_create_res = chan_man_a.create_channel(chan_man_b.get_our_node_id(), BigInt(1000000), BigInt(400), BigInt(0), ldk.UserConfig.constructor_default());
	if (!chan_create_res.is_ok()) return false;

	if (!exchange_messages(chan_man_a, chan_man_b)) return false;

	const events: Array<ldk.Event> = [];
	const event_handler = ldk.EventHandler.new_impl({
		handle_event(event: ldk.Event): void {
			events.push(event);
		}
	} as ldk.EventHandlerInterface);

	chan_man_a.as_EventsProvider().process_pending_events(event_handler);
	if (events.length != 1) return false;
	if (!(events[0] instanceof ldk.Event_FundingGenerationReady)) return false;

	return true;
});

export async function run_tests(wasm_path: string) {
	await rawldk.initializeWasm(wasm_path);

	var test_runs = [];
	for (const test of tests) {
		test_runs.push(test());
	}
	const results = await Promise.all(test_runs);
	console.log("test results: " + results);
	const result = results.every((v) => { return v === true });
	console.log("all tests passed: " + result);
	return result;
}
