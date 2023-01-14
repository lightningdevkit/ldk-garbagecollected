using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_SecretKeyNoneZ : CommonBase {
	Result_SecretKeyNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_SecretKeyNoneZ() {
		if (ptr != 0) { bindings.CResult_SecretKeyNoneZ_free(ptr); }
	}

	internal static Result_SecretKeyNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_SecretKeyNoneZ_is_ok(ptr)) {
			return new Result_SecretKeyNoneZ_OK(null, ptr);
		} else {
			return new Result_SecretKeyNoneZ_Err(null, ptr);
		}
	}
	public class Result_SecretKeyNoneZ_OK : Result_SecretKeyNoneZ {
		public readonly byte[] res;
		internal Result_SecretKeyNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			this.res = bindings.CResult_SecretKeyNoneZ_get_ok(ptr);
		}
	}

	public class Result_SecretKeyNoneZ_Err : Result_SecretKeyNoneZ {
		internal Result_SecretKeyNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_SecretKeyNoneZ in the success state.
	 */
	public static Result_SecretKeyNoneZ ok(byte[] o) {
		long ret = bindings.CResult_SecretKeyNoneZ_ok(InternalUtils.check_arr_len(o, 32));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SecretKeyNoneZ ret_hu_conv = Result_SecretKeyNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SecretKeyNoneZ in the error state.
	 */
	public static Result_SecretKeyNoneZ err() {
		long ret = bindings.CResult_SecretKeyNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SecretKeyNoneZ ret_hu_conv = Result_SecretKeyNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_SecretKeyNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_SecretKeyNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_SecretKeyNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_SecretKeyNoneZ clone() {
		long ret = bindings.CResult_SecretKeyNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SecretKeyNoneZ ret_hu_conv = Result_SecretKeyNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
