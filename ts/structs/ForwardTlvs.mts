
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Data to construct a [`BlindedHop`] for forwarding a payment.
 */
export class ForwardTlvs extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ForwardTlvs_free);
	}

	/**
	 * The short channel id this payment should be forwarded out over.
	 */
	public get_short_channel_id(): bigint {
		const ret: bigint = bindings.ForwardTlvs_get_short_channel_id(this.ptr);
		return ret;
	}

	/**
	 * The short channel id this payment should be forwarded out over.
	 */
	public set_short_channel_id(val: bigint): void {
		bindings.ForwardTlvs_set_short_channel_id(this.ptr, val);
	}

	/**
	 * Payment parameters for relaying over [`Self::short_channel_id`].
	 */
	public get_payment_relay(): PaymentRelay {
		const ret: bigint = bindings.ForwardTlvs_get_payment_relay(this.ptr);
		const ret_hu_conv: PaymentRelay = new PaymentRelay(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Payment parameters for relaying over [`Self::short_channel_id`].
	 */
	public set_payment_relay(val: PaymentRelay): void {
		bindings.ForwardTlvs_set_payment_relay(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Payment constraints for relaying over [`Self::short_channel_id`].
	 */
	public get_payment_constraints(): PaymentConstraints {
		const ret: bigint = bindings.ForwardTlvs_get_payment_constraints(this.ptr);
		const ret_hu_conv: PaymentConstraints = new PaymentConstraints(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Payment constraints for relaying over [`Self::short_channel_id`].
	 */
	public set_payment_constraints(val: PaymentConstraints): void {
		bindings.ForwardTlvs_set_payment_constraints(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Supported and required features when relaying a payment onion containing this object's
	 * corresponding [`BlindedHop::encrypted_payload`].
	 * 
	 * [`BlindedHop::encrypted_payload`]: crate::blinded_path::BlindedHop::encrypted_payload
	 */
	public get_features(): BlindedHopFeatures {
		const ret: bigint = bindings.ForwardTlvs_get_features(this.ptr);
		const ret_hu_conv: BlindedHopFeatures = new BlindedHopFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Supported and required features when relaying a payment onion containing this object's
	 * corresponding [`BlindedHop::encrypted_payload`].
	 * 
	 * [`BlindedHop::encrypted_payload`]: crate::blinded_path::BlindedHop::encrypted_payload
	 */
	public set_features(val: BlindedHopFeatures): void {
		bindings.ForwardTlvs_set_features(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Set if this [`BlindedPaymentPath`] is concatenated to another, to indicate the
	 * [`BlindedPaymentPath::blinding_point`] of the appended blinded path.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_next_blinding_override(): Uint8Array {
		const ret: number = bindings.ForwardTlvs_get_next_blinding_override(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Set if this [`BlindedPaymentPath`] is concatenated to another, to indicate the
	 * [`BlindedPaymentPath::blinding_point`] of the appended blinded path.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_next_blinding_override(val: Uint8Array|null): void {
		bindings.ForwardTlvs_set_next_blinding_override(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new ForwardTlvs given each field
	 * 
	 * Note that next_blinding_override_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(short_channel_id_arg: bigint, payment_relay_arg: PaymentRelay, payment_constraints_arg: PaymentConstraints, features_arg: BlindedHopFeatures, next_blinding_override_arg: Uint8Array|null): ForwardTlvs {
		const ret: bigint = bindings.ForwardTlvs_new(short_channel_id_arg, CommonBase.get_ptr_of(payment_relay_arg), CommonBase.get_ptr_of(payment_constraints_arg), CommonBase.get_ptr_of(features_arg), bindings.encodeUint8Array(next_blinding_override_arg));
		const ret_hu_conv: ForwardTlvs = new ForwardTlvs(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ForwardTlvs_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ForwardTlvs
	 */
	public clone(): ForwardTlvs {
		const ret: bigint = bindings.ForwardTlvs_clone(this.ptr);
		const ret_hu_conv: ForwardTlvs = new ForwardTlvs(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ForwardTlvs object into a byte array which can be read by ForwardTlvs_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ForwardTlvs_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
