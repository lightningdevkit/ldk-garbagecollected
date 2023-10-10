package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

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
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Confirm extends CommonBase {
	final bindings.LDKConfirm bindings_instance;
	Confirm(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private Confirm(bindings.LDKConfirm arg) {
		super(bindings.LDKConfirm_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.Confirm_free(ptr); } super.finalize();
	}
	/**
	 * Destroys the object, freeing associated resources. After this call, any access
	 * to this object may result in a SEGFAULT or worse.
	 *
	 * You should generally NEVER call this method. You should let the garbage collector
	 * do this for you when it finalizes objects. However, it may be useful for types
	 * which represent locks and should be closed immediately to avoid holding locks
	 * until the GC runs.
	 */
	public void destroy() {
		if (ptr != 0) { bindings.Confirm_free(ptr); }
		ptr = 0;
	}
	public static interface ConfirmInterface {
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
		void transactions_confirmed(byte[] header, TwoTuple_usizeTransactionZ[] txdata, int height);
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
		void transaction_unconfirmed(byte[] txid);
		/**
		 * Notifies LDK of an update to the best header connected at the given height.
		 * 
		 * Must be called whenever a new chain tip becomes available. May be skipped for intermediary
		 * blocks.
		 */
		void best_block_updated(byte[] header, int height);
		/**
		 * Returns transactions that must be monitored for reorganization out of the chain along
		 * with the hash of the block as part of which it had been previously confirmed.
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
		 * given hash, they need to be unconfirmed and reconfirmed via [`transaction_unconfirmed`] and
		 * [`transactions_confirmed`], respectively.
		 * 
		 * [`transactions_confirmed`]: Self::transactions_confirmed
		 * [`transaction_unconfirmed`]: Self::transaction_unconfirmed
		 */
		TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ[] get_relevant_txids();
	}
	private static class LDKConfirmHolder { Confirm held; }
	public static Confirm new_impl(ConfirmInterface arg) {
		final LDKConfirmHolder impl_holder = new LDKConfirmHolder();
		impl_holder.held = new Confirm(new bindings.LDKConfirm() {
			@Override public void transactions_confirmed(byte[] header, long[] txdata, int height) {
				int txdata_conv_28_len = txdata.length;
				TwoTuple_usizeTransactionZ[] txdata_conv_28_arr = new TwoTuple_usizeTransactionZ[txdata_conv_28_len];
				for (int c = 0; c < txdata_conv_28_len; c++) {
					long txdata_conv_28 = txdata[c];
					TwoTuple_usizeTransactionZ txdata_conv_28_hu_conv = new TwoTuple_usizeTransactionZ(null, txdata_conv_28);
					if (txdata_conv_28_hu_conv != null) { txdata_conv_28_hu_conv.ptrs_to.add(this); };
					txdata_conv_28_arr[c] = txdata_conv_28_hu_conv;
				}
				arg.transactions_confirmed(header, txdata_conv_28_arr, height);
				Reference.reachabilityFence(arg);
			}
			@Override public void transaction_unconfirmed(byte[] txid) {
				arg.transaction_unconfirmed(txid);
				Reference.reachabilityFence(arg);
			}
			@Override public void best_block_updated(byte[] header, int height) {
				arg.best_block_updated(header, height);
				Reference.reachabilityFence(arg);
			}
			@Override public long[] get_relevant_txids() {
				TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ[] ret = arg.get_relevant_txids();
				Reference.reachabilityFence(arg);
				long[] result = ret != null ? Arrays.stream(ret).mapToLong(ret_conv_49 -> ret_conv_49 == null ? 0 : ret_conv_49.clone_ptr()).toArray() : null;
				return result;
			}
		});
		return impl_holder.held;
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
	public void transactions_confirmed(byte[] header, TwoTuple_usizeTransactionZ[] txdata, int height) {
		bindings.Confirm_transactions_confirmed(this.ptr, InternalUtils.check_arr_len(header, 80), txdata != null ? Arrays.stream(txdata).mapToLong(txdata_conv_28 -> txdata_conv_28 != null ? txdata_conv_28.ptr : 0).toArray() : null, height);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(header);
		Reference.reachabilityFence(txdata);
		Reference.reachabilityFence(height);
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
	public void transaction_unconfirmed(byte[] txid) {
		bindings.Confirm_transaction_unconfirmed(this.ptr, InternalUtils.check_arr_len(txid, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(txid);
	}

	/**
	 * Notifies LDK of an update to the best header connected at the given height.
	 * 
	 * Must be called whenever a new chain tip becomes available. May be skipped for intermediary
	 * blocks.
	 */
	public void best_block_updated(byte[] header, int height) {
		bindings.Confirm_best_block_updated(this.ptr, InternalUtils.check_arr_len(header, 80), height);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(header);
		Reference.reachabilityFence(height);
	}

	/**
	 * Returns transactions that must be monitored for reorganization out of the chain along
	 * with the hash of the block as part of which it had been previously confirmed.
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
	 * given hash, they need to be unconfirmed and reconfirmed via [`transaction_unconfirmed`] and
	 * [`transactions_confirmed`], respectively.
	 * 
	 * [`transactions_confirmed`]: Self::transactions_confirmed
	 * [`transaction_unconfirmed`]: Self::transaction_unconfirmed
	 */
	public TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ[] get_relevant_txids() {
		long[] ret = bindings.Confirm_get_relevant_txids(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_49_len = ret.length;
		TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ[] ret_conv_49_arr = new TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ[ret_conv_49_len];
		for (int x = 0; x < ret_conv_49_len; x++) {
			long ret_conv_49 = ret[x];
			TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ ret_conv_49_hu_conv = new TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ(null, ret_conv_49);
			if (ret_conv_49_hu_conv != null) { ret_conv_49_hu_conv.ptrs_to.add(this); };
			ret_conv_49_arr[x] = ret_conv_49_hu_conv;
		}
		return ret_conv_49_arr;
	}

}
