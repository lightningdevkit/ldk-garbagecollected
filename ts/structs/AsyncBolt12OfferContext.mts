
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * The context of a payment made for a static invoice requested from a BOLT 12 [`Offer`].
 * 
 * [`Offer`]: crate::offers::offer::Offer
 */
export class AsyncBolt12OfferContext extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.AsyncBolt12OfferContext_free);
	}

	/**
	 * The [`Nonce`] used to verify that an inbound [`InvoiceRequest`] corresponds to this static
	 * invoice's offer.
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 */
	public get_offer_nonce(): Nonce {
		const ret: bigint = bindings.AsyncBolt12OfferContext_get_offer_nonce(this.ptr);
		const ret_hu_conv: Nonce = new Nonce(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The [`Nonce`] used to verify that an inbound [`InvoiceRequest`] corresponds to this static
	 * invoice's offer.
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 */
	public set_offer_nonce(val: Nonce): void {
		bindings.AsyncBolt12OfferContext_set_offer_nonce(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new AsyncBolt12OfferContext given each field
	 */
	public static constructor_new(offer_nonce_arg: Nonce): AsyncBolt12OfferContext {
		const ret: bigint = bindings.AsyncBolt12OfferContext_new(CommonBase.get_ptr_of(offer_nonce_arg));
		const ret_hu_conv: AsyncBolt12OfferContext = new AsyncBolt12OfferContext(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.AsyncBolt12OfferContext_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the AsyncBolt12OfferContext
	 */
	public clone(): AsyncBolt12OfferContext {
		const ret: bigint = bindings.AsyncBolt12OfferContext_clone(this.ptr);
		const ret_hu_conv: AsyncBolt12OfferContext = new AsyncBolt12OfferContext(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two AsyncBolt12OfferContexts contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: AsyncBolt12OfferContext): boolean {
		const ret: boolean = bindings.AsyncBolt12OfferContext_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the AsyncBolt12OfferContext object into a byte array which can be read by AsyncBolt12OfferContext_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.AsyncBolt12OfferContext_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a AsyncBolt12OfferContext from a byte array, created by AsyncBolt12OfferContext_write
	 */
	public static constructor_read(ser: Uint8Array): Result_AsyncBolt12OfferContextDecodeErrorZ {
		const ret: bigint = bindings.AsyncBolt12OfferContext_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_AsyncBolt12OfferContextDecodeErrorZ = Result_AsyncBolt12OfferContextDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
