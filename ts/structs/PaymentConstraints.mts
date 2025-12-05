
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Constraints for relaying over a given [`BlindedHop`].
 * 
 * [`BlindedHop`]: crate::blinded_path::BlindedHop
 */
export class PaymentConstraints extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.PaymentConstraints_free);
	}

	/**
	 * The maximum total CLTV that is acceptable when relaying a payment over this [`BlindedHop`].
	 */
	public get_max_cltv_expiry(): number {
		const ret: number = bindings.PaymentConstraints_get_max_cltv_expiry(this.ptr);
		return ret;
	}

	/**
	 * The maximum total CLTV that is acceptable when relaying a payment over this [`BlindedHop`].
	 */
	public set_max_cltv_expiry(val: number): void {
		bindings.PaymentConstraints_set_max_cltv_expiry(this.ptr, val);
	}

	/**
	 * The minimum value, in msat, that may be accepted by the node corresponding to this
	 * [`BlindedHop`].
	 */
	public get_htlc_minimum_msat(): bigint {
		const ret: bigint = bindings.PaymentConstraints_get_htlc_minimum_msat(this.ptr);
		return ret;
	}

	/**
	 * The minimum value, in msat, that may be accepted by the node corresponding to this
	 * [`BlindedHop`].
	 */
	public set_htlc_minimum_msat(val: bigint): void {
		bindings.PaymentConstraints_set_htlc_minimum_msat(this.ptr, val);
	}

	/**
	 * Constructs a new PaymentConstraints given each field
	 */
	public static constructor_new(max_cltv_expiry_arg: number, htlc_minimum_msat_arg: bigint): PaymentConstraints {
		const ret: bigint = bindings.PaymentConstraints_new(max_cltv_expiry_arg, htlc_minimum_msat_arg);
		const ret_hu_conv: PaymentConstraints = new PaymentConstraints(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.PaymentConstraints_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the PaymentConstraints
	 */
	public clone(): PaymentConstraints {
		const ret: bigint = bindings.PaymentConstraints_clone(this.ptr);
		const ret_hu_conv: PaymentConstraints = new PaymentConstraints(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the PaymentConstraints object into a byte array which can be read by PaymentConstraints_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.PaymentConstraints_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a PaymentConstraints from a byte array, created by PaymentConstraints_write
	 */
	public static constructor_read(ser: Uint8Array): Result_PaymentConstraintsDecodeErrorZ {
		const ret: bigint = bindings.PaymentConstraints_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_PaymentConstraintsDecodeErrorZ = Result_PaymentConstraintsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
