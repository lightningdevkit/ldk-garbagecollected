
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Data to construct a [`BlindedHop`] for forwarding a Trampoline payment.
 */
export class TrampolineForwardTlvs extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.TrampolineForwardTlvs_free);
	}

	/**
	 * The node id to which the trampoline node must find a route.
	 */
	public get_next_trampoline(): Uint8Array {
		const ret: number = bindings.TrampolineForwardTlvs_get_next_trampoline(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The node id to which the trampoline node must find a route.
	 */
	public set_next_trampoline(val: Uint8Array): void {
		bindings.TrampolineForwardTlvs_set_next_trampoline(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Payment parameters for relaying over [`Self::next_trampoline`].
	 */
	public get_payment_relay(): PaymentRelay {
		const ret: bigint = bindings.TrampolineForwardTlvs_get_payment_relay(this.ptr);
		const ret_hu_conv: PaymentRelay = new PaymentRelay(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Payment parameters for relaying over [`Self::next_trampoline`].
	 */
	public set_payment_relay(val: PaymentRelay): void {
		bindings.TrampolineForwardTlvs_set_payment_relay(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Payment constraints for relaying over [`Self::next_trampoline`].
	 */
	public get_payment_constraints(): PaymentConstraints {
		const ret: bigint = bindings.TrampolineForwardTlvs_get_payment_constraints(this.ptr);
		const ret_hu_conv: PaymentConstraints = new PaymentConstraints(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Payment constraints for relaying over [`Self::next_trampoline`].
	 */
	public set_payment_constraints(val: PaymentConstraints): void {
		bindings.TrampolineForwardTlvs_set_payment_constraints(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Supported and required features when relaying a payment onion containing this object's
	 * corresponding [`BlindedHop::encrypted_payload`].
	 * 
	 * [`BlindedHop::encrypted_payload`]: crate::blinded_path::BlindedHop::encrypted_payload
	 */
	public get_features(): BlindedHopFeatures {
		const ret: bigint = bindings.TrampolineForwardTlvs_get_features(this.ptr);
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
		bindings.TrampolineForwardTlvs_set_features(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Set if this [`BlindedPaymentPath`] is concatenated to another, to indicate the
	 * [`BlindedPaymentPath::blinding_point`] of the appended blinded path.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_next_blinding_override(): Uint8Array {
		const ret: number = bindings.TrampolineForwardTlvs_get_next_blinding_override(this.ptr);
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
		bindings.TrampolineForwardTlvs_set_next_blinding_override(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new TrampolineForwardTlvs given each field
	 * 
	 * Note that next_blinding_override_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(next_trampoline_arg: Uint8Array, payment_relay_arg: PaymentRelay, payment_constraints_arg: PaymentConstraints, features_arg: BlindedHopFeatures, next_blinding_override_arg: Uint8Array|null): TrampolineForwardTlvs {
		const ret: bigint = bindings.TrampolineForwardTlvs_new(bindings.encodeUint8Array(next_trampoline_arg), CommonBase.get_ptr_of(payment_relay_arg), CommonBase.get_ptr_of(payment_constraints_arg), CommonBase.get_ptr_of(features_arg), bindings.encodeUint8Array(next_blinding_override_arg));
		const ret_hu_conv: TrampolineForwardTlvs = new TrampolineForwardTlvs(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.TrampolineForwardTlvs_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the TrampolineForwardTlvs
	 */
	public clone(): TrampolineForwardTlvs {
		const ret: bigint = bindings.TrampolineForwardTlvs_clone(this.ptr);
		const ret_hu_conv: TrampolineForwardTlvs = new TrampolineForwardTlvs(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the TrampolineForwardTlvs object into a byte array which can be read by TrampolineForwardTlvs_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.TrampolineForwardTlvs_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
