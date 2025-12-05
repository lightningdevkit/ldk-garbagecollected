
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * The revocation key is used to allow a channel party to revoke their state - giving their
 * counterparty the required material to claim all of their funds if they broadcast that state.
 * 
 * Each commitment transaction has a revocation key based on the basepoint and
 * per_commitment_point which is used in both commitment and HTLC transactions.
 * 
 * See [the BOLT spec for derivation details]
 * <https://github.com/lightning/bolts/blob/master/03-transactions.md#revocationpubkey-derivation>
 */
export class RevocationKey extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.RevocationKey_free);
	}

	public get_a(): Uint8Array {
		const ret: number = bindings.RevocationKey_get_a(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	public set_a(val: Uint8Array): void {
		bindings.RevocationKey_set_a(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new RevocationKey given each field
	 */
	public static constructor_new(a_arg: Uint8Array): RevocationKey {
		const ret: bigint = bindings.RevocationKey_new(bindings.encodeUint8Array(a_arg));
		const ret_hu_conv: RevocationKey = new RevocationKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two RevocationKeys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: RevocationKey): boolean {
		const ret: boolean = bindings.RevocationKey_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.RevocationKey_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the RevocationKey
	 */
	public clone(): RevocationKey {
		const ret: bigint = bindings.RevocationKey_clone(this.ptr);
		const ret_hu_conv: RevocationKey = new RevocationKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the RevocationKey.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.RevocationKey_hash(this.ptr);
		return ret;
	}

	/**
	 * Derives a per-commitment-transaction revocation public key from one party's per-commitment
	 * point and the other party's [`RevocationBasepoint`]. This is the public equivalent of
	 * [`chan_utils::derive_private_revocation_key`] - using only public keys to derive a public
	 * key instead of private keys.
	 * 
	 * Note that this is infallible iff we trust that at least one of the two input keys are randomly
	 * generated (ie our own).
	 * 
	 * [`chan_utils::derive_private_revocation_key`]: crate::ln::chan_utils::derive_private_revocation_key
	 */
	public static constructor_from_basepoint(countersignatory_basepoint: RevocationBasepoint, per_commitment_point: Uint8Array): RevocationKey {
		const ret: bigint = bindings.RevocationKey_from_basepoint(CommonBase.get_ptr_of(countersignatory_basepoint), bindings.encodeUint8Array(per_commitment_point));
		const ret_hu_conv: RevocationKey = new RevocationKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Get inner Public Key
	 */
	public to_public_key(): Uint8Array {
		const ret: number = bindings.RevocationKey_to_public_key(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Serialize the RevocationKey object into a byte array which can be read by RevocationKey_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.RevocationKey_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a RevocationKey from a byte array, created by RevocationKey_write
	 */
	public static constructor_read(ser: Uint8Array): Result_RevocationKeyDecodeErrorZ {
		const ret: bigint = bindings.RevocationKey_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_RevocationKeyDecodeErrorZ = Result_RevocationKeyDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
