package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PeerHandleError extends CommonBase {
	PeerHandleError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PeerHandleError_free(ptr); }
	}

	public boolean get_no_connection_possible() {
		boolean ret = bindings.PeerHandleError_get_no_connection_possible(this.ptr);
		return ret;
	}

	public void set_no_connection_possible(boolean val) {
		bindings.PeerHandleError_set_no_connection_possible(this.ptr, val);
	}

	public static PeerHandleError constructor_new(boolean no_connection_possible_arg) {
		long ret = bindings.PeerHandleError_new(no_connection_possible_arg);
		PeerHandleError ret_hu_conv = new PeerHandleError(null, ret);
		return ret_hu_conv;
	}

}
