
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * The context of a payment made for an invoice requested from a BOLT 12 [`Offer`].
 * 
 * [`Offer`]: crate::offers::offer::Offer
 */
export class Bolt12OfferContext extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Bolt12OfferContext_free);
	}

	/**
	 * The identifier of the [`Offer`].
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 */
	public get_offer_id(): OfferId {
		const ret: bigint = bindings.Bolt12OfferContext_get_offer_id(this.ptr);
		const ret_hu_conv: OfferId = new OfferId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The identifier of the [`Offer`].
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 */
	public set_offer_id(val: OfferId): void {
		bindings.Bolt12OfferContext_set_offer_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Fields from an [`InvoiceRequest`] sent for a [`Bolt12Invoice`].
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 */
	public get_invoice_request(): InvoiceRequestFields {
		const ret: bigint = bindings.Bolt12OfferContext_get_invoice_request(this.ptr);
		const ret_hu_conv: InvoiceRequestFields = new InvoiceRequestFields(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Fields from an [`InvoiceRequest`] sent for a [`Bolt12Invoice`].
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 */
	public set_invoice_request(val: InvoiceRequestFields): void {
		bindings.Bolt12OfferContext_set_invoice_request(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new Bolt12OfferContext given each field
	 */
	public static constructor_new(offer_id_arg: OfferId, invoice_request_arg: InvoiceRequestFields): Bolt12OfferContext {
		const ret: bigint = bindings.Bolt12OfferContext_new(CommonBase.get_ptr_of(offer_id_arg), CommonBase.get_ptr_of(invoice_request_arg));
		const ret_hu_conv: Bolt12OfferContext = new Bolt12OfferContext(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Bolt12OfferContext_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt12OfferContext
	 */
	public clone(): Bolt12OfferContext {
		const ret: bigint = bindings.Bolt12OfferContext_clone(this.ptr);
		const ret_hu_conv: Bolt12OfferContext = new Bolt12OfferContext(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two Bolt12OfferContexts contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: Bolt12OfferContext): boolean {
		const ret: boolean = bindings.Bolt12OfferContext_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the Bolt12OfferContext object into a byte array which can be read by Bolt12OfferContext_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.Bolt12OfferContext_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Bolt12OfferContext from a byte array, created by Bolt12OfferContext_write
	 */
	public static constructor_read(ser: Uint8Array): Result_Bolt12OfferContextDecodeErrorZ {
		const ret: bigint = bindings.Bolt12OfferContext_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_Bolt12OfferContextDecodeErrorZ = Result_Bolt12OfferContextDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
