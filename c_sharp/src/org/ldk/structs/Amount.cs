using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * The minimum amount required for an item in an [`Offer`], denominated in either bitcoin or
 * another currency.
 */
public class Amount : CommonBase {
	internal Amount(object _dummy, long ptr) : base(ptr) { }
	~Amount() {
		if (ptr != 0) { bindings.Amount_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.Amount_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Amount
	 */
	public Amount clone() {
		long ret = bindings.Amount_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Amount ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Amount(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
