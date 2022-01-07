import { run_tests } from "./tests.mjs";
import { strict as assert } from 'assert';
const res = await run_tests('./liblightningjs.wasm');
assert(res);
