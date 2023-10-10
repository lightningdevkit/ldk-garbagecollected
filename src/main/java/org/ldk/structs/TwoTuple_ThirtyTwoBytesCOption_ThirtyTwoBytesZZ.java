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
public class TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ extends CommonBase {
	TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C2Tuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		byte[] ret = bindings.C2Tuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * 
	 */
	public Option_ThirtyTwoBytesZ get_b() {
		long ret = bindings.C2Tuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ_get_b(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ThirtyTwoBytesZ ret_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.C2Tuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ clone() {
		long ret = bindings.C2Tuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ ret_hu_conv = new TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ from the contained elements.
	 */
	public static TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ of(byte[] a, org.ldk.structs.Option_ThirtyTwoBytesZ b) {
		long ret = bindings.C2Tuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ_new(InternalUtils.check_arr_len(a, 32), b.ptr);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ ret_hu_conv = new TwoTuple_ThirtyTwoBytesCOption_ThirtyTwoBytesZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(b); };
		return ret_hu_conv;
	}

}
