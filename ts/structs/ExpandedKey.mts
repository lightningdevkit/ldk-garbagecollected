
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A set of keys that were HKDF-expanded. Returned by [`NodeSigner::get_expanded_key`].
 * 
 * [`NodeSigner::get_expanded_key`]: crate::sign::NodeSigner::get_expanded_key
 */
export class ExpandedKey extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ExpandedKey_free);
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ExpandedKey.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.ExpandedKey_hash(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ExpandedKey_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ExpandedKey
	 */
	public clone(): ExpandedKey {
		const ret: bigint = bindings.ExpandedKey_clone(this.ptr);
		const ret_hu_conv: ExpandedKey = new ExpandedKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two ExpandedKeys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ExpandedKey): boolean {
		const ret: boolean = bindings.ExpandedKey_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Create a  new [`ExpandedKey`] for generating an inbound payment hash and secret.
	 * 
	 * It is recommended to cache this value and not regenerate it for each new inbound payment.
	 */
	public static constructor_new(key_material: Uint8Array): ExpandedKey {
		const ret: bigint = bindings.ExpandedKey_new(bindings.encodeUint8Array(key_material));
		const ret_hu_conv: ExpandedKey = new ExpandedKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
