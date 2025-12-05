
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * The BOLT 12 invoice that was paid, surfaced in [`Event::PaymentSent::bolt12_invoice`].
 */
export class PaidBolt12Invoice extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.PaidBolt12Invoice_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): PaidBolt12Invoice {
		const raw_ty: number = bindings.LDKPaidBolt12Invoice_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new PaidBolt12Invoice_Bolt12Invoice(ptr);
			case 1: return new PaidBolt12Invoice_StaticInvoice(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.PaidBolt12Invoice_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the PaidBolt12Invoice
	 */
	public clone(): PaidBolt12Invoice {
		const ret: bigint = bindings.PaidBolt12Invoice_clone(this.ptr);
		const ret_hu_conv: PaidBolt12Invoice = PaidBolt12Invoice.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Bolt12Invoice-variant PaidBolt12Invoice
	 */
	public static constructor_bolt12_invoice(a: Bolt12Invoice): PaidBolt12Invoice {
		const ret: bigint = bindings.PaidBolt12Invoice_bolt12_invoice(CommonBase.get_ptr_of(a));
		const ret_hu_conv: PaidBolt12Invoice = PaidBolt12Invoice.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new StaticInvoice-variant PaidBolt12Invoice
	 */
	public static constructor_static_invoice(a: StaticInvoice): PaidBolt12Invoice {
		const ret: bigint = bindings.PaidBolt12Invoice_static_invoice(CommonBase.get_ptr_of(a));
		const ret_hu_conv: PaidBolt12Invoice = PaidBolt12Invoice.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two PaidBolt12Invoices contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: PaidBolt12Invoice): boolean {
		const ret: boolean = bindings.PaidBolt12Invoice_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the PaidBolt12Invoice.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.PaidBolt12Invoice_hash(this.ptr);
		return ret;
	}

	/**
	 * Serialize the PaidBolt12Invoice object into a byte array which can be read by PaidBolt12Invoice_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.PaidBolt12Invoice_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a PaidBolt12Invoice from a byte array, created by PaidBolt12Invoice_write
	 */
	public static constructor_read(ser: Uint8Array): Result_PaidBolt12InvoiceDecodeErrorZ {
		const ret: bigint = bindings.PaidBolt12Invoice_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_PaidBolt12InvoiceDecodeErrorZ = Result_PaidBolt12InvoiceDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
/** A PaidBolt12Invoice of type Bolt12Invoice */
export class PaidBolt12Invoice_Bolt12Invoice extends PaidBolt12Invoice {
	public bolt12_invoice: Bolt12Invoice;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const bolt12_invoice: bigint = bindings.LDKPaidBolt12Invoice_Bolt12Invoice_get_bolt12_invoice(ptr);
		const bolt12_invoice_hu_conv: Bolt12Invoice = new Bolt12Invoice(null, bolt12_invoice);
			CommonBase.add_ref_from(bolt12_invoice_hu_conv, this);
		this.bolt12_invoice = bolt12_invoice_hu_conv;
	}
}
/** A PaidBolt12Invoice of type StaticInvoice */
export class PaidBolt12Invoice_StaticInvoice extends PaidBolt12Invoice {
	public static_invoice: StaticInvoice;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const static_invoice: bigint = bindings.LDKPaidBolt12Invoice_StaticInvoice_get_static_invoice(ptr);
		const static_invoice_hu_conv: StaticInvoice = new StaticInvoice(null, static_invoice);
			CommonBase.add_ref_from(static_invoice_hu_conv, this);
		this.static_invoice = static_invoice_hu_conv;
	}
}
