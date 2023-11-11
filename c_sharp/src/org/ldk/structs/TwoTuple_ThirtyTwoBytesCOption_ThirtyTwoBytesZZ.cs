using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ : CommonBase {
	internal TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ() {
		if (ptr != 0) { bindings.C2Tuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		long ret = bindings.C2Tuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * 
	 */
	public Option_ThirtyTwoBytesZ get_b() {
		long ret = bindings.C2Tuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ_get_b(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ThirtyTwoBytesZ ret_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.C2Tuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ clone() {
		long ret = bindings.C2Tuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ ret_hu_conv = new TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ from the contained elements.
	 */
	public static TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ of(byte[] a, org.ldk.structs.Option_ThirtyTwoBytesZ b) {
		long ret = bindings.C2Tuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(a, 32)), b.ptr);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ ret_hu_conv = new TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b); };
		return ret_hu_conv;
	}

}
} } }
