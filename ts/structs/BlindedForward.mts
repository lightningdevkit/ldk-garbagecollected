
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Information used to forward or fail this HTLC that is being forwarded within a blinded path.
 */
export class BlindedForward extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.BlindedForward_free);
	}

	/**
	 * The `blinding_point` that was set in the inbound [`msgs::UpdateAddHTLC`], or in the inbound
	 * onion payload if we're the introduction node. Useful for calculating the next hop's
	 * [`msgs::UpdateAddHTLC::blinding_point`].
	 */
	public get_inbound_blinding_point(): Uint8Array {
		const ret: number = bindings.BlindedForward_get_inbound_blinding_point(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The `blinding_point` that was set in the inbound [`msgs::UpdateAddHTLC`], or in the inbound
	 * onion payload if we're the introduction node. Useful for calculating the next hop's
	 * [`msgs::UpdateAddHTLC::blinding_point`].
	 */
	public set_inbound_blinding_point(val: Uint8Array): void {
		bindings.BlindedForward_set_inbound_blinding_point(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * If needed, this determines how this HTLC should be failed backwards, based on whether we are
	 * the introduction node.
	 */
	public get_failure(): BlindedFailure {
		const ret: BlindedFailure = bindings.BlindedForward_get_failure(this.ptr);
		return ret;
	}

	/**
	 * If needed, this determines how this HTLC should be failed backwards, based on whether we are
	 * the introduction node.
	 */
	public set_failure(val: BlindedFailure): void {
		bindings.BlindedForward_set_failure(this.ptr, val);
	}

	/**
	 * Overrides the next hop's [`msgs::UpdateAddHTLC::blinding_point`]. Set if this HTLC is being
	 * forwarded within a [`BlindedPaymentPath`] that was concatenated to another blinded path that
	 * starts at the next hop.
	 * 
	 * [`BlindedPaymentPath`]: crate::blinded_path::payment::BlindedPaymentPath
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_next_blinding_override(): Uint8Array {
		const ret: number = bindings.BlindedForward_get_next_blinding_override(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Overrides the next hop's [`msgs::UpdateAddHTLC::blinding_point`]. Set if this HTLC is being
	 * forwarded within a [`BlindedPaymentPath`] that was concatenated to another blinded path that
	 * starts at the next hop.
	 * 
	 * [`BlindedPaymentPath`]: crate::blinded_path::payment::BlindedPaymentPath
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_next_blinding_override(val: Uint8Array|null): void {
		bindings.BlindedForward_set_next_blinding_override(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new BlindedForward given each field
	 * 
	 * Note that next_blinding_override_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(inbound_blinding_point_arg: Uint8Array, failure_arg: BlindedFailure, next_blinding_override_arg: Uint8Array|null): BlindedForward {
		const ret: bigint = bindings.BlindedForward_new(bindings.encodeUint8Array(inbound_blinding_point_arg), failure_arg, bindings.encodeUint8Array(next_blinding_override_arg));
		const ret_hu_conv: BlindedForward = new BlindedForward(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.BlindedForward_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the BlindedForward
	 */
	public clone(): BlindedForward {
		const ret: bigint = bindings.BlindedForward_clone(this.ptr);
		const ret_hu_conv: BlindedForward = new BlindedForward(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the BlindedForward.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.BlindedForward_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two BlindedForwards contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: BlindedForward): boolean {
		const ret: boolean = bindings.BlindedForward_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the BlindedForward object into a byte array which can be read by BlindedForward_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.BlindedForward_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a BlindedForward from a byte array, created by BlindedForward_write
	 */
	public static constructor_read(ser: Uint8Array): Result_BlindedForwardDecodeErrorZ {
		const ret: bigint = bindings.BlindedForward_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_BlindedForwardDecodeErrorZ = Result_BlindedForwardDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
