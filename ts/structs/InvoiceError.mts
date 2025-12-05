
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An error in response to an [`InvoiceRequest`] or an [`Bolt12Invoice`].
 * 
 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
 */
export class InvoiceError extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.InvoiceError_free);
	}

	/**
	 * The field in the [`InvoiceRequest`] or the [`Bolt12Invoice`] that contained an error.
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_erroneous_field(): ErroneousField {
		const ret: bigint = bindings.InvoiceError_get_erroneous_field(this.ptr);
		const ret_hu_conv: ErroneousField = new ErroneousField(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The field in the [`InvoiceRequest`] or the [`Bolt12Invoice`] that contained an error.
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_erroneous_field(val: ErroneousField|null): void {
		bindings.InvoiceError_set_erroneous_field(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * An explanation of the error.
	 */
	public get_message(): UntrustedString {
		const ret: bigint = bindings.InvoiceError_get_message(this.ptr);
		const ret_hu_conv: UntrustedString = new UntrustedString(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * An explanation of the error.
	 */
	public set_message(val: UntrustedString): void {
		bindings.InvoiceError_set_message(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new InvoiceError given each field
	 * 
	 * Note that erroneous_field_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(erroneous_field_arg: ErroneousField|null, message_arg: UntrustedString): InvoiceError {
		const ret: bigint = bindings.InvoiceError_new(erroneous_field_arg == null ? 0n : CommonBase.get_ptr_of(erroneous_field_arg), CommonBase.get_ptr_of(message_arg));
		const ret_hu_conv: InvoiceError = new InvoiceError(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.InvoiceError_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the InvoiceError
	 */
	public clone(): InvoiceError {
		const ret: bigint = bindings.InvoiceError_clone(this.ptr);
		const ret_hu_conv: InvoiceError = new InvoiceError(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates an [`InvoiceError`] with the given message.
	 */
	public static constructor_from_string(s: string): InvoiceError {
		const ret: bigint = bindings.InvoiceError_from_string(bindings.encodeString(s));
		const ret_hu_conv: InvoiceError = new InvoiceError(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a InvoiceError object
	 */
	public to_str(): string {
		const ret: number = bindings.InvoiceError_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Serialize the InvoiceError object into a byte array which can be read by InvoiceError_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.InvoiceError_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a InvoiceError from a byte array, created by InvoiceError_write
	 */
	public static constructor_read(ser: Uint8Array): Result_InvoiceErrorDecodeErrorZ {
		const ret: bigint = bindings.InvoiceError_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_InvoiceErrorDecodeErrorZ = Result_InvoiceErrorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Build a InvoiceError from a Bolt12SemanticError
	 */
	public static constructor_from_Bolt12SemanticError(f: Bolt12SemanticError): InvoiceError {
		const ret: bigint = bindings.InvoiceError_from_Bolt12SemanticError(f);
		const ret_hu_conv: InvoiceError = new InvoiceError(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Build a InvoiceError from a SignError
	 */
	public static constructor_from_SignError(f: SignError): InvoiceError {
		const ret: bigint = bindings.InvoiceError_from_SignError(CommonBase.get_ptr_of(f));
		const ret_hu_conv: InvoiceError = new InvoiceError(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
