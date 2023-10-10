using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An abstraction over a bitcoin wallet that can perform coin selection over a set of UTXOs and can
 * sign for them. The coin selection method aims to mimic Bitcoin Core's `fundrawtransaction` RPC,
 * which most wallets should be able to satisfy. Otherwise, consider implementing [`WalletSource`],
 * which can provide a default implementation of this trait when used with [`Wallet`].
 */
public class CoinSelectionSource : CommonBase {
	internal readonly bindings.LDKCoinSelectionSource bindings_instance;
	internal CoinSelectionSource(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private CoinSelectionSource(bindings.LDKCoinSelectionSource arg) : base(bindings.LDKCoinSelectionSource_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~CoinSelectionSource() {
		if (ptr != 0) { bindings.CoinSelectionSource_free(ptr); }
	}

	public interface CoinSelectionSourceInterface {
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
		Result_CoinSelectionNoneZ select_confirmed_utxos(byte[] _claim_id, Input[] _must_spend, TxOut[] _must_pay_to, int _target_feerate_sat_per_1000_weight);
		/**
		 * Signs and provides the full witness for all inputs within the transaction known to the
		 * trait (i.e., any provided via [`CoinSelectionSource::select_confirmed_utxos`]).
		 */
		Result_TransactionNoneZ sign_tx(byte[] _tx);
	}
	private class LDKCoinSelectionSourceHolder { internal CoinSelectionSource held; }
	private class LDKCoinSelectionSourceImpl : bindings.LDKCoinSelectionSource {
		internal LDKCoinSelectionSourceImpl(CoinSelectionSourceInterface arg, LDKCoinSelectionSourceHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private CoinSelectionSourceInterface arg;
		private LDKCoinSelectionSourceHolder impl_holder;
		public long select_confirmed_utxos(byte[] _claim_id, long[] _must_spend, long[] _must_pay_to, int _target_feerate_sat_per_1000_weight) {
			int _must_spend_conv_7_len = _must_spend.Length;
			Input[] _must_spend_conv_7_arr = new Input[_must_spend_conv_7_len];
			for (int h = 0; h < _must_spend_conv_7_len; h++) {
				long _must_spend_conv_7 = _must_spend[h];
				org.ldk.structs.Input _must_spend_conv_7_hu_conv = null; if (_must_spend_conv_7 < 0 || _must_spend_conv_7 > 4096) { _must_spend_conv_7_hu_conv = new org.ldk.structs.Input(null, _must_spend_conv_7); }
				if (_must_spend_conv_7_hu_conv != null) { _must_spend_conv_7_hu_conv.ptrs_to.AddLast(this); };
				_must_spend_conv_7_arr[h] = _must_spend_conv_7_hu_conv;
			}
			int _must_pay_to_conv_7_len = _must_pay_to.Length;
			TxOut[] _must_pay_to_conv_7_arr = new TxOut[_must_pay_to_conv_7_len];
			for (int h = 0; h < _must_pay_to_conv_7_len; h++) {
				long _must_pay_to_conv_7 = _must_pay_to[h];
				TxOut _must_pay_to_conv_7_conv = new TxOut(null, _must_pay_to_conv_7);
				_must_pay_to_conv_7_arr[h] = _must_pay_to_conv_7_conv;
			}
			Result_CoinSelectionNoneZ ret = arg.select_confirmed_utxos(_claim_id, _must_spend_conv_7_arr, _must_pay_to_conv_7_arr, _target_feerate_sat_per_1000_weight);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long sign_tx(byte[] _tx) {
			Result_TransactionNoneZ ret = arg.sign_tx(_tx);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
	}
	public static CoinSelectionSource new_impl(CoinSelectionSourceInterface arg) {
		LDKCoinSelectionSourceHolder impl_holder = new LDKCoinSelectionSourceHolder();
		impl_holder.held = new CoinSelectionSource(new LDKCoinSelectionSourceImpl(arg, impl_holder));
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
		long ret = bindings.CoinSelectionSource_select_confirmed_utxos(this.ptr, InternalUtils.check_arr_len(claim_id, 32), must_spend != null ? InternalUtils.mapArray(must_spend, must_spend_conv_7 => must_spend_conv_7 == null ? 0 : must_spend_conv_7.ptr) : null, must_pay_to != null ? InternalUtils.mapArray(must_pay_to, must_pay_to_conv_7 => must_pay_to_conv_7.ptr) : null, target_feerate_sat_per_1000_weight);
		GC.KeepAlive(this);
		GC.KeepAlive(claim_id);
		GC.KeepAlive(must_spend);
		GC.KeepAlive(must_pay_to);
		GC.KeepAlive(target_feerate_sat_per_1000_weight);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CoinSelectionNoneZ ret_hu_conv = Result_CoinSelectionNoneZ.constr_from_ptr(ret);
		foreach (Input must_spend_conv_7 in must_spend) { if (this != null) { this.ptrs_to.AddLast(must_spend_conv_7); }; };
		return ret_hu_conv;
	}

	/**
	 * Signs and provides the full witness for all inputs within the transaction known to the
	 * trait (i.e., any provided via [`CoinSelectionSource::select_confirmed_utxos`]).
	 */
	public Result_TransactionNoneZ sign_tx(byte[] tx) {
		long ret = bindings.CoinSelectionSource_sign_tx(this.ptr, tx);
		GC.KeepAlive(this);
		GC.KeepAlive(tx);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TransactionNoneZ ret_hu_conv = Result_TransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
