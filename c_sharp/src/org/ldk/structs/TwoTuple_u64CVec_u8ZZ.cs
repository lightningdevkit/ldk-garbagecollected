using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple_u64CVec_u8ZZ : CommonBase {
	internal TwoTuple_u64CVec_u8ZZ(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple_u64CVec_u8ZZ() {
		if (ptr != 0) { bindings.C2Tuple_u64CVec_u8ZZ_free(ptr); }
	}

	/**
	 * 
	 */
	public long get_a() {
		long ret = bindings.C2Tuple_u64CVec_u8ZZ_get_a(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * 
	 */
	public byte[] get_b() {
		long ret = bindings.C2Tuple_u64CVec_u8ZZ_get_b(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.C2Tuple_u64CVec_u8ZZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_u64CVec_u8ZZ clone() {
		long ret = bindings.C2Tuple_u64CVec_u8ZZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_u64CVec_u8ZZ ret_hu_conv = new TwoTuple_u64CVec_u8ZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_u64CVec_u8ZZ from the contained elements.
	 */
	public static TwoTuple_u64CVec_u8ZZ of(long a, byte[] b) {
		long ret = bindings.C2Tuple_u64CVec_u8ZZ_new(a, InternalUtils.encodeUint8Array(b));
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_u64CVec_u8ZZ ret_hu_conv = new TwoTuple_u64CVec_u8ZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
