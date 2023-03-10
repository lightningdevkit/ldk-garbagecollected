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
public class TwoTuple__u168_u168Z extends CommonBase {
	TwoTuple__u168_u168Z(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C2Tuple__u168_u168Z_free(ptr); }
	}

	/**
	 * 
	 */
	public short[] get_a() {
		short[] ret = bindings.C2Tuple__u168_u168Z_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * 
	 */
	public short[] get_b() {
		short[] ret = bindings.C2Tuple__u168_u168Z_get_b(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.C2Tuple__u168_u168Z_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple__u168_u168Z clone() {
		long ret = bindings.C2Tuple__u168_u168Z_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple__u168_u168Z ret_hu_conv = new TwoTuple__u168_u168Z(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple__u168_u168Z from the contained elements.
	 */
	public static TwoTuple__u168_u168Z of(short[] a, short[] b) {
		long ret = bindings.C2Tuple__u168_u168Z_new(InternalUtils.check_arr_16_len(a, 8), InternalUtils.check_arr_16_len(b, 8));
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple__u168_u168Z ret_hu_conv = new TwoTuple__u168_u168Z(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}
