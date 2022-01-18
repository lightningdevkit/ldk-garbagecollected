import { run_tests_node } from "./tests.mjs";
import { strict as assert } from 'assert';
import * as fs from 'fs';

const bin = fs.readFileSync('./liblightningjs.wasm');
const res = await run_tests_node(bin);
assert(res);
