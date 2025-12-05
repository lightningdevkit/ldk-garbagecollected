
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Payee public key
 */
export class PayeePubKey extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.PayeePubKey_free);
	}

	public get_a(): Uint8Array {
		const ret: number = bindings.PayeePubKey_get_a(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	public set_a(val: Uint8Array): void {
		bindings.PayeePubKey_set_a(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new PayeePubKey given each field
	 */
	public static constructor_new(a_arg: Uint8Array): PayeePubKey {
		const ret: bigint = bindings.PayeePubKey_new(bindings.encodeUint8Array(a_arg));
		const ret_hu_conv: PayeePubKey = new PayeePubKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.PayeePubKey_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the PayeePubKey
	 */
	public clone(): PayeePubKey {
		const ret: bigint = bindings.PayeePubKey_clone(this.ptr);
		const ret_hu_conv: PayeePubKey = new PayeePubKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the PayeePubKey.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.PayeePubKey_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two PayeePubKeys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: PayeePubKey): boolean {
		const ret: boolean = bindings.PayeePubKey_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Build a PayeePubKey from a PublicKey
	 */
	public static constructor_from_PublicKey(f: Uint8Array): PayeePubKey {
		const ret: bigint = bindings.PayeePubKey_from_PublicKey(bindings.encodeUint8Array(f));
		const ret_hu_conv: PayeePubKey = new PayeePubKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
