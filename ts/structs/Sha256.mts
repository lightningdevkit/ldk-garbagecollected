
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * SHA-256 hash
 */
export class Sha256 extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Sha256_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Sha256_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Sha256
	 */
	public clone(): Sha256 {
		const ret: bigint = bindings.Sha256_clone(this.ptr);
		const ret_hu_conv: Sha256 = new Sha256(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Sha256.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.Sha256_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two Sha256s contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: Sha256): boolean {
		const ret: boolean = bindings.Sha256_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Constructs a new [`Sha256`] from the given bytes, which are assumed to be the output of a
	 * single sha256 hash.
	 */
	public static constructor_from_bytes(bytes: Uint8Array): Sha256 {
		const ret: bigint = bindings.Sha256_from_bytes(bindings.encodeUint8Array(bytes));
		const ret_hu_conv: Sha256 = new Sha256(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
