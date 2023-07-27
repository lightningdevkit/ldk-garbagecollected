package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * An abstraction over a bitcoin wallet that can perform coin selection over a set of UTXOs and can
 * sign for them. The coin selection method aims to mimic Bitcoin Core's `fundrawtransaction` RPC,
 * which most wallets should be able to satisfy. Otherwise, consider implementing [`WalletSource`],
 * which can provide a default implementation of this trait when used with [`Wallet`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class CoinSelectionSource extends CommonBase {
	final bindings.LDKCoinSelectionSource bindings_instance;
	CoinSelectionSource(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private CoinSelectionSource(bindings.LDKCoinSelectionSource arg) {
		super(bindings.LDKCoinSelectionSource_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CoinSelectionSource_free(ptr); } super.finalize();
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
		if (ptr != 0) { bindings.CoinSelectionSource_free(ptr); }
		ptr = 0;
	}
	public static interface CoinSelectionSourceInterface {
		/**
		 * Performs coin selection of a set of UTXOs, with at least 1 confirmation each, that are
		 * available to spend. Implementations are free to pick their coin selection algorithm of
		 * choice, as long as the following requirements are met:
		 * 
		 * 1. `must_spend` contains a set of [`Input`]s that must be included in the transaction
		 * throughout coin selection, but must not be returned as part of the result.
		 * 2. `must_pay_to` contains a set of [`TxOut`]s that must be included in the transaction
		 * throughout coin selection. In some cases, like when funding an anchor transaction, this
		 * set is empty. Implementations should ensure they handle this correctly on their end,
		 * e.g., Bitcoin Core's `fundrawtransaction` RPC requires at least one output to be
		 * provided, in which case a zero-value empty OP_RETURN output can be used instead.
		 * 3. Enough inputs must be selected/contributed for the resulting transaction (including the
		 * inputs and outputs noted above) to meet `target_feerate_sat_per_1000_weight`.
		 * 
		 * Implementations must take note that [`Input::satisfaction_weight`] only tracks the weight of
		 * the input's `script_sig` and `witness`. Some wallets, like Bitcoin Core's, may require
		 * providing the full input weight. Failing to do so may lead to underestimating fee bumps and
		 * delaying block inclusion.
		 * 
		 * The `claim_id` must map to the set of external UTXOs assigned to the claim, such that they
		 * can be re-used within new fee-bumped iterations of the original claiming transaction,
		 * ensuring that claims don't double spend each other. If a specific `claim_id` has never had a
		 * transaction associated with it, and all of the available UTXOs have already been assigned to
		 * other claims, implementations must be willing to double spend their UTXOs. The choice of
		 * which UTXOs to double spend is left to the implementation, but it must strive to keep the
		 * set of other claims being double spent to a minimum.
		 */
		Result_CoinSelectionNoneZ select_confirmed_utxos(byte[] claim_id, Input[] must_spend, TxOut[] must_pay_to, int target_feerate_sat_per_1000_weight);
		/**
		 * Signs and provides the full witness for all inputs within the transaction known to the
		 * trait (i.e., any provided via [`CoinSelectionSource::select_confirmed_utxos`]).
		 */
		Result_TransactionNoneZ sign_tx(byte[] tx);
	}
	private static class LDKCoinSelectionSourceHolder { CoinSelectionSource held; }
	public static CoinSelectionSource new_impl(CoinSelectionSourceInterface arg) {
		final LDKCoinSelectionSourceHolder impl_holder = new LDKCoinSelectionSourceHolder();
		impl_holder.held = new CoinSelectionSource(new bindings.LDKCoinSelectionSource() {
			@Override public long select_confirmed_utxos(byte[] claim_id, long[] must_spend, long[] must_pay_to, int target_feerate_sat_per_1000_weight) {
				int must_spend_conv_7_len = must_spend.length;
				Input[] must_spend_conv_7_arr = new Input[must_spend_conv_7_len];
				for (int h = 0; h < must_spend_conv_7_len; h++) {
					long must_spend_conv_7 = must_spend[h];
					org.ldk.structs.Input must_spend_conv_7_hu_conv = null; if (must_spend_conv_7 < 0 || must_spend_conv_7 > 4096) { must_spend_conv_7_hu_conv = new org.ldk.structs.Input(null, must_spend_conv_7); }
					if (must_spend_conv_7_hu_conv != null) { must_spend_conv_7_hu_conv.ptrs_to.add(this); };
					must_spend_conv_7_arr[h] = must_spend_conv_7_hu_conv;
				}
				int must_pay_to_conv_7_len = must_pay_to.length;
				TxOut[] must_pay_to_conv_7_arr = new TxOut[must_pay_to_conv_7_len];
				for (int h = 0; h < must_pay_to_conv_7_len; h++) {
					long must_pay_to_conv_7 = must_pay_to[h];
					TxOut must_pay_to_conv_7_conv = new TxOut(null, must_pay_to_conv_7);
					must_pay_to_conv_7_arr[h] = must_pay_to_conv_7_conv;
				}
				Result_CoinSelectionNoneZ ret = arg.select_confirmed_utxos(claim_id, must_spend_conv_7_arr, must_pay_to_conv_7_arr, target_feerate_sat_per_1000_weight);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long sign_tx(byte[] tx) {
				Result_TransactionNoneZ ret = arg.sign_tx(tx);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Performs coin selection of a set of UTXOs, with at least 1 confirmation each, that are
	 * available to spend. Implementations are free to pick their coin selection algorithm of
	 * choice, as long as the following requirements are met:
	 * 
	 * 1. `must_spend` contains a set of [`Input`]s that must be included in the transaction
	 * throughout coin selection, but must not be returned as part of the result.
	 * 2. `must_pay_to` contains a set of [`TxOut`]s that must be included in the transaction
	 * throughout coin selection. In some cases, like when funding an anchor transaction, this
	 * set is empty. Implementations should ensure they handle this correctly on their end,
	 * e.g., Bitcoin Core's `fundrawtransaction` RPC requires at least one output to be
	 * provided, in which case a zero-value empty OP_RETURN output can be used instead.
	 * 3. Enough inputs must be selected/contributed for the resulting transaction (including the
	 * inputs and outputs noted above) to meet `target_feerate_sat_per_1000_weight`.
	 * 
	 * Implementations must take note that [`Input::satisfaction_weight`] only tracks the weight of
	 * the input's `script_sig` and `witness`. Some wallets, like Bitcoin Core's, may require
	 * providing the full input weight. Failing to do so may lead to underestimating fee bumps and
	 * delaying block inclusion.
	 * 
	 * The `claim_id` must map to the set of external UTXOs assigned to the claim, such that they
	 * can be re-used within new fee-bumped iterations of the original claiming transaction,
	 * ensuring that claims don't double spend each other. If a specific `claim_id` has never had a
	 * transaction associated with it, and all of the available UTXOs have already been assigned to
	 * other claims, implementations must be willing to double spend their UTXOs. The choice of
	 * which UTXOs to double spend is left to the implementation, but it must strive to keep the
	 * set of other claims being double spent to a minimum.
	 */
	public Result_CoinSelectionNoneZ select_confirmed_utxos(byte[] claim_id, Input[] must_spend, TxOut[] must_pay_to, int target_feerate_sat_per_1000_weight) {
		long ret = bindings.CoinSelectionSource_select_confirmed_utxos(this.ptr, InternalUtils.check_arr_len(claim_id, 32), must_spend != null ? Arrays.stream(must_spend).mapToLong(must_spend_conv_7 -> must_spend_conv_7 == null ? 0 : must_spend_conv_7.ptr).toArray() : null, must_pay_to != null ? Arrays.stream(must_pay_to).mapToLong(must_pay_to_conv_7 -> must_pay_to_conv_7.ptr).toArray() : null, target_feerate_sat_per_1000_weight);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(claim_id);
		Reference.reachabilityFence(must_spend);
		Reference.reachabilityFence(must_pay_to);
		Reference.reachabilityFence(target_feerate_sat_per_1000_weight);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CoinSelectionNoneZ ret_hu_conv = Result_CoinSelectionNoneZ.constr_from_ptr(ret);
		for (Input must_spend_conv_7: must_spend) { if (this != null) { this.ptrs_to.add(must_spend_conv_7); }; };
		return ret_hu_conv;
	}

	/**
	 * Signs and provides the full witness for all inputs within the transaction known to the
	 * trait (i.e., any provided via [`CoinSelectionSource::select_confirmed_utxos`]).
	 */
	public Result_TransactionNoneZ sign_tx(byte[] tx) {
		long ret = bindings.CoinSelectionSource_sign_tx(this.ptr, tx);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(tx);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TransactionNoneZ ret_hu_conv = Result_TransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
