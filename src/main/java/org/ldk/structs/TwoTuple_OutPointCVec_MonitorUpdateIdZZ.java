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
public class TwoTuple_OutPointCVec_MonitorUpdateIdZZ extends CommonBase {
	TwoTuple_OutPointCVec_MonitorUpdateIdZZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C2Tuple_OutPointCVec_MonitorUpdateIdZZ_free(ptr); }
	}

	/**
	 * 
	 */
	public OutPoint get_a() {
		long ret = bindings.C2Tuple_OutPointCVec_MonitorUpdateIdZZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutPoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public MonitorUpdateId[] get_b() {
		long[] ret = bindings.C2Tuple_OutPointCVec_MonitorUpdateIdZZ_get_b(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_17_len = ret.length;
		MonitorUpdateId[] ret_conv_17_arr = new MonitorUpdateId[ret_conv_17_len];
		for (int r = 0; r < ret_conv_17_len; r++) {
			long ret_conv_17 = ret[r];
			org.ldk.structs.MonitorUpdateId ret_conv_17_hu_conv = null; if (ret_conv_17 < 0 || ret_conv_17 > 4096) { ret_conv_17_hu_conv = new org.ldk.structs.MonitorUpdateId(null, ret_conv_17); }
			if (ret_conv_17_hu_conv != null) { ret_conv_17_hu_conv.ptrs_to.add(this); };
			ret_conv_17_arr[r] = ret_conv_17_hu_conv;
		}
		return ret_conv_17_arr;
	}

	long clone_ptr() {
		long ret = bindings.C2Tuple_OutPointCVec_MonitorUpdateIdZZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_OutPointCVec_MonitorUpdateIdZZ clone() {
		long ret = bindings.C2Tuple_OutPointCVec_MonitorUpdateIdZZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_OutPointCVec_MonitorUpdateIdZZ ret_hu_conv = new TwoTuple_OutPointCVec_MonitorUpdateIdZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_OutPointCVec_MonitorUpdateIdZZ from the contained elements.
	 */
	public static TwoTuple_OutPointCVec_MonitorUpdateIdZZ of(org.ldk.structs.OutPoint a, MonitorUpdateId[] b) {
		long ret = bindings.C2Tuple_OutPointCVec_MonitorUpdateIdZZ_new(a == null ? 0 : a.ptr, b != null ? Arrays.stream(b).mapToLong(b_conv_17 -> b_conv_17 == null ? 0 : b_conv_17.ptr).toArray() : null);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_OutPointCVec_MonitorUpdateIdZZ ret_hu_conv = new TwoTuple_OutPointCVec_MonitorUpdateIdZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		for (MonitorUpdateId b_conv_17: b) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(b_conv_17); }; };
		return ret_hu_conv;
	}

}
