
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An unauthenticated [`ReceiveTlvs`].
 */
export class UnauthenticatedReceiveTlvs extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.UnauthenticatedReceiveTlvs_free);
	}

	/**
	 * Used to authenticate the sender of a payment to the receiver and tie MPP HTLCs together.
	 */
	public get_payment_secret(): Uint8Array {
		const ret: number = bindings.UnauthenticatedReceiveTlvs_get_payment_secret(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Used to authenticate the sender of a payment to the receiver and tie MPP HTLCs together.
	 */
	public set_payment_secret(val: Uint8Array): void {
		bindings.UnauthenticatedReceiveTlvs_set_payment_secret(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constraints for the receiver of this payment.
	 */
	public get_payment_constraints(): PaymentConstraints {
		const ret: bigint = bindings.UnauthenticatedReceiveTlvs_get_payment_constraints(this.ptr);
		const ret_hu_conv: PaymentConstraints = new PaymentConstraints(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constraints for the receiver of this payment.
	 */
	public set_payment_constraints(val: PaymentConstraints): void {
		bindings.UnauthenticatedReceiveTlvs_set_payment_constraints(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Context for the receiver of this payment.
	 */
	public get_payment_context(): PaymentContext {
		const ret: bigint = bindings.UnauthenticatedReceiveTlvs_get_payment_context(this.ptr);
		const ret_hu_conv: PaymentContext = PaymentContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Context for the receiver of this payment.
	 */
	public set_payment_context(val: PaymentContext): void {
		bindings.UnauthenticatedReceiveTlvs_set_payment_context(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new UnauthenticatedReceiveTlvs given each field
	 */
	public static constructor_new(payment_secret_arg: Uint8Array, payment_constraints_arg: PaymentConstraints, payment_context_arg: PaymentContext): UnauthenticatedReceiveTlvs {
		const ret: bigint = bindings.UnauthenticatedReceiveTlvs_new(bindings.encodeUint8Array(payment_secret_arg), CommonBase.get_ptr_of(payment_constraints_arg), CommonBase.get_ptr_of(payment_context_arg));
		const ret_hu_conv: UnauthenticatedReceiveTlvs = new UnauthenticatedReceiveTlvs(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.UnauthenticatedReceiveTlvs_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the UnauthenticatedReceiveTlvs
	 */
	public clone(): UnauthenticatedReceiveTlvs {
		const ret: bigint = bindings.UnauthenticatedReceiveTlvs_clone(this.ptr);
		const ret_hu_conv: UnauthenticatedReceiveTlvs = new UnauthenticatedReceiveTlvs(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates an authenticated [`ReceiveTlvs`], which includes an HMAC and the provide [`Nonce`]
	 * that can be use later to verify it authenticity.
	 */
	public authenticate(nonce: Nonce, expanded_key: ExpandedKey): ReceiveTlvs {
		const ret: bigint = bindings.UnauthenticatedReceiveTlvs_authenticate(this.ptr, CommonBase.get_ptr_of(nonce), CommonBase.get_ptr_of(expanded_key));
		const ret_hu_conv: ReceiveTlvs = new ReceiveTlvs(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the UnauthenticatedReceiveTlvs object into a byte array which can be read by UnauthenticatedReceiveTlvs_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.UnauthenticatedReceiveTlvs_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Constructs a new Verification which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Verification must be freed before this_arg is
	 */
	public as_Verification(): Verification {
		const ret: bigint = bindings.UnauthenticatedReceiveTlvs_as_Verification(this.ptr);
		const ret_hu_conv: Verification = new Verification(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
