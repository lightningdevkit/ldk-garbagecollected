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
		 * Sends a transaction out to (hopefully) be mined.
		 */
		void broadcast_transaction(byte[] _tx);
	}
	private class LDKBroadcasterInterfaceHolder { internal BroadcasterInterface held; }
	private class LDKBroadcasterInterfaceImpl : bindings.LDKBroadcasterInterface {
		internal LDKBroadcasterInterfaceImpl(BroadcasterInterfaceInterface arg, LDKBroadcasterInterfaceHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private BroadcasterInterfaceInterface arg;
		private LDKBroadcasterInterfaceHolder impl_holder;
		public void broadcast_transaction(byte[] _tx) {
			arg.broadcast_transaction(_tx);
				GC.KeepAlive(arg);
		}
	}
	public static BroadcasterInterface new_impl(BroadcasterInterfaceInterface arg) {
		LDKBroadcasterInterfaceHolder impl_holder = new LDKBroadcasterInterfaceHolder();
		impl_holder.held = new BroadcasterInterface(new LDKBroadcasterInterfaceImpl(arg, impl_holder));
		return impl_holder.held;
	}
	/**
	 * Sends a transaction out to (hopefully) be mined.
	 */
	public void broadcast_transaction(byte[] tx) {
		bindings.BroadcasterInterface_broadcast_transaction(this.ptr, tx);
		GC.KeepAlive(this);
		GC.KeepAlive(tx);
	}

}
} } }
