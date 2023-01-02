using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ : CommonBase {
	internal TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ() {
		if (ptr != 0) { bindings.C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		byte[] ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_a(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * 
	 */
	public TwoTuple_u32TxOutZ[] get_b() {
		long[] ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_b(this.ptr);
		GC.KeepAlive(this);
		int ret_conv_20_len = ret.Length;
		TwoTuple_u32TxOutZ[] ret_conv_20_arr = new TwoTuple_u32TxOutZ[ret_conv_20_len];
		for (int u = 0; u < ret_conv_20_len; u++) {
			long ret_conv_20 = ret[u];
			TwoTuple_u32TxOutZ ret_conv_20_hu_conv = new TwoTuple_u32TxOutZ(null, ret_conv_20);
			if (ret_conv_20_hu_conv != null) { ret_conv_20_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_20_arr[u] = ret_conv_20_hu_conv;
		}
		return ret_conv_20_arr;
	}

	internal long clone_ptr() {
		long ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ clone() {
		long ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ ret_hu_conv = new TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ from the contained elements.
	 */
	public static TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ of(byte[] a, TwoTuple_u32TxOutZ[] b) {
		long ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_new(InternalUtils.check_arr_len(a, 32), b != null ? InternalUtils.mapArray(b, b_conv_20 => b_conv_20 != null ? b_conv_20.ptr : 0) : null);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ ret_hu_conv = new TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
