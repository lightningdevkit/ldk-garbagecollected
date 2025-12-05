
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A derived key built from a [`DelayedPaymentBasepoint`] and `per_commitment_point`.
 * 
 * The delayed payment key is used to pay the commitment state broadcaster their
 * non-HTLC-encumbered funds after a delay. This delay gives their counterparty a chance to
 * punish and claim all the channel funds if the state broadcasted was previously revoked.
 * 
 * [See the BOLT specs]
 * <https://github.com/lightning/bolts/blob/master/03-transactions.md#localpubkey-local_htlcpubkey-remote_htlcpubkey-local_delayedpubkey-and-remote_delayedpubkey-derivation>
 * for more information on key derivation details.
 */
export class DelayedPaymentKey extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.DelayedPaymentKey_free);
	}

	public get_a(): Uint8Array {
		const ret: number = bindings.DelayedPaymentKey_get_a(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	public set_a(val: Uint8Array): void {
		bindings.DelayedPaymentKey_set_a(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new DelayedPaymentKey given each field
	 */
	public static constructor_new(a_arg: Uint8Array): DelayedPaymentKey {
		const ret: bigint = bindings.DelayedPaymentKey_new(bindings.encodeUint8Array(a_arg));
		const ret_hu_conv: DelayedPaymentKey = new DelayedPaymentKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two DelayedPaymentKeys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: DelayedPaymentKey): boolean {
		const ret: boolean = bindings.DelayedPaymentKey_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.DelayedPaymentKey_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the DelayedPaymentKey
	 */
	public clone(): DelayedPaymentKey {
		const ret: bigint = bindings.DelayedPaymentKey_clone(this.ptr);
		const ret_hu_conv: DelayedPaymentKey = new DelayedPaymentKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Derive a public delayedpubkey using one node\'s `per_commitment_point` and its countersignatory\'s `basepoint`
	 */
	public static constructor_from_basepoint(countersignatory_basepoint: DelayedPaymentBasepoint, per_commitment_point: Uint8Array): DelayedPaymentKey {
		const ret: bigint = bindings.DelayedPaymentKey_from_basepoint(CommonBase.get_ptr_of(countersignatory_basepoint), bindings.encodeUint8Array(per_commitment_point));
		const ret_hu_conv: DelayedPaymentKey = new DelayedPaymentKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Build a delayedpubkey directly from an already-derived private key
	 */
	public static constructor_from_secret_key(sk: Uint8Array): DelayedPaymentKey {
		const ret: bigint = bindings.DelayedPaymentKey_from_secret_key(bindings.encodeUint8Array(sk));
		const ret_hu_conv: DelayedPaymentKey = new DelayedPaymentKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Get inner Public Key
	 */
	public to_public_key(): Uint8Array {
		const ret: number = bindings.DelayedPaymentKey_to_public_key(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Serialize the DelayedPaymentKey object into a byte array which can be read by DelayedPaymentKey_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.DelayedPaymentKey_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a DelayedPaymentKey from a byte array, created by DelayedPaymentKey_write
	 */
	public static constructor_read(ser: Uint8Array): Result_DelayedPaymentKeyDecodeErrorZ {
		const ret: bigint = bindings.DelayedPaymentKey_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_DelayedPaymentKeyDecodeErrorZ = Result_DelayedPaymentKeyDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
