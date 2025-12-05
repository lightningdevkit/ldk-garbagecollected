
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Base key used in conjunction with a `per_commitment_point` to generate an [`HtlcKey`].
 * 
 * HTLC keys are used to ensure only the recipient of an HTLC can claim it on-chain with the HTLC
 * preimage and that only the sender of an HTLC can claim it on-chain after it has timed out.
 * Thus, both channel counterparties' HTLC keys will appears in each HTLC output's script.
 */
export class HtlcBasepoint extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.HtlcBasepoint_free);
	}

	public get_a(): Uint8Array {
		const ret: number = bindings.HtlcBasepoint_get_a(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	public set_a(val: Uint8Array): void {
		bindings.HtlcBasepoint_set_a(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new HtlcBasepoint given each field
	 */
	public static constructor_new(a_arg: Uint8Array): HtlcBasepoint {
		const ret: bigint = bindings.HtlcBasepoint_new(bindings.encodeUint8Array(a_arg));
		const ret_hu_conv: HtlcBasepoint = new HtlcBasepoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two HtlcBasepoints contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: HtlcBasepoint): boolean {
		const ret: boolean = bindings.HtlcBasepoint_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.HtlcBasepoint_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the HtlcBasepoint
	 */
	public clone(): HtlcBasepoint {
		const ret: bigint = bindings.HtlcBasepoint_clone(this.ptr);
		const ret_hu_conv: HtlcBasepoint = new HtlcBasepoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the HtlcBasepoint.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.HtlcBasepoint_hash(this.ptr);
		return ret;
	}

	/**
	 * Get inner Public Key
	 */
	public to_public_key(): Uint8Array {
		const ret: number = bindings.HtlcBasepoint_to_public_key(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Derives the \"tweak\" used in calculate [`HtlcKey::from_basepoint`].\n\n[`HtlcKey::from_basepoint`] calculates a private key as:\n`privkey = basepoint_secret + SHA256(per_commitment_point || basepoint)`\n\nThis calculates the hash part in the tweak derivation process, which is used to\nensure that each key is unique and cannot be guessed by an external party.
	 */
	public derive_add_tweak(per_commitment_point: Uint8Array): Uint8Array {
		const ret: number = bindings.HtlcBasepoint_derive_add_tweak(this.ptr, bindings.encodeUint8Array(per_commitment_point));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Build a HtlcBasepoint from a PublicKey
	 */
	public static constructor_from_PublicKey(f: Uint8Array): HtlcBasepoint {
		const ret: bigint = bindings.HtlcBasepoint_from_PublicKey(bindings.encodeUint8Array(f));
		const ret_hu_conv: HtlcBasepoint = new HtlcBasepoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Serialize the HtlcBasepoint object into a byte array which can be read by HtlcBasepoint_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.HtlcBasepoint_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a HtlcBasepoint from a byte array, created by HtlcBasepoint_write
	 */
	public static constructor_read(ser: Uint8Array): Result_HtlcBasepointDecodeErrorZ {
		const ret: bigint = bindings.HtlcBasepoint_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_HtlcBasepointDecodeErrorZ = Result_HtlcBasepointDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
