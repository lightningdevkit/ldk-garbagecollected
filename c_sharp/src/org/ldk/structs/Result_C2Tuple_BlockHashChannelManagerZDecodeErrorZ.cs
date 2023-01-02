using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ : CommonBase {
	Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_free(ptr); }
	}

	internal static Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_is_ok(ptr)) {
			return new Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_OK : Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ {
		public readonly TwoTuple_BlockHashChannelManagerZ res;
		internal Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_get_ok(ptr);
			TwoTuple_BlockHashChannelManagerZ res_hu_conv = new TwoTuple_BlockHashChannelManagerZ(null, res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_Err : Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ in the success state.
	 */
	public static Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ ok(org.ldk.structs.TwoTuple_BlockHashChannelManagerZ o) {
		long ret = bindings.CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_ok(o != null ? o.ptr : 0);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ ret_hu_conv = Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ in the error state.
	 */
	public static Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ ret_hu_conv = Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
