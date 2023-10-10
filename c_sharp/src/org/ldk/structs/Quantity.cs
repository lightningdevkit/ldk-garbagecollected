using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Quantity of items supported by an [`Offer`].
 */
public class Quantity : CommonBase {
	internal Quantity(object _dummy, long ptr) : base(ptr) { }
	~Quantity() {
		if (ptr != 0) { bindings.Quantity_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.Quantity_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Quantity
	 */
	public Quantity clone() {
		long ret = bindings.Quantity_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Quantity ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Quantity(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
