
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Represents a signed [`RawBolt11Invoice`] with cached hash. The signature is not checked and may be
 * invalid.
 * 
 * # Invariants
 * The hash has to be either from the deserialized invoice or from the serialized [`RawBolt11Invoice`].
 */
export class SignedRawBolt11Invoice extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.SignedRawBolt11Invoice_free);
	}

	/**
	 * Checks if two SignedRawBolt11Invoices contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: SignedRawBolt11Invoice): boolean {
		const ret: boolean = bindings.SignedRawBolt11Invoice_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.SignedRawBolt11Invoice_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the SignedRawBolt11Invoice
	 */
	public clone(): SignedRawBolt11Invoice {
		const ret: bigint = bindings.SignedRawBolt11Invoice_clone(this.ptr);
		const ret_hu_conv: SignedRawBolt11Invoice = new SignedRawBolt11Invoice(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the SignedRawBolt11Invoice.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.SignedRawBolt11Invoice_hash(this.ptr);
		return ret;
	}

	/**
	 * Disassembles the `SignedRawBolt11Invoice` into its three parts:
	 * 1. raw invoice
	 * 2. hash of the raw invoice
	 * 3. signature
	 */
	public into_parts(): ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ {
		const ret: bigint = bindings.SignedRawBolt11Invoice_into_parts(this.ptr);
		const ret_hu_conv: ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ = new ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The [`RawBolt11Invoice`] which was signed.
	 */
	public raw_invoice(): RawBolt11Invoice {
		const ret: bigint = bindings.SignedRawBolt11Invoice_raw_invoice(this.ptr);
		const ret_hu_conv: RawBolt11Invoice = new RawBolt11Invoice(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The hash of the [`RawBolt11Invoice`] that was signed.
	 */
	public signable_hash(): Uint8Array {
		const ret: number = bindings.SignedRawBolt11Invoice_signable_hash(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Signature for the invoice.
	 */
	public signature(): Bolt11InvoiceSignature {
		const ret: bigint = bindings.SignedRawBolt11Invoice_signature(this.ptr);
		const ret_hu_conv: Bolt11InvoiceSignature = new Bolt11InvoiceSignature(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Recovers the public key used for signing the invoice from the recoverable signature.
	 */
	public recover_payee_pub_key(): Result_PayeePubKeySecp256k1ErrorZ {
		const ret: bigint = bindings.SignedRawBolt11Invoice_recover_payee_pub_key(this.ptr);
		const ret_hu_conv: Result_PayeePubKeySecp256k1ErrorZ = Result_PayeePubKeySecp256k1ErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the signature is valid for the included payee public key or if none exists if it's
	 * possible to recover the public key from the signature.
	 */
	public check_signature(): boolean {
		const ret: boolean = bindings.SignedRawBolt11Invoice_check_signature(this.ptr);
		return ret;
	}

	/**
	 * Read a SignedRawBolt11Invoice object from a string
	 */
	public static constructor_from_str(s: string): Result_SignedRawBolt11InvoiceBolt11ParseErrorZ {
		const ret: bigint = bindings.SignedRawBolt11Invoice_from_str(bindings.encodeString(s));
		const ret_hu_conv: Result_SignedRawBolt11InvoiceBolt11ParseErrorZ = Result_SignedRawBolt11InvoiceBolt11ParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a SignedRawBolt11Invoice object
	 */
	public to_str(): string {
		const ret: number = bindings.SignedRawBolt11Invoice_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

}
