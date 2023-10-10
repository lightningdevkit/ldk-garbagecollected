using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_CounterpartyChannelTransactionParametersDecodeErrorZ : CommonBase {
	Result_CounterpartyChannelTransactionParametersDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_CounterpartyChannelTransactionParametersDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_free(ptr); }
	}

	internal static Result_CounterpartyChannelTransactionParametersDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_is_ok(ptr)) {
			return new Result_CounterpartyChannelTransactionParametersDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_CounterpartyChannelTransactionParametersDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_CounterpartyChannelTransactionParametersDecodeErrorZ_OK : Result_CounterpartyChannelTransactionParametersDecodeErrorZ {
		public readonly CounterpartyChannelTransactionParameters res;
		internal Result_CounterpartyChannelTransactionParametersDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.CounterpartyChannelTransactionParameters res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.CounterpartyChannelTransactionParameters(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_CounterpartyChannelTransactionParametersDecodeErrorZ_Err : Result_CounterpartyChannelTransactionParametersDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_CounterpartyChannelTransactionParametersDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_CounterpartyChannelTransactionParametersDecodeErrorZ in the success state.
	 */
	public static Result_CounterpartyChannelTransactionParametersDecodeErrorZ ok(org.ldk.structs.CounterpartyChannelTransactionParameters o) {
		long ret = bindings.CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CounterpartyChannelTransactionParametersDecodeErrorZ ret_hu_conv = Result_CounterpartyChannelTransactionParametersDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CounterpartyChannelTransactionParametersDecodeErrorZ in the error state.
	 */
	public static Result_CounterpartyChannelTransactionParametersDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CounterpartyChannelTransactionParametersDecodeErrorZ ret_hu_conv = Result_CounterpartyChannelTransactionParametersDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_CounterpartyChannelTransactionParametersDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CounterpartyChannelTransactionParametersDecodeErrorZ clone() {
		long ret = bindings.CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CounterpartyChannelTransactionParametersDecodeErrorZ ret_hu_conv = Result_CounterpartyChannelTransactionParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
