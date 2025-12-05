
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of Listen */
public interface ListenInterface {
	/**Notifies the listener that a block was added at the given height, with the transaction data
	 * possibly filtered.
	 */
	void filtered_block_connected(byte[] header, TwoTuple_usizeTransactionZ[] txdata, int height);
	/**Notifies the listener that a block was added at the given height.
	 */
	void block_connected(byte[] block, int height);
	/**Notifies the listener that one or more blocks were removed in anticipation of a reorg.
	 * 
	 * The provided [`BestBlock`] is the new best block after disconnecting blocks in the reorg
	 * but before connecting new ones (i.e. the \"fork point\" block). For backwards compatibility,
	 * you may instead walk the chain backwards, calling `blocks_disconnected` for each block
	 * that is disconnected in a reorg.
	 */
	void blocks_disconnected(org.ldk.structs.BestBlock fork_point_block);
}

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
 * 
 * # Requirements
 * 
 * Each block must be connected in chain order with one call to either
 * [`Listen::block_connected`] or [`Listen::filtered_block_connected`]. If a call to the
 * [`Filter`] interface was made during block processing and further transaction(s) from the same
 * block now match the filter, a second call to [`Listen::filtered_block_connected`] should be
 * made immediately for the same block (prior to any other calls to the [`Listen`] interface).
 * 
 * In case of a reorg, you must call [`Listen::blocks_disconnected`] once with information on the
 * \"fork point\" block, i.e. the highest block that is in both forks. You may call
 * [`Listen::blocks_disconnected`] multiple times as you walk the chain backwards, but each must
 * include a fork point block that is before the last.
 * 
 * # Object Birthday
 * 
 * Note that most implementations take a [`BestBlock`] on construction and blocks only need to be
 * applied starting from that point.
 */
public class Listen : CommonBase {
	internal bindings.LDKListen bindings_instance;
	internal long instance_idx;

	internal Listen(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~Listen() {
		if (ptr != 0) { bindings.Listen_free(ptr); }
	}

	private class LDKListenHolder { internal Listen held; }
	private class LDKListenImpl : bindings.LDKListen {
		internal LDKListenImpl(ListenInterface arg, LDKListenHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private ListenInterface arg;
		private LDKListenHolder impl_holder;
		public void filtered_block_connected(long _header, long _txdata, int _height) {
			byte[] _header_conv = InternalUtils.decodeUint8Array(_header);
			int _txdata_conv_28_len = InternalUtils.getArrayLength(_txdata);
			TwoTuple_usizeTransactionZ[] _txdata_conv_28_arr = new TwoTuple_usizeTransactionZ[_txdata_conv_28_len];
			for (int c = 0; c < _txdata_conv_28_len; c++) {
				long _txdata_conv_28 = InternalUtils.getU64ArrayElem(_txdata, c);
				TwoTuple_usizeTransactionZ _txdata_conv_28_hu_conv = new TwoTuple_usizeTransactionZ(null, _txdata_conv_28);
				if (_txdata_conv_28_hu_conv != null) { _txdata_conv_28_hu_conv.ptrs_to.AddLast(this); };
				_txdata_conv_28_arr[c] = _txdata_conv_28_hu_conv;
			}
			bindings.free_buffer(_txdata);
			arg.filtered_block_connected(_header_conv, _txdata_conv_28_arr, _height);
				GC.KeepAlive(arg);
		}
		public void block_connected(long _block, int _height) {
			byte[] _block_conv = InternalUtils.decodeUint8Array(_block);
			arg.block_connected(_block_conv, _height);
				GC.KeepAlive(arg);
		}
		public void blocks_disconnected(long _fork_point_block) {
			org.ldk.structs.BestBlock _fork_point_block_hu_conv = null; if (_fork_point_block < 0 || _fork_point_block > 4096) { _fork_point_block_hu_conv = new org.ldk.structs.BestBlock(null, _fork_point_block); }
			if (_fork_point_block_hu_conv != null) { _fork_point_block_hu_conv.ptrs_to.AddLast(this); };
			arg.blocks_disconnected(_fork_point_block_hu_conv);
				GC.KeepAlive(arg);
		}
	}

	/** Creates a new instance of Listen from a given implementation */
	public static Listen new_impl(ListenInterface arg) {
		LDKListenHolder impl_holder = new LDKListenHolder();
		LDKListenImpl impl = new LDKListenImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKListen_new(impl);

		impl_holder.held = new Listen(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		return impl_holder.held;
	}

	/**
	 * Notifies the listener that a block was added at the given height, with the transaction data
	 * possibly filtered.
	 */
	public void filtered_block_connected(byte[] header, TwoTuple_usizeTransactionZ[] txdata, int height) {
		bindings.Listen_filtered_block_connected(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(header, 80)), InternalUtils.encodeUint64Array(InternalUtils.mapArray(txdata, txdata_conv_28 => txdata_conv_28.ptr)), height);
		GC.KeepAlive(this);
		GC.KeepAlive(header);
		GC.KeepAlive(txdata);
		GC.KeepAlive(height);
	}

	/**
	 * Notifies the listener that a block was added at the given height.
	 */
	public void block_connected(byte[] block, int height) {
		bindings.Listen_block_connected(this.ptr, InternalUtils.encodeUint8Array(block), height);
		GC.KeepAlive(this);
		GC.KeepAlive(block);
		GC.KeepAlive(height);
	}

	/**
	 * Notifies the listener that one or more blocks were removed in anticipation of a reorg.
	 * 
	 * The provided [`BestBlock`] is the new best block after disconnecting blocks in the reorg
	 * but before connecting new ones (i.e. the \"fork point\" block). For backwards compatibility,
	 * you may instead walk the chain backwards, calling `blocks_disconnected` for each block
	 * that is disconnected in a reorg.
	 */
	public void blocks_disconnected(org.ldk.structs.BestBlock fork_point_block) {
		bindings.Listen_blocks_disconnected(this.ptr, fork_point_block.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(fork_point_block);
	}

}
} } }
