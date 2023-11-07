using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ : CommonBase {
	internal TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ() {
		if (ptr != 0) { bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		long ret = bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * 
	 */
	public TwoTuple_u32CVec_u8ZZ[] get_b() {
		long ret = bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ_get_b(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_23_len = InternalUtils.getArrayLength(ret);
		TwoTuple_u32CVec_u8ZZ[] ret_conv_23_arr = new TwoTuple_u32CVec_u8ZZ[ret_conv_23_len];
		for (int x = 0; x < ret_conv_23_len; x++) {
			long ret_conv_23 = InternalUtils.getU64ArrayElem(ret, x);
			TwoTuple_u32CVec_u8ZZ ret_conv_23_hu_conv = new TwoTuple_u32CVec_u8ZZ(null, ret_conv_23);
			if (ret_conv_23_hu_conv != null) { ret_conv_23_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_23_arr[x] = ret_conv_23_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_23_arr;
	}

	internal long clone_ptr() {
		long ret = bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ clone() {
		long ret = bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ ret_hu_conv = new TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ from the contained elements.
	 */
	public static TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ of(byte[] a, TwoTuple_u32CVec_u8ZZ[] b) {
		long ret = bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(a, 32)), InternalUtils.encodeUint64Array(InternalUtils.mapArray(b, b_conv_23 => b_conv_23 != null ? b_conv_23.ptr : 0)));
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ ret_hu_conv = new TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
