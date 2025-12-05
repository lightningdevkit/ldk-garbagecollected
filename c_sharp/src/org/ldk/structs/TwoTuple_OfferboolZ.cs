using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple_OfferboolZ : CommonBase {
	internal TwoTuple_OfferboolZ(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple_OfferboolZ() {
		if (ptr != 0) { bindings.C2Tuple_OfferboolZ_free(ptr); }
	}

	/**
	 * 
	 */
	public org.ldk.structs.Offer get_a() {
		long ret = bindings.C2Tuple_OfferboolZ_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Offer ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Offer(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public bool get_b() {
		bool ret = bindings.C2Tuple_OfferboolZ_get_b(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.C2Tuple_OfferboolZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.TwoTuple_OfferboolZ clone() {
		long ret = bindings.C2Tuple_OfferboolZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_OfferboolZ ret_hu_conv = new TwoTuple_OfferboolZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_OfferboolZ from the contained elements.
	 */
	public static org.ldk.structs.TwoTuple_OfferboolZ of(org.ldk.structs.Offer a, bool b) {
		long ret = bindings.C2Tuple_OfferboolZ_new(a.ptr, b);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_OfferboolZ ret_hu_conv = new TwoTuple_OfferboolZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
