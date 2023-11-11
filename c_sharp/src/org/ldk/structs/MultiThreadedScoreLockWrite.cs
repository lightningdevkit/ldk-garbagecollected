using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A locked `MultiThreadedLockableScore`.
 */
public class MultiThreadedScoreLockWrite : CommonBase {
	internal MultiThreadedScoreLockWrite(object _dummy, long ptr) : base(ptr) { }
	~MultiThreadedScoreLockWrite() {
		if (ptr != 0) { bindings.MultiThreadedScoreLockWrite_free(ptr); }
	}

	/**
	 * Serialize the MultiThreadedScoreLockWrite object into a byte array which can be read by MultiThreadedScoreLockWrite_read
	 */
	public byte[] write() {
		long ret = bindings.MultiThreadedScoreLockWrite_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Constructs a new ScoreUpdate which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ScoreUpdate must be freed before this_arg is
	 */
	public ScoreUpdate as_ScoreUpdate() {
		long ret = bindings.MultiThreadedScoreLockWrite_as_ScoreUpdate(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ScoreUpdate ret_hu_conv = new ScoreUpdate(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
