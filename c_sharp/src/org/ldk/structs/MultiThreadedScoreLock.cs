using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A locked `MultiThreadedLockableScore`.
 */
public class MultiThreadedScoreLock : CommonBase {
	internal MultiThreadedScoreLock(object _dummy, long ptr) : base(ptr) { }
	~MultiThreadedScoreLock() {
		if (ptr != 0) { bindings.MultiThreadedScoreLock_free(ptr); }
	}

	/**
	 * Constructs a new Score which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Score must be freed before this_arg is
	 */
	public Score as_Score() {
		long ret = bindings.MultiThreadedScoreLock_as_Score(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Score ret_hu_conv = new Score(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the MultiThreadedScoreLock object into a byte array which can be read by MultiThreadedScoreLock_read
	 */
	public byte[] write() {
		byte[] ret = bindings.MultiThreadedScoreLock_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
