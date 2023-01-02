using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ : CommonBase {
	internal TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ() {
		if (ptr != 0) { bindings.C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		byte[] ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_get_a(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * 
	 */
	public TwoTuple_u32ScriptZ[] get_b() {
		long[] ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_get_b(this.ptr);
		GC.KeepAlive(this);
		int ret_conv_21_len = ret.Length;
		TwoTuple_u32ScriptZ[] ret_conv_21_arr = new TwoTuple_u32ScriptZ[ret_conv_21_len];
		for (int v = 0; v < ret_conv_21_len; v++) {
			long ret_conv_21 = ret[v];
			TwoTuple_u32ScriptZ ret_conv_21_hu_conv = new TwoTuple_u32ScriptZ(null, ret_conv_21);
			if (ret_conv_21_hu_conv != null) { ret_conv_21_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_21_arr[v] = ret_conv_21_hu_conv;
		}
		return ret_conv_21_arr;
	}

	internal long clone_ptr() {
		long ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ clone() {
		long ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ ret_hu_conv = new TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ from the contained elements.
	 */
	public static TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ of(byte[] a, TwoTuple_u32ScriptZ[] b) {
		long ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_new(InternalUtils.check_arr_len(a, 32), b != null ? InternalUtils.mapArray(b, b_conv_21 => b_conv_21 != null ? b_conv_21.ptr : 0) : null);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ ret_hu_conv = new TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
