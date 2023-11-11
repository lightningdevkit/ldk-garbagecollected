using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ : CommonBase {
	internal ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ(object _dummy, long ptr) : base(ptr) { }
	~ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ() {
		if (ptr != 0) { bindings.C3Tuple_OutPointCVec_MonitorEventZPublicKeyZ_free(ptr); }
	}

	/**
	 * 
	 */
	public OutPoint get_a() {
		long ret = bindings.C3Tuple_OutPointCVec_MonitorEventZPublicKeyZ_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutPoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public MonitorEvent[] get_b() {
		long ret = bindings.C3Tuple_OutPointCVec_MonitorEventZPublicKeyZ_get_b(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_14_len = InternalUtils.getArrayLength(ret);
		MonitorEvent[] ret_conv_14_arr = new MonitorEvent[ret_conv_14_len];
		for (int o = 0; o < ret_conv_14_len; o++) {
			long ret_conv_14 = InternalUtils.getU64ArrayElem(ret, o);
			org.ldk.structs.MonitorEvent ret_conv_14_hu_conv = org.ldk.structs.MonitorEvent.constr_from_ptr(ret_conv_14);
			if (ret_conv_14_hu_conv != null) { ret_conv_14_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_14_arr[o] = ret_conv_14_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_14_arr;
	}

	/**
	 * 
	 */
	public byte[] get_c() {
		long ret = bindings.C3Tuple_OutPointCVec_MonitorEventZPublicKeyZ_get_c(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.C3Tuple_OutPointCVec_MonitorEventZPublicKeyZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ clone() {
		long ret = bindings.C3Tuple_OutPointCVec_MonitorEventZPublicKeyZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ ret_hu_conv = new ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C3Tuple_OutPointCVec_MonitorEventZPublicKeyZ from the contained elements.
	 */
	public static ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ of(org.ldk.structs.OutPoint a, MonitorEvent[] b, byte[] c) {
		long ret = bindings.C3Tuple_OutPointCVec_MonitorEventZPublicKeyZ_new(a == null ? 0 : a.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(b, b_conv_14 => b_conv_14.ptr)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(c, 33)));
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		GC.KeepAlive(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ ret_hu_conv = new ThreeTuple_OutPointCVec_MonitorEventZPublicKeyZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		foreach (MonitorEvent b_conv_14 in b) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_conv_14); }; };
		return ret_hu_conv;
	}

}
} } }
