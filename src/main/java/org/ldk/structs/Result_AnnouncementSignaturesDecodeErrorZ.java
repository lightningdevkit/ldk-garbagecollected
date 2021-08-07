package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_AnnouncementSignaturesDecodeErrorZ extends CommonBase {
	private Result_AnnouncementSignaturesDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_AnnouncementSignaturesDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_AnnouncementSignaturesDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_AnnouncementSignaturesDecodeErrorZ_result_ok(ptr)) {
			return new Result_AnnouncementSignaturesDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_AnnouncementSignaturesDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_AnnouncementSignaturesDecodeErrorZ_OK extends Result_AnnouncementSignaturesDecodeErrorZ {
		public final AnnouncementSignatures res;
		private Result_AnnouncementSignaturesDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_AnnouncementSignaturesDecodeErrorZ_get_ok(ptr);
			AnnouncementSignatures res_hu_conv = new AnnouncementSignatures(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_AnnouncementSignaturesDecodeErrorZ_Err extends Result_AnnouncementSignaturesDecodeErrorZ {
		public final DecodeError err;
		private Result_AnnouncementSignaturesDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_AnnouncementSignaturesDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_AnnouncementSignaturesDecodeErrorZ in the success state.
	 */
	public static Result_AnnouncementSignaturesDecodeErrorZ ok(AnnouncementSignatures o) {
		long ret = bindings.CResult_AnnouncementSignaturesDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		if (ret < 1024) { return null; }
		Result_AnnouncementSignaturesDecodeErrorZ ret_hu_conv = Result_AnnouncementSignaturesDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_AnnouncementSignaturesDecodeErrorZ in the error state.
	 */
	public static Result_AnnouncementSignaturesDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_AnnouncementSignaturesDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		if (ret < 1024) { return null; }
		Result_AnnouncementSignaturesDecodeErrorZ ret_hu_conv = Result_AnnouncementSignaturesDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_AnnouncementSignaturesDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_AnnouncementSignaturesDecodeErrorZ clone() {
		long ret = bindings.CResult_AnnouncementSignaturesDecodeErrorZ_clone(this.ptr);
		if (ret < 1024) { return null; }
		Result_AnnouncementSignaturesDecodeErrorZ ret_hu_conv = Result_AnnouncementSignaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
