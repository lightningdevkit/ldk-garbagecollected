
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of WalletSource */
public interface WalletSourceInterface {
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
	 */
	Result_TransactionNoneZ sign_tx(byte[] tx);
}

/**
 * An alternative to [`CoinSelectionSource`] that can be implemented and used along [`Wallet`] to
 * provide a default implementation to [`CoinSelectionSource`].
 */
public class WalletSource : CommonBase {
	internal bindings.LDKWalletSource bindings_instance;
	internal long instance_idx;

	internal WalletSource(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~WalletSource() {
		if (ptr != 0) { bindings.WalletSource_free(ptr); }
	}

	private class LDKWalletSourceHolder { internal WalletSource held; }
	private class LDKWalletSourceImpl : bindings.LDKWalletSource {
		internal LDKWalletSourceImpl(WalletSourceInterface arg, LDKWalletSourceHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private WalletSourceInterface arg;
		private LDKWalletSourceHolder impl_holder;
		public long list_confirmed_utxos() {
			Result_CVec_UtxoZNoneZ ret = arg.list_confirmed_utxos();
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long get_change_script() {
			Result_CVec_u8ZNoneZ ret = arg.get_change_script();
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long sign_tx(long _tx) {
			byte[] _tx_conv = InternalUtils.decodeUint8Array(_tx);
			Result_TransactionNoneZ ret = arg.sign_tx(_tx_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
	}

	/** Creates a new instance of WalletSource from a given implementation */
	public static WalletSource new_impl(WalletSourceInterface arg) {
		LDKWalletSourceHolder impl_holder = new LDKWalletSourceHolder();
		LDKWalletSourceImpl impl = new LDKWalletSourceImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKWalletSource_new(impl);

		impl_holder.held = new WalletSource(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		return impl_holder.held;
	}

	/**
	 * Returns all UTXOs, with at least 1 confirmation each, that are available to spend.
	 */
	public Result_CVec_UtxoZNoneZ list_confirmed_utxos() {
		long ret = bindings.WalletSource_list_confirmed_utxos(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_UtxoZNoneZ ret_hu_conv = Result_CVec_UtxoZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns a script to use for change above dust resulting from a successful coin selection
	 * attempt.
	 */
	public Result_CVec_u8ZNoneZ get_change_script() {
		long ret = bindings.WalletSource_get_change_script(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_u8ZNoneZ ret_hu_conv = Result_CVec_u8ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Signs and provides the full [`TxIn::script_sig`] and [`TxIn::witness`] for all inputs within
	 * the transaction known to the wallet (i.e., any provided via
	 * [`WalletSource::list_confirmed_utxos`]).
	 */
	public Result_TransactionNoneZ sign_tx(byte[] tx) {
		long ret = bindings.WalletSource_sign_tx(this.ptr, InternalUtils.encodeUint8Array(tx));
		GC.KeepAlive(this);
		GC.KeepAlive(tx);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TransactionNoneZ ret_hu_conv = Result_TransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
