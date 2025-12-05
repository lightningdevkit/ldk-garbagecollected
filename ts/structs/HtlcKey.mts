
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A derived key built from a [`HtlcBasepoint`] and `per_commitment_point`.
 * 
 * HTLC keys are used to ensure only the recipient of an HTLC can claim it on-chain with the HTLC
 * preimage and that only the sender of an HTLC can claim it on-chain after it has timed out.
 * Thus, both channel counterparties' HTLC keys will appears in each HTLC output's script.
 * 
 * [See the BOLT specs]
 * <https://github.com/lightning/bolts/blob/master/03-transactions.md#localpubkey-local_htlcpubkey-remote_htlcpubkey-local_delayedpubkey-and-remote_delayedpubkey-derivation>
 * for more information on key derivation details.
 */
export class HtlcKey extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.HtlcKey_free);
	}

	public get_a(): Uint8Array {
		const ret: number = bindings.HtlcKey_get_a(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	public set_a(val: Uint8Array): void {
		bindings.HtlcKey_set_a(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new HtlcKey given each field
	 */
	public static constructor_new(a_arg: Uint8Array): HtlcKey {
		const ret: bigint = bindings.HtlcKey_new(bindings.encodeUint8Array(a_arg));
		const ret_hu_conv: HtlcKey = new HtlcKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two HtlcKeys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: HtlcKey): boolean {
		const ret: boolean = bindings.HtlcKey_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.HtlcKey_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the HtlcKey
	 */
	public clone(): HtlcKey {
		const ret: bigint = bindings.HtlcKey_clone(this.ptr);
		const ret_hu_conv: HtlcKey = new HtlcKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Derive a public htlcpubkey using one node\'s `per_commitment_point` and its countersignatory\'s `basepoint`
	 */
	public static constructor_from_basepoint(countersignatory_basepoint: HtlcBasepoint, per_commitment_point: Uint8Array): HtlcKey {
		const ret: bigint = bindings.HtlcKey_from_basepoint(CommonBase.get_ptr_of(countersignatory_basepoint), bindings.encodeUint8Array(per_commitment_point));
		const ret_hu_conv: HtlcKey = new HtlcKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Build a htlcpubkey directly from an already-derived private key
	 */
	public static constructor_from_secret_key(sk: Uint8Array): HtlcKey {
		const ret: bigint = bindings.HtlcKey_from_secret_key(bindings.encodeUint8Array(sk));
		const ret_hu_conv: HtlcKey = new HtlcKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Get inner Public Key
	 */
	public to_public_key(): Uint8Array {
		const ret: number = bindings.HtlcKey_to_public_key(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Serialize the HtlcKey object into a byte array which can be read by HtlcKey_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.HtlcKey_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a HtlcKey from a byte array, created by HtlcKey_write
	 */
	public static constructor_read(ser: Uint8Array): Result_HtlcKeyDecodeErrorZ {
		const ret: bigint = bindings.HtlcKey_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_HtlcKeyDecodeErrorZ = Result_HtlcKeyDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
