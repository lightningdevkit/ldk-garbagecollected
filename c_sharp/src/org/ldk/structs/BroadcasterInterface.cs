
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of BroadcasterInterface */
public interface BroadcasterInterfaceInterface {
	/**Sends a list of transactions out to (hopefully) be mined.
	 * This only needs to handle the actual broadcasting of transactions, LDK will automatically
	 * rebroadcast transactions that haven't made it into a block.
	 * 
	 * In some cases LDK may attempt to broadcast a transaction which double-spends another
	 * and this isn't a bug and can be safely ignored.
	 * 
	 * If more than one transaction is given, these transactions MUST be a
	 * single child and its parents and be broadcast together as a package
	 * (see the [`submitpackage`](https://bitcoincore.org/en/doc/30.0.0/rpc/rawtransactions/submitpackage)
	 * Bitcoin Core RPC).
	 * 
	 * Implementations MUST NOT assume any topological order on the transactions.
	 * 
	 * Bitcoin transaction packages are defined in BIP 331 and here:
	 * <https://github.com/bitcoin/bitcoin/blob/master/doc/policy/packages.md>
	 */
	void broadcast_transactions(byte[][] txs);
}

/**
 * An interface to send a transaction to the Bitcoin network.
 */
public class BroadcasterInterface : CommonBase {
	internal bindings.LDKBroadcasterInterface bindings_instance;
	internal long instance_idx;

	internal BroadcasterInterface(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~BroadcasterInterface() {
		if (ptr != 0) { bindings.BroadcasterInterface_free(ptr); }
	}

	private class LDKBroadcasterInterfaceHolder { internal BroadcasterInterface held; }
	private class LDKBroadcasterInterfaceImpl : bindings.LDKBroadcasterInterface {
		internal LDKBroadcasterInterfaceImpl(BroadcasterInterfaceInterface arg, LDKBroadcasterInterfaceHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private BroadcasterInterfaceInterface arg;
		private LDKBroadcasterInterfaceHolder impl_holder;
		public void broadcast_transactions(long _txs) {
			int _txs_conv_8_len = InternalUtils.getArrayLength(_txs);
			byte[][] _txs_conv_8_arr = new byte[_txs_conv_8_len][];
			for (int i = 0; i < _txs_conv_8_len; i++) {
				long _txs_conv_8 = InternalUtils.getU64ArrayElem(_txs, i);
				byte[] _txs_conv_8_conv = InternalUtils.decodeUint8Array(_txs_conv_8);
				_txs_conv_8_arr[i] = _txs_conv_8_conv;
			}
			bindings.free_buffer(_txs);
			arg.broadcast_transactions(_txs_conv_8_arr);
				GC.KeepAlive(arg);
		}
	}

	/** Creates a new instance of BroadcasterInterface from a given implementation */
	public static BroadcasterInterface new_impl(BroadcasterInterfaceInterface arg) {
		LDKBroadcasterInterfaceHolder impl_holder = new LDKBroadcasterInterfaceHolder();
		LDKBroadcasterInterfaceImpl impl = new LDKBroadcasterInterfaceImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKBroadcasterInterface_new(impl);

		impl_holder.held = new BroadcasterInterface(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		return impl_holder.held;
	}

	/**
	 * Sends a list of transactions out to (hopefully) be mined.
	 * This only needs to handle the actual broadcasting of transactions, LDK will automatically
	 * rebroadcast transactions that haven't made it into a block.
	 * 
	 * In some cases LDK may attempt to broadcast a transaction which double-spends another
	 * and this isn't a bug and can be safely ignored.
	 * 
	 * If more than one transaction is given, these transactions MUST be a
	 * single child and its parents and be broadcast together as a package
	 * (see the [`submitpackage`](https://bitcoincore.org/en/doc/30.0.0/rpc/rawtransactions/submitpackage)
	 * Bitcoin Core RPC).
	 * 
	 * Implementations MUST NOT assume any topological order on the transactions.
	 * 
	 * Bitcoin transaction packages are defined in BIP 331 and here:
	 * <https://github.com/bitcoin/bitcoin/blob/master/doc/policy/packages.md>
	 */
	public void broadcast_transactions(byte[][] txs) {
		bindings.BroadcasterInterface_broadcast_transactions(this.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(txs, txs_conv_8 => InternalUtils.encodeUint8Array(txs_conv_8))));
		GC.KeepAlive(this);
		GC.KeepAlive(txs);
	}

	internal long clone_ptr() {
		long ret = bindings.BroadcasterInterface_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of a BroadcasterInterface
	 */
	public org.ldk.structs.BroadcasterInterface clone() {
		long ret = bindings.BroadcasterInterface_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		BroadcasterInterface ret_hu_conv = new BroadcasterInterface(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
