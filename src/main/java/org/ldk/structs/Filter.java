package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

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
 * processed later. Then, in order to block until the data has been processed, any `Watch`
 * invocation that has called the `Filter` must return [`TemporaryFailure`].
 * 
 * [`Watch`]: trait.Watch.html
 * [`TemporaryFailure`]: channelmonitor/enum.ChannelMonitorUpdateErr.html#variant.TemporaryFailure
 * [BIP 157]: https://github.com/bitcoin/bips/blob/master/bip-0157.mediawiki
 * [BIP 158]: https://github.com/bitcoin/bips/blob/master/bip-0158.mediawiki
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Filter extends CommonBase {
	final bindings.LDKFilter bindings_instance;
	Filter(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private Filter(bindings.LDKFilter arg) {
		super(bindings.LDKFilter_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.Filter_free(ptr); } super.finalize();
	}

	public static interface FilterInterface {
		/**
		 * Registers interest in a transaction with `txid` and having an output with `script_pubkey` as
		 * a spending condition.
		 */
		void register_tx(byte[] txid, byte[] script_pubkey);
		/**
		 * Registers interest in spends of a transaction output identified by `outpoint` having
		 * `script_pubkey` as the spending condition.
		 */
		void register_output(OutPoint outpoint, byte[] script_pubkey);
	}
	private static class LDKFilterHolder { Filter held; }
	public static Filter new_impl(FilterInterface arg) {
		final LDKFilterHolder impl_holder = new LDKFilterHolder();
		impl_holder.held = new Filter(new bindings.LDKFilter() {
			@Override public void register_tx(byte[] txid, byte[] script_pubkey) {
				arg.register_tx(txid, script_pubkey);
			}
			@Override public void register_output(long outpoint, byte[] script_pubkey) {
				OutPoint outpoint_hu_conv = new OutPoint(null, outpoint);
				arg.register_output(outpoint_hu_conv, script_pubkey);
			}
		});
		return impl_holder.held;
	}
	/**
	 * Registers interest in a transaction with `txid` and having an output with `script_pubkey` as
	 * a spending condition.
	 */
	public void register_tx(byte[] txid, byte[] script_pubkey) {
		bindings.Filter_register_tx(this.ptr, txid, script_pubkey);
	}

	/**
	 * Registers interest in spends of a transaction output identified by `outpoint` having
	 * `script_pubkey` as the spending condition.
	 */
	public void register_output(OutPoint outpoint, byte[] script_pubkey) {
		bindings.Filter_register_output(this.ptr, outpoint == null ? 0 : outpoint.ptr & ~1, script_pubkey);
		this.ptrs_to.add(outpoint);
	}

}
