

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of Confirm */
export interface ConfirmInterface {
	/**Notifies LDK of transactions confirmed in a block with a given header and height.
	 * 
	 * Must be called for any transactions registered by [`Filter::register_tx`] or any
	 * transactions spending an output registered by [`Filter::register_output`]. Such transactions
	 * appearing in the same block do not need to be included in the same call; instead, multiple
	 * calls with additional transactions may be made so long as they are made in [chain order].
	 * 
	 * May be called before or after [`best_block_updated`] for the corresponding block. However,
	 * in the event of a chain reorganization, it must not be called with a `header` that is no
	 * longer in the chain as of the last call to [`best_block_updated`].
	 * 
	 * [chain order]: Confirm#order
	 * [`best_block_updated`]: Self::best_block_updated
	 */
	transactions_confirmed(header: Uint8Array, txdata: TwoTuple_usizeTransactionZ[], height: number): void;
	/**Notifies LDK of a transaction that is no longer confirmed as result of a chain reorganization.
	 * 
	 * Must be called for any transaction returned by [`get_relevant_txids`] if it has been
	 * reorganized out of the best chain or if it is no longer confirmed in the block with the
	 * given block hash. Once called, the given transaction will not be returned
	 * by [`get_relevant_txids`], unless it has been reconfirmed via [`transactions_confirmed`].
	 * 
	 * [`get_relevant_txids`]: Self::get_relevant_txids
	 * [`transactions_confirmed`]: Self::transactions_confirmed
	 */
	transaction_unconfirmed(txid: Uint8Array): void;
	/**Notifies LDK of an update to the best header connected at the given height.
	 * 
	 * Must be called whenever a new chain tip becomes available. May be skipped for intermediary
	 * blocks.
	 */
	best_block_updated(header: Uint8Array, height: number): void;
	/**Returns transactions that must be monitored for reorganization out of the chain along
	 * with the height and the hash of the block as part of which it had been previously confirmed.
	 * 
	 * Note that the returned `Option<BlockHash>` might be `None` for channels created with LDK
	 * 0.0.112 and prior, in which case you need to manually track previous confirmations.
	 * 
	 * Will include any transactions passed to [`transactions_confirmed`] that have insufficient
	 * confirmations to be safe from a chain reorganization. Will not include any transactions
	 * passed to [`transaction_unconfirmed`], unless later reconfirmed.
	 * 
	 * Must be called to determine the subset of transactions that must be monitored for
	 * reorganization. Will be idempotent between calls but may change as a result of calls to the
	 * other interface methods. Thus, this is useful to determine which transactions must be
	 * given to [`transaction_unconfirmed`].
	 * 
	 * If any of the returned transactions are confirmed in a block other than the one with the
	 * given hash at the given height, they need to be unconfirmed and reconfirmed via
	 * [`transaction_unconfirmed`] and [`transactions_confirmed`], respectively.
	 * 
	 * [`transactions_confirmed`]: Self::transactions_confirmed
	 * [`transaction_unconfirmed`]: Self::transaction_unconfirmed
	 */
	get_relevant_txids(): ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ[];
}

class LDKConfirmHolder {
	held: Confirm|null = null;
}

/**
 * The `Confirm` trait is used to notify LDK when relevant transactions have been confirmed on
 * chain or unconfirmed during a chain reorganization.
 * 
 * Clients sourcing chain data using a transaction-oriented API should prefer this interface over
 * [`Listen`]. For instance, an Electrum-based transaction sync implementation may implement
 * [`Filter`] to subscribe to relevant transactions and unspent outputs it should monitor for
 * on-chain activity. Then, it needs to notify LDK via this interface upon observing any changes
 * with reference to the confirmation status of the monitored objects.
 * 
 * # Use
 * The intended use is as follows:
 * - Call [`transactions_confirmed`] to notify LDK whenever any of the registered transactions or
 * outputs are, respectively, confirmed or spent on chain.
 * - Call [`transaction_unconfirmed`] to notify LDK whenever any transaction returned by
 * [`get_relevant_txids`] is no longer confirmed in the block with the given block hash.
 * - Call [`best_block_updated`] to notify LDK whenever a new chain tip becomes available.
 * 
 * # Order
 * 
 * Clients must call these methods in chain order. Specifically:
 * - Transactions which are confirmed in a particular block must be given before transactions
 * confirmed in a later block.
 * - Dependent transactions within the same block must be given in topological order, possibly in
 * separate calls.
 * - All unconfirmed transactions must be given after the original confirmations and before *any*
 * reconfirmations, i.e., [`transactions_confirmed`] and [`transaction_unconfirmed`] calls should
 * never be interleaved, but always conduced *en bloc*.
 * - Any reconfirmed transactions need to be explicitly unconfirmed before they are reconfirmed
 * in regard to the new block.
 * 
 * See individual method documentation for further details.
 * 
 * [`transactions_confirmed`]: Self::transactions_confirmed
 * [`transaction_unconfirmed`]: Self::transaction_unconfirmed
 * [`best_block_updated`]: Self::best_block_updated
 * [`get_relevant_txids`]: Self::get_relevant_txids
 */
