

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of UtxoLookup */
export interface UtxoLookupInterface {
	/**Returns the transaction output of a funding transaction encoded by [`short_channel_id`].
	 * Returns an error if `chain_hash` is for a different chain or if such a transaction output is
	 * unknown.
	 * 
	 * [`short_channel_id`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#definition-of-short_channel_id
	 */
	get_utxo(chain_hash: Uint8Array, short_channel_id: bigint): UtxoResult;
}

class LDKUtxoLookupHolder {
	held: UtxoLookup|null = null;
}

/**
 * The `UtxoLookup` trait defines behavior for accessing on-chain UTXOs.
 */
export class UtxoLookup extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKUtxoLookup|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.UtxoLookup_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of UtxoLookup from a given implementation */
	public static new_impl(arg: UtxoLookupInterface): UtxoLookup {
		const impl_holder: LDKUtxoLookupHolder = new LDKUtxoLookupHolder();
		let structImplementation = {
			get_utxo (chain_hash: number, short_channel_id: bigint): bigint {
				const chain_hash_conv: Uint8Array = bindings.decodeUint8Array(chain_hash);
				const ret: UtxoResult = arg.get_utxo(chain_hash_conv, short_channel_id);
				const result: bigint = ret.clone_ptr();
				return result;
			},
		} as bindings.LDKUtxoLookup;
		const ptr_idx: [bigint, number] = bindings.LDKUtxoLookup_new(structImplementation);

		impl_holder.held = new UtxoLookup(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Returns the transaction output of a funding transaction encoded by [`short_channel_id`].
	 * Returns an error if `chain_hash` is for a different chain or if such a transaction output is
	 * unknown.
	 * 
	 * [`short_channel_id`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#definition-of-short_channel_id
	 */
	public get_utxo(chain_hash: Uint8Array, short_channel_id: bigint): UtxoResult {
		const ret: bigint = bindings.UtxoLookup_get_utxo(this.ptr, bindings.encodeUint8Array(chain_hash), short_channel_id);
		const ret_hu_conv: UtxoResult = UtxoResult.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
