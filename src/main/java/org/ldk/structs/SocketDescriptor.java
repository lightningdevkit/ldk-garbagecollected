package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class SocketDescriptor extends CommonBase {
	final bindings.LDKSocketDescriptor bindings_instance;
	SocketDescriptor(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private SocketDescriptor(bindings.LDKSocketDescriptor arg) {
		super(bindings.LDKSocketDescriptor_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.SocketDescriptor_free(ptr); } super.finalize();
	}

	public static interface SocketDescriptorInterface {
		long send_data(byte[] data, boolean resume_read);
		void disconnect_socket();
		boolean eq(long other_arg);
		long hash();
	}
	private static class LDKSocketDescriptorHolder { SocketDescriptor held; }
	public static SocketDescriptor new_impl(SocketDescriptorInterface arg) {
		final LDKSocketDescriptorHolder impl_holder = new LDKSocketDescriptorHolder();
		impl_holder.held = new SocketDescriptor(new bindings.LDKSocketDescriptor() {
			@Override public long send_data(byte[] data, boolean resume_read) {
				long ret = arg.send_data(data, resume_read);
				return ret;
			}
			@Override public void disconnect_socket() {
				arg.disconnect_socket();
			}
			@Override public boolean eq(long other_arg) {
				boolean ret = arg.eq(other_arg);
				return ret;
			}
			@Override public long hash() {
				long ret = arg.hash();
				return ret;
			}
		});
		return impl_holder.held;
	}
	public long send_data(byte[] data, boolean resume_read) {
		long ret = bindings.SocketDescriptor_send_data(this.ptr, data, resume_read);
		return ret;
	}

	public void disconnect_socket() {
		bindings.SocketDescriptor_disconnect_socket(this.ptr);
	}

	public long hash() {
		long ret = bindings.SocketDescriptor_hash(this.ptr);
		return ret;
	}

}
