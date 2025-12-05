using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A wrapper over [`WalletSourceSync`] that implements [`CoinSelectionSourceSync`] by preferring
 * UTXOs that would avoid conflicting double spends. If not enough UTXOs are available to do so,
 * conflicting double spends may happen.
 * 
 * For an asynchronous version of this wrapper, see [`Wallet`].
 */
public class WalletSync : CommonBase {
	internal WalletSync(object _dummy, long ptr) : base(ptr) { }
	~WalletSync() {
		if (ptr != 0) { bindings.WalletSync_free(ptr); }
	}

	/**
	 * Constructs a new [`WalletSync`] instance.
	 */
	public static org.ldk.structs.WalletSync of(org.ldk.structs.WalletSourceSync source, org.ldk.structs.Logger logger) {
		long ret = bindings.WalletSync_new(source.ptr, logger.ptr);
		GC.KeepAlive(source);
		GC.KeepAlive(logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.WalletSync ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.WalletSync(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(logger); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new CoinSelectionSourceSync which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned CoinSelectionSourceSync must be freed before this_arg is
	 */
	public org.ldk.structs.CoinSelectionSourceSync as_CoinSelectionSourceSync() {
		long ret = bindings.WalletSync_as_CoinSelectionSourceSync(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		CoinSelectionSourceSync ret_hu_conv = new CoinSelectionSourceSync(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
