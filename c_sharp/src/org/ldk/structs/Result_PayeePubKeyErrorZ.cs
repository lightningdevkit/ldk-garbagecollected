using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_PayeePubKeyErrorZ : CommonBase {
	Result_PayeePubKeyErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_PayeePubKeyErrorZ() {
		if (ptr != 0) { bindings.CResult_PayeePubKeyErrorZ_free(ptr); }
	}

	internal static Result_PayeePubKeyErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PayeePubKeyErrorZ_is_ok(ptr)) {
			return new Result_PayeePubKeyErrorZ_OK(null, ptr);
		} else {
			return new Result_PayeePubKeyErrorZ_Err(null, ptr);
		}
	}
	public class Result_PayeePubKeyErrorZ_OK : Result_PayeePubKeyErrorZ {
		public readonly PayeePubKey res;
		internal Result_PayeePubKeyErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_PayeePubKeyErrorZ_get_ok(ptr);
			org.ldk.structs.PayeePubKey res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.PayeePubKey(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_PayeePubKeyErrorZ_Err : Result_PayeePubKeyErrorZ {
		public readonly Secp256k1Error err;
		internal Result_PayeePubKeyErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			this.err = bindings.CResult_PayeePubKeyErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_PayeePubKeyErrorZ in the success state.
	 */
	public static Result_PayeePubKeyErrorZ ok(org.ldk.structs.PayeePubKey o) {
		long ret = bindings.CResult_PayeePubKeyErrorZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PayeePubKeyErrorZ ret_hu_conv = Result_PayeePubKeyErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PayeePubKeyErrorZ in the error state.
	 */
	public static Result_PayeePubKeyErrorZ err(Secp256k1Error e) {
		long ret = bindings.CResult_PayeePubKeyErrorZ_err(e);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PayeePubKeyErrorZ ret_hu_conv = Result_PayeePubKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_PayeePubKeyErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_PayeePubKeyErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PayeePubKeyErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PayeePubKeyErrorZ clone() {
		long ret = bindings.CResult_PayeePubKeyErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PayeePubKeyErrorZ ret_hu_conv = Result_PayeePubKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
