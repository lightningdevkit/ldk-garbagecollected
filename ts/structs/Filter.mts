

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of Filter */
export interface FilterInterface {
	/**Registers interest in a transaction with `txid` and having an output with `script_pubkey` as
	 * a spending condition.
	 * 
	 * This may be used, for example, to monitor for when a funding transaction confirms.
	 * 
	 * The `script_pubkey` is provided for informational purposes and may be useful for block
	 * sources which only support filtering on scripts.
	 */
	register_tx(txid: Uint8Array, script_pubkey: Uint8Array): void;
	/**Registers interest in spends of a transaction output.
	 * 
	 * Note that this method might be called during processing of a new block. You therefore need
	 * to ensure that also dependent output spents within an already connected block are correctly
	 * handled, e.g., by re-scanning the block in question whenever new outputs have been
	 * registered mid-processing.
	 * 
	 * This may be used, for example, to monitor for when a funding output is spent (by any
	 * transaction).
	 */
	register_output(output: WatchedOutput): void;
}

class LDKFilterHolder {
	held: Filter|null = null;
}

/**
 * The `Filter` trait defines behavior for indicating chain activity of interest pertaining to
 * channels.
 * 
 * This is useful in order to have a [`Watch`] implementation convey to a chain source which
 * transactions to be notified of. Notification may take the form of pre-filtering blocks or, in
 * the case of [BIP 157]/[BIP 158], only fetching a block if the compact filter matches. If
 * receiving full blocks from a chain source, any further filtering is unnecessary.
 * 
 * After an output has been registered, subsequent block retrievals from the chain source must not
 * exclude any transactions matching the new criteria nor any in-block descendants of such
 * transactions.
 * 
 * Note that use as part of a [`Watch`] implementation involves reentrancy. Therefore, the `Filter`
 * should not block on I/O. Implementations should instead queue the newly monitored data to be
 * processed later. Then, in order to block until the data has been processed, any [`Watch`]
 * invocation that has called the `Filter` must return [`InProgress`].
 * 
 * [`InProgress`]: ChannelMonitorUpdateStatus::InProgress
 * [BIP 157]: https://github.com/bitcoin/bips/blob/master/bip-0157.mediawiki
 * [BIP 158]: https://github.com/bitcoin/bips/blob/master/bip-0158.mediawiki
 */
export class Filter extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKFilter|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Filter_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of Filter from a given implementation */
	public static new_impl(arg: FilterInterface): Filter {
		const impl_holder: LDKFilterHolder = new LDKFilterHolder();
		let structImplementation = {
			register_tx (txid: number, script_pubkey: number): void {
				const txid_conv: Uint8Array = bindings.decodeUint8Array(txid);
				const script_pubkey_conv: Uint8Array = bindings.decodeUint8Array(script_pubkey);
				arg.register_tx(txid_conv, script_pubkey_conv);
			},
			register_output (output: bigint): void {
				const output_hu_conv: WatchedOutput = new WatchedOutput(null, output);
				CommonBase.add_ref_from(output_hu_conv, this);
				arg.register_output(output_hu_conv);
			},
		} as bindings.LDKFilter;
		const ptr_idx: [bigint, number] = bindings.LDKFilter_new(structImplementation);

		impl_holder.held = new Filter(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Registers interest in a transaction with `txid` and having an output with `script_pubkey` as
	 * a spending condition.
	 * 
	 * This may be used, for example, to monitor for when a funding transaction confirms.
	 * 
	 * The `script_pubkey` is provided for informational purposes and may be useful for block
	 * sources which only support filtering on scripts.
	 */
	public register_tx(txid: Uint8Array, script_pubkey: Uint8Array): void {
		bindings.Filter_register_tx(this.ptr, bindings.encodeUint8Array(txid), bindings.encodeUint8Array(script_pubkey));
	}

	/**
	 * Registers interest in spends of a transaction output.
	 * 
	 * Note that this method might be called during processing of a new block. You therefore need
	 * to ensure that also dependent output spents within an already connected block are correctly
	 * handled, e.g., by re-scanning the block in question whenever new outputs have been
	 * registered mid-processing.
	 * 
	 * This may be used, for example, to monitor for when a funding output is spent (by any
	 * transaction).
	 */
	public register_output(output: WatchedOutput): void {
		bindings.Filter_register_output(this.ptr, CommonBase.get_ptr_of(output));
	}

}
