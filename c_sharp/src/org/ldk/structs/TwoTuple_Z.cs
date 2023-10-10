using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple_Z : CommonBase {
	internal TwoTuple_Z(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple_Z() {
		if (ptr != 0) { bindings.C2Tuple_Z_free(ptr); }
	}

	/**
	 * 
	 */
	public short[] get_a() {
		short[] ret = bindings.C2Tuple_Z_get_a(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * 
	 */
	public short[] get_b() {
		short[] ret = bindings.C2Tuple_Z_get_b(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.C2Tuple_Z_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_Z clone() {
		long ret = bindings.C2Tuple_Z_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_Z ret_hu_conv = new TwoTuple_Z(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_Z from the contained elements.
	 */
	public static TwoTuple_Z of(short[] a, short[] b) {
		long ret = bindings.C2Tuple_Z_new(InternalUtils.check_arr_len(a, 8), InternalUtils.check_arr_len(b, 8));
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_Z ret_hu_conv = new TwoTuple_Z(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
