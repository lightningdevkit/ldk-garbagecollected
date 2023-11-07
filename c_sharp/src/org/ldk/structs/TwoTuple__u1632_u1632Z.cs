using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple__u1632_u1632Z : CommonBase {
	internal TwoTuple__u1632_u1632Z(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple__u1632_u1632Z() {
		if (ptr != 0) { bindings.C2Tuple__u1632_u1632Z_free(ptr); }
	}

	/**
	 * 
	 */
	public short[] get_a() {
		long ret = bindings.C2Tuple__u1632_u1632Z_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		short[] ret_conv = InternalUtils.decodeUint16Array(ret);
		return ret_conv;
	}

	/**
	 * 
	 */
	public short[] get_b() {
		long ret = bindings.C2Tuple__u1632_u1632Z_get_b(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		short[] ret_conv = InternalUtils.decodeUint16Array(ret);
		return ret_conv;
	}

	/**
	 * Creates a new C2Tuple__u1632_u1632Z from the contained elements.
	 */
	public static TwoTuple__u1632_u1632Z of(short[] a, short[] b) {
		long ret = bindings.C2Tuple__u1632_u1632Z_new(InternalUtils.encodeUint16Array(InternalUtils.check_arr_len(a, 32)), InternalUtils.encodeUint16Array(InternalUtils.check_arr_len(b, 32)));
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple__u1632_u1632Z ret_hu_conv = new TwoTuple__u1632_u1632Z(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
