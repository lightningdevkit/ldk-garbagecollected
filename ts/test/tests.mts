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

	return [ldk.ChannelManager.constructor_new(fee_est, chain_watch, tx_broadcaster, logger, keys_interface, config, params), tx_broadcasted];
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

tests.push(async () => {
	const peer_a = get_chanman();
	const peer_b = get_chanman();
	const chan_man_a: ldk.ChannelManager = peer_a[0] as ldk.ChannelManager;
	const chan_man_b: ldk.ChannelManager = peer_b[0] as ldk.ChannelManager;

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

	// (very) manually create a funding transaction
	const witness_pos = events[0].output_script.length + 58;
	const funding_tx = new Uint8Array(witness_pos + 7);
	funding_tx[0] = 2; // 4-byte tx version 2
	funding_tx[4] = 0; funding_tx[5] = 1; // segwit magic bytes
	funding_tx[6] = 1; // 1-byte input count 1
	// 36 bytes previous outpoint all-0s
	funding_tx[43] = 0; // 1-byte input script length 0
	funding_tx[44] = 0xff; funding_tx[45] = 0xff; funding_tx[46] = 0xff; funding_tx[47] = 0xff; // 4-byte nSequence
	funding_tx[48] = 1; // one output
	assign_u64(funding_tx, 49, events[0].channel_value_satoshis);
	funding_tx[57] = events[0].output_script.length; // 1-byte output script length
	funding_tx.set(events[0].output_script, 58);
	funding_tx[witness_pos] = 1; funding_tx[witness_pos + 1] = 1; funding_tx[witness_pos + 2] = 0xff; // one witness element of size 1 with contents 0xff
	funding_tx[witness_pos + 3] = 0; funding_tx[witness_pos + 4] = 0; funding_tx[witness_pos + 5] = 0; funding_tx[witness_pos + 6] = 0; // lock time 0

	const funding_res = chan_man_a.funding_transaction_generated(events[0].temporary_channel_id, funding_tx);
	if (!(funding_res instanceof ldk.Result_NoneAPIErrorZ_OK)) return false;

	if (!exchange_messages(chan_man_a, chan_man_b)) return false;

	const tx_broadcasted: Uint8Array = (await peer_a[1]) as Uint8Array;
	if (!array_eq(tx_broadcasted, funding_tx)) return false;

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
