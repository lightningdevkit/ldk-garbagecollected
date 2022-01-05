import * as ldk from "../bindings.mjs";
async function run_tests() {
	await ldk.initializeWasm("../../liblightningjs.wasm");
	const result = ldk.CResult_boolLightningErrorZ_ok(true);
	console.assert(ldk.CResult_boolLightningErrorZ_is_ok(result));
	console.assert(ldk.CResult_boolLightningErrorZ_get_ok(result));
	ldk.CResult_boolLightningErrorZ_free(result);
	console.assert(ldk.CResult_boolLightningErrorZ_ok(false) == result); // malloc doesn't need to guarantee this, but currently does
	console.assert(ldk.CResult_boolLightningErrorZ_is_ok(result));
	console.assert(!ldk.CResult_boolLightningErrorZ_get_ok(result));
	ldk.CResult_boolLightningErrorZ_free(result);

	/*var pk_arr = [];
	for (var i = 0; i < 33; i++) { pk_arr[i] = 42; }
	const pk_bytes = encodeUint8Array(pk_arr);
	const pk_res = wasm.TS_CResult_PublicKeyErrorZ_ok(pk_bytes);
	console.assert(wasm.TS_CResult_PublicKeyErrorZ_is_ok(pk_res));
	const pk_res_bytes = wasm.TS_LDKCResult_PublicKeyErrorZ_get_ok(pk_res);
	wasm.TS_CResult_PublicKeyErrorZ_free(pk_res);*/

	console.log("pass");
}

run_tests();
