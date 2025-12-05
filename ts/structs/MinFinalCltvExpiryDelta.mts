
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * `min_final_cltv_expiry_delta` to use for the last HTLC in the route
 */
export class MinFinalCltvExpiryDelta extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.MinFinalCltvExpiryDelta_free);
	}

	public get_a(): bigint {
		const ret: bigint = bindings.MinFinalCltvExpiryDelta_get_a(this.ptr);
		return ret;
	}

	public set_a(val: bigint): void {
		bindings.MinFinalCltvExpiryDelta_set_a(this.ptr, val);
	}

	/**
	 * Constructs a new MinFinalCltvExpiryDelta given each field
	 */
	public static constructor_new(a_arg: bigint): MinFinalCltvExpiryDelta {
		const ret: bigint = bindings.MinFinalCltvExpiryDelta_new(a_arg);
		const ret_hu_conv: MinFinalCltvExpiryDelta = new MinFinalCltvExpiryDelta(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.MinFinalCltvExpiryDelta_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the MinFinalCltvExpiryDelta
	 */
	public clone(): MinFinalCltvExpiryDelta {
		const ret: bigint = bindings.MinFinalCltvExpiryDelta_clone(this.ptr);
		const ret_hu_conv: MinFinalCltvExpiryDelta = new MinFinalCltvExpiryDelta(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the MinFinalCltvExpiryDelta.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.MinFinalCltvExpiryDelta_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two MinFinalCltvExpiryDeltas contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: MinFinalCltvExpiryDelta): boolean {
		const ret: boolean = bindings.MinFinalCltvExpiryDelta_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}
