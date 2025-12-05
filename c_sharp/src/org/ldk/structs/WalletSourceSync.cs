
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of WalletSourceSync */
public interface WalletSourceSyncInterface {
	/**Returns all UTXOs, with at least 1 confirmation each, that are available to spend.
	 */
	Result_CVec_UtxoZNoneZ list_confirmed_utxos();
	/**Returns a script to use for change above dust resulting from a successful coin selection
	 * attempt.
	 */
	Result_CVec_u8ZNoneZ get_change_script();
	/**Signs and provides the full [`TxIn::script_sig`] and [`TxIn::witness`] for all inputs within
	 * the transaction known to the wallet (i.e., any provided via
	 * [`WalletSource::list_confirmed_utxos`]).
	 * 
	 * If your wallet does not support signing PSBTs you can call `psbt.extract_tx()` to get the
	 * unsigned transaction and then sign it with your wallet.
	 * 
	 * [`TxIn::script_sig`]: bitcoin::TxIn::script_sig
	 * [`TxIn::witness`]: bitcoin::TxIn::witness
	 */
	Result_TransactionNoneZ sign_psbt(byte[] psbt);
}

/**
 * An alternative to [`CoinSelectionSourceSync`] that can be implemented and used along
 * [`WalletSync`] to provide a default implementation to [`CoinSelectionSourceSync`].
 * 
 * For an asynchronous version of this trait, see [`WalletSource`].
 */
public class WalletSourceSync : CommonBase {
	internal bindings.LDKWalletSourceSync bindings_instance;
	internal long instance_idx;

	internal WalletSourceSync(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~WalletSourceSync() {
		if (ptr != 0) { bindings.WalletSourceSync_free(ptr); }
	}

	private class LDKWalletSourceSyncHolder { internal WalletSourceSync held; }
	private class LDKWalletSourceSyncImpl : bindings.LDKWalletSourceSync {
		internal LDKWalletSourceSyncImpl(WalletSourceSyncInterface arg, LDKWalletSourceSyncHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private WalletSourceSyncInterface arg;
		private LDKWalletSourceSyncHolder impl_holder;
		public long list_confirmed_utxos() {
			Result_CVec_UtxoZNoneZ ret = arg.list_confirmed_utxos();
				GC.KeepAlive(arg);
			long result = ret.clone_ptr();
			return result;
		}
		public long get_change_script() {
			Result_CVec_u8ZNoneZ ret = arg.get_change_script();
				GC.KeepAlive(arg);
			long result = ret.clone_ptr();
			return result;
		}
		public long sign_psbt(long _psbt) {
			byte[] _psbt_conv = InternalUtils.decodeUint8Array(_psbt);
			Result_TransactionNoneZ ret = arg.sign_psbt(_psbt_conv);
				GC.KeepAlive(arg);
			long result = ret.clone_ptr();
			return result;
		}
	}

	/** Creates a new instance of WalletSourceSync from a given implementation */
	public static WalletSourceSync new_impl(WalletSourceSyncInterface arg) {
		LDKWalletSourceSyncHolder impl_holder = new LDKWalletSourceSyncHolder();
		LDKWalletSourceSyncImpl impl = new LDKWalletSourceSyncImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKWalletSourceSync_new(impl);

		impl_holder.held = new WalletSourceSync(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		return impl_holder.held;
	}

	/**
	 * Returns all UTXOs, with at least 1 confirmation each, that are available to spend.
	 */
	public org.ldk.structs.Result_CVec_UtxoZNoneZ list_confirmed_utxos() {
		long ret = bindings.WalletSourceSync_list_confirmed_utxos(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_UtxoZNoneZ ret_hu_conv = Result_CVec_UtxoZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns a script to use for change above dust resulting from a successful coin selection
	 * attempt.
	 */
	public org.ldk.structs.Result_CVec_u8ZNoneZ get_change_script() {
		long ret = bindings.WalletSourceSync_get_change_script(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_u8ZNoneZ ret_hu_conv = Result_CVec_u8ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Signs and provides the full [`TxIn::script_sig`] and [`TxIn::witness`] for all inputs within
	 * the transaction known to the wallet (i.e., any provided via
	 * [`WalletSource::list_confirmed_utxos`]).
	 * 
	 * If your wallet does not support signing PSBTs you can call `psbt.extract_tx()` to get the
	 * unsigned transaction and then sign it with your wallet.
	 * 
	 * [`TxIn::script_sig`]: bitcoin::TxIn::script_sig
	 * [`TxIn::witness`]: bitcoin::TxIn::witness
	 */
	public org.ldk.structs.Result_TransactionNoneZ sign_psbt(byte[] psbt) {
		long ret = bindings.WalletSourceSync_sign_psbt(this.ptr, InternalUtils.encodeUint8Array(psbt));
		GC.KeepAlive(this);
		GC.KeepAlive(psbt);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TransactionNoneZ ret_hu_conv = Result_TransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
