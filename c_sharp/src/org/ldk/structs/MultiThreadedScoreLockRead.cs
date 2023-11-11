using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A locked `MultiThreadedLockableScore`.
 */
public class MultiThreadedScoreLockRead : CommonBase {
	internal MultiThreadedScoreLockRead(object _dummy, long ptr) : base(ptr) { }
	~MultiThreadedScoreLockRead() {
		if (ptr != 0) { bindings.MultiThreadedScoreLockRead_free(ptr); }
	}

	/**
	 * Constructs a new ScoreLookUp which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ScoreLookUp must be freed before this_arg is
	 */
	public ScoreLookUp as_ScoreLookUp() {
		long ret = bindings.MultiThreadedScoreLockRead_as_ScoreLookUp(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ScoreLookUp ret_hu_conv = new ScoreLookUp(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
