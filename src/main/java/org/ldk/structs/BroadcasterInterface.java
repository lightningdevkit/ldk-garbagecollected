package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * An interface to send a transaction to the Bitcoin network.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class BroadcasterInterface extends CommonBase {
	final bindings.LDKBroadcasterInterface bindings_instance;
	BroadcasterInterface(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private BroadcasterInterface(bindings.LDKBroadcasterInterface arg) {
		super(bindings.LDKBroadcasterInterface_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.BroadcasterInterface_free(ptr); } super.finalize();
	}
	/**
	 * Destroys the object, freeing associated resources. After this call, any access
	 * to this object may result in a SEGFAULT or worse.
	 *
	 * You should generally NEVER call this method. You should let the garbage collector
	 * do this for you when it finalizes objects. However, it may be useful for types
	 * which represent locks and should be closed immediately to avoid holding locks
	 * until the GC runs.
	 */
	public void destroy() {
		if (ptr != 0) { bindings.BroadcasterInterface_free(ptr); }
		ptr = 0;
	}
	public static interface BroadcasterInterfaceInterface {
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
		void broadcast_transactions(byte[][] txs);
	}
	private static class LDKBroadcasterInterfaceHolder { BroadcasterInterface held; }
	public static BroadcasterInterface new_impl(BroadcasterInterfaceInterface arg) {
		final LDKBroadcasterInterfaceHolder impl_holder = new LDKBroadcasterInterfaceHolder();
		impl_holder.held = new BroadcasterInterface(new bindings.LDKBroadcasterInterface() {
			@Override public void broadcast_transactions(byte[][] txs) {
				arg.broadcast_transactions(txs);
				Reference.reachabilityFence(arg);
			}
		});
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
		bindings.BroadcasterInterface_broadcast_transactions(this.ptr, txs);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(txs);
	}

	long clone_ptr() {
		long ret = bindings.BroadcasterInterface_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of a BroadcasterInterface
	 */
	public BroadcasterInterface clone() {
		long ret = bindings.BroadcasterInterface_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		BroadcasterInterface ret_hu_conv = new BroadcasterInterface(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
