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
public class ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ extends CommonBase {
	ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C3Tuple_OutPointCVec_MonitorEventZPublicKeyZ_free(ptr); }
	}

	/**
	 * 
	 */
	public OutPoint get_a() {
		long ret = bindings.C3Tuple_OutPointCVec_MonitorEventZPublicKeyZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutPoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public MonitorEvent[] get_b() {
		long[] ret = bindings.C3Tuple_OutPointCVec_MonitorEventZPublicKeyZ_get_b(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_14_len = ret.length;
		MonitorEvent[] ret_conv_14_arr = new MonitorEvent[ret_conv_14_len];
		for (int o = 0; o < ret_conv_14_len; o++) {
			long ret_conv_14 = ret[o];
			org.ldk.structs.MonitorEvent ret_conv_14_hu_conv = org.ldk.structs.MonitorEvent.constr_from_ptr(ret_conv_14);
			if (ret_conv_14_hu_conv != null) { ret_conv_14_hu_conv.ptrs_to.add(this); };
			ret_conv_14_arr[o] = ret_conv_14_hu_conv;
		}
		return ret_conv_14_arr;
	}

	/**
	 * 
	 */
	public byte[] get_c() {
		byte[] ret = bindings.C3Tuple_OutPointCVec_MonitorEventZPublicKeyZ_get_c(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.C3Tuple_OutPointCVec_MonitorEventZPublicKeyZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ clone() {
		long ret = bindings.C3Tuple_OutPointCVec_MonitorEventZPublicKeyZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ ret_hu_conv = new ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C3Tuple_OutPointCVec_MonitorEventZPublicKeyZ from the contained elements.
	 */
	public static ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ of(OutPoint a, MonitorEvent[] b, byte[] c) {
		long ret = bindings.C3Tuple_OutPointCVec_MonitorEventZPublicKeyZ_new(a == null ? 0 : a.ptr, b != null ? Arrays.stream(b).mapToLong(b_conv_14 -> b_conv_14.ptr).toArray() : null, InternalUtils.check_arr_len(c, 33));
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		Reference.reachabilityFence(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ ret_hu_conv = new ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

}
