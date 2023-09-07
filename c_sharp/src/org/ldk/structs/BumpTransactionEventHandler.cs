using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A handler for [`Event::BumpTransaction`] events that sources confirmed UTXOs from a
 * [`CoinSelectionSource`] to fee bump transactions via Child-Pays-For-Parent (CPFP) or
 * Replace-By-Fee (RBF).
 * 
 * [`Event::BumpTransaction`]: crate::events::Event::BumpTransaction
 */
public class BumpTransactionEventHandler : CommonBase {
	internal BumpTransactionEventHandler(object _dummy, long ptr) : base(ptr) { }
	~BumpTransactionEventHandler() {
		if (ptr != 0) { bindings.BumpTransactionEventHandler_free(ptr); }
	}

	/**
	 * Returns a new instance capable of handling [`Event::BumpTransaction`] events.
	 * 
	 * [`Event::BumpTransaction`]: crate::events::Event::BumpTransaction
	 */
	public static BumpTransactionEventHandler of(org.ldk.structs.BroadcasterInterface broadcaster, org.ldk.structs.CoinSelectionSource utxo_source, org.ldk.structs.SignerProvider signer_provider, org.ldk.structs.Logger logger) {
		long ret = bindings.BumpTransactionEventHandler_new(broadcaster.ptr, utxo_source.ptr, signer_provider.ptr, logger.ptr);
		GC.KeepAlive(broadcaster);
		GC.KeepAlive(utxo_source);
		GC.KeepAlive(signer_provider);
		GC.KeepAlive(logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BumpTransactionEventHandler ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BumpTransactionEventHandler(null, ret); }
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
		bindings.BumpTransactionEventHandler_handle_event(this.ptr, _event == null ? 0 : _event.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(_event);
	}

}
} } }
