package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_ChannelAnnouncementDecodeErrorZ extends CommonBase {
	private Result_ChannelAnnouncementDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ChannelAnnouncementDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ChannelAnnouncementDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ChannelAnnouncementDecodeErrorZ_result_ok(ptr)) {
			return new Result_ChannelAnnouncementDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ChannelAnnouncementDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ChannelAnnouncementDecodeErrorZ_OK extends Result_ChannelAnnouncementDecodeErrorZ {
		public final ChannelAnnouncement res;
		private Result_ChannelAnnouncementDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_ChannelAnnouncementDecodeErrorZ_get_ok(ptr);
			ChannelAnnouncement res_hu_conv = new ChannelAnnouncement(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ChannelAnnouncementDecodeErrorZ_Err extends Result_ChannelAnnouncementDecodeErrorZ {
		public final DecodeError err;
		private Result_ChannelAnnouncementDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_ChannelAnnouncementDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_ChannelAnnouncementDecodeErrorZ in the success state.
	 */
	public static Result_ChannelAnnouncementDecodeErrorZ ok(ChannelAnnouncement o) {
		long ret = bindings.CResult_ChannelAnnouncementDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_ChannelAnnouncementDecodeErrorZ ret_hu_conv = Result_ChannelAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ChannelAnnouncementDecodeErrorZ in the error state.
	 */
	public static Result_ChannelAnnouncementDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_ChannelAnnouncementDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_ChannelAnnouncementDecodeErrorZ ret_hu_conv = Result_ChannelAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ChannelAnnouncementDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ChannelAnnouncementDecodeErrorZ clone() {
		long ret = bindings.CResult_ChannelAnnouncementDecodeErrorZ_clone(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_ChannelAnnouncementDecodeErrorZ ret_hu_conv = Result_ChannelAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
