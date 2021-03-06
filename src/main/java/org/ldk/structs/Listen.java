package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

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
		void block_connected(byte[] block, int height);
		void block_disconnected(byte[] header, int height);
	}
	private static class LDKListenHolder { Listen held; }
	public static Listen new_impl(ListenInterface arg) {
		final LDKListenHolder impl_holder = new LDKListenHolder();
		impl_holder.held = new Listen(new bindings.LDKListen() {
			@Override public void block_connected(byte[] block, int height) {
				arg.block_connected(block, height);
			}
			@Override public void block_disconnected(byte[] header, int height) {
				arg.block_disconnected(header, height);
			}
		});
		return impl_holder.held;
	}
	public void block_connected(byte[] block, int height) {
		bindings.Listen_block_connected(this.ptr, block, height);
	}

	public void block_disconnected(byte[] header, int height) {
		bindings.Listen_block_disconnected(this.ptr, header, height);
	}

}
