
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * The context of an inbound payment, which is included in a [`BlindedPaymentPath`] via
 * [`ReceiveTlvs`] and surfaced in [`PaymentPurpose`].
 * 
 * [`PaymentPurpose`]: crate::events::PaymentPurpose
 */
export class PaymentContext extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.PaymentContext_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): PaymentContext {
		const raw_ty: number = bindings.LDKPaymentContext_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new PaymentContext_Bolt12Offer(ptr);
			case 1: return new PaymentContext_AsyncBolt12Offer(ptr);
			case 2: return new PaymentContext_Bolt12Refund(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.PaymentContext_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the PaymentContext
	 */
	public clone(): PaymentContext {
		const ret: bigint = bindings.PaymentContext_clone(this.ptr);
		const ret_hu_conv: PaymentContext = PaymentContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Bolt12Offer-variant PaymentContext
	 */
	public static constructor_bolt12_offer(a: Bolt12OfferContext): PaymentContext {
		const ret: bigint = bindings.PaymentContext_bolt12_offer(CommonBase.get_ptr_of(a));
		const ret_hu_conv: PaymentContext = PaymentContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new AsyncBolt12Offer-variant PaymentContext
	 */
	public static constructor_async_bolt12_offer(a: AsyncBolt12OfferContext): PaymentContext {
		const ret: bigint = bindings.PaymentContext_async_bolt12_offer(CommonBase.get_ptr_of(a));
		const ret_hu_conv: PaymentContext = PaymentContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Bolt12Refund-variant PaymentContext
	 */
	public static constructor_bolt12_refund(a: Bolt12RefundContext): PaymentContext {
		const ret: bigint = bindings.PaymentContext_bolt12_refund(CommonBase.get_ptr_of(a));
		const ret_hu_conv: PaymentContext = PaymentContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two PaymentContexts contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: PaymentContext): boolean {
		const ret: boolean = bindings.PaymentContext_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the PaymentContext object into a byte array which can be read by PaymentContext_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.PaymentContext_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a PaymentContext from a byte array, created by PaymentContext_write
	 */
	public static constructor_read(ser: Uint8Array): Result_PaymentContextDecodeErrorZ {
		const ret: bigint = bindings.PaymentContext_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_PaymentContextDecodeErrorZ = Result_PaymentContextDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
/** A PaymentContext of type Bolt12Offer */
export class PaymentContext_Bolt12Offer extends PaymentContext {
	public bolt12_offer: Bolt12OfferContext;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const bolt12_offer: bigint = bindings.LDKPaymentContext_Bolt12Offer_get_bolt12_offer(ptr);
		const bolt12_offer_hu_conv: Bolt12OfferContext = new Bolt12OfferContext(null, bolt12_offer);
			CommonBase.add_ref_from(bolt12_offer_hu_conv, this);
		this.bolt12_offer = bolt12_offer_hu_conv;
	}
}
/** A PaymentContext of type AsyncBolt12Offer */
export class PaymentContext_AsyncBolt12Offer extends PaymentContext {
	public async_bolt12_offer: AsyncBolt12OfferContext;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const async_bolt12_offer: bigint = bindings.LDKPaymentContext_AsyncBolt12Offer_get_async_bolt12_offer(ptr);
		const async_bolt12_offer_hu_conv: AsyncBolt12OfferContext = new AsyncBolt12OfferContext(null, async_bolt12_offer);
			CommonBase.add_ref_from(async_bolt12_offer_hu_conv, this);
		this.async_bolt12_offer = async_bolt12_offer_hu_conv;
	}
}
/** A PaymentContext of type Bolt12Refund */
export class PaymentContext_Bolt12Refund extends PaymentContext {
	public bolt12_refund: Bolt12RefundContext;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const bolt12_refund: bigint = bindings.LDKPaymentContext_Bolt12Refund_get_bolt12_refund(ptr);
		const bolt12_refund_hu_conv: Bolt12RefundContext = new Bolt12RefundContext(null, bolt12_refund);
			CommonBase.add_ref_from(bolt12_refund_hu_conv, this);
		this.bolt12_refund = bolt12_refund_hu_conv;
	}
}
