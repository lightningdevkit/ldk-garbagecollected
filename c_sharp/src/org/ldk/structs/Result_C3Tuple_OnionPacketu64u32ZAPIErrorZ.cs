using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ : CommonBase {
	Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ() {
		if (ptr != 0) { bindings.CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ_free(ptr); }
	}

	internal static Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ_is_ok(ptr)) {
			return new Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ_OK(null, ptr);
		} else {
			return new Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ_Err(null, ptr);
		}
	}
	public class Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ_OK : Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ {
		public readonly ThreeTuple_OnionPacketu64u32Z res;
		internal Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ_get_ok(ptr);
			ThreeTuple_OnionPacketu64u32Z res_hu_conv = new ThreeTuple_OnionPacketu64u32Z(null, res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ_Err : Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ {
		public readonly APIError err;
		internal Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ_get_err(ptr);
			org.ldk.structs.APIError err_hu_conv = org.ldk.structs.APIError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ in the success state.
	 */
	public static org.ldk.structs.Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ ok(org.ldk.structs.ThreeTuple_OnionPacketu64u32Z o) {
		long ret = bindings.CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ ret_hu_conv = Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ in the error state.
	 */
	public static org.ldk.structs.Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ err(org.ldk.structs.APIError e) {
		long ret = bindings.CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ ret_hu_conv = Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ clone() {
		long ret = bindings.CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ ret_hu_conv = Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
