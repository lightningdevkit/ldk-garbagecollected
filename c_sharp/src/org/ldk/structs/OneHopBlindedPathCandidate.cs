using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`CandidateRouteHop::OneHopBlinded`] entry.
 */
public class OneHopBlindedPathCandidate : CommonBase {
	internal OneHopBlindedPathCandidate(object _dummy, long ptr) : base(ptr) { }
	~OneHopBlindedPathCandidate() {
		if (ptr != 0) { bindings.OneHopBlindedPathCandidate_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.OneHopBlindedPathCandidate_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the OneHopBlindedPathCandidate
	 */
	public OneHopBlindedPathCandidate clone() {
		long ret = bindings.OneHopBlindedPathCandidate_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OneHopBlindedPathCandidate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OneHopBlindedPathCandidate(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
