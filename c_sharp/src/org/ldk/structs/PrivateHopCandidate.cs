using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`CandidateRouteHop::PrivateHop`] entry.
 */
public class PrivateHopCandidate : CommonBase {
	internal PrivateHopCandidate(object _dummy, long ptr) : base(ptr) { }
	~PrivateHopCandidate() {
		if (ptr != 0) { bindings.PrivateHopCandidate_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.PrivateHopCandidate_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the PrivateHopCandidate
	 */
	public PrivateHopCandidate clone() {
		long ret = bindings.PrivateHopCandidate_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrivateHopCandidate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrivateHopCandidate(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
