using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_SharedSecretNoneZ : CommonBase {
	Result_SharedSecretNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_SharedSecretNoneZ() {
		if (ptr != 0) { bindings.CResult_SharedSecretNoneZ_free(ptr); }
	}

	internal static Result_SharedSecretNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_SharedSecretNoneZ_is_ok(ptr)) {
			return new Result_SharedSecretNoneZ_OK(null, ptr);
		} else {
			return new Result_SharedSecretNoneZ_Err(null, ptr);
		}
	}
	public class Result_SharedSecretNoneZ_OK : Result_SharedSecretNoneZ {
		public readonly byte[] res;
		internal Result_SharedSecretNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			this.res = bindings.CResult_SharedSecretNoneZ_get_ok(ptr);
		}
	}

	public class Result_SharedSecretNoneZ_Err : Result_SharedSecretNoneZ {
		internal Result_SharedSecretNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_SharedSecretNoneZ in the success state.
	 */
	public static Result_SharedSecretNoneZ ok(byte[] o) {
		long ret = bindings.CResult_SharedSecretNoneZ_ok(InternalUtils.check_arr_len(o, 32));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SharedSecretNoneZ ret_hu_conv = Result_SharedSecretNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SharedSecretNoneZ in the error state.
	 */
	public static Result_SharedSecretNoneZ err() {
		long ret = bindings.CResult_SharedSecretNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SharedSecretNoneZ ret_hu_conv = Result_SharedSecretNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_SharedSecretNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_SharedSecretNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_SharedSecretNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_SharedSecretNoneZ clone() {
		long ret = bindings.CResult_SharedSecretNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SharedSecretNoneZ ret_hu_conv = Result_SharedSecretNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
