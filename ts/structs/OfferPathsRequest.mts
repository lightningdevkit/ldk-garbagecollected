
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A request from an async recipient for [`BlindedMessagePath`]s from a static invoice server.
 * These paths will be used in the async recipient's [`Offer::paths`], so payers can request
 * [`StaticInvoice`]s from the static invoice server.
 * 
 * [`Offer::paths`]: crate::offers::offer::Offer::paths
 */
export class OfferPathsRequest extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.OfferPathsRequest_free);
	}

	/**
	 * The \"slot\" in the static invoice server's database that this invoice should go into. This
	 * allows us as the recipient to replace a specific invoice that is stored by the server, which
	 * is useful for limiting the number of invoices stored by the server while also keeping all the
	 * invoices persisted with the server fresh.
	 */
	public get_invoice_slot(): number {
		const ret: number = bindings.OfferPathsRequest_get_invoice_slot(this.ptr);
		return ret;
	}

	/**
	 * The \"slot\" in the static invoice server's database that this invoice should go into. This
	 * allows us as the recipient to replace a specific invoice that is stored by the server, which
	 * is useful for limiting the number of invoices stored by the server while also keeping all the
	 * invoices persisted with the server fresh.
	 */
	public set_invoice_slot(val: number): void {
		bindings.OfferPathsRequest_set_invoice_slot(this.ptr, val);
	}

	/**
	 * Constructs a new OfferPathsRequest given each field
	 */
	public static constructor_new(invoice_slot_arg: number): OfferPathsRequest {
		const ret: bigint = bindings.OfferPathsRequest_new(invoice_slot_arg);
		const ret_hu_conv: OfferPathsRequest = new OfferPathsRequest(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.OfferPathsRequest_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the OfferPathsRequest
	 */
	public clone(): OfferPathsRequest {
		const ret: bigint = bindings.OfferPathsRequest_clone(this.ptr);
		const ret_hu_conv: OfferPathsRequest = new OfferPathsRequest(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the OfferPathsRequest object into a byte array which can be read by OfferPathsRequest_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.OfferPathsRequest_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a OfferPathsRequest from a byte array, created by OfferPathsRequest_write
	 */
	public static constructor_read(ser: Uint8Array): Result_OfferPathsRequestDecodeErrorZ {
		const ret: bigint = bindings.OfferPathsRequest_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_OfferPathsRequestDecodeErrorZ = Result_OfferPathsRequestDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
