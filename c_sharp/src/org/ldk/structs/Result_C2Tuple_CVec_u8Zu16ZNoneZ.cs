using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_C2Tuple_CVec_u8Zu16ZNoneZ : CommonBase {
	Result_C2Tuple_CVec_u8Zu16ZNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_C2Tuple_CVec_u8Zu16ZNoneZ() {
		if (ptr != 0) { bindings.CResult_C2Tuple_CVec_u8Zu16ZNoneZ_free(ptr); }
	}

	internal static Result_C2Tuple_CVec_u8Zu16ZNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C2Tuple_CVec_u8Zu16ZNoneZ_is_ok(ptr)) {
			return new Result_C2Tuple_CVec_u8Zu16ZNoneZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_CVec_u8Zu16ZNoneZ_Err(null, ptr);
		}
	}
	public class Result_C2Tuple_CVec_u8Zu16ZNoneZ_OK : Result_C2Tuple_CVec_u8Zu16ZNoneZ {
		public readonly TwoTuple_CVec_u8Zu16Z res;
		internal Result_C2Tuple_CVec_u8Zu16ZNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_C2Tuple_CVec_u8Zu16ZNoneZ_get_ok(ptr);
			TwoTuple_CVec_u8Zu16Z res_hu_conv = new TwoTuple_CVec_u8Zu16Z(null, res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_C2Tuple_CVec_u8Zu16ZNoneZ_Err : Result_C2Tuple_CVec_u8Zu16ZNoneZ {
		internal Result_C2Tuple_CVec_u8Zu16ZNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_C2Tuple_CVec_u8Zu16ZNoneZ in the success state.
	 */
	public static org.ldk.structs.Result_C2Tuple_CVec_u8Zu16ZNoneZ ok(org.ldk.structs.TwoTuple_CVec_u8Zu16Z o) {
		long ret = bindings.CResult_C2Tuple_CVec_u8Zu16ZNoneZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_CVec_u8Zu16ZNoneZ ret_hu_conv = Result_C2Tuple_CVec_u8Zu16ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C2Tuple_CVec_u8Zu16ZNoneZ in the error state.
	 */
	public static org.ldk.structs.Result_C2Tuple_CVec_u8Zu16ZNoneZ err() {
		long ret = bindings.CResult_C2Tuple_CVec_u8Zu16ZNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_CVec_u8Zu16ZNoneZ ret_hu_conv = Result_C2Tuple_CVec_u8Zu16ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_C2Tuple_CVec_u8Zu16ZNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_C2Tuple_CVec_u8Zu16ZNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_C2Tuple_CVec_u8Zu16ZNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Result_C2Tuple_CVec_u8Zu16ZNoneZ clone() {
		long ret = bindings.CResult_C2Tuple_CVec_u8Zu16ZNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_CVec_u8Zu16ZNoneZ ret_hu_conv = Result_C2Tuple_CVec_u8Zu16ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
