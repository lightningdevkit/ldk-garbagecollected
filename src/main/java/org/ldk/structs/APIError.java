package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class APIError extends CommonBase {
	private APIError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.APIError_free(ptr);
	}
	long conv_to_c() { assert false; return 0; /* Should only be called on subclasses */ }
	static APIError constr_from_ptr(long ptr) {
		bindings.LDKAPIError raw_val = bindings.LDKAPIError_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKAPIError.APIMisuseError.class) {
			return new APIMisuseError(ptr, (bindings.LDKAPIError.APIMisuseError)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKAPIError.FeeRateTooHigh.class) {
			return new FeeRateTooHigh(ptr, (bindings.LDKAPIError.FeeRateTooHigh)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKAPIError.RouteError.class) {
			return new RouteError(ptr, (bindings.LDKAPIError.RouteError)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKAPIError.ChannelUnavailable.class) {
			return new ChannelUnavailable(ptr, (bindings.LDKAPIError.ChannelUnavailable)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKAPIError.MonitorUpdateFailed.class) {
			return new MonitorUpdateFailed(ptr, (bindings.LDKAPIError.MonitorUpdateFailed)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class APIMisuseError extends APIError {
		public byte[] err;
		private APIMisuseError(long ptr, bindings.LDKAPIError.APIMisuseError obj) {
			super(null, ptr);
			this.err = obj.err;
		}
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class FeeRateTooHigh extends APIError {
		public byte[] err;
		public int feerate;
		private FeeRateTooHigh(long ptr, bindings.LDKAPIError.FeeRateTooHigh obj) {
			super(null, ptr);
			this.err = obj.err;
			this.feerate = obj.feerate;
		}
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class RouteError extends APIError {
		public String err;
		private RouteError(long ptr, bindings.LDKAPIError.RouteError obj) {
			super(null, ptr);
			this.err = obj.err;
		}
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class ChannelUnavailable extends APIError {
		public byte[] err;
		private ChannelUnavailable(long ptr, bindings.LDKAPIError.ChannelUnavailable obj) {
			super(null, ptr);
			this.err = obj.err;
		}
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class MonitorUpdateFailed extends APIError {
		private MonitorUpdateFailed(long ptr, bindings.LDKAPIError.MonitorUpdateFailed obj) {
			super(null, ptr);
		}
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
}
