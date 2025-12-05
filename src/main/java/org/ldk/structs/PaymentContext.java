package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The context of an inbound payment, which is included in a [`BlindedPaymentPath`] via
 * [`ReceiveTlvs`] and surfaced in [`PaymentPurpose`].
 * 
 * [`PaymentPurpose`]: crate::events::PaymentPurpose
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PaymentContext extends CommonBase {
	private PaymentContext(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PaymentContext_free(ptr); }
	}
	static PaymentContext constr_from_ptr(long ptr) {
		bindings.LDKPaymentContext raw_val = bindings.LDKPaymentContext_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKPaymentContext.Bolt12Offer.class) {
			return new Bolt12Offer(ptr, (bindings.LDKPaymentContext.Bolt12Offer)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKPaymentContext.AsyncBolt12Offer.class) {
			return new AsyncBolt12Offer(ptr, (bindings.LDKPaymentContext.AsyncBolt12Offer)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKPaymentContext.Bolt12Refund.class) {
			return new Bolt12Refund(ptr, (bindings.LDKPaymentContext.Bolt12Refund)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * The payment was made for an invoice requested from a BOLT 12 [`Offer`].
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 */
	public final static class Bolt12Offer extends PaymentContext {
		public final org.ldk.structs.Bolt12OfferContext bolt12_offer;
		private Bolt12Offer(long ptr, bindings.LDKPaymentContext.Bolt12Offer obj) {
			super(null, ptr);
			long bolt12_offer = obj.bolt12_offer;
			org.ldk.structs.Bolt12OfferContext bolt12_offer_hu_conv = null; if (bolt12_offer < 0 || bolt12_offer > 4096) { bolt12_offer_hu_conv = new org.ldk.structs.Bolt12OfferContext(null, bolt12_offer); }
			if (bolt12_offer_hu_conv != null) { bolt12_offer_hu_conv.ptrs_to.add(this); };
			this.bolt12_offer = bolt12_offer_hu_conv;
		}
	}
	/**
	 * The payment was made for a static invoice requested from a BOLT 12 [`Offer`].
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 */
	public final static class AsyncBolt12Offer extends PaymentContext {
		public final org.ldk.structs.AsyncBolt12OfferContext async_bolt12_offer;
		private AsyncBolt12Offer(long ptr, bindings.LDKPaymentContext.AsyncBolt12Offer obj) {
			super(null, ptr);
			long async_bolt12_offer = obj.async_bolt12_offer;
			org.ldk.structs.AsyncBolt12OfferContext async_bolt12_offer_hu_conv = null; if (async_bolt12_offer < 0 || async_bolt12_offer > 4096) { async_bolt12_offer_hu_conv = new org.ldk.structs.AsyncBolt12OfferContext(null, async_bolt12_offer); }
			if (async_bolt12_offer_hu_conv != null) { async_bolt12_offer_hu_conv.ptrs_to.add(this); };
			this.async_bolt12_offer = async_bolt12_offer_hu_conv;
		}
	}
	/**
	 * The payment was made for an invoice sent for a BOLT 12 [`Refund`].
	 * 
	 * [`Refund`]: crate::offers::refund::Refund
	 */
	public final static class Bolt12Refund extends PaymentContext {
		public final org.ldk.structs.Bolt12RefundContext bolt12_refund;
		private Bolt12Refund(long ptr, bindings.LDKPaymentContext.Bolt12Refund obj) {
			super(null, ptr);
			long bolt12_refund = obj.bolt12_refund;
			org.ldk.structs.Bolt12RefundContext bolt12_refund_hu_conv = null; if (bolt12_refund < 0 || bolt12_refund > 4096) { bolt12_refund_hu_conv = new org.ldk.structs.Bolt12RefundContext(null, bolt12_refund); }
			if (bolt12_refund_hu_conv != null) { bolt12_refund_hu_conv.ptrs_to.add(this); };
			this.bolt12_refund = bolt12_refund_hu_conv;
		}
	}
	long clone_ptr() {
		long ret = bindings.PaymentContext_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the PaymentContext
	 */
	public PaymentContext clone() {
		long ret = bindings.PaymentContext_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentContext ret_hu_conv = org.ldk.structs.PaymentContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Bolt12Offer-variant PaymentContext
	 */
	public static PaymentContext bolt12_offer(org.ldk.structs.Bolt12OfferContext a) {
		long ret = bindings.PaymentContext_bolt12_offer(a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentContext ret_hu_conv = org.ldk.structs.PaymentContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new AsyncBolt12Offer-variant PaymentContext
	 */
	public static PaymentContext async_bolt12_offer(org.ldk.structs.AsyncBolt12OfferContext a) {
		long ret = bindings.PaymentContext_async_bolt12_offer(a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentContext ret_hu_conv = org.ldk.structs.PaymentContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Bolt12Refund-variant PaymentContext
	 */
	public static PaymentContext bolt12_refund(org.ldk.structs.Bolt12RefundContext a) {
		long ret = bindings.PaymentContext_bolt12_refund(a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentContext ret_hu_conv = org.ldk.structs.PaymentContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two PaymentContexts contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.PaymentContext b) {
		boolean ret = bindings.PaymentContext_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof PaymentContext)) return false;
		return this.eq((PaymentContext)o);
	}
	/**
	 * Serialize the PaymentContext object into a byte array which can be read by PaymentContext_read
	 */
	public byte[] write() {
		byte[] ret = bindings.PaymentContext_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a PaymentContext from a byte array, created by PaymentContext_write
	 */
	public static Result_PaymentContextDecodeErrorZ read(byte[] ser) {
		long ret = bindings.PaymentContext_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentContextDecodeErrorZ ret_hu_conv = Result_PaymentContextDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
