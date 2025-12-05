

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of BroadcasterInterface */
export interface BroadcasterInterfaceInterface {
	/**Sends a list of transactions out to (hopefully) be mined.
	 * This only needs to handle the actual broadcasting of transactions, LDK will automatically
	 * rebroadcast transactions that haven't made it into a block.
	 * 
	 * In some cases LDK may attempt to broadcast a transaction which double-spends another
	 * and this isn't a bug and can be safely ignored.
	 * 
	 * If more than one transaction is given, these transactions MUST be a
	 * single child and its parents and be broadcast together as a package
	 * (see the [`submitpackage`](https://bitcoincore.org/en/doc/30.0.0/rpc/rawtransactions/submitpackage)
	 * Bitcoin Core RPC).
	 * 
	 * Implementations MUST NOT assume any topological order on the transactions.
	 * 
	 * Bitcoin transaction packages are defined in BIP 331 and here:
	 * <https://github.com/bitcoin/bitcoin/blob/master/doc/policy/packages.md>
	 */
	broadcast_transactions(txs: Uint8Array[]): void;
}

class LDKBroadcasterInterfaceHolder {
	held: BroadcasterInterface|null = null;
}

/**
 * An interface to send a transaction to the Bitcoin network.
 */
export class BroadcasterInterface extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKBroadcasterInterface|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.BroadcasterInterface_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of BroadcasterInterface from a given implementation */
	public static new_impl(arg: BroadcasterInterfaceInterface): BroadcasterInterface {
		const impl_holder: LDKBroadcasterInterfaceHolder = new LDKBroadcasterInterfaceHolder();
		let structImplementation = {
			broadcast_transactions (txs: number): void {
				const txs_conv_12_len: number = bindings.getArrayLength(txs);
				const txs_conv_12_arr: Uint8Array[] = new Array(txs_conv_12_len).fill(null);
				for (var m = 0; m < txs_conv_12_len; m++) {
					const txs_conv_12: number = bindings.getU32ArrayElem(txs, m);
					const txs_conv_12_conv: Uint8Array = bindings.decodeUint8Array(txs_conv_12);
					txs_conv_12_arr[m] = txs_conv_12_conv;
				}
				bindings.freeWasmMemory(txs)
				arg.broadcast_transactions(txs_conv_12_arr);
			},
		} as bindings.LDKBroadcasterInterface;
		const ptr_idx: [bigint, number] = bindings.LDKBroadcasterInterface_new(structImplementation);

		impl_holder.held = new BroadcasterInterface(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Sends a list of transactions out to (hopefully) be mined.
	 * This only needs to handle the actual broadcasting of transactions, LDK will automatically
	 * rebroadcast transactions that haven't made it into a block.
	 * 
	 * In some cases LDK may attempt to broadcast a transaction which double-spends another
	 * and this isn't a bug and can be safely ignored.
	 * 
	 * If more than one transaction is given, these transactions MUST be a
	 * single child and its parents and be broadcast together as a package
	 * (see the [`submitpackage`](https://bitcoincore.org/en/doc/30.0.0/rpc/rawtransactions/submitpackage)
	 * Bitcoin Core RPC).
	 * 
	 * Implementations MUST NOT assume any topological order on the transactions.
	 * 
	 * Bitcoin transaction packages are defined in BIP 331 and here:
	 * <https://github.com/bitcoin/bitcoin/blob/master/doc/policy/packages.md>
	 */
	public broadcast_transactions(txs: Uint8Array[]): void {
		bindings.BroadcasterInterface_broadcast_transactions(this.ptr, bindings.encodeUint32Array(txs.map(txs_conv_12 => bindings.encodeUint8Array(txs_conv_12))));
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.BroadcasterInterface_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of a BroadcasterInterface
	 */
	public clone(): BroadcasterInterface {
		const ret: bigint = bindings.BroadcasterInterface_clone(this.ptr);
		const ret_hu_conv: BroadcasterInterface = new BroadcasterInterface(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
