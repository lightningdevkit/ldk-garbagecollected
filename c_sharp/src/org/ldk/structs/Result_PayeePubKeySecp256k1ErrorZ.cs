using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_PayeePubKeySecp256k1ErrorZ : CommonBase {
	Result_PayeePubKeySecp256k1ErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_PayeePubKeySecp256k1ErrorZ() {
		if (ptr != 0) { bindings.CResult_PayeePubKeySecp256k1ErrorZ_free(ptr); }
	}

	internal static Result_PayeePubKeySecp256k1ErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PayeePubKeySecp256k1ErrorZ_is_ok(ptr)) {
			return new Result_PayeePubKeySecp256k1ErrorZ_OK(null, ptr);
		} else {
			return new Result_PayeePubKeySecp256k1ErrorZ_Err(null, ptr);
		}
	}
	public class Result_PayeePubKeySecp256k1ErrorZ_OK : Result_PayeePubKeySecp256k1ErrorZ {
		public readonly PayeePubKey res;
		internal Result_PayeePubKeySecp256k1ErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_PayeePubKeySecp256k1ErrorZ_get_ok(ptr);
			org.ldk.structs.PayeePubKey res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.PayeePubKey(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_PayeePubKeySecp256k1ErrorZ_Err : Result_PayeePubKeySecp256k1ErrorZ {
		public readonly Secp256k1Error err;
		internal Result_PayeePubKeySecp256k1ErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			this.err = bindings.CResult_PayeePubKeySecp256k1ErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_PayeePubKeySecp256k1ErrorZ in the success state.
	 */
	public static Result_PayeePubKeySecp256k1ErrorZ ok(org.ldk.structs.PayeePubKey o) {
		long ret = bindings.CResult_PayeePubKeySecp256k1ErrorZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PayeePubKeySecp256k1ErrorZ ret_hu_conv = Result_PayeePubKeySecp256k1ErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PayeePubKeySecp256k1ErrorZ in the error state.
	 */
	public static Result_PayeePubKeySecp256k1ErrorZ err(Secp256k1Error e) {
		long ret = bindings.CResult_PayeePubKeySecp256k1ErrorZ_err(e);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PayeePubKeySecp256k1ErrorZ ret_hu_conv = Result_PayeePubKeySecp256k1ErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_PayeePubKeySecp256k1ErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_PayeePubKeySecp256k1ErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PayeePubKeySecp256k1ErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PayeePubKeySecp256k1ErrorZ clone() {
		long ret = bindings.CResult_PayeePubKeySecp256k1ErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PayeePubKeySecp256k1ErrorZ ret_hu_conv = Result_PayeePubKeySecp256k1ErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
