import * as ldk from "../../ts/index.mjs";
import * as node_net from '../net.mjs';

import * as fs from 'fs';

const wasm_file = fs.readFileSync('../ts/liblightningjs.wasm');
await ldk.initializeWasmFromBinary(wasm_file);

const logger_a = ldk.Logger.new_impl({
	log(record: ldk.Record): void {
		console.log(record.get_module_path() + ": " + record.get_args());
	}
} as ldk.LoggerInterface);
const logger_b = logger_a;

const node_a_secret = new Uint8Array(32);
for (var i = 0; i < 32; i++) node_a_secret[i] = 42;
// The public key for a secret key of all 42s:
const node_a_pk = new Uint8Array([3, 91, 229, 233, 71, 130, 9, 103, 74, 150, 230, 15, 31, 3, 127, 97, 118, 84, 15, 208, 1, 250, 29, 100, 105, 71, 112, 197, 106, 119, 9, 196, 44]);

const node_b_secret = new Uint8Array(32);
for (var i = 0; i < 32; i++) node_b_secret[i] = 43;

const rng_seed = new Uint8Array(32);
const routing_handler = ldk.IgnoringMessageHandler.constructor_new().as_RoutingMessageHandler();
const chan_handler = ldk.ErroringMessageHandler.constructor_new().as_ChannelMessageHandler();
const cust_handler = ldk.IgnoringMessageHandler.constructor_new().as_CustomMessageHandler();

const a_pm = ldk.PeerManager.constructor_new(chan_handler, routing_handler, node_a_secret, rng_seed, logger_a, cust_handler);
const a_net_handler = new node_net.NodeLDKNet(a_pm);
var port = 10000;
for (; port < 11000; port++) {
	try {
		// Try ports until we find one we can bind to.
		await a_net_handler.bind_listener("127.0.0.1", port);
		break;
	} catch(_) {}
}

const b_pm = ldk.PeerManager.constructor_new(chan_handler, routing_handler, node_b_secret, rng_seed, logger_b, cust_handler);
const b_net_handler = new node_net.NodeLDKNet(b_pm);
await b_net_handler.connect_peer("127.0.0.1", port, node_a_pk);

try {
	// Ensure we get an error if we try to bind the same port twice.
	await a_net_handler.bind_listener("127.0.0.1", port);
	console.assert(false);
} catch(_) {}

await new Promise<void>(resolve => {
	// Wait until the peers are connected and have exchanged the initial handshake
	var timer: ReturnType<typeof setInterval>;
	timer = setInterval(function() {
		if (a_pm.get_peer_node_ids().length == 1 && b_pm.get_peer_node_ids().length == 1) {
			resolve();
			clearInterval(timer);
		}
	}, 500);
});

b_pm.disconnect_by_node_id(node_a_pk, false);
await new Promise<void>(resolve => {
	// Wait until A learns the connection is closed from the socket closure
	var timer: ReturnType<typeof setInterval>;
	timer = setInterval(function() {
		if (a_pm.get_peer_node_ids().length == 0 && b_pm.get_peer_node_ids().length == 0) {
			resolve();
			clearInterval(timer);
		}
	}, 500);
});

a_net_handler.stop();
b_net_handler.stop();

function arr_eq(a: number[]|Uint8Array, b: number[]|Uint8Array): boolean {
	return a.length == b.length && a.every((val, idx) => val == b[idx]);
}

const v4_parse = node_net.NodeLDKNet["v4_addr_from_ip"];
console.assert((v4_parse("127.0.0.1", 4242) as ldk.NetAddress_IPv4).port == 4242);
console.assert(arr_eq((v4_parse("127.0.0.1", 4242) as ldk.NetAddress_IPv4).addr, [127,0,0,1]));
console.assert(arr_eq((v4_parse("0.0.0.0", 4242) as ldk.NetAddress_IPv4).addr, [0,0,0,0]));

const v6_parse = node_net.NodeLDKNet["v6_addr_from_ip"];
console.assert((v6_parse("::", 4242) as ldk.NetAddress_IPv4).port == 4242);
console.assert(arr_eq((v6_parse("::", 4242) as ldk.NetAddress_IPv6).addr,
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]));
console.assert(arr_eq((v6_parse("fe80::", 4242) as ldk.NetAddress_IPv6).addr,
	[0xfe,0x80,0,0,0,0,0,0,0,0,0,0,0,0,0,0]));
console.assert(arr_eq((v6_parse("fe80::42", 4242) as ldk.NetAddress_IPv6).addr,
	[0xfe,0x80,0,0,0,0,0,0,0,0,0,0,0,0,0,0x42]));
console.assert(arr_eq((v6_parse("fe80:A:b::", 4242) as ldk.NetAddress_IPv6).addr,
	[0xfe,0x80,0,0xa,0,0xb,0,0,0,0,0,0,0,0,0,0]));
console.assert(arr_eq((v6_parse("2001:1:bad::beef:cafe", 4242) as ldk.NetAddress_IPv6).addr,
	[0x20, 0x01, 0, 1, 0xb, 0xad, 0, 0, 0, 0, 0, 0, 0xbe, 0xef, 0xca, 0xfe]));
