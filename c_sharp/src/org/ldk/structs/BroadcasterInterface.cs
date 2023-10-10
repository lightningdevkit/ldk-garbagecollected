using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An interface to send a transaction to the Bitcoin network.
 */
public class BroadcasterInterface : CommonBase {
	internal readonly bindings.LDKBroadcasterInterface bindings_instance;
	internal BroadcasterInterface(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private BroadcasterInterface(bindings.LDKBroadcasterInterface arg) : base(bindings.LDKBroadcasterInterface_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~BroadcasterInterface() {
		if (ptr != 0) { bindings.BroadcasterInterface_free(ptr); }
	}

	public interface BroadcasterInterfaceInterface {
		/**
		 * Sends a list of transactions out to (hopefully) be mined.
		 * This only needs to handle the actual broadcasting of transactions, LDK will automatically
		 * rebroadcast transactions that haven't made it into a block.
		 * 
		 * In some cases LDK may attempt to broadcast a transaction which double-spends another
		 * and this isn't a bug and can be safely ignored.
		 * 
		 * If more than one transaction is given, these transactions should be considered to be a
		 * package and broadcast together. Some of the transactions may or may not depend on each other,
		 * be sure to manage both cases correctly.
		 * 
		 * Bitcoin transaction packages are defined in BIP 331 and here:
		 * https://github.com/bitcoin/bitcoin/blob/master/doc/policy/packages.md
		 */
		void broadcast_transactions(byte[][] _txs);
	}
	private class LDKBroadcasterInterfaceHolder { internal BroadcasterInterface held; }
	private class LDKBroadcasterInterfaceImpl : bindings.LDKBroadcasterInterface {
		internal LDKBroadcasterInterfaceImpl(BroadcasterInterfaceInterface arg, LDKBroadcasterInterfaceHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private BroadcasterInterfaceInterface arg;
		private LDKBroadcasterInterfaceHolder impl_holder;
		public void broadcast_transactions(byte[][] _txs) {
			arg.broadcast_transactions(_txs);
				GC.KeepAlive(arg);
		}
	}
	public static BroadcasterInterface new_impl(BroadcasterInterfaceInterface arg) {
		LDKBroadcasterInterfaceHolder impl_holder = new LDKBroadcasterInterfaceHolder();
		impl_holder.held = new BroadcasterInterface(new LDKBroadcasterInterfaceImpl(arg, impl_holder));
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
	 * If more than one transaction is given, these transactions should be considered to be a
	 * package and broadcast together. Some of the transactions may or may not depend on each other,
	 * be sure to manage both cases correctly.
	 * 
	 * Bitcoin transaction packages are defined in BIP 331 and here:
	 * https://github.com/bitcoin/bitcoin/blob/master/doc/policy/packages.md
	 */
	public void broadcast_transactions(byte[][] txs) {
		bindings.BroadcasterInterface_broadcast_transactions(this.ptr, txs);
		GC.KeepAlive(this);
		GC.KeepAlive(txs);
	}

}
} } }
