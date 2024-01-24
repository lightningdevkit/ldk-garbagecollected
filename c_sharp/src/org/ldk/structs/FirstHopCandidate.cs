using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`CandidateRouteHop::FirstHop`] entry.
 */
public class FirstHopCandidate : CommonBase {
	internal FirstHopCandidate(object _dummy, long ptr) : base(ptr) { }
	~FirstHopCandidate() {
		if (ptr != 0) { bindings.FirstHopCandidate_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.FirstHopCandidate_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the FirstHopCandidate
	 */
	public FirstHopCandidate clone() {
		long ret = bindings.FirstHopCandidate_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FirstHopCandidate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.FirstHopCandidate(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
