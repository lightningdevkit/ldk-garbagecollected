using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_HTLCOutputInCommitmentDecodeErrorZ : CommonBase {
	Result_HTLCOutputInCommitmentDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_HTLCOutputInCommitmentDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_HTLCOutputInCommitmentDecodeErrorZ_free(ptr); }
	}

	internal static Result_HTLCOutputInCommitmentDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_HTLCOutputInCommitmentDecodeErrorZ_is_ok(ptr)) {
			return new Result_HTLCOutputInCommitmentDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_HTLCOutputInCommitmentDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_HTLCOutputInCommitmentDecodeErrorZ_OK : Result_HTLCOutputInCommitmentDecodeErrorZ {
		public readonly HTLCOutputInCommitment res;
		internal Result_HTLCOutputInCommitmentDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_HTLCOutputInCommitmentDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.HTLCOutputInCommitment res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.HTLCOutputInCommitment(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_HTLCOutputInCommitmentDecodeErrorZ_Err : Result_HTLCOutputInCommitmentDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_HTLCOutputInCommitmentDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_HTLCOutputInCommitmentDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_HTLCOutputInCommitmentDecodeErrorZ in the success state.
	 */
	public static Result_HTLCOutputInCommitmentDecodeErrorZ ok(org.ldk.structs.HTLCOutputInCommitment o) {
		long ret = bindings.CResult_HTLCOutputInCommitmentDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HTLCOutputInCommitmentDecodeErrorZ ret_hu_conv = Result_HTLCOutputInCommitmentDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_HTLCOutputInCommitmentDecodeErrorZ in the error state.
	 */
	public static Result_HTLCOutputInCommitmentDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_HTLCOutputInCommitmentDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HTLCOutputInCommitmentDecodeErrorZ ret_hu_conv = Result_HTLCOutputInCommitmentDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_HTLCOutputInCommitmentDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_HTLCOutputInCommitmentDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_HTLCOutputInCommitmentDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_HTLCOutputInCommitmentDecodeErrorZ clone() {
		long ret = bindings.CResult_HTLCOutputInCommitmentDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HTLCOutputInCommitmentDecodeErrorZ ret_hu_conv = Result_HTLCOutputInCommitmentDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
