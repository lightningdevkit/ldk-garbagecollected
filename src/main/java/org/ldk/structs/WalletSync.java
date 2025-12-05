package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A wrapper over [`WalletSourceSync`] that implements [`CoinSelectionSourceSync`] by preferring
 * UTXOs that would avoid conflicting double spends. If not enough UTXOs are available to do so,
 * conflicting double spends may happen.
 * 
 * For an asynchronous version of this wrapper, see [`Wallet`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class WalletSync extends CommonBase {
	WalletSync(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.WalletSync_free(ptr); }
	}

	/**
	 * Constructs a new [`WalletSync`] instance.
	 */
	public static WalletSync of(org.ldk.structs.WalletSourceSync source, org.ldk.structs.Logger logger) {
		long ret = bindings.WalletSync_new(source.ptr, logger.ptr);
		Reference.reachabilityFence(source);
		Reference.reachabilityFence(logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.WalletSync ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.WalletSync(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(logger); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new CoinSelectionSourceSync which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned CoinSelectionSourceSync must be freed before this_arg is
	 */
	public CoinSelectionSourceSync as_CoinSelectionSourceSync() {
		long ret = bindings.WalletSync_as_CoinSelectionSourceSync(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		CoinSelectionSourceSync ret_hu_conv = new CoinSelectionSourceSync(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
