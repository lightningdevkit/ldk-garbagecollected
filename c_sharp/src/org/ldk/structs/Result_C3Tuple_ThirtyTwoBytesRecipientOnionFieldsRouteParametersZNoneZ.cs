using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ : CommonBase {
	Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ() {
		if (ptr != 0) { bindings.CResult_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ_free(ptr); }
	}

	internal static Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ_is_ok(ptr)) {
			return new Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ_OK(null, ptr);
		} else {
			return new Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ_Err(null, ptr);
		}
	}
	public class Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ_OK : Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ {
		public readonly ThreeTuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZ res;
		internal Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ_get_ok(ptr);
			ThreeTuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZ res_hu_conv = new ThreeTuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZ(null, res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ_Err : Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ {
		internal Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ in the success state.
	 */
	public static Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ ok(org.ldk.structs.ThreeTuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZ o) {
		long ret = bindings.CResult_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ_ok(o != null ? o.ptr : 0);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ ret_hu_conv = Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ in the error state.
	 */
	public static Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ err() {
		long ret = bindings.CResult_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ ret_hu_conv = Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ clone() {
		long ret = bindings.CResult_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ ret_hu_conv = Result_C3Tuple_ThirtyTwoBytesRecipientOnionFieldsRouteParametersZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
