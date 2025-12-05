
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A request from an async recipient to a static invoice server that a [`StaticInvoice`] be
 * provided in response to [`InvoiceRequest`]s from payers.
 * 
 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
 */
export class ServeStaticInvoice extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ServeStaticInvoice_free);
	}

	/**
	 * The invoice that should be served by the static invoice server. Once this invoice has been
	 * persisted, the [`Responder`] accompanying this message should be used to send
	 * [`StaticInvoicePersisted`] to the recipient to confirm that the offer corresponding to the
	 * invoice is ready to receive async payments.
	 */
	public get_invoice(): StaticInvoice {
		const ret: bigint = bindings.ServeStaticInvoice_get_invoice(this.ptr);
		const ret_hu_conv: StaticInvoice = new StaticInvoice(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The invoice that should be served by the static invoice server. Once this invoice has been
	 * persisted, the [`Responder`] accompanying this message should be used to send
	 * [`StaticInvoicePersisted`] to the recipient to confirm that the offer corresponding to the
	 * invoice is ready to receive async payments.
	 */
	public set_invoice(val: StaticInvoice): void {
		bindings.ServeStaticInvoice_set_invoice(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * If a static invoice server receives an [`InvoiceRequest`] for a [`StaticInvoice`], they should
	 * also forward the [`InvoiceRequest`] to the async recipient so they can respond with a fresh
	 * [`Bolt12Invoice`] if the recipient is online at the time. Use this path to forward the
	 * [`InvoiceRequest`] to the async recipient.
	 * 
	 * This path's [`BlindedMessagePath::introduction_node`] MUST be set to the static invoice server
	 * node or one of its peers. This is because, for DoS protection, invoice requests forwarded over
	 * this path are treated by the server node like any other onion message forward and the server
	 * will not directly connect to the introduction node if they are not already peers.
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 */
	public get_forward_invoice_request_path(): BlindedMessagePath {
		const ret: bigint = bindings.ServeStaticInvoice_get_forward_invoice_request_path(this.ptr);
		const ret_hu_conv: BlindedMessagePath = new BlindedMessagePath(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * If a static invoice server receives an [`InvoiceRequest`] for a [`StaticInvoice`], they should
	 * also forward the [`InvoiceRequest`] to the async recipient so they can respond with a fresh
	 * [`Bolt12Invoice`] if the recipient is online at the time. Use this path to forward the
	 * [`InvoiceRequest`] to the async recipient.
	 * 
	 * This path's [`BlindedMessagePath::introduction_node`] MUST be set to the static invoice server
	 * node or one of its peers. This is because, for DoS protection, invoice requests forwarded over
	 * this path are treated by the server node like any other onion message forward and the server
	 * will not directly connect to the introduction node if they are not already peers.
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 */
	public set_forward_invoice_request_path(val: BlindedMessagePath): void {
		bindings.ServeStaticInvoice_set_forward_invoice_request_path(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new ServeStaticInvoice given each field
	 */
	public static constructor_new(invoice_arg: StaticInvoice, forward_invoice_request_path_arg: BlindedMessagePath): ServeStaticInvoice {
		const ret: bigint = bindings.ServeStaticInvoice_new(CommonBase.get_ptr_of(invoice_arg), CommonBase.get_ptr_of(forward_invoice_request_path_arg));
		const ret_hu_conv: ServeStaticInvoice = new ServeStaticInvoice(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ServeStaticInvoice_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ServeStaticInvoice
	 */
	public clone(): ServeStaticInvoice {
		const ret: bigint = bindings.ServeStaticInvoice_clone(this.ptr);
		const ret_hu_conv: ServeStaticInvoice = new ServeStaticInvoice(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OnionMessageContents which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OnionMessageContents must be freed before this_arg is
	 */
	public as_OnionMessageContents(): OnionMessageContents {
		const ret: bigint = bindings.ServeStaticInvoice_as_OnionMessageContents(this.ptr);
		const ret_hu_conv: OnionMessageContents = new OnionMessageContents(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ServeStaticInvoice object into a byte array which can be read by ServeStaticInvoice_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ServeStaticInvoice_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ServeStaticInvoice from a byte array, created by ServeStaticInvoice_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ServeStaticInvoiceDecodeErrorZ {
		const ret: bigint = bindings.ServeStaticInvoice_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ServeStaticInvoiceDecodeErrorZ = Result_ServeStaticInvoiceDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
