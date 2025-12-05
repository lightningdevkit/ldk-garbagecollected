
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Recoverable signature
 */
export class Bolt11InvoiceSignature extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Bolt11InvoiceSignature_free);
	}

	public get_a(): Uint8Array {
		const ret: number = bindings.Bolt11InvoiceSignature_get_a(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	public set_a(val: Uint8Array): void {
		bindings.Bolt11InvoiceSignature_set_a(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new Bolt11InvoiceSignature given each field
	 */
	public static constructor_new(a_arg: Uint8Array): Bolt11InvoiceSignature {
		const ret: bigint = bindings.Bolt11InvoiceSignature_new(bindings.encodeUint8Array(a_arg));
		const ret_hu_conv: Bolt11InvoiceSignature = new Bolt11InvoiceSignature(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Bolt11InvoiceSignature_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt11InvoiceSignature
	 */
	public clone(): Bolt11InvoiceSignature {
		const ret: bigint = bindings.Bolt11InvoiceSignature_clone(this.ptr);
		const ret_hu_conv: Bolt11InvoiceSignature = new Bolt11InvoiceSignature(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Bolt11InvoiceSignature.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.Bolt11InvoiceSignature_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two Bolt11InvoiceSignatures contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: Bolt11InvoiceSignature): boolean {
		const ret: boolean = bindings.Bolt11InvoiceSignature_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}
