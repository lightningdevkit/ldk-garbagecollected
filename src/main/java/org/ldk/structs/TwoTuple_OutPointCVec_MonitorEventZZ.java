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
public class TwoTuple_OutPointCVec_MonitorEventZZ extends CommonBase {
	TwoTuple_OutPointCVec_MonitorEventZZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C2Tuple_OutPointCVec_MonitorEventZZ_free(ptr); }
	}

	/**
	 * 
	 */
	public OutPoint get_a() {
		long ret = bindings.C2Tuple_OutPointCVec_MonitorEventZZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutPoint(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public MonitorEvent[] get_b() {
		long[] ret = bindings.C2Tuple_OutPointCVec_MonitorEventZZ_get_b(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_14_len = ret.length;
		MonitorEvent[] ret_conv_14_arr = new MonitorEvent[ret_conv_14_len];
		for (int o = 0; o < ret_conv_14_len; o++) {
			long ret_conv_14 = ret[o];
			org.ldk.structs.MonitorEvent ret_conv_14_hu_conv = org.ldk.structs.MonitorEvent.constr_from_ptr(ret_conv_14);
			ret_conv_14_hu_conv.ptrs_to.add(this);
			ret_conv_14_arr[o] = ret_conv_14_hu_conv;
		}
		return ret_conv_14_arr;
	}

	long clone_ptr() {
		long ret = bindings.C2Tuple_OutPointCVec_MonitorEventZZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_OutPointCVec_MonitorEventZZ clone() {
		long ret = bindings.C2Tuple_OutPointCVec_MonitorEventZZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_OutPointCVec_MonitorEventZZ ret_hu_conv = new TwoTuple_OutPointCVec_MonitorEventZZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_OutPointCVec_MonitorEventZZ from the contained elements.
	 */
	public static TwoTuple_OutPointCVec_MonitorEventZZ of(OutPoint a, MonitorEvent[] b) {
		long ret = bindings.C2Tuple_OutPointCVec_MonitorEventZZ_new(a == null ? 0 : a.ptr & ~1, b != null ? Arrays.stream(b).mapToLong(b_conv_14 -> b_conv_14.ptr).toArray() : null);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_OutPointCVec_MonitorEventZZ ret_hu_conv = new TwoTuple_OutPointCVec_MonitorEventZZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
