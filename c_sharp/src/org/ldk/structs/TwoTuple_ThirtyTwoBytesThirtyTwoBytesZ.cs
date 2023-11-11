using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ : CommonBase {
	internal TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ() {
		if (ptr != 0) { bindings.C2Tuple_ThirtyTwoBytesThirtyTwoBytesZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		long ret = bindings.C2Tuple_ThirtyTwoBytesThirtyTwoBytesZ_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * 
	 */
	public byte[] get_b() {
		long ret = bindings.C2Tuple_ThirtyTwoBytesThirtyTwoBytesZ_get_b(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.C2Tuple_ThirtyTwoBytesThirtyTwoBytesZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ clone() {
		long ret = bindings.C2Tuple_ThirtyTwoBytesThirtyTwoBytesZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ ret_hu_conv = new TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_ThirtyTwoBytesThirtyTwoBytesZ from the contained elements.
	 */
	public static TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ of(byte[] a, byte[] b) {
		long ret = bindings.C2Tuple_ThirtyTwoBytesThirtyTwoBytesZ_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(a, 32)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(b, 32)));
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ ret_hu_conv = new TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
