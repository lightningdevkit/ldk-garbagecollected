using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

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
public class Listen : CommonBase {
	internal readonly bindings.LDKListen bindings_instance;
	internal Listen(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private Listen(bindings.LDKListen arg) : base(bindings.LDKListen_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~Listen() {
		if (ptr != 0) { bindings.Listen_free(ptr); }
	}

	public interface ListenInterface {
		/**
		 * Notifies the listener that a block was added at the given height, with the transaction data
		 * possibly filtered.
		 */
		void filtered_block_connected(byte[] _header, TwoTuple_usizeTransactionZ[] _txdata, int _height);
		/**
		 * Notifies the listener that a block was added at the given height.
		 */
		void block_connected(byte[] _block, int _height);
		/**
		 * Notifies the listener that a block was removed at the given height.
		 */
		void block_disconnected(byte[] _header, int _height);
	}
	private class LDKListenHolder { internal Listen held; }
	private class LDKListenImpl : bindings.LDKListen {
		internal LDKListenImpl(ListenInterface arg, LDKListenHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private ListenInterface arg;
		private LDKListenHolder impl_holder;
		public void filtered_block_connected(byte[] _header, long[] _txdata, int _height) {
			int _txdata_conv_28_len = _txdata.Length;
			TwoTuple_usizeTransactionZ[] _txdata_conv_28_arr = new TwoTuple_usizeTransactionZ[_txdata_conv_28_len];
			for (int c = 0; c < _txdata_conv_28_len; c++) {
				long _txdata_conv_28 = _txdata[c];
				TwoTuple_usizeTransactionZ _txdata_conv_28_hu_conv = new TwoTuple_usizeTransactionZ(null, _txdata_conv_28);
				if (_txdata_conv_28_hu_conv != null) { _txdata_conv_28_hu_conv.ptrs_to.AddLast(this); };
				_txdata_conv_28_arr[c] = _txdata_conv_28_hu_conv;
			}
			arg.filtered_block_connected(_header, _txdata_conv_28_arr, _height);
				GC.KeepAlive(arg);
		}
		public void block_connected(byte[] _block, int _height) {
			arg.block_connected(_block, _height);
				GC.KeepAlive(arg);
		}
		public void block_disconnected(byte[] _header, int _height) {
			arg.block_disconnected(_header, _height);
				GC.KeepAlive(arg);
		}
	}
	public static Listen new_impl(ListenInterface arg) {
		LDKListenHolder impl_holder = new LDKListenHolder();
		impl_holder.held = new Listen(new LDKListenImpl(arg, impl_holder));
		return impl_holder.held;
	}
	/**
	 * Notifies the listener that a block was added at the given height, with the transaction data
	 * possibly filtered.
	 */
	public void filtered_block_connected(byte[] header, TwoTuple_usizeTransactionZ[] txdata, int height) {
		bindings.Listen_filtered_block_connected(this.ptr, InternalUtils.check_arr_len(header, 80), txdata != null ? InternalUtils.mapArray(txdata, txdata_conv_28 => txdata_conv_28 != null ? txdata_conv_28.ptr : 0) : null, height);
		GC.KeepAlive(this);
		GC.KeepAlive(header);
		GC.KeepAlive(txdata);
		GC.KeepAlive(height);
	}

	/**
	 * Notifies the listener that a block was added at the given height.
	 */
	public void block_connected(byte[] block, int height) {
		bindings.Listen_block_connected(this.ptr, block, height);
		GC.KeepAlive(this);
		GC.KeepAlive(block);
		GC.KeepAlive(height);
	}

	/**
	 * Notifies the listener that a block was removed at the given height.
	 */
	public void block_disconnected(byte[] header, int height) {
		bindings.Listen_block_disconnected(this.ptr, InternalUtils.check_arr_len(header, 80), height);
		GC.KeepAlive(this);
		GC.KeepAlive(header);
		GC.KeepAlive(height);
	}

}
} } }
