using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_StringErrorZ : CommonBase {
	Result_StringErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_StringErrorZ() {
		if (ptr != 0) { bindings.CResult_StringErrorZ_free(ptr); }
	}

	internal static Result_StringErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_StringErrorZ_is_ok(ptr)) {
			return new Result_StringErrorZ_OK(null, ptr);
		} else {
			return new Result_StringErrorZ_Err(null, ptr);
		}
	}
	public class Result_StringErrorZ_OK : Result_StringErrorZ {
		public readonly string res;
		internal Result_StringErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			this.res = bindings.CResult_StringErrorZ_get_ok(ptr);
		}
	}

	public class Result_StringErrorZ_Err : Result_StringErrorZ {
		public readonly Secp256k1Error err;
		internal Result_StringErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			this.err = bindings.CResult_StringErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_StringErrorZ in the success state.
	 */
	public static Result_StringErrorZ ok(string o) {
		long ret = bindings.CResult_StringErrorZ_ok(o);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StringErrorZ ret_hu_conv = Result_StringErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_StringErrorZ in the error state.
	 */
	public static Result_StringErrorZ err(Secp256k1Error e) {
		long ret = bindings.CResult_StringErrorZ_err(e);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StringErrorZ ret_hu_conv = Result_StringErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_StringErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_StringErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_StringErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_StringErrorZ clone() {
		long ret = bindings.CResult_StringErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StringErrorZ ret_hu_conv = Result_StringErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
