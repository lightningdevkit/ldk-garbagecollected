
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

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

	public static interface BroadcasterInterfaceInterface {
		void broadcast_transaction(byte[] tx);
	}
	private static class LDKBroadcasterInterfaceHolder { BroadcasterInterface held; }
	public static BroadcasterInterface new_impl(BroadcasterInterfaceInterface arg) {
		final LDKBroadcasterInterfaceHolder impl_holder = new LDKBroadcasterInterfaceHolder();
		impl_holder.held = new BroadcasterInterface(new bindings.LDKBroadcasterInterface() {
			@Override public void broadcast_transaction(byte[] tx) {
				arg.broadcast_transaction(tx);
			}
		});
		return impl_holder.held;
	}
	public void broadcast_transaction(byte[] tx) {
		bindings.BroadcasterInterface_broadcast_transaction(this.ptr, tx);
	}

}
