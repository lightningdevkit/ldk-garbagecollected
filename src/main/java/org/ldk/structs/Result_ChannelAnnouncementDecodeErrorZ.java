package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
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
		public Result_ChannelAnnouncementDecodeErrorZ_OK(ChannelAnnouncement res) {
			this(null, bindings.CResult_ChannelAnnouncementDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
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
		public Result_ChannelAnnouncementDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_ChannelAnnouncementDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
