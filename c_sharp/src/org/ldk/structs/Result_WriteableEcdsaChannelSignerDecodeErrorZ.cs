using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_WriteableEcdsaChannelSignerDecodeErrorZ : CommonBase {
	Result_WriteableEcdsaChannelSignerDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_WriteableEcdsaChannelSignerDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_WriteableEcdsaChannelSignerDecodeErrorZ_free(ptr); }
	}

	internal static Result_WriteableEcdsaChannelSignerDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_WriteableEcdsaChannelSignerDecodeErrorZ_is_ok(ptr)) {
			return new Result_WriteableEcdsaChannelSignerDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_WriteableEcdsaChannelSignerDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_WriteableEcdsaChannelSignerDecodeErrorZ_OK : Result_WriteableEcdsaChannelSignerDecodeErrorZ {
		public readonly WriteableEcdsaChannelSigner res;
		internal Result_WriteableEcdsaChannelSignerDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_WriteableEcdsaChannelSignerDecodeErrorZ_get_ok(ptr);
			WriteableEcdsaChannelSigner ret_hu_conv = new WriteableEcdsaChannelSigner(null, res);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
			this.res = ret_hu_conv;
		}
	}

	public class Result_WriteableEcdsaChannelSignerDecodeErrorZ_Err : Result_WriteableEcdsaChannelSignerDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_WriteableEcdsaChannelSignerDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_WriteableEcdsaChannelSignerDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_WriteableEcdsaChannelSignerDecodeErrorZ in the success state.
	 */
	public static Result_WriteableEcdsaChannelSignerDecodeErrorZ ok(org.ldk.structs.WriteableEcdsaChannelSigner o) {
		long ret = bindings.CResult_WriteableEcdsaChannelSignerDecodeErrorZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_WriteableEcdsaChannelSignerDecodeErrorZ ret_hu_conv = Result_WriteableEcdsaChannelSignerDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_WriteableEcdsaChannelSignerDecodeErrorZ in the error state.
	 */
	public static Result_WriteableEcdsaChannelSignerDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_WriteableEcdsaChannelSignerDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_WriteableEcdsaChannelSignerDecodeErrorZ ret_hu_conv = Result_WriteableEcdsaChannelSignerDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_WriteableEcdsaChannelSignerDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_WriteableEcdsaChannelSignerDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_WriteableEcdsaChannelSignerDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_WriteableEcdsaChannelSignerDecodeErrorZ clone() {
		long ret = bindings.CResult_WriteableEcdsaChannelSignerDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_WriteableEcdsaChannelSignerDecodeErrorZ ret_hu_conv = Result_WriteableEcdsaChannelSignerDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
