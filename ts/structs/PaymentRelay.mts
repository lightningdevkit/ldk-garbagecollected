
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Parameters for relaying over a given [`BlindedHop`].
 * 
 * [`BlindedHop`]: crate::blinded_path::BlindedHop
 */
export class PaymentRelay extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.PaymentRelay_free);
	}

	/**
	 * Number of blocks subtracted from an incoming HTLC's `cltv_expiry` for this [`BlindedHop`].
	 */
	public get_cltv_expiry_delta(): number {
		const ret: number = bindings.PaymentRelay_get_cltv_expiry_delta(this.ptr);
		return ret;
	}

	/**
	 * Number of blocks subtracted from an incoming HTLC's `cltv_expiry` for this [`BlindedHop`].
	 */
	public set_cltv_expiry_delta(val: number): void {
		bindings.PaymentRelay_set_cltv_expiry_delta(this.ptr, val);
	}

	/**
	 * Liquidity fee charged (in millionths of the amount transferred) for relaying a payment over
	 * this [`BlindedHop`], (i.e., 10,000 is 1%).
	 */
	public get_fee_proportional_millionths(): number {
		const ret: number = bindings.PaymentRelay_get_fee_proportional_millionths(this.ptr);
		return ret;
	}

	/**
	 * Liquidity fee charged (in millionths of the amount transferred) for relaying a payment over
	 * this [`BlindedHop`], (i.e., 10,000 is 1%).
	 */
	public set_fee_proportional_millionths(val: number): void {
		bindings.PaymentRelay_set_fee_proportional_millionths(this.ptr, val);
	}

	/**
	 * Base fee charged (in millisatoshi) for relaying a payment over this [`BlindedHop`].
	 */
	public get_fee_base_msat(): number {
		const ret: number = bindings.PaymentRelay_get_fee_base_msat(this.ptr);
		return ret;
	}

	/**
	 * Base fee charged (in millisatoshi) for relaying a payment over this [`BlindedHop`].
	 */
	public set_fee_base_msat(val: number): void {
		bindings.PaymentRelay_set_fee_base_msat(this.ptr, val);
	}

	/**
	 * Constructs a new PaymentRelay given each field
	 */
	public static constructor_new(cltv_expiry_delta_arg: number, fee_proportional_millionths_arg: number, fee_base_msat_arg: number): PaymentRelay {
		const ret: bigint = bindings.PaymentRelay_new(cltv_expiry_delta_arg, fee_proportional_millionths_arg, fee_base_msat_arg);
		const ret_hu_conv: PaymentRelay = new PaymentRelay(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.PaymentRelay_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the PaymentRelay
	 */
	public clone(): PaymentRelay {
		const ret: bigint = bindings.PaymentRelay_clone(this.ptr);
		const ret_hu_conv: PaymentRelay = new PaymentRelay(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the PaymentRelay object into a byte array which can be read by PaymentRelay_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.PaymentRelay_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a PaymentRelay from a byte array, created by PaymentRelay_write
	 */
	public static constructor_read(ser: Uint8Array): Result_PaymentRelayDecodeErrorZ {
		const ret: bigint = bindings.PaymentRelay_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_PaymentRelayDecodeErrorZ = Result_PaymentRelayDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
