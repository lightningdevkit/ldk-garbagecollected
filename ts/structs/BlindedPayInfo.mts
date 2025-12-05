
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Information needed to route a payment across a [`BlindedPaymentPath`].
 */
export class BlindedPayInfo extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.BlindedPayInfo_free);
	}

	/**
	 * Base fee charged (in millisatoshi) for the entire blinded path.
	 */
	public get_fee_base_msat(): number {
		const ret: number = bindings.BlindedPayInfo_get_fee_base_msat(this.ptr);
		return ret;
	}

	/**
	 * Base fee charged (in millisatoshi) for the entire blinded path.
	 */
	public set_fee_base_msat(val: number): void {
		bindings.BlindedPayInfo_set_fee_base_msat(this.ptr, val);
	}

	/**
	 * Liquidity fee charged (in millionths of the amount transferred) for the entire blinded path
	 * (i.e., 10,000 is 1%).
	 */
	public get_fee_proportional_millionths(): number {
		const ret: number = bindings.BlindedPayInfo_get_fee_proportional_millionths(this.ptr);
		return ret;
	}

	/**
	 * Liquidity fee charged (in millionths of the amount transferred) for the entire blinded path
	 * (i.e., 10,000 is 1%).
	 */
	public set_fee_proportional_millionths(val: number): void {
		bindings.BlindedPayInfo_set_fee_proportional_millionths(this.ptr, val);
	}

	/**
	 * Number of blocks subtracted from an incoming HTLC's `cltv_expiry` for the entire blinded
	 * path.
	 */
	public get_cltv_expiry_delta(): number {
		const ret: number = bindings.BlindedPayInfo_get_cltv_expiry_delta(this.ptr);
		return ret;
	}

	/**
	 * Number of blocks subtracted from an incoming HTLC's `cltv_expiry` for the entire blinded
	 * path.
	 */
	public set_cltv_expiry_delta(val: number): void {
		bindings.BlindedPayInfo_set_cltv_expiry_delta(this.ptr, val);
	}

	/**
	 * The minimum HTLC value (in millisatoshi) that is acceptable to all channel peers on the
	 * blinded path from the introduction node to the recipient, accounting for any fees, i.e., as
	 * seen by the recipient.
	 */
	public get_htlc_minimum_msat(): bigint {
		const ret: bigint = bindings.BlindedPayInfo_get_htlc_minimum_msat(this.ptr);
		return ret;
	}

	/**
	 * The minimum HTLC value (in millisatoshi) that is acceptable to all channel peers on the
	 * blinded path from the introduction node to the recipient, accounting for any fees, i.e., as
	 * seen by the recipient.
	 */
	public set_htlc_minimum_msat(val: bigint): void {
		bindings.BlindedPayInfo_set_htlc_minimum_msat(this.ptr, val);
	}

	/**
	 * The maximum HTLC value (in millisatoshi) that is acceptable to all channel peers on the
	 * blinded path from the introduction node to the recipient, accounting for any fees, i.e., as
	 * seen by the recipient.
	 */
	public get_htlc_maximum_msat(): bigint {
		const ret: bigint = bindings.BlindedPayInfo_get_htlc_maximum_msat(this.ptr);
		return ret;
	}

	/**
	 * The maximum HTLC value (in millisatoshi) that is acceptable to all channel peers on the
	 * blinded path from the introduction node to the recipient, accounting for any fees, i.e., as
	 * seen by the recipient.
	 */
	public set_htlc_maximum_msat(val: bigint): void {
		bindings.BlindedPayInfo_set_htlc_maximum_msat(this.ptr, val);
	}

	/**
	 * Features set in `encrypted_data_tlv` for the `encrypted_recipient_data` TLV record in an
	 * onion payload.
	 */
	public get_features(): BlindedHopFeatures {
		const ret: bigint = bindings.BlindedPayInfo_get_features(this.ptr);
		const ret_hu_conv: BlindedHopFeatures = new BlindedHopFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Features set in `encrypted_data_tlv` for the `encrypted_recipient_data` TLV record in an
	 * onion payload.
	 */
	public set_features(val: BlindedHopFeatures): void {
		bindings.BlindedPayInfo_set_features(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new BlindedPayInfo given each field
	 */
	public static constructor_new(fee_base_msat_arg: number, fee_proportional_millionths_arg: number, cltv_expiry_delta_arg: number, htlc_minimum_msat_arg: bigint, htlc_maximum_msat_arg: bigint, features_arg: BlindedHopFeatures): BlindedPayInfo {
		const ret: bigint = bindings.BlindedPayInfo_new(fee_base_msat_arg, fee_proportional_millionths_arg, cltv_expiry_delta_arg, htlc_minimum_msat_arg, htlc_maximum_msat_arg, CommonBase.get_ptr_of(features_arg));
		const ret_hu_conv: BlindedPayInfo = new BlindedPayInfo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.BlindedPayInfo_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the BlindedPayInfo
	 */
	public clone(): BlindedPayInfo {
		const ret: bigint = bindings.BlindedPayInfo_clone(this.ptr);
		const ret_hu_conv: BlindedPayInfo = new BlindedPayInfo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the BlindedPayInfo.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.BlindedPayInfo_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two BlindedPayInfos contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: BlindedPayInfo): boolean {
		const ret: boolean = bindings.BlindedPayInfo_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the BlindedPayInfo object into a byte array which can be read by BlindedPayInfo_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.BlindedPayInfo_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a BlindedPayInfo from a byte array, created by BlindedPayInfo_write
	 */
	public static constructor_read(ser: Uint8Array): Result_BlindedPayInfoDecodeErrorZ {
		const ret: bigint = bindings.BlindedPayInfo_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_BlindedPayInfoDecodeErrorZ = Result_BlindedPayInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
