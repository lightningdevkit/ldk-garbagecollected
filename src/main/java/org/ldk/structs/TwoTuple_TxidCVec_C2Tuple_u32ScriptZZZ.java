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
public class TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ extends CommonBase {
	TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		byte[] ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * 
	 */
	public TwoTuple_u32ScriptZ[] get_b() {
		long[] ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_get_b(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_21_len = ret.length;
		TwoTuple_u32ScriptZ[] ret_conv_21_arr = new TwoTuple_u32ScriptZ[ret_conv_21_len];
		for (int v = 0; v < ret_conv_21_len; v++) {
			long ret_conv_21 = ret[v];
			TwoTuple_u32ScriptZ ret_conv_21_hu_conv = new TwoTuple_u32ScriptZ(null, ret_conv_21);
			ret_conv_21_hu_conv.ptrs_to.add(this);
			ret_conv_21_arr[v] = ret_conv_21_hu_conv;
		}
		return ret_conv_21_arr;
	}

	long clone_ptr() {
		long ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ clone() {
		long ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ ret_hu_conv = new TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ from the contained elements.
	 */
	public static TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ of(byte[] a, TwoTuple_u32ScriptZ[] b) {
		long ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_new(InternalUtils.check_arr_len(a, 32), b != null ? Arrays.stream(b).mapToLong(b_conv_21 -> b_conv_21 != null ? b_conv_21.ptr : 0).toArray() : null);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ ret_hu_conv = new TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
