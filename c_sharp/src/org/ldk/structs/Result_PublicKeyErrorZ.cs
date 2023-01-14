using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_PublicKeyErrorZ : CommonBase {
	Result_PublicKeyErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_PublicKeyErrorZ() {
		if (ptr != 0) { bindings.CResult_PublicKeyErrorZ_free(ptr); }
	}

	internal static Result_PublicKeyErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PublicKeyErrorZ_is_ok(ptr)) {
			return new Result_PublicKeyErrorZ_OK(null, ptr);
		} else {
			return new Result_PublicKeyErrorZ_Err(null, ptr);
		}
	}
	public class Result_PublicKeyErrorZ_OK : Result_PublicKeyErrorZ {
		public readonly byte[] res;
		internal Result_PublicKeyErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			this.res = bindings.CResult_PublicKeyErrorZ_get_ok(ptr);
		}
	}

	public class Result_PublicKeyErrorZ_Err : Result_PublicKeyErrorZ {
		public readonly Secp256k1Error err;
		internal Result_PublicKeyErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			this.err = bindings.CResult_PublicKeyErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_PublicKeyErrorZ in the success state.
	 */
	public static Result_PublicKeyErrorZ ok(byte[] o) {
		long ret = bindings.CResult_PublicKeyErrorZ_ok(InternalUtils.check_arr_len(o, 33));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PublicKeyErrorZ ret_hu_conv = Result_PublicKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PublicKeyErrorZ in the error state.
	 */
	public static Result_PublicKeyErrorZ err(Secp256k1Error e) {
		long ret = bindings.CResult_PublicKeyErrorZ_err(e);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PublicKeyErrorZ ret_hu_conv = Result_PublicKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_PublicKeyErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_PublicKeyErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PublicKeyErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PublicKeyErrorZ clone() {
		long ret = bindings.CResult_PublicKeyErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PublicKeyErrorZ ret_hu_conv = Result_PublicKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
