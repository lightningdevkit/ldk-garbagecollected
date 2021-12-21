package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Indicates an error on the client's part (usually some variant of attempting to use too-low or
 * too-high values)
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class APIError extends CommonBase {
	private APIError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.APIError_free(ptr); }
	}
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
		if (raw_val.getClass() == bindings.LDKAPIError.IncompatibleShutdownScript.class) {
			return new IncompatibleShutdownScript(ptr, (bindings.LDKAPIError.IncompatibleShutdownScript)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * Indicates the API was wholly misused (see err for more). Cases where these can be returned
	 * are documented, but generally indicates some precondition of a function was violated.
	 */
	public final static class APIMisuseError extends APIError {
		/**
		 * A human-readable error message
		*/
		public final String err;
		private APIMisuseError(long ptr, bindings.LDKAPIError.APIMisuseError obj) {
			super(null, ptr);
			this.err = obj.err;
		}
	}
	/**
	 * Due to a high feerate, we were unable to complete the request.
	 * For example, this may be returned if the feerate implies we cannot open a channel at the
	 * requested value, but opening a larger channel would succeed.
	 */
	public final static class FeeRateTooHigh extends APIError {
		/**
		 * A human-readable error message
		*/
		public final String err;
		/**
		 * The feerate which was too high.
		*/
		public final int feerate;
		private FeeRateTooHigh(long ptr, bindings.LDKAPIError.FeeRateTooHigh obj) {
			super(null, ptr);
			this.err = obj.err;
			this.feerate = obj.feerate;
		}
	}
	/**
	 * A malformed Route was provided (eg overflowed value, node id mismatch, overly-looped route,
	 * too-many-hops, etc).
	 */
	public final static class RouteError extends APIError {
		/**
		 * A human-readable error message
		*/
		public final String err;
		private RouteError(long ptr, bindings.LDKAPIError.RouteError obj) {
			super(null, ptr);
			this.err = obj.err;
		}
	}
	/**
	 * We were unable to complete the request as the Channel required to do so is unable to
	 * complete the request (or was not found). This can take many forms, including disconnected
	 * peer, channel at capacity, channel shutting down, etc.
	 */
	public final static class ChannelUnavailable extends APIError {
		/**
		 * A human-readable error message
		*/
		public final String err;
		private ChannelUnavailable(long ptr, bindings.LDKAPIError.ChannelUnavailable obj) {
			super(null, ptr);
			this.err = obj.err;
		}
	}
	/**
	 * An attempt to call watch/update_channel returned an Err (ie you did this!), causing the
	 * attempted action to fail.
	 */
	public final static class MonitorUpdateFailed extends APIError {
		private MonitorUpdateFailed(long ptr, bindings.LDKAPIError.MonitorUpdateFailed obj) {
			super(null, ptr);
		}
	}
	/**
	 * [`KeysInterface::get_shutdown_scriptpubkey`] returned a shutdown scriptpubkey incompatible
	 * with the channel counterparty as negotiated in [`InitFeatures`].
	 * 
	 * Using a SegWit v0 script should resolve this issue. If you cannot, you won't be able to open
	 * a channel or cooperatively close one with this peer (and will have to force-close instead).
	 * 
	 * [`KeysInterface::get_shutdown_scriptpubkey`]: crate::chain::keysinterface::KeysInterface::get_shutdown_scriptpubkey
	 * [`InitFeatures`]: crate::ln::features::InitFeatures
	 */
	public final static class IncompatibleShutdownScript extends APIError {
		/**
		 * The incompatible shutdown script.
		*/
		public final ShutdownScript script;
		private IncompatibleShutdownScript(long ptr, bindings.LDKAPIError.IncompatibleShutdownScript obj) {
			super(null, ptr);
			long script = obj.script;
			ShutdownScript script_hu_conv = null; if (script < 0 || script > 4096) { script_hu_conv = new ShutdownScript(null, script); }
			script_hu_conv.ptrs_to.add(this);
			this.script = script_hu_conv;
		}
	}
	long clone_ptr() {
		long ret = bindings.APIError_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the APIError
	 */
	public APIError clone() {
		long ret = bindings.APIError_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		APIError ret_hu_conv = APIError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new APIMisuseError-variant APIError
	 */
	public static APIError apimisuse_error(java.lang.String err) {
		long ret = bindings.APIError_apimisuse_error(err);
		Reference.reachabilityFence(err);
		if (ret >= 0 && ret <= 4096) { return null; }
		APIError ret_hu_conv = APIError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FeeRateTooHigh-variant APIError
	 */
	public static APIError fee_rate_too_high(java.lang.String err, int feerate) {
		long ret = bindings.APIError_fee_rate_too_high(err, feerate);
		Reference.reachabilityFence(err);
		Reference.reachabilityFence(feerate);
		if (ret >= 0 && ret <= 4096) { return null; }
		APIError ret_hu_conv = APIError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new RouteError-variant APIError
	 */
	public static APIError route_error(java.lang.String err) {
		long ret = bindings.APIError_route_error(err);
		Reference.reachabilityFence(err);
		if (ret >= 0 && ret <= 4096) { return null; }
		APIError ret_hu_conv = APIError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelUnavailable-variant APIError
	 */
	public static APIError channel_unavailable(java.lang.String err) {
		long ret = bindings.APIError_channel_unavailable(err);
		Reference.reachabilityFence(err);
		if (ret >= 0 && ret <= 4096) { return null; }
		APIError ret_hu_conv = APIError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new MonitorUpdateFailed-variant APIError
	 */
	public static APIError monitor_update_failed() {
		long ret = bindings.APIError_monitor_update_failed();
		if (ret >= 0 && ret <= 4096) { return null; }
		APIError ret_hu_conv = APIError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IncompatibleShutdownScript-variant APIError
	 */
	public static APIError incompatible_shutdown_script(ShutdownScript script) {
		long ret = bindings.APIError_incompatible_shutdown_script(script == null ? 0 : script.ptr & ~1);
		Reference.reachabilityFence(script);
		if (ret >= 0 && ret <= 4096) { return null; }
		APIError ret_hu_conv = APIError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
