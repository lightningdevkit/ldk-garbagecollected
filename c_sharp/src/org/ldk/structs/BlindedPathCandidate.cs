using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`CandidateRouteHop::Blinded`] entry.
 */
public class BlindedPathCandidate : CommonBase {
	internal BlindedPathCandidate(object _dummy, long ptr) : base(ptr) { }
	~BlindedPathCandidate() {
		if (ptr != 0) { bindings.BlindedPathCandidate_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.BlindedPathCandidate_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the BlindedPathCandidate
	 */
	public BlindedPathCandidate clone() {
		long ret = bindings.BlindedPathCandidate_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedPathCandidate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedPathCandidate(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
