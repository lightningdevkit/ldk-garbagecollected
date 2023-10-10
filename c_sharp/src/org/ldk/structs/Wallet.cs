using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A wrapper over [`WalletSource`] that implements [`CoinSelection`] by preferring UTXOs that would
 * avoid conflicting double spends. If not enough UTXOs are available to do so, conflicting double
 * spends may happen.
 */
public class Wallet : CommonBase {
	internal Wallet(object _dummy, long ptr) : base(ptr) { }
	~Wallet() {
		if (ptr != 0) { bindings.Wallet_free(ptr); }
	}

	/**
	 * Returns a new instance backed by the given [`WalletSource`] that serves as an implementation
	 * of [`CoinSelectionSource`].
	 */
	public static Wallet of(org.ldk.structs.WalletSource source, org.ldk.structs.Logger logger) {
		long ret = bindings.Wallet_new(source.ptr, logger.ptr);
		GC.KeepAlive(source);
		GC.KeepAlive(logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Wallet ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Wallet(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(logger); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new CoinSelectionSource which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned CoinSelectionSource must be freed before this_arg is
	 */
	public CoinSelectionSource as_CoinSelectionSource() {
		long ret = bindings.Wallet_as_CoinSelectionSource(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		CoinSelectionSource ret_hu_conv = new CoinSelectionSource(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
