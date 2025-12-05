
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Base key used in conjunction with a `per_commitment_point` to generate a [`DelayedPaymentKey`].
 * 
 * The delayed payment key is used to pay the commitment state broadcaster their
 * non-HTLC-encumbered funds after a delay to give their counterparty a chance to punish if the
 * state broadcasted was previously revoked.
 */
export class DelayedPaymentBasepoint extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.DelayedPaymentBasepoint_free);
	}

	public get_a(): Uint8Array {
		const ret: number = bindings.DelayedPaymentBasepoint_get_a(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	public set_a(val: Uint8Array): void {
		bindings.DelayedPaymentBasepoint_set_a(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new DelayedPaymentBasepoint given each field
	 */
	public static constructor_new(a_arg: Uint8Array): DelayedPaymentBasepoint {
		const ret: bigint = bindings.DelayedPaymentBasepoint_new(bindings.encodeUint8Array(a_arg));
		const ret_hu_conv: DelayedPaymentBasepoint = new DelayedPaymentBasepoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two DelayedPaymentBasepoints contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: DelayedPaymentBasepoint): boolean {
		const ret: boolean = bindings.DelayedPaymentBasepoint_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.DelayedPaymentBasepoint_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the DelayedPaymentBasepoint
	 */
	public clone(): DelayedPaymentBasepoint {
		const ret: bigint = bindings.DelayedPaymentBasepoint_clone(this.ptr);
		const ret_hu_conv: DelayedPaymentBasepoint = new DelayedPaymentBasepoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the DelayedPaymentBasepoint.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.DelayedPaymentBasepoint_hash(this.ptr);
		return ret;
	}

	/**
	 * Get inner Public Key
	 */
	public to_public_key(): Uint8Array {
		const ret: number = bindings.DelayedPaymentBasepoint_to_public_key(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Derives the \"tweak\" used in calculate [`DelayedPaymentKey::from_basepoint`].\n\n[`DelayedPaymentKey::from_basepoint`] calculates a private key as:\n`privkey = basepoint_secret + SHA256(per_commitment_point || basepoint)`\n\nThis calculates the hash part in the tweak derivation process, which is used to\nensure that each key is unique and cannot be guessed by an external party.
	 */
	public derive_add_tweak(per_commitment_point: Uint8Array): Uint8Array {
		const ret: number = bindings.DelayedPaymentBasepoint_derive_add_tweak(this.ptr, bindings.encodeUint8Array(per_commitment_point));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Build a DelayedPaymentBasepoint from a PublicKey
	 */
	public static constructor_from_PublicKey(f: Uint8Array): DelayedPaymentBasepoint {
		const ret: bigint = bindings.DelayedPaymentBasepoint_from_PublicKey(bindings.encodeUint8Array(f));
		const ret_hu_conv: DelayedPaymentBasepoint = new DelayedPaymentBasepoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Serialize the DelayedPaymentBasepoint object into a byte array which can be read by DelayedPaymentBasepoint_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.DelayedPaymentBasepoint_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a DelayedPaymentBasepoint from a byte array, created by DelayedPaymentBasepoint_write
	 */
	public static constructor_read(ser: Uint8Array): Result_DelayedPaymentBasepointDecodeErrorZ {
		const ret: bigint = bindings.DelayedPaymentBasepoint_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_DelayedPaymentBasepointDecodeErrorZ = Result_DelayedPaymentBasepointDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
