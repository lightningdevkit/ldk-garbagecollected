using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * The `Filter` trait defines behavior for indicating chain activity of interest pertaining to
 * channels.
 * 
 * This is useful in order to have a [`Watch`] implementation convey to a chain source which
 * transactions to be notified of. Notification may take the form of pre-filtering blocks or, in
 * the case of [BIP 157]/[BIP 158], only fetching a block if the compact filter matches. If
 * receiving full blocks from a chain source, any further filtering is unnecessary.
 * 
 * After an output has been registered, subsequent block retrievals from the chain source must not
 * exclude any transactions matching the new criteria nor any in-block descendants of such
 * transactions.
 * 
 * Note that use as part of a [`Watch`] implementation involves reentrancy. Therefore, the `Filter`
 * should not block on I/O. Implementations should instead queue the newly monitored data to be
 * processed later. Then, in order to block until the data has been processed, any [`Watch`]
 * invocation that has called the `Filter` must return [`InProgress`].
 * 
 * [`InProgress`]: ChannelMonitorUpdateStatus::InProgress
 * [BIP 157]: https://github.com/bitcoin/bips/blob/master/bip-0157.mediawiki
 * [BIP 158]: https://github.com/bitcoin/bips/blob/master/bip-0158.mediawiki
 */
public class Filter : CommonBase {
	internal readonly bindings.LDKFilter bindings_instance;
	internal Filter(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private Filter(bindings.LDKFilter arg) : base(bindings.LDKFilter_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~Filter() {
		if (ptr != 0) { bindings.Filter_free(ptr); }
	}

	public interface FilterInterface {
		/**
		 * Registers interest in a transaction with `txid` and having an output with `script_pubkey` as
		 * a spending condition.
		 */
		void register_tx(byte[] _txid, byte[] _script_pubkey);
		/**
		 * Registers interest in spends of a transaction output.
		 * 
		 * Note that this method might be called during processing of a new block. You therefore need
		 * to ensure that also dependent output spents within an already connected block are correctly
		 * handled, e.g., by re-scanning the block in question whenever new outputs have been
		 * registered mid-processing.
		 */
		void register_output(WatchedOutput _output);
	}
	private class LDKFilterHolder { internal Filter held; }
	private class LDKFilterImpl : bindings.LDKFilter {
		internal LDKFilterImpl(FilterInterface arg, LDKFilterHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private FilterInterface arg;
		private LDKFilterHolder impl_holder;
		public void register_tx(byte[] _txid, byte[] _script_pubkey) {
			arg.register_tx(_txid, _script_pubkey);
				GC.KeepAlive(arg);
		}
		public void register_output(long _output) {
			org.ldk.structs.WatchedOutput _output_hu_conv = null; if (_output < 0 || _output > 4096) { _output_hu_conv = new org.ldk.structs.WatchedOutput(null, _output); }
			if (_output_hu_conv != null) { _output_hu_conv.ptrs_to.AddLast(this); };
			arg.register_output(_output_hu_conv);
				GC.KeepAlive(arg);
		}
	}
	public static Filter new_impl(FilterInterface arg) {
		LDKFilterHolder impl_holder = new LDKFilterHolder();
		impl_holder.held = new Filter(new LDKFilterImpl(arg, impl_holder));
		return impl_holder.held;
	}
	/**
	 * Registers interest in a transaction with `txid` and having an output with `script_pubkey` as
	 * a spending condition.
	 */
	public void register_tx(byte[] txid, byte[] script_pubkey) {
		bindings.Filter_register_tx(this.ptr, InternalUtils.check_arr_len(txid, 32), script_pubkey);
		GC.KeepAlive(this);
		GC.KeepAlive(txid);
		GC.KeepAlive(script_pubkey);
	}

	/**
	 * Registers interest in spends of a transaction output.
	 * 
	 * Note that this method might be called during processing of a new block. You therefore need
	 * to ensure that also dependent output spents within an already connected block are correctly
	 * handled, e.g., by re-scanning the block in question whenever new outputs have been
	 * registered mid-processing.
	 */
	public void register_output(org.ldk.structs.WatchedOutput output) {
		bindings.Filter_register_output(this.ptr, output == null ? 0 : output.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(output);
		if (this != null) { this.ptrs_to.AddLast(output); };
	}

}
} } }
