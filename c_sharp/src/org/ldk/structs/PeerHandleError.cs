using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Error for PeerManager errors. If you get one of these, you must disconnect the socket and
 * generate no further read_event/write_buffer_space_avail/socket_disconnected calls for the
 * descriptor.
 */
public class PeerHandleError : CommonBase {
	internal PeerHandleError(object _dummy, long ptr) : base(ptr) { }
	~PeerHandleError() {
		if (ptr != 0) { bindings.PeerHandleError_free(ptr); }
	}

	/**
	 * Constructs a new PeerHandleError given each field
	 */
	public static PeerHandleError of() {
		long ret = bindings.PeerHandleError_new();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeerHandleError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PeerHandleError(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.PeerHandleError_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the PeerHandleError
	 */
	public PeerHandleError clone() {
		long ret = bindings.PeerHandleError_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeerHandleError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PeerHandleError(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
