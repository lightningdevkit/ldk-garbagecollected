using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_CVec_u8ZIOErrorZ : CommonBase {
	Result_CVec_u8ZIOErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_CVec_u8ZIOErrorZ() {
		if (ptr != 0) { bindings.CResult_CVec_u8ZIOErrorZ_free(ptr); }
	}

	internal static Result_CVec_u8ZIOErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CVec_u8ZIOErrorZ_is_ok(ptr)) {
			return new Result_CVec_u8ZIOErrorZ_OK(null, ptr);
		} else {
			return new Result_CVec_u8ZIOErrorZ_Err(null, ptr);
		}
	}
	public class Result_CVec_u8ZIOErrorZ_OK : Result_CVec_u8ZIOErrorZ {
		public readonly byte[] res;
		internal Result_CVec_u8ZIOErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_CVec_u8ZIOErrorZ_get_ok(ptr);
			byte[] res_conv = InternalUtils.decodeUint8Array(res);
			this.res = res_conv;
		}
	}

	public class Result_CVec_u8ZIOErrorZ_Err : Result_CVec_u8ZIOErrorZ {
		public readonly IOError err;
		internal Result_CVec_u8ZIOErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			this.err = bindings.CResult_CVec_u8ZIOErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_CVec_u8ZIOErrorZ in the success state.
	 */
	public static Result_CVec_u8ZIOErrorZ ok(byte[] o) {
		long ret = bindings.CResult_CVec_u8ZIOErrorZ_ok(InternalUtils.encodeUint8Array(o));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_u8ZIOErrorZ ret_hu_conv = Result_CVec_u8ZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_u8ZIOErrorZ in the error state.
	 */
	public static Result_CVec_u8ZIOErrorZ err(IOError e) {
		long ret = bindings.CResult_CVec_u8ZIOErrorZ_err(e);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_u8ZIOErrorZ ret_hu_conv = Result_CVec_u8ZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_CVec_u8ZIOErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_CVec_u8ZIOErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_u8ZIOErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CVec_u8ZIOErrorZ clone() {
		long ret = bindings.CResult_CVec_u8ZIOErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_u8ZIOErrorZ ret_hu_conv = Result_CVec_u8ZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
