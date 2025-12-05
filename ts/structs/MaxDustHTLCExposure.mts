
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Options for how to set the max dust exposure allowed on a channel. See
 * [`ChannelConfig::max_dust_htlc_exposure`] for details.
 */
export class MaxDustHTLCExposure extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.MaxDustHTLCExposure_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): MaxDustHTLCExposure {
		const raw_ty: number = bindings.LDKMaxDustHTLCExposure_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new MaxDustHTLCExposure_FixedLimitMsat(ptr);
			case 1: return new MaxDustHTLCExposure_FeeRateMultiplier(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.MaxDustHTLCExposure_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the MaxDustHTLCExposure
	 */
	public clone(): MaxDustHTLCExposure {
		const ret: bigint = bindings.MaxDustHTLCExposure_clone(this.ptr);
		const ret_hu_conv: MaxDustHTLCExposure = MaxDustHTLCExposure.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FixedLimitMsat-variant MaxDustHTLCExposure
	 */
	public static constructor_fixed_limit_msat(a: bigint): MaxDustHTLCExposure {
		const ret: bigint = bindings.MaxDustHTLCExposure_fixed_limit_msat(a);
		const ret_hu_conv: MaxDustHTLCExposure = MaxDustHTLCExposure.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FeeRateMultiplier-variant MaxDustHTLCExposure
	 */
	public static constructor_fee_rate_multiplier(a: bigint): MaxDustHTLCExposure {
		const ret: bigint = bindings.MaxDustHTLCExposure_fee_rate_multiplier(a);
		const ret_hu_conv: MaxDustHTLCExposure = MaxDustHTLCExposure.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two MaxDustHTLCExposures contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: MaxDustHTLCExposure): boolean {
		const ret: boolean = bindings.MaxDustHTLCExposure_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the MaxDustHTLCExposure object into a byte array which can be read by MaxDustHTLCExposure_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.MaxDustHTLCExposure_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a MaxDustHTLCExposure from a byte array, created by MaxDustHTLCExposure_write
	 */
	public static constructor_read(ser: Uint8Array): Result_MaxDustHTLCExposureDecodeErrorZ {
		const ret: bigint = bindings.MaxDustHTLCExposure_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_MaxDustHTLCExposureDecodeErrorZ = Result_MaxDustHTLCExposureDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
/** A MaxDustHTLCExposure of type FixedLimitMsat */
export class MaxDustHTLCExposure_FixedLimitMsat extends MaxDustHTLCExposure {
	public fixed_limit_msat: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.fixed_limit_msat = bindings.LDKMaxDustHTLCExposure_FixedLimitMsat_get_fixed_limit_msat(ptr);
	}
}
/** A MaxDustHTLCExposure of type FeeRateMultiplier */
export class MaxDustHTLCExposure_FeeRateMultiplier extends MaxDustHTLCExposure {
	public fee_rate_multiplier: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.fee_rate_multiplier = bindings.LDKMaxDustHTLCExposure_FeeRateMultiplier_get_fee_rate_multiplier(ptr);
	}
}
