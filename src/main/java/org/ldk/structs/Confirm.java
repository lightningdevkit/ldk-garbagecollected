package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * The `Confirm` trait is used to notify when transactions have been confirmed on chain or
 * unconfirmed during a chain reorganization.
 * 
 * Clients sourcing chain data using a transaction-oriented API should prefer this interface over
 * [`Listen`]. For instance, an Electrum client may implement [`Filter`] by subscribing to activity
 * related to registered transactions and outputs. Upon notification, it would pass along the
 * matching transactions using this interface.
 * 
 * # Use
 * 
 * The intended use is as follows:
 * - Call [`transactions_confirmed`] to process any on-chain activity of interest.
 * - Call [`transaction_unconfirmed`] to process any transaction returned by [`get_relevant_txids`]
 * that has been reorganized out of the chain.
 * - Call [`best_block_updated`] whenever a new chain tip becomes available.
 * 
 * # Order
 * 
 * Clients must call these methods in chain order. Specifically:
 * - Transactions confirmed in a block must be given before transactions confirmed in a later
 * block.
 * - Dependent transactions within the same block must be given in topological order, possibly in
 * separate calls.
 * - Unconfirmed transactions must be given after the original confirmations and before any
 * reconfirmation.
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

	public static interface ConfirmInterface {
		/**
		 * Processes transactions confirmed in a block with a given header and height.
		 * 
		 * Should be called for any transactions registered by [`Filter::register_tx`] or any
		 * transactions spending an output registered by [`Filter::register_output`]. Such transactions
		 * appearing in the same block do not need to be included in the same call; instead, multiple
		 * calls with additional transactions may be made so long as they are made in [chain order].
		 * 
		 * May be called before or after [`best_block_updated`] for the corresponding block. However,
		 * in the event of a chain reorganization, it must not be called with a `header` that is no
		 * longer in the chain as of the last call to [`best_block_updated`].
		 * 
		 * [chain order]: Confirm#Order
		 * [`best_block_updated`]: Self::best_block_updated
		 */
		void transactions_confirmed(byte[] header, TwoTuple_usizeTransactionZ[] txdata, int height);
		/**
		 * Processes a transaction that is no longer confirmed as result of a chain reorganization.
		 * 
		 * Should be called for any transaction returned by [`get_relevant_txids`] if it has been
		 * reorganized out of the best chain. Once called, the given transaction should not be returned
		 * by [`get_relevant_txids`] unless it has been reconfirmed via [`transactions_confirmed`].
		 * 
		 * [`get_relevant_txids`]: Self::get_relevant_txids
		 * [`transactions_confirmed`]: Self::transactions_confirmed
		 */
		void transaction_unconfirmed(byte[] txid);
		/**
		 * Processes an update to the best header connected at the given height.
		 * 
		 * Should be called when a new header is available but may be skipped for intermediary blocks
		 * if they become available at the same time.
		 */
		void best_block_updated(byte[] header, int height);
		/**
		 * Returns transactions that should be monitored for reorganization out of the chain.
		 * 
		 * Should include any transactions passed to [`transactions_confirmed`] that have insufficient
		 * confirmations to be safe from a chain reorganization. Should not include any transactions
		 * passed to [`transaction_unconfirmed`] unless later reconfirmed.
		 * 
		 * May be called to determine the subset of transactions that must still be monitored for
		 * reorganization. Will be idempotent between calls but may change as a result of calls to the
		 * other interface methods. Thus, this is useful to determine which transactions may need to be
		 * given to [`transaction_unconfirmed`].
		 * 
		 * [`transactions_confirmed`]: Self::transactions_confirmed
		 * [`transaction_unconfirmed`]: Self::transaction_unconfirmed
		 */
		byte[][] get_relevant_txids();
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
					txdata_conv_28_hu_conv.ptrs_to.add(this);
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
			@Override public byte[][] get_relevant_txids() {
				byte[][] ret = arg.get_relevant_txids();
				Reference.reachabilityFence(arg);
				byte[][] result = ret != null ? Arrays.stream(ret).map(ret_conv_8 -> InternalUtils.check_arr_len(ret_conv_8, 32)).toArray(byte[][]::new) : null;
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Processes transactions confirmed in a block with a given header and height.
	 * 
	 * Should be called for any transactions registered by [`Filter::register_tx`] or any
	 * transactions spending an output registered by [`Filter::register_output`]. Such transactions
	 * appearing in the same block do not need to be included in the same call; instead, multiple
	 * calls with additional transactions may be made so long as they are made in [chain order].
	 * 
	 * May be called before or after [`best_block_updated`] for the corresponding block. However,
	 * in the event of a chain reorganization, it must not be called with a `header` that is no
	 * longer in the chain as of the last call to [`best_block_updated`].
	 * 
	 * [chain order]: Confirm#Order
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
	 * Processes a transaction that is no longer confirmed as result of a chain reorganization.
	 * 
	 * Should be called for any transaction returned by [`get_relevant_txids`] if it has been
	 * reorganized out of the best chain. Once called, the given transaction should not be returned
	 * by [`get_relevant_txids`] unless it has been reconfirmed via [`transactions_confirmed`].
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
	 * Processes an update to the best header connected at the given height.
	 * 
	 * Should be called when a new header is available but may be skipped for intermediary blocks
	 * if they become available at the same time.
	 */
	public void best_block_updated(byte[] header, int height) {
		bindings.Confirm_best_block_updated(this.ptr, InternalUtils.check_arr_len(header, 80), height);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(header);
		Reference.reachabilityFence(height);
	}

	/**
	 * Returns transactions that should be monitored for reorganization out of the chain.
	 * 
	 * Should include any transactions passed to [`transactions_confirmed`] that have insufficient
	 * confirmations to be safe from a chain reorganization. Should not include any transactions
	 * passed to [`transaction_unconfirmed`] unless later reconfirmed.
	 * 
	 * May be called to determine the subset of transactions that must still be monitored for
	 * reorganization. Will be idempotent between calls but may change as a result of calls to the
	 * other interface methods. Thus, this is useful to determine which transactions may need to be
	 * given to [`transaction_unconfirmed`].
	 * 
	 * [`transactions_confirmed`]: Self::transactions_confirmed
	 * [`transaction_unconfirmed`]: Self::transaction_unconfirmed
	 */
	public byte[][] get_relevant_txids() {
		byte[][] ret = bindings.Confirm_get_relevant_txids(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
