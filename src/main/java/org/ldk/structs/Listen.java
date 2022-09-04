package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * The `Listen` trait is used to notify when blocks have been connected or disconnected from the
 * chain.
 * 
 * Useful when needing to replay chain data upon startup or as new chain events occur. Clients
 * sourcing chain data using a block-oriented API should prefer this interface over [`Confirm`].
 * Such clients fetch the entire header chain whereas clients using [`Confirm`] only fetch headers
 * when needed.
 * 
 * By using [`Listen::filtered_block_connected`] this interface supports clients fetching the
 * entire header chain and only blocks with matching transaction data using BIP 157 filters or
 * other similar filtering.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Listen extends CommonBase {
	final bindings.LDKListen bindings_instance;
	Listen(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private Listen(bindings.LDKListen arg) {
		super(bindings.LDKListen_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.Listen_free(ptr); } super.finalize();
	}

	public static interface ListenInterface {
		/**
		 * Notifies the listener that a block was added at the given height, with the transaction data
		 * possibly filtered.
		 */
		void filtered_block_connected(byte[] header, TwoTuple_usizeTransactionZ[] txdata, int height);
		/**
		 * Notifies the listener that a block was added at the given height.
		 */
		void block_connected(byte[] block, int height);
		/**
		 * Notifies the listener that a block was removed at the given height.
		 */
		void block_disconnected(byte[] header, int height);
	}
	private static class LDKListenHolder { Listen held; }
	public static Listen new_impl(ListenInterface arg) {
		final LDKListenHolder impl_holder = new LDKListenHolder();
		impl_holder.held = new Listen(new bindings.LDKListen() {
			@Override public void filtered_block_connected(byte[] header, long[] txdata, int height) {
				int txdata_conv_28_len = txdata.length;
				TwoTuple_usizeTransactionZ[] txdata_conv_28_arr = new TwoTuple_usizeTransactionZ[txdata_conv_28_len];
				for (int c = 0; c < txdata_conv_28_len; c++) {
					long txdata_conv_28 = txdata[c];
					TwoTuple_usizeTransactionZ txdata_conv_28_hu_conv = new TwoTuple_usizeTransactionZ(null, txdata_conv_28);
					if (txdata_conv_28_hu_conv != null) { txdata_conv_28_hu_conv.ptrs_to.add(this); };
					txdata_conv_28_arr[c] = txdata_conv_28_hu_conv;
				}
				arg.filtered_block_connected(header, txdata_conv_28_arr, height);
				Reference.reachabilityFence(arg);
			}
			@Override public void block_connected(byte[] block, int height) {
				arg.block_connected(block, height);
				Reference.reachabilityFence(arg);
			}
			@Override public void block_disconnected(byte[] header, int height) {
				arg.block_disconnected(header, height);
				Reference.reachabilityFence(arg);
			}
		});
		return impl_holder.held;
	}
	/**
	 * Notifies the listener that a block was added at the given height, with the transaction data
	 * possibly filtered.
	 */
	public void filtered_block_connected(byte[] header, TwoTuple_usizeTransactionZ[] txdata, int height) {
		bindings.Listen_filtered_block_connected(this.ptr, InternalUtils.check_arr_len(header, 80), txdata != null ? Arrays.stream(txdata).mapToLong(txdata_conv_28 -> txdata_conv_28 != null ? txdata_conv_28.ptr : 0).toArray() : null, height);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(header);
		Reference.reachabilityFence(txdata);
		Reference.reachabilityFence(height);
	}

	/**
	 * Notifies the listener that a block was added at the given height.
	 */
	public void block_connected(byte[] block, int height) {
		bindings.Listen_block_connected(this.ptr, block, height);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(block);
		Reference.reachabilityFence(height);
	}

	/**
	 * Notifies the listener that a block was removed at the given height.
	 */
	public void block_disconnected(byte[] header, int height) {
		bindings.Listen_block_disconnected(this.ptr, InternalUtils.check_arr_len(header, 80), height);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(header);
		Reference.reachabilityFence(height);
	}

}
