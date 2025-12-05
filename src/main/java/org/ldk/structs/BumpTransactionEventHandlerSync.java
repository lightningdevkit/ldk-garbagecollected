package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A handler for [`Event::BumpTransaction`] events that sources confirmed UTXOs from a
 * [`CoinSelectionSourceSync`] to fee bump transactions via Child-Pays-For-Parent (CPFP) or
 * Replace-By-Fee (RBF).
 * 
 * For an asynchronous version of this handler, see [`BumpTransactionEventHandler`].
 * 
 * [`Event::BumpTransaction`]: crate::events::Event::BumpTransaction
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class BumpTransactionEventHandlerSync extends CommonBase {
	BumpTransactionEventHandlerSync(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.BumpTransactionEventHandlerSync_free(ptr); }
	}

	/**
	 * Constructs a new instance of [`BumpTransactionEventHandlerSync`].
	 */
	public static BumpTransactionEventHandlerSync of(org.ldk.structs.BroadcasterInterface broadcaster, org.ldk.structs.CoinSelectionSourceSync utxo_source, org.ldk.structs.SignerProvider signer_provider, org.ldk.structs.Logger logger) {
		long ret = bindings.BumpTransactionEventHandlerSync_new(broadcaster.ptr, utxo_source.ptr, signer_provider.ptr, logger.ptr);
		Reference.reachabilityFence(broadcaster);
		Reference.reachabilityFence(utxo_source);
		Reference.reachabilityFence(signer_provider);
		Reference.reachabilityFence(logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BumpTransactionEventHandlerSync ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BumpTransactionEventHandlerSync(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(broadcaster); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(utxo_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(signer_provider); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(logger); };
		return ret_hu_conv;
	}

	/**
	 * Handles all variants of [`BumpTransactionEvent`].
	 */
	public void handle_event(org.ldk.structs.BumpTransactionEvent event) {
		bindings.BumpTransactionEventHandlerSync_handle_event(this.ptr, event.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(event);
	}

}
