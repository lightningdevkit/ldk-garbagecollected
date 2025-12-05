using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A handler for [`Event::BumpTransaction`] events that sources confirmed UTXOs from a
 * [`CoinSelectionSourceSync`] to fee bump transactions via Child-Pays-For-Parent (CPFP) or
 * Replace-By-Fee (RBF).
 * 
 * For an asynchronous version of this handler, see [`BumpTransactionEventHandler`].
 * 
 * [`Event::BumpTransaction`]: crate::events::Event::BumpTransaction
 */
public class BumpTransactionEventHandlerSync : CommonBase {
	internal BumpTransactionEventHandlerSync(object _dummy, long ptr) : base(ptr) { }
	~BumpTransactionEventHandlerSync() {
		if (ptr != 0) { bindings.BumpTransactionEventHandlerSync_free(ptr); }
	}

	/**
	 * Constructs a new instance of [`BumpTransactionEventHandlerSync`].
	 */
	public static org.ldk.structs.BumpTransactionEventHandlerSync of(org.ldk.structs.BroadcasterInterface broadcaster, org.ldk.structs.CoinSelectionSourceSync utxo_source, org.ldk.structs.SignerProvider signer_provider, org.ldk.structs.Logger logger) {
		long ret = bindings.BumpTransactionEventHandlerSync_new(broadcaster.ptr, utxo_source.ptr, signer_provider.ptr, logger.ptr);
		GC.KeepAlive(broadcaster);
		GC.KeepAlive(utxo_source);
		GC.KeepAlive(signer_provider);
		GC.KeepAlive(logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BumpTransactionEventHandlerSync ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BumpTransactionEventHandlerSync(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(broadcaster); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(utxo_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(signer_provider); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(logger); };
		return ret_hu_conv;
	}

	/**
	 * Handles all variants of [`BumpTransactionEvent`].
	 */
	public void handle_event(org.ldk.structs.BumpTransactionEvent _event) {
		bindings.BumpTransactionEventHandlerSync_handle_event(this.ptr, _event.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(_event);
	}

}
} } }
