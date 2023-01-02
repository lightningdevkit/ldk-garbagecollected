using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_SignatureNoneZ : CommonBase {
	Result_SignatureNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_SignatureNoneZ() {
		if (ptr != 0) { bindings.CResult_SignatureNoneZ_free(ptr); }
	}

	internal static Result_SignatureNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_SignatureNoneZ_is_ok(ptr)) {
			return new Result_SignatureNoneZ_OK(null, ptr);
		} else {
			return new Result_SignatureNoneZ_Err(null, ptr);
		}
	}
	public class Result_SignatureNoneZ_OK : Result_SignatureNoneZ {
		public readonly byte[] res;
		internal Result_SignatureNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			this.res = bindings.CResult_SignatureNoneZ_get_ok(ptr);
		}
	}

	public class Result_SignatureNoneZ_Err : Result_SignatureNoneZ {
		internal Result_SignatureNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_SignatureNoneZ in the success state.
	 */
	public static Result_SignatureNoneZ ok(byte[] o) {
		long ret = bindings.CResult_SignatureNoneZ_ok(InternalUtils.check_arr_len(o, 64));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SignatureNoneZ in the error state.
	 */
	public static Result_SignatureNoneZ err() {
		long ret = bindings.CResult_SignatureNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_SignatureNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_SignatureNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_SignatureNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_SignatureNoneZ clone() {
		long ret = bindings.CResult_SignatureNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
