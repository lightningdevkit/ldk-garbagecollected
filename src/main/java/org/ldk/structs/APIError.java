package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class APIError extends CommonBase {
	private APIError(Object _dummy, long ptr) { super(ptr); }
	long conv_to_c() { assert false; return 0; /* Should only be called on subclasses */ }
	static APIError constr_from_ptr(long ptr) {
		bindings.LDKAPIError raw_val = bindings.LDKAPIError_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKAPIError.APIMisuseError.class) {
			return new APIMisuseError(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKAPIError.FeeRateTooHigh.class) {
			return new FeeRateTooHigh(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKAPIError.RouteError.class) {
			return new RouteError(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKAPIError.ChannelUnavailable.class) {
			return new ChannelUnavailable(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKAPIError.MonitorUpdateFailed.class) {
			return new MonitorUpdateFailed(null, ptr);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class APIMisuseError extends APIError {
		public byte[] err;
		private APIMisuseError(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class FeeRateTooHigh extends APIError {
		public byte[] err;
		public int feerate;
		private FeeRateTooHigh(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class RouteError extends APIError {
		public String err;
		private RouteError(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class ChannelUnavailable extends APIError {
		public byte[] err;
		private ChannelUnavailable(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class MonitorUpdateFailed extends APIError {
		private MonitorUpdateFailed(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
}
