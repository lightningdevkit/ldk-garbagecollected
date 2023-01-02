using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_TxOutAccessErrorZ : CommonBase {
	Result_TxOutAccessErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_TxOutAccessErrorZ() {
		if (ptr != 0) { bindings.CResult_TxOutAccessErrorZ_free(ptr); }
	}

	internal static Result_TxOutAccessErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_TxOutAccessErrorZ_is_ok(ptr)) {
			return new Result_TxOutAccessErrorZ_OK(null, ptr);
		} else {
			return new Result_TxOutAccessErrorZ_Err(null, ptr);
		}
	}
	public class Result_TxOutAccessErrorZ_OK : Result_TxOutAccessErrorZ {
		public readonly TxOut res;
		internal Result_TxOutAccessErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_TxOutAccessErrorZ_get_ok(ptr);
			TxOut res_conv = new TxOut(null, res);
			this.res = res_conv;
		}
	}

	public class Result_TxOutAccessErrorZ_Err : Result_TxOutAccessErrorZ {
		public readonly AccessError err;
		internal Result_TxOutAccessErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			this.err = bindings.CResult_TxOutAccessErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_TxOutAccessErrorZ in the success state.
	 */
	public static Result_TxOutAccessErrorZ ok(org.ldk.structs.TxOut o) {
		long ret = bindings.CResult_TxOutAccessErrorZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxOutAccessErrorZ ret_hu_conv = Result_TxOutAccessErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_TxOutAccessErrorZ in the error state.
	 */
	public static Result_TxOutAccessErrorZ err(AccessError e) {
		long ret = bindings.CResult_TxOutAccessErrorZ_err(e);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxOutAccessErrorZ ret_hu_conv = Result_TxOutAccessErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_TxOutAccessErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_TxOutAccessErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_TxOutAccessErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_TxOutAccessErrorZ clone() {
		long ret = bindings.CResult_TxOutAccessErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxOutAccessErrorZ ret_hu_conv = Result_TxOutAccessErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
