
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Represents the description of an invoice which has to be either a directly included string or
 * a hash of a description provided out of band.
 */
export class Bolt11InvoiceDescription extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.Bolt11InvoiceDescription_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Bolt11InvoiceDescription {
		const raw_ty: number = bindings.LDKBolt11InvoiceDescription_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Bolt11InvoiceDescription_Direct(ptr);
			case 1: return new Bolt11InvoiceDescription_Hash(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Bolt11InvoiceDescription_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt11InvoiceDescription
	 */
	public clone(): Bolt11InvoiceDescription {
		const ret: bigint = bindings.Bolt11InvoiceDescription_clone(this.ptr);
		const ret_hu_conv: Bolt11InvoiceDescription = Bolt11InvoiceDescription.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Direct-variant Bolt11InvoiceDescription
	 */
	public static constructor_direct(a: Description): Bolt11InvoiceDescription {
		const ret: bigint = bindings.Bolt11InvoiceDescription_direct(CommonBase.get_ptr_of(a));
		const ret_hu_conv: Bolt11InvoiceDescription = Bolt11InvoiceDescription.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Hash-variant Bolt11InvoiceDescription
	 */
	public static constructor_hash(a: Sha256): Bolt11InvoiceDescription {
		const ret: bigint = bindings.Bolt11InvoiceDescription_hash(CommonBase.get_ptr_of(a));
		const ret_hu_conv: Bolt11InvoiceDescription = Bolt11InvoiceDescription.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two Bolt11InvoiceDescriptions contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: Bolt11InvoiceDescription): boolean {
		const ret: boolean = bindings.Bolt11InvoiceDescription_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Get the string representation of a Bolt11InvoiceDescription object
	 */
	public to_str(): string {
		const ret: number = bindings.Bolt11InvoiceDescription_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

}
/** A Bolt11InvoiceDescription of type Direct */
export class Bolt11InvoiceDescription_Direct extends Bolt11InvoiceDescription {
	public direct: Description;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const direct: bigint = bindings.LDKBolt11InvoiceDescription_Direct_get_direct(ptr);
		const direct_hu_conv: Description = new Description(null, direct);
			CommonBase.add_ref_from(direct_hu_conv, this);
		this.direct = direct_hu_conv;
	}
}
/** A Bolt11InvoiceDescription of type Hash */
export class Bolt11InvoiceDescription_Hash extends Bolt11InvoiceDescription {
	public hash: Sha256;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const hash: bigint = bindings.LDKBolt11InvoiceDescription_Hash_get_hash(ptr);
		const hash_hu_conv: Sha256 = new Sha256(null, hash);
			CommonBase.add_ref_from(hash_hu_conv, this);
		this.hash = hash_hu_conv;
	}
}
