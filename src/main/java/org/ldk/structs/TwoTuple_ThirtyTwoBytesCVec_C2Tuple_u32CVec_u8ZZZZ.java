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
public class TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ extends CommonBase {
	TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		byte[] ret = bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * 
	 */
	public TwoTuple_u32CVec_u8ZZ[] get_b() {
		long[] ret = bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ_get_b(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_23_len = ret.length;
		TwoTuple_u32CVec_u8ZZ[] ret_conv_23_arr = new TwoTuple_u32CVec_u8ZZ[ret_conv_23_len];
		for (int x = 0; x < ret_conv_23_len; x++) {
			long ret_conv_23 = ret[x];
			TwoTuple_u32CVec_u8ZZ ret_conv_23_hu_conv = new TwoTuple_u32CVec_u8ZZ(null, ret_conv_23);
			if (ret_conv_23_hu_conv != null) { ret_conv_23_hu_conv.ptrs_to.add(this); };
			ret_conv_23_arr[x] = ret_conv_23_hu_conv;
		}
		return ret_conv_23_arr;
	}

	long clone_ptr() {
		long ret = bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ clone() {
		long ret = bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ ret_hu_conv = new TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ from the contained elements.
	 */
	public static TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ of(byte[] a, TwoTuple_u32CVec_u8ZZ[] b) {
		long ret = bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ_new(InternalUtils.check_arr_len(a, 32), b != null ? Arrays.stream(b).mapToLong(b_conv_23 -> b_conv_23 != null ? b_conv_23.ptr : 0).toArray() : null);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ ret_hu_conv = new TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}
