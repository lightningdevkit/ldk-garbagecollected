
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Possible BOLT 12 Offers messages sent and received via an [`OnionMessage`].
 * 
 * [`OnionMessage`]: crate::ln::msgs::OnionMessage
 */
export class OffersMessage extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.OffersMessage_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): OffersMessage {
		const raw_ty: number = bindings.LDKOffersMessage_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new OffersMessage_InvoiceRequest(ptr);
			case 1: return new OffersMessage_Invoice(ptr);
			case 2: return new OffersMessage_StaticInvoice(ptr);
			case 3: return new OffersMessage_InvoiceError(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.OffersMessage_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the OffersMessage
	 */
	public clone(): OffersMessage {
		const ret: bigint = bindings.OffersMessage_clone(this.ptr);
		const ret_hu_conv: OffersMessage = OffersMessage.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvoiceRequest-variant OffersMessage
	 */
	public static constructor_invoice_request(a: InvoiceRequest): OffersMessage {
		const ret: bigint = bindings.OffersMessage_invoice_request(CommonBase.get_ptr_of(a));
		const ret_hu_conv: OffersMessage = OffersMessage.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Invoice-variant OffersMessage
	 */
	public static constructor_invoice(a: Bolt12Invoice): OffersMessage {
		const ret: bigint = bindings.OffersMessage_invoice(CommonBase.get_ptr_of(a));
		const ret_hu_conv: OffersMessage = OffersMessage.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new StaticInvoice-variant OffersMessage
	 */
	public static constructor_static_invoice(a: StaticInvoice): OffersMessage {
		const ret: bigint = bindings.OffersMessage_static_invoice(CommonBase.get_ptr_of(a));
		const ret_hu_conv: OffersMessage = OffersMessage.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvoiceError-variant OffersMessage
	 */
	public static constructor_invoice_error(a: InvoiceError): OffersMessage {
		const ret: bigint = bindings.OffersMessage_invoice_error(CommonBase.get_ptr_of(a));
		const ret_hu_conv: OffersMessage = OffersMessage.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OnionMessageContents which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OnionMessageContents must be freed before this_arg is
	 */
	public as_OnionMessageContents(): OnionMessageContents {
		const ret: bigint = bindings.OffersMessage_as_OnionMessageContents(this.ptr);
		const ret_hu_conv: OnionMessageContents = new OnionMessageContents(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the OffersMessage object into a byte array which can be read by OffersMessage_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.OffersMessage_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a OffersMessage from a byte array, created by OffersMessage_write
	 */
	public static constructor_read(ser: Uint8Array, arg_a: bigint, arg_b: Logger): Result_OffersMessageDecodeErrorZ {
		const ret: bigint = bindings.OffersMessage_read(bindings.encodeUint8Array(ser), arg_a, CommonBase.get_ptr_of(arg_b));
		const ret_hu_conv: Result_OffersMessageDecodeErrorZ = Result_OffersMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
/** A OffersMessage of type InvoiceRequest */
export class OffersMessage_InvoiceRequest extends OffersMessage {
	public invoice_request: InvoiceRequest;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const invoice_request: bigint = bindings.LDKOffersMessage_InvoiceRequest_get_invoice_request(ptr);
		const invoice_request_hu_conv: InvoiceRequest = new InvoiceRequest(null, invoice_request);
			CommonBase.add_ref_from(invoice_request_hu_conv, this);
		this.invoice_request = invoice_request_hu_conv;
	}
}
/** A OffersMessage of type Invoice */
export class OffersMessage_Invoice extends OffersMessage {
	public invoice: Bolt12Invoice;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const invoice: bigint = bindings.LDKOffersMessage_Invoice_get_invoice(ptr);
		const invoice_hu_conv: Bolt12Invoice = new Bolt12Invoice(null, invoice);
			CommonBase.add_ref_from(invoice_hu_conv, this);
		this.invoice = invoice_hu_conv;
	}
}
/** A OffersMessage of type StaticInvoice */
export class OffersMessage_StaticInvoice extends OffersMessage {
	public static_invoice: StaticInvoice;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const static_invoice: bigint = bindings.LDKOffersMessage_StaticInvoice_get_static_invoice(ptr);
		const static_invoice_hu_conv: StaticInvoice = new StaticInvoice(null, static_invoice);
			CommonBase.add_ref_from(static_invoice_hu_conv, this);
		this.static_invoice = static_invoice_hu_conv;
	}
}
/** A OffersMessage of type InvoiceError */
export class OffersMessage_InvoiceError extends OffersMessage {
	public invoice_error: InvoiceError;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const invoice_error: bigint = bindings.LDKOffersMessage_InvoiceError_get_invoice_error(ptr);
		const invoice_error_hu_conv: InvoiceError = new InvoiceError(null, invoice_error);
			CommonBase.add_ref_from(invoice_error_hu_conv, this);
		this.invoice_error = invoice_error_hu_conv;
	}
}
