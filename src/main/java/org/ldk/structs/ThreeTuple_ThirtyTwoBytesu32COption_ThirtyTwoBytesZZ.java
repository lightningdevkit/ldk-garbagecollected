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
public class ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ extends CommonBase {
	ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		byte[] ret = bindings.C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * 
	 */
	public int get_b() {
		int ret = bindings.C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ_get_b(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * 
	 */
	public Option_ThirtyTwoBytesZ get_c() {
		long ret = bindings.C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ_get_c(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ThirtyTwoBytesZ ret_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ clone() {
		long ret = bindings.C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ ret_hu_conv = new ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ from the contained elements.
	 */
	public static ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ of(byte[] a, int b, org.ldk.structs.Option_ThirtyTwoBytesZ c) {
		long ret = bindings.C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ_new(InternalUtils.check_arr_len(a, 32), b, c.ptr);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		Reference.reachabilityFence(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ ret_hu_conv = new ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(c); };
		return ret_hu_conv;
	}

}
