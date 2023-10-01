package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Indicates that we failed to send a payment probe. Further errors may be surfaced later via
 * [`Event::ProbeFailed`].
 * 
 * [`Event::ProbeFailed`]: crate::events::Event::ProbeFailed
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ProbeSendFailure extends CommonBase {
	private ProbeSendFailure(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ProbeSendFailure_free(ptr); }
	}
	static ProbeSendFailure constr_from_ptr(long ptr) {
		bindings.LDKProbeSendFailure raw_val = bindings.LDKProbeSendFailure_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKProbeSendFailure.RouteNotFound.class) {
			return new RouteNotFound(ptr, (bindings.LDKProbeSendFailure.RouteNotFound)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKProbeSendFailure.SendingFailed.class) {
			return new SendingFailed(ptr, (bindings.LDKProbeSendFailure.SendingFailed)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * We were unable to find a route to the destination.
	 */
	public final static class RouteNotFound extends ProbeSendFailure {
		private RouteNotFound(long ptr, bindings.LDKProbeSendFailure.RouteNotFound obj) {
			super(null, ptr);
		}
	}
	/**
	 * We failed to send the payment probes.
	 */
	public final static class SendingFailed extends ProbeSendFailure {
		public final org.ldk.structs.PaymentSendFailure sending_failed;
		private SendingFailed(long ptr, bindings.LDKProbeSendFailure.SendingFailed obj) {
			super(null, ptr);
			long sending_failed = obj.sending_failed;
			org.ldk.structs.PaymentSendFailure sending_failed_hu_conv = org.ldk.structs.PaymentSendFailure.constr_from_ptr(sending_failed);
			if (sending_failed_hu_conv != null) { sending_failed_hu_conv.ptrs_to.add(this); };
			this.sending_failed = sending_failed_hu_conv;
		}
	}
	long clone_ptr() {
		long ret = bindings.ProbeSendFailure_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ProbeSendFailure
	 */
	public ProbeSendFailure clone() {
		long ret = bindings.ProbeSendFailure_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbeSendFailure ret_hu_conv = org.ldk.structs.ProbeSendFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new RouteNotFound-variant ProbeSendFailure
	 */
	public static ProbeSendFailure route_not_found() {
		long ret = bindings.ProbeSendFailure_route_not_found();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbeSendFailure ret_hu_conv = org.ldk.structs.ProbeSendFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendingFailed-variant ProbeSendFailure
	 */
	public static ProbeSendFailure sending_failed(org.ldk.structs.PaymentSendFailure a) {
		long ret = bindings.ProbeSendFailure_sending_failed(a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbeSendFailure ret_hu_conv = org.ldk.structs.ProbeSendFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two ProbeSendFailures contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.ProbeSendFailure b) {
		boolean ret = bindings.ProbeSendFailure_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof ProbeSendFailure)) return false;
		return this.eq((ProbeSendFailure)o);
	}
}
