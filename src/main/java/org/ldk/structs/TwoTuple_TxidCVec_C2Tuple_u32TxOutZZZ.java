package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A Tuple
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ extends CommonBase {
	TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		byte[] ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * 
	 */
	public TwoTuple_u32TxOutZ[] get_b() {
		long[] ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_b(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_20_len = ret.length;
		TwoTuple_u32TxOutZ[] ret_conv_20_arr = new TwoTuple_u32TxOutZ[ret_conv_20_len];
		for (int u = 0; u < ret_conv_20_len; u++) {
			long ret_conv_20 = ret[u];
			TwoTuple_u32TxOutZ ret_conv_20_hu_conv = new TwoTuple_u32TxOutZ(null, ret_conv_20);
			ret_conv_20_hu_conv.ptrs_to.add(this);
			ret_conv_20_arr[u] = ret_conv_20_hu_conv;
		}
		return ret_conv_20_arr;
	}

	long clone_ptr() {
		long ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ clone() {
		long ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ ret_hu_conv = new TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ from the contained elements.
	 */
	public static TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ of(byte[] a, TwoTuple_u32TxOutZ[] b) {
		long ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_new(InternalUtils.check_arr_len(a, 32), b != null ? Arrays.stream(b).mapToLong(b_conv_20 -> b_conv_20 != null ? b_conv_20.ptr : 0).toArray() : null);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ ret_hu_conv = new TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
