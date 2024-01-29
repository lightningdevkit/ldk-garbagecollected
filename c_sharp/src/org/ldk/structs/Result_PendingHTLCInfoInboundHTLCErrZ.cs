using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_PendingHTLCInfoInboundHTLCErrZ : CommonBase {
	Result_PendingHTLCInfoInboundHTLCErrZ(object _dummy, long ptr) : base(ptr) { }
	~Result_PendingHTLCInfoInboundHTLCErrZ() {
		if (ptr != 0) { bindings.CResult_PendingHTLCInfoInboundHTLCErrZ_free(ptr); }
	}

	internal static Result_PendingHTLCInfoInboundHTLCErrZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PendingHTLCInfoInboundHTLCErrZ_is_ok(ptr)) {
			return new Result_PendingHTLCInfoInboundHTLCErrZ_OK(null, ptr);
		} else {
			return new Result_PendingHTLCInfoInboundHTLCErrZ_Err(null, ptr);
		}
	}
	public class Result_PendingHTLCInfoInboundHTLCErrZ_OK : Result_PendingHTLCInfoInboundHTLCErrZ {
		public readonly PendingHTLCInfo res;
		internal Result_PendingHTLCInfoInboundHTLCErrZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_PendingHTLCInfoInboundHTLCErrZ_get_ok(ptr);
			org.ldk.structs.PendingHTLCInfo res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.PendingHTLCInfo(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_PendingHTLCInfoInboundHTLCErrZ_Err : Result_PendingHTLCInfoInboundHTLCErrZ {
		public readonly InboundHTLCErr err;
		internal Result_PendingHTLCInfoInboundHTLCErrZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_PendingHTLCInfoInboundHTLCErrZ_get_err(ptr);
			org.ldk.structs.InboundHTLCErr err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new org.ldk.structs.InboundHTLCErr(null, err); }
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PendingHTLCInfoInboundHTLCErrZ in the success state.
	 */
	public static Result_PendingHTLCInfoInboundHTLCErrZ ok(org.ldk.structs.PendingHTLCInfo o) {
		long ret = bindings.CResult_PendingHTLCInfoInboundHTLCErrZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PendingHTLCInfoInboundHTLCErrZ ret_hu_conv = Result_PendingHTLCInfoInboundHTLCErrZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PendingHTLCInfoInboundHTLCErrZ in the error state.
	 */
	public static Result_PendingHTLCInfoInboundHTLCErrZ err(short e_err_code_arg, byte[] e_err_data_arg, string e_msg_arg) {
		long ret = bindings.CResult_PendingHTLCInfoInboundHTLCErrZ_err(bindings.InboundHTLCErr_new(e_err_code_arg, InternalUtils.encodeUint8Array(e_err_data_arg), InternalUtils.encodeString(e_msg_arg)));
		GC.KeepAlive(e_err_code_arg);
		GC.KeepAlive(e_err_data_arg);
		GC.KeepAlive(e_msg_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PendingHTLCInfoInboundHTLCErrZ ret_hu_conv = Result_PendingHTLCInfoInboundHTLCErrZ.constr_from_ptr(ret);
		;
		;
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_PendingHTLCInfoInboundHTLCErrZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
