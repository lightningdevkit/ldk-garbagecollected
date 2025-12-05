
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Implements the per-commitment secret storage scheme from
 * [BOLT 3](https://github.com/lightning/bolts/blob/dcbf8583976df087c79c3ce0b535311212e6812d/03-transactions.md#efficient-per-commitment-secret-storage).
 * 
 * Allows us to keep track of all of the revocation secrets of our counterparty in just 50*32 bytes
 * or so.
 */
export class CounterpartyCommitmentSecrets extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CounterpartyCommitmentSecrets_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CounterpartyCommitmentSecrets_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the CounterpartyCommitmentSecrets
	 */
	public clone(): CounterpartyCommitmentSecrets {
		const ret: bigint = bindings.CounterpartyCommitmentSecrets_clone(this.ptr);
		const ret_hu_conv: CounterpartyCommitmentSecrets = new CounterpartyCommitmentSecrets(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new empty `CounterpartyCommitmentSecrets` structure.
	 */
	public static constructor_new(): CounterpartyCommitmentSecrets {
		const ret: bigint = bindings.CounterpartyCommitmentSecrets_new();
		const ret_hu_conv: CounterpartyCommitmentSecrets = new CounterpartyCommitmentSecrets(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Returns the minimum index of all stored secrets. Note that indexes start
	 * at 1 << 48 and get decremented by one for each new secret.
	 */
	public get_min_seen_secret(): bigint {
		const ret: bigint = bindings.CounterpartyCommitmentSecrets_get_min_seen_secret(this.ptr);
		return ret;
	}

	/**
	 * Inserts the `secret` at `idx`. Returns `Ok(())` if the secret
	 * was generated in accordance with BOLT 3 and is consistent with previous secrets.
	 */
	public provide_secret(idx: bigint, secret: Uint8Array): Result_NoneNoneZ {
		const ret: bigint = bindings.CounterpartyCommitmentSecrets_provide_secret(this.ptr, idx, bindings.encodeUint8Array(secret));
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns the secret at `idx`.
	 * Returns `None` if `idx` is < [`CounterpartyCommitmentSecrets::get_min_seen_secret`].
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_secret(idx: bigint): Uint8Array {
		const ret: number = bindings.CounterpartyCommitmentSecrets_get_secret(this.ptr, idx);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Serialize the CounterpartyCommitmentSecrets object into a byte array which can be read by CounterpartyCommitmentSecrets_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.CounterpartyCommitmentSecrets_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a CounterpartyCommitmentSecrets from a byte array, created by CounterpartyCommitmentSecrets_write
	 */
	public static constructor_read(ser: Uint8Array): Result_CounterpartyCommitmentSecretsDecodeErrorZ {
		const ret: bigint = bindings.CounterpartyCommitmentSecrets_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_CounterpartyCommitmentSecretsDecodeErrorZ = Result_CounterpartyCommitmentSecretsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
