import * as rawldk from "../bindings.mjs";
import * as ldk from "../index.mjs";

const tests: Array<Function> = [];

tests.push(async () => {
	const result = rawldk.CResult_boolLightningErrorZ_ok(true);
	console.assert(rawldk.CResult_boolLightningErrorZ_is_ok(result));
	console.assert(rawldk.CResult_boolLightningErrorZ_get_ok(result));
	rawldk.CResult_boolLightningErrorZ_free(result);
	console.assert(rawldk.CResult_boolLightningErrorZ_ok(false) == result); // malloc doesn't need to guarantee this, but currently does
	console.assert(rawldk.CResult_boolLightningErrorZ_is_ok(result));
	console.assert(!rawldk.CResult_boolLightningErrorZ_get_ok(result));
	rawldk.CResult_boolLightningErrorZ_free(result);

	/*var pk_arr = [];
	for (var i = 0; i < 33; i++) { pk_arr[i] = 42; }
	const pk_bytes = encodeUint8Array(pk_arr);
	const pk_res = wasm.TS_CResult_PublicKeyErrorZ_ok(pk_bytes);
	console.assert(wasm.TS_CResult_PublicKeyErrorZ_is_ok(pk_res));
	const pk_res_bytes = wasm.TS_LDKCResult_PublicKeyErrorZ_get_ok(pk_res);
	wasm.TS_CResult_PublicKeyErrorZ_free(pk_res);*/
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
