package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Error for PeerManager errors. If you get one of these, you must disconnect the socket and
 * generate no further read_event/write_buffer_space_avail/socket_disconnected calls for the
 * descriptor.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PeerHandleError extends CommonBase {
	PeerHandleError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PeerHandleError_free(ptr); }
	}

	/**
	 * Used to indicate that we probably can't make any future connections to this peer, implying
	 * we should go ahead and force-close any channels we have with it.
	 */
	public boolean get_no_connection_possible() {
		boolean ret = bindings.PeerHandleError_get_no_connection_possible(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Used to indicate that we probably can't make any future connections to this peer, implying
	 * we should go ahead and force-close any channels we have with it.
	 */
	public void set_no_connection_possible(boolean val) {
		bindings.PeerHandleError_set_no_connection_possible(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new PeerHandleError given each field
	 */
	public static PeerHandleError of(boolean no_connection_possible_arg) {
		long ret = bindings.PeerHandleError_new(no_connection_possible_arg);
		Reference.reachabilityFence(no_connection_possible_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		PeerHandleError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new PeerHandleError(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.PeerHandleError_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the PeerHandleError
	 */
	public PeerHandleError clone() {
		long ret = bindings.PeerHandleError_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		PeerHandleError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new PeerHandleError(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
