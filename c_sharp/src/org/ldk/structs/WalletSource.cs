using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An alternative to [`CoinSelectionSource`] that can be implemented and used along [`Wallet`] to
 * provide a default implementation to [`CoinSelectionSource`].
 */
public class WalletSource : CommonBase {
	internal readonly bindings.LDKWalletSource bindings_instance;
	internal WalletSource(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private WalletSource(bindings.LDKWalletSource arg) : base(bindings.LDKWalletSource_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~WalletSource() {
		if (ptr != 0) { bindings.WalletSource_free(ptr); }
	}

	public interface WalletSourceInterface {
		/**
		 * Returns all UTXOs, with at least 1 confirmation each, that are available to spend.
		 */
		Result_CVec_UtxoZNoneZ list_confirmed_utxos();
		/**
		 * Returns a script to use for change above dust resulting from a successful coin selection
		 * attempt.
		 */
		Result_ScriptNoneZ get_change_script();
		/**
		 * Signs and provides the full [`TxIn::script_sig`] and [`TxIn::witness`] for all inputs within
		 * the transaction known to the wallet (i.e., any provided via
		 * [`WalletSource::list_confirmed_utxos`]).
		 */
		Result_TransactionNoneZ sign_tx(byte[] _tx);
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
			Result_ScriptNoneZ ret = arg.get_change_script();
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
	public static WalletSource new_impl(WalletSourceInterface arg) {
		LDKWalletSourceHolder impl_holder = new LDKWalletSourceHolder();
		impl_holder.held = new WalletSource(new LDKWalletSourceImpl(arg, impl_holder));
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
	public Result_ScriptNoneZ get_change_script() {
		long ret = bindings.WalletSource_get_change_script(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ScriptNoneZ ret_hu_conv = Result_ScriptNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Signs and provides the full [`TxIn::script_sig`] and [`TxIn::witness`] for all inputs within
	 * the transaction known to the wallet (i.e., any provided via
	 * [`WalletSource::list_confirmed_utxos`]).
	 */
	public Result_TransactionNoneZ sign_tx(byte[] tx) {
		long ret = bindings.WalletSource_sign_tx(this.ptr, tx);
		GC.KeepAlive(this);
		GC.KeepAlive(tx);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TransactionNoneZ ret_hu_conv = Result_TransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
