using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * The context of an inbound payment, which is included in a [`BlindedPaymentPath`] via
 * [`ReceiveTlvs`] and surfaced in [`PaymentPurpose`].
 * 
 * [`PaymentPurpose`]: crate::events::PaymentPurpose
 */
public class PaymentContext : CommonBase {
	protected PaymentContext(object _dummy, long ptr) : base(ptr) { }
	~PaymentContext() {
		if (ptr != 0) { bindings.PaymentContext_free(ptr); }
	}

	internal static PaymentContext constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKPaymentContext_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new PaymentContext_Bolt12Offer(ptr);
			case 1: return new PaymentContext_AsyncBolt12Offer(ptr);
			case 2: return new PaymentContext_Bolt12Refund(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A PaymentContext of type Bolt12Offer */
	public class PaymentContext_Bolt12Offer : PaymentContext {
		public org.ldk.structs.Bolt12OfferContext bolt12_offer;
		internal PaymentContext_Bolt12Offer(long ptr) : base(null, ptr) {
			long bolt12_offer = bindings.LDKPaymentContext_Bolt12Offer_get_bolt12_offer(ptr);
			org.ldk.structs.Bolt12OfferContext bolt12_offer_hu_conv = null; if (bolt12_offer < 0 || bolt12_offer > 4096) { bolt12_offer_hu_conv = new org.ldk.structs.Bolt12OfferContext(null, bolt12_offer); }
			if (bolt12_offer_hu_conv != null) { bolt12_offer_hu_conv.ptrs_to.AddLast(this); };
			this.bolt12_offer = bolt12_offer_hu_conv;
		}
	}
	/** A PaymentContext of type AsyncBolt12Offer */
	public class PaymentContext_AsyncBolt12Offer : PaymentContext {
		public org.ldk.structs.AsyncBolt12OfferContext async_bolt12_offer;
		internal PaymentContext_AsyncBolt12Offer(long ptr) : base(null, ptr) {
			long async_bolt12_offer = bindings.LDKPaymentContext_AsyncBolt12Offer_get_async_bolt12_offer(ptr);
			org.ldk.structs.AsyncBolt12OfferContext async_bolt12_offer_hu_conv = null; if (async_bolt12_offer < 0 || async_bolt12_offer > 4096) { async_bolt12_offer_hu_conv = new org.ldk.structs.AsyncBolt12OfferContext(null, async_bolt12_offer); }
			if (async_bolt12_offer_hu_conv != null) { async_bolt12_offer_hu_conv.ptrs_to.AddLast(this); };
			this.async_bolt12_offer = async_bolt12_offer_hu_conv;
		}
	}
	/** A PaymentContext of type Bolt12Refund */
	public class PaymentContext_Bolt12Refund : PaymentContext {
		public org.ldk.structs.Bolt12RefundContext bolt12_refund;
		internal PaymentContext_Bolt12Refund(long ptr) : base(null, ptr) {
			long bolt12_refund = bindings.LDKPaymentContext_Bolt12Refund_get_bolt12_refund(ptr);
			org.ldk.structs.Bolt12RefundContext bolt12_refund_hu_conv = null; if (bolt12_refund < 0 || bolt12_refund > 4096) { bolt12_refund_hu_conv = new org.ldk.structs.Bolt12RefundContext(null, bolt12_refund); }
			if (bolt12_refund_hu_conv != null) { bolt12_refund_hu_conv.ptrs_to.AddLast(this); };
			this.bolt12_refund = bolt12_refund_hu_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.PaymentContext_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the PaymentContext
	 */
	public org.ldk.structs.PaymentContext clone() {
		long ret = bindings.PaymentContext_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentContext ret_hu_conv = org.ldk.structs.PaymentContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Bolt12Offer-variant PaymentContext
	 */
	public static org.ldk.structs.PaymentContext bolt12_offer(org.ldk.structs.Bolt12OfferContext a) {
		long ret = bindings.PaymentContext_bolt12_offer(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentContext ret_hu_conv = org.ldk.structs.PaymentContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new AsyncBolt12Offer-variant PaymentContext
	 */
	public static org.ldk.structs.PaymentContext async_bolt12_offer(org.ldk.structs.AsyncBolt12OfferContext a) {
		long ret = bindings.PaymentContext_async_bolt12_offer(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentContext ret_hu_conv = org.ldk.structs.PaymentContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Bolt12Refund-variant PaymentContext
	 */
	public static org.ldk.structs.PaymentContext bolt12_refund(org.ldk.structs.Bolt12RefundContext a) {
		long ret = bindings.PaymentContext_bolt12_refund(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentContext ret_hu_conv = org.ldk.structs.PaymentContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two PaymentContexts contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.PaymentContext b) {
		bool ret = bindings.PaymentContext_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is PaymentContext)) return false;
		return this.eq((PaymentContext)o);
	}
	/**
	 * Serialize the PaymentContext object into a byte array which can be read by PaymentContext_read
	 */
	public byte[] write() {
		long ret = bindings.PaymentContext_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a PaymentContext from a byte array, created by PaymentContext_write
	 */
	public static org.ldk.structs.Result_PaymentContextDecodeErrorZ read(byte[] ser) {
		long ret = bindings.PaymentContext_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentContextDecodeErrorZ ret_hu_conv = Result_PaymentContextDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
