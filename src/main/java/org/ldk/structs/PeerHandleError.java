package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class PeerHandleError extends CommonBase {
	PeerHandleError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.PeerHandleError_free(ptr); super.finalize();
	}

	public boolean get_no_connection_possible(PeerHandleError this_ptr) {
		boolean ret = bindings.PeerHandleError_get_no_connection_possible(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_no_connection_possible(PeerHandleError this_ptr, boolean val) {
		bindings.PeerHandleError_set_no_connection_possible(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public PeerHandleError(boolean no_connection_possible_arg) {
		super(bindings.PeerHandleError_new(no_connection_possible_arg));
	}

}
