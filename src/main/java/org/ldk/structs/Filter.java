package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

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
 * invocation that has called the `Filter` must return [`TemporaryFailure`].
 * 
 * [`TemporaryFailure`]: ChannelMonitorUpdateErr::TemporaryFailure
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
		 * Registers interest in spends of a transaction output.
		 * 
		 * Optionally, when `output.block_hash` is set, should return any transaction spending the
		 * output that is found in the corresponding block along with its index.
		 * 
		 * This return value is useful for Electrum clients in order to supply in-block descendant
		 * transactions which otherwise were not included. This is not necessary for other clients if
		 * such descendant transactions were already included (e.g., when a BIP 157 client provides the
		 * full block).
		 */
		Option_C2Tuple_usizeTransactionZZ register_output(WatchedOutput output);
	}
	private static class LDKFilterHolder { Filter held; }
	public static Filter new_impl(FilterInterface arg) {
		final LDKFilterHolder impl_holder = new LDKFilterHolder();
		impl_holder.held = new Filter(new bindings.LDKFilter() {
			@Override public void register_tx(byte[] txid, byte[] script_pubkey) {
				arg.register_tx(txid, script_pubkey);
				Reference.reachabilityFence(arg);
			}
			@Override public long register_output(long output) {
				WatchedOutput output_hu_conv = null; if (output < 0 || output > 4096) { output_hu_conv = new WatchedOutput(null, output); }
				output_hu_conv.ptrs_to.add(this);
				Option_C2Tuple_usizeTransactionZZ ret = arg.register_output(output_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Registers interest in a transaction with `txid` and having an output with `script_pubkey` as
	 * a spending condition.
	 */
	public void register_tx(byte[] txid, byte[] script_pubkey) {
		bindings.Filter_register_tx(this.ptr, InternalUtils.check_arr_len(txid, 32), script_pubkey);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(txid);
		Reference.reachabilityFence(script_pubkey);
	}

	/**
	 * Registers interest in spends of a transaction output.
	 * 
	 * Optionally, when `output.block_hash` is set, should return any transaction spending the
	 * output that is found in the corresponding block along with its index.
	 * 
	 * This return value is useful for Electrum clients in order to supply in-block descendant
	 * transactions which otherwise were not included. This is not necessary for other clients if
	 * such descendant transactions were already included (e.g., when a BIP 157 client provides the
	 * full block).
	 */
	public Option_C2Tuple_usizeTransactionZZ register_output(WatchedOutput output) {
		long ret = bindings.Filter_register_output(this.ptr, output == null ? 0 : output.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(output);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_C2Tuple_usizeTransactionZZ ret_hu_conv = Option_C2Tuple_usizeTransactionZZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
