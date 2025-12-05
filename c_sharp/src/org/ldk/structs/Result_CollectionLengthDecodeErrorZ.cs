using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_CollectionLengthDecodeErrorZ : CommonBase {
	Result_CollectionLengthDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_CollectionLengthDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_CollectionLengthDecodeErrorZ_free(ptr); }
	}

	internal static Result_CollectionLengthDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CollectionLengthDecodeErrorZ_is_ok(ptr)) {
			return new Result_CollectionLengthDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_CollectionLengthDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_CollectionLengthDecodeErrorZ_OK : Result_CollectionLengthDecodeErrorZ {
		public readonly CollectionLength res;
		internal Result_CollectionLengthDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_CollectionLengthDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.CollectionLength res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.CollectionLength(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_CollectionLengthDecodeErrorZ_Err : Result_CollectionLengthDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_CollectionLengthDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_CollectionLengthDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_CollectionLengthDecodeErrorZ in the success state.
	 */
	public static org.ldk.structs.Result_CollectionLengthDecodeErrorZ ok(long o_a_arg) {
		long ret = bindings.CResult_CollectionLengthDecodeErrorZ_ok(bindings.CollectionLength_new(o_a_arg));
		GC.KeepAlive(o_a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CollectionLengthDecodeErrorZ ret_hu_conv = Result_CollectionLengthDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CollectionLengthDecodeErrorZ in the error state.
	 */
	public static org.ldk.structs.Result_CollectionLengthDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_CollectionLengthDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CollectionLengthDecodeErrorZ ret_hu_conv = Result_CollectionLengthDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_CollectionLengthDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
