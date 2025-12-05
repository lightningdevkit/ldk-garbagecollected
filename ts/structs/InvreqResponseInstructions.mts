
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Instructions for how to respond to an `InvoiceRequest`.
 */
export class InvreqResponseInstructions extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.InvreqResponseInstructions_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): InvreqResponseInstructions {
		const raw_ty: number = bindings.LDKInvreqResponseInstructions_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new InvreqResponseInstructions_SendInvoice(ptr);
			case 1: return new InvreqResponseInstructions_SendStaticInvoice(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.InvreqResponseInstructions_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the InvreqResponseInstructions
	 */
	public clone(): InvreqResponseInstructions {
		const ret: bigint = bindings.InvreqResponseInstructions_clone(this.ptr);
		const ret_hu_conv: InvreqResponseInstructions = InvreqResponseInstructions.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendInvoice-variant InvreqResponseInstructions
	 */
	public static constructor_send_invoice(a: VerifiedInvoiceRequest): InvreqResponseInstructions {
		const ret: bigint = bindings.InvreqResponseInstructions_send_invoice(CommonBase.get_ptr_of(a));
		const ret_hu_conv: InvreqResponseInstructions = InvreqResponseInstructions.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendStaticInvoice-variant InvreqResponseInstructions
	 */
	public static constructor_send_static_invoice(recipient_id: Uint8Array, invoice_slot: number, invoice_request: InvoiceRequest): InvreqResponseInstructions {
		const ret: bigint = bindings.InvreqResponseInstructions_send_static_invoice(bindings.encodeUint8Array(recipient_id), invoice_slot, CommonBase.get_ptr_of(invoice_request));
		const ret_hu_conv: InvreqResponseInstructions = InvreqResponseInstructions.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
/** A InvreqResponseInstructions of type SendInvoice */
export class InvreqResponseInstructions_SendInvoice extends InvreqResponseInstructions {
	public send_invoice: VerifiedInvoiceRequest;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const send_invoice: bigint = bindings.LDKInvreqResponseInstructions_SendInvoice_get_send_invoice(ptr);
		const send_invoice_hu_conv: VerifiedInvoiceRequest = new VerifiedInvoiceRequest(null, send_invoice);
			CommonBase.add_ref_from(send_invoice_hu_conv, this);
		this.send_invoice = send_invoice_hu_conv;
	}
}
/** A InvreqResponseInstructions of type SendStaticInvoice */
export class InvreqResponseInstructions_SendStaticInvoice extends InvreqResponseInstructions {
	/**
	 * An identifier for the async recipient for whom we are serving [`StaticInvoice`]s.
	 * 
	 * [`StaticInvoice`]: crate::offers::static_invoice::StaticInvoice
	 */
	public recipient_id: Uint8Array;
	/**
	 * The slot number for the specific invoice being requested by the payer.
	 */
	public invoice_slot: number;
	/**
	 * The invoice request that should be forwarded to the async recipient in case the
	 * recipient is online to respond. Should be forwarded by calling
	 * [`OffersMessageFlow::enqueue_invoice_request_to_forward`].
	 */
	public invoice_request: InvoiceRequest;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const recipient_id: number = bindings.LDKInvreqResponseInstructions_SendStaticInvoice_get_recipient_id(ptr);
		const recipient_id_conv: Uint8Array = bindings.decodeUint8Array(recipient_id);
		this.recipient_id = recipient_id_conv;
		this.invoice_slot = bindings.LDKInvreqResponseInstructions_SendStaticInvoice_get_invoice_slot(ptr);
		const invoice_request: bigint = bindings.LDKInvreqResponseInstructions_SendStaticInvoice_get_invoice_request(ptr);
		const invoice_request_hu_conv: InvoiceRequest = new InvoiceRequest(null, invoice_request);
			CommonBase.add_ref_from(invoice_request_hu_conv, this);
		this.invoice_request = invoice_request_hu_conv;
	}
}
