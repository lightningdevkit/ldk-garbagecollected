package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_PendingHTLCInfoInboundHTLCErrZ extends CommonBase {
	private Result_PendingHTLCInfoInboundHTLCErrZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PendingHTLCInfoInboundHTLCErrZ_free(ptr); } super.finalize();
	}

	static Result_PendingHTLCInfoInboundHTLCErrZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PendingHTLCInfoInboundHTLCErrZ_is_ok(ptr)) {
			return new Result_PendingHTLCInfoInboundHTLCErrZ_OK(null, ptr);
		} else {
			return new Result_PendingHTLCInfoInboundHTLCErrZ_Err(null, ptr);
		}
	}
	public static final class Result_PendingHTLCInfoInboundHTLCErrZ_OK extends Result_PendingHTLCInfoInboundHTLCErrZ {
		public final PendingHTLCInfo res;
		private Result_PendingHTLCInfoInboundHTLCErrZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_PendingHTLCInfoInboundHTLCErrZ_get_ok(ptr);
			org.ldk.structs.PendingHTLCInfo res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.PendingHTLCInfo(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_PendingHTLCInfoInboundHTLCErrZ_Err extends Result_PendingHTLCInfoInboundHTLCErrZ {
		public final InboundHTLCErr err;
		private Result_PendingHTLCInfoInboundHTLCErrZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_PendingHTLCInfoInboundHTLCErrZ_get_err(ptr);
			org.ldk.structs.InboundHTLCErr err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new org.ldk.structs.InboundHTLCErr(null, err); }
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PendingHTLCInfoInboundHTLCErrZ in the success state.
	 */
	public static Result_PendingHTLCInfoInboundHTLCErrZ ok(org.ldk.structs.PendingHTLCInfo o) {
		long ret = bindings.CResult_PendingHTLCInfoInboundHTLCErrZ_ok(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PendingHTLCInfoInboundHTLCErrZ ret_hu_conv = Result_PendingHTLCInfoInboundHTLCErrZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PendingHTLCInfoInboundHTLCErrZ in the error state.
	 */
	public static Result_PendingHTLCInfoInboundHTLCErrZ err(short e_err_code_arg, byte[] e_err_data_arg, String e_msg_arg) {
		long ret = bindings.CResult_PendingHTLCInfoInboundHTLCErrZ_err(bindings.InboundHTLCErr_new(e_err_code_arg, e_err_data_arg, e_msg_arg));
		Reference.reachabilityFence(e_err_code_arg);
		Reference.reachabilityFence(e_err_data_arg);
		Reference.reachabilityFence(e_msg_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PendingHTLCInfoInboundHTLCErrZ ret_hu_conv = Result_PendingHTLCInfoInboundHTLCErrZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_PendingHTLCInfoInboundHTLCErrZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
