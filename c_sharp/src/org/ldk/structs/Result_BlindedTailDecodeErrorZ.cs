using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_BlindedTailDecodeErrorZ : CommonBase {
	Result_BlindedTailDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_BlindedTailDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_BlindedTailDecodeErrorZ_free(ptr); }
	}

	internal static Result_BlindedTailDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_BlindedTailDecodeErrorZ_is_ok(ptr)) {
			return new Result_BlindedTailDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_BlindedTailDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_BlindedTailDecodeErrorZ_OK : Result_BlindedTailDecodeErrorZ {
		public readonly BlindedTail res;
		internal Result_BlindedTailDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_BlindedTailDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.BlindedTail res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.BlindedTail(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_BlindedTailDecodeErrorZ_Err : Result_BlindedTailDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_BlindedTailDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_BlindedTailDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_BlindedTailDecodeErrorZ in the success state.
	 */
	public static Result_BlindedTailDecodeErrorZ ok(org.ldk.structs.BlindedTail o) {
		long ret = bindings.CResult_BlindedTailDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedTailDecodeErrorZ ret_hu_conv = Result_BlindedTailDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_BlindedTailDecodeErrorZ in the error state.
	 */
	public static Result_BlindedTailDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_BlindedTailDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedTailDecodeErrorZ ret_hu_conv = Result_BlindedTailDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_BlindedTailDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_BlindedTailDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_BlindedTailDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_BlindedTailDecodeErrorZ clone() {
		long ret = bindings.CResult_BlindedTailDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedTailDecodeErrorZ ret_hu_conv = Result_BlindedTailDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