export class Confirm extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKConfirm|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Confirm_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of Confirm from a given implementation */
	public static new_impl(arg: ConfirmInterface): Confirm {
		const impl_holder: LDKConfirmHolder = new LDKConfirmHolder();
		let structImplementation = {
			transactions_confirmed (header: number, txdata: number, height: number): void {
				const header_conv: Uint8Array = bindings.decodeUint8Array(header);
				const txdata_conv_28_len: number = bindings.getArrayLength(txdata);
				const txdata_conv_28_arr: TwoTuple_usizeTransactionZ[] = new Array(txdata_conv_28_len).fill(null);
				for (var c = 0; c < txdata_conv_28_len; c++) {
					const txdata_conv_28: bigint = bindings.getU64ArrayElem(txdata, c);
					const txdata_conv_28_hu_conv: TwoTuple_usizeTransactionZ = new TwoTuple_usizeTransactionZ(null, txdata_conv_28);
					CommonBase.add_ref_from(txdata_conv_28_hu_conv, this);
					txdata_conv_28_arr[c] = txdata_conv_28_hu_conv;
				}
				bindings.freeWasmMemory(txdata)
				arg.transactions_confirmed(header_conv, txdata_conv_28_arr, height);
			},
			transaction_unconfirmed (txid: number): void {
				const txid_conv: Uint8Array = bindings.decodeUint8Array(txid);
				arg.transaction_unconfirmed(txid_conv);
			},
			best_block_updated (header: number, height: number): void {
				const header_conv: Uint8Array = bindings.decodeUint8Array(header);
				arg.best_block_updated(header_conv, height);
			},
			get_relevant_txids (): number {
				const ret: ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ[] = arg.get_relevant_txids();
				const result: number = bindings.encodeUint64Array(ret.map(ret_conv_54 => ret_conv_54.clone_ptr()));
				return result;
			},
		} as bindings.LDKConfirm;
		const ptr_idx: [bigint, number] = bindings.LDKConfirm_new(structImplementation);

		impl_holder.held = new Confirm(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Notifies LDK of transactions confirmed in a block with a given header and height.
	 * 
	 * Must be called for any transactions registered by [`Filter::register_tx`] or any
	 * transactions spending an output registered by [`Filter::register_output`]. Such transactions
	 * appearing in the same block do not need to be included in the same call; instead, multiple
	 * calls with additional transactions may be made so long as they are made in [chain order].
	 * 
	 * May be called before or after [`best_block_updated`] for the corresponding block. However,
	 * in the event of a chain reorganization, it must not be called with a `header` that is no
	 * longer in the chain as of the last call to [`best_block_updated`].
	 * 
	 * [chain order]: Confirm#order
	 * [`best_block_updated`]: Self::best_block_updated
	 */
	public transactions_confirmed(header: Uint8Array, txdata: TwoTuple_usizeTransactionZ[], height: number): void {
		bindings.Confirm_transactions_confirmed(this.ptr, bindings.encodeUint8Array(header), bindings.encodeUint64Array(txdata.map(txdata_conv_28 => CommonBase.get_ptr_of(txdata_conv_28))), height);
	}

	/**
	 * Notifies LDK of a transaction that is no longer confirmed as result of a chain reorganization.
	 * 
	 * Must be called for any transaction returned by [`get_relevant_txids`] if it has been
	 * reorganized out of the best chain or if it is no longer confirmed in the block with the
	 * given block hash. Once called, the given transaction will not be returned
	 * by [`get_relevant_txids`], unless it has been reconfirmed via [`transactions_confirmed`].
	 * 
	 * [`get_relevant_txids`]: Self::get_relevant_txids
	 * [`transactions_confirmed`]: Self::transactions_confirmed
	 */
	public transaction_unconfirmed(txid: Uint8Array): void {
		bindings.Confirm_transaction_unconfirmed(this.ptr, bindings.encodeUint8Array(txid));
	}

	/**
	 * Notifies LDK of an update to the best header connected at the given height.
	 * 
	 * Must be called whenever a new chain tip becomes available. May be skipped for intermediary
	 * blocks.
	 */
	public best_block_updated(header: Uint8Array, height: number): void {
		bindings.Confirm_best_block_updated(this.ptr, bindings.encodeUint8Array(header), height);
	}

	/**
	 * Returns transactions that must be monitored for reorganization out of the chain along
	 * with the height and the hash of the block as part of which it had been previously confirmed.
	 * 
	 * Note that the returned `Option<BlockHash>` might be `None` for channels created with LDK
	 * 0.0.112 and prior, in which case you need to manually track previous confirmations.
	 * 
	 * Will include any transactions passed to [`transactions_confirmed`] that have insufficient
	 * confirmations to be safe from a chain reorganization. Will not include any transactions
	 * passed to [`transaction_unconfirmed`], unless later reconfirmed.
	 * 
	 * Must be called to determine the subset of transactions that must be monitored for
	 * reorganization. Will be idempotent between calls but may change as a result of calls to the
	 * other interface methods. Thus, this is useful to determine which transactions must be
	 * given to [`transaction_unconfirmed`].
	 * 
	 * If any of the returned transactions are confirmed in a block other than the one with the
	 * given hash at the given height, they need to be unconfirmed and reconfirmed via
	 * [`transaction_unconfirmed`] and [`transactions_confirmed`], respectively.
	 * 
	 * [`transactions_confirmed`]: Self::transactions_confirmed
	 * [`transaction_unconfirmed`]: Self::transaction_unconfirmed
	 */
	public get_relevant_txids(): ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ[] {
		const ret: number = bindings.Confirm_get_relevant_txids(this.ptr);
		const ret_conv_54_len: number = bindings.getArrayLength(ret);
		const ret_conv_54_arr: ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ[] = new Array(ret_conv_54_len).fill(null);
		for (var c = 0; c < ret_conv_54_len; c++) {
			const ret_conv_54: bigint = bindings.getU64ArrayElem(ret, c);
			const ret_conv_54_hu_conv: ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ = new ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ(null, ret_conv_54);
			CommonBase.add_ref_from(ret_conv_54_hu_conv, this);
			ret_conv_54_arr[c] = ret_conv_54_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_54_arr;
	}

}
