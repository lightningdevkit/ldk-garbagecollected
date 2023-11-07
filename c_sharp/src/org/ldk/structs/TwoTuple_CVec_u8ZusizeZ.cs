using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple_CVec_u8ZusizeZ : CommonBase {
	internal TwoTuple_CVec_u8ZusizeZ(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple_CVec_u8ZusizeZ() {
		if (ptr != 0) { bindings.C2Tuple_CVec_u8ZusizeZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		long ret = bindings.C2Tuple_CVec_u8ZusizeZ_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * 
	 */
	public long get_b() {
		long ret = bindings.C2Tuple_CVec_u8ZusizeZ_get_b(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.C2Tuple_CVec_u8ZusizeZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_CVec_u8ZusizeZ clone() {
		long ret = bindings.C2Tuple_CVec_u8ZusizeZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_CVec_u8ZusizeZ ret_hu_conv = new TwoTuple_CVec_u8ZusizeZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_CVec_u8ZusizeZ from the contained elements.
	 */
	public static TwoTuple_CVec_u8ZusizeZ of(byte[] a, long b) {
		long ret = bindings.C2Tuple_CVec_u8ZusizeZ_new(InternalUtils.encodeUint8Array(a), b);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_CVec_u8ZusizeZ ret_hu_conv = new TwoTuple_CVec_u8ZusizeZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
