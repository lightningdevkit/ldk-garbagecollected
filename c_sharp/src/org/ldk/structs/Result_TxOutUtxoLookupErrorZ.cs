using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_TxOutUtxoLookupErrorZ : CommonBase {
	Result_TxOutUtxoLookupErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_TxOutUtxoLookupErrorZ() {
		if (ptr != 0) { bindings.CResult_TxOutUtxoLookupErrorZ_free(ptr); }
	}

	internal static Result_TxOutUtxoLookupErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_TxOutUtxoLookupErrorZ_is_ok(ptr)) {
			return new Result_TxOutUtxoLookupErrorZ_OK(null, ptr);
		} else {
			return new Result_TxOutUtxoLookupErrorZ_Err(null, ptr);
		}
	}
	public class Result_TxOutUtxoLookupErrorZ_OK : Result_TxOutUtxoLookupErrorZ {
		public readonly TxOut res;
		internal Result_TxOutUtxoLookupErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_TxOutUtxoLookupErrorZ_get_ok(ptr);
			TxOut res_conv = new TxOut(null, res);
			this.res = res_conv;
		}
	}

	public class Result_TxOutUtxoLookupErrorZ_Err : Result_TxOutUtxoLookupErrorZ {
		public readonly UtxoLookupError err;
		internal Result_TxOutUtxoLookupErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			this.err = bindings.CResult_TxOutUtxoLookupErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_TxOutUtxoLookupErrorZ in the success state.
	 */
	public static Result_TxOutUtxoLookupErrorZ ok(org.ldk.structs.TxOut o) {
		long ret = bindings.CResult_TxOutUtxoLookupErrorZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxOutUtxoLookupErrorZ ret_hu_conv = Result_TxOutUtxoLookupErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_TxOutUtxoLookupErrorZ in the error state.
	 */
	public static Result_TxOutUtxoLookupErrorZ err(UtxoLookupError e) {
		long ret = bindings.CResult_TxOutUtxoLookupErrorZ_err(e);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxOutUtxoLookupErrorZ ret_hu_conv = Result_TxOutUtxoLookupErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_TxOutUtxoLookupErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_TxOutUtxoLookupErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_TxOutUtxoLookupErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_TxOutUtxoLookupErrorZ clone() {
		long ret = bindings.CResult_TxOutUtxoLookupErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxOutUtxoLookupErrorZ ret_hu_conv = Result_TxOutUtxoLookupErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
