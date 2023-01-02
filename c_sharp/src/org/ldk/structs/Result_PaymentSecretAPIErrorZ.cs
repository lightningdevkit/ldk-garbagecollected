using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_PaymentSecretAPIErrorZ : CommonBase {
	Result_PaymentSecretAPIErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_PaymentSecretAPIErrorZ() {
		if (ptr != 0) { bindings.CResult_PaymentSecretAPIErrorZ_free(ptr); }
	}

	internal static Result_PaymentSecretAPIErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PaymentSecretAPIErrorZ_is_ok(ptr)) {
			return new Result_PaymentSecretAPIErrorZ_OK(null, ptr);
		} else {
			return new Result_PaymentSecretAPIErrorZ_Err(null, ptr);
		}
	}
	public class Result_PaymentSecretAPIErrorZ_OK : Result_PaymentSecretAPIErrorZ {
		public readonly byte[] res;
		internal Result_PaymentSecretAPIErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			this.res = bindings.CResult_PaymentSecretAPIErrorZ_get_ok(ptr);
		}
	}

	public class Result_PaymentSecretAPIErrorZ_Err : Result_PaymentSecretAPIErrorZ {
		public readonly APIError err;
		internal Result_PaymentSecretAPIErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_PaymentSecretAPIErrorZ_get_err(ptr);
			org.ldk.structs.APIError err_hu_conv = org.ldk.structs.APIError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PaymentSecretAPIErrorZ in the success state.
	 */
	public static Result_PaymentSecretAPIErrorZ ok(byte[] o) {
		long ret = bindings.CResult_PaymentSecretAPIErrorZ_ok(InternalUtils.check_arr_len(o, 32));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentSecretAPIErrorZ ret_hu_conv = Result_PaymentSecretAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaymentSecretAPIErrorZ in the error state.
	 */
	public static Result_PaymentSecretAPIErrorZ err(org.ldk.structs.APIError e) {
		long ret = bindings.CResult_PaymentSecretAPIErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentSecretAPIErrorZ ret_hu_conv = Result_PaymentSecretAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_PaymentSecretAPIErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_PaymentSecretAPIErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PaymentSecretAPIErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PaymentSecretAPIErrorZ clone() {
		long ret = bindings.CResult_PaymentSecretAPIErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentSecretAPIErrorZ ret_hu_conv = Result_PaymentSecretAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
