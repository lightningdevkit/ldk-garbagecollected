
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Description string
 * 
 * # Invariants
 * The description can be at most 639 __bytes__ long
 */
export class Description extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Description_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Description_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Description
	 */
	public clone(): Description {
		const ret: bigint = bindings.Description_clone(this.ptr);
		const ret_hu_conv: Description = new Description(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Description.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.Description_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two Descriptions contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: Description): boolean {
		const ret: boolean = bindings.Description_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Creates a new `Description` if `description` is at most 1023 * 5 bits (i.e., 639 bytes)
	 * long, and returns [`CreationError::DescriptionTooLong`] otherwise.
	 * 
	 * Please note that single characters may use more than one byte due to UTF8 encoding.
	 */
	public static constructor_new(description: string): Result_DescriptionCreationErrorZ {
		const ret: bigint = bindings.Description_new(bindings.encodeString(description));
		const ret_hu_conv: Result_DescriptionCreationErrorZ = Result_DescriptionCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates an empty `Description`.
	 */
	public static constructor_empty(): Description {
		const ret: bigint = bindings.Description_empty();
		const ret_hu_conv: Description = new Description(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Returns the underlying description [`UntrustedString`]
	 */
	public into_inner(): UntrustedString {
		const ret: bigint = bindings.Description_into_inner(this.ptr);
		const ret_hu_conv: UntrustedString = new UntrustedString(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Get a reference to the underlying description [`UntrustedString`]
	 */
	public as_inner(): UntrustedString {
		const ret: bigint = bindings.Description_as_inner(this.ptr);
		const ret_hu_conv: UntrustedString = new UntrustedString(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a Description object
	 */
	public to_str(): string {
		const ret: number = bindings.Description_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

}
