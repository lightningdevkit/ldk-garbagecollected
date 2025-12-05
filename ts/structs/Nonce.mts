
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A 128-bit number used only once.
 * 
 * Needed when constructing [`Offer::metadata`] and deriving [`Offer::issuer_signing_pubkey`] from
 * [`ExpandedKey`]. Must not be reused for any other derivation without first hashing.
 * 
 * [`Offer::metadata`]: crate::offers::offer::Offer::metadata
 * [`Offer::issuer_signing_pubkey`]: crate::offers::offer::Offer::issuer_signing_pubkey
 * [`ExpandedKey`]: crate::ln::inbound_payment::ExpandedKey
 */
export class Nonce extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Nonce_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Nonce_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Nonce
	 */
	public clone(): Nonce {
		const ret: bigint = bindings.Nonce_clone(this.ptr);
		const ret_hu_conv: Nonce = new Nonce(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two Nonces contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: Nonce): boolean {
		const ret: boolean = bindings.Nonce_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Creates a `Nonce` from the given [`EntropySource`].
	 */
	public static constructor_from_entropy_source(entropy_source: EntropySource): Nonce {
		const ret: bigint = bindings.Nonce_from_entropy_source(CommonBase.get_ptr_of(entropy_source));
		const ret_hu_conv: Nonce = new Nonce(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, entropy_source);
		return ret_hu_conv;
	}

	/**
	 * Returns a slice of the underlying bytes of size [`Nonce::LENGTH`].
	 */
	public as_slice(): Uint8Array {
		const ret: number = bindings.Nonce_as_slice(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Serialize the Nonce object into a byte array which can be read by Nonce_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.Nonce_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Nonce from a byte array, created by Nonce_write
	 */
	public static constructor_read(ser: Uint8Array): Result_NonceDecodeErrorZ {
		const ret: bigint = bindings.Nonce_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_NonceDecodeErrorZ = Result_NonceDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
