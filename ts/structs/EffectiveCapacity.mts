
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * The effective capacity of a channel for routing purposes.
 * 
 * While this may be smaller than the actual channel capacity, amounts greater than
 * [`Self::as_msat`] should not be routed through the channel.
 */
export class EffectiveCapacity extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.EffectiveCapacity_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): EffectiveCapacity {
		const raw_ty: number = bindings.LDKEffectiveCapacity_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new EffectiveCapacity_ExactLiquidity(ptr);
			case 1: return new EffectiveCapacity_AdvertisedMaxHTLC(ptr);
			case 2: return new EffectiveCapacity_Total(ptr);
			case 3: return new EffectiveCapacity_Infinite(ptr);
			case 4: return new EffectiveCapacity_HintMaxHTLC(ptr);
			case 5: return new EffectiveCapacity_Unknown(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.EffectiveCapacity_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the EffectiveCapacity
	 */
	public clone(): EffectiveCapacity {
		const ret: bigint = bindings.EffectiveCapacity_clone(this.ptr);
		const ret_hu_conv: EffectiveCapacity = EffectiveCapacity.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ExactLiquidity-variant EffectiveCapacity
	 */
	public static constructor_exact_liquidity(liquidity_msat: bigint): EffectiveCapacity {
		const ret: bigint = bindings.EffectiveCapacity_exact_liquidity(liquidity_msat);
		const ret_hu_conv: EffectiveCapacity = EffectiveCapacity.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new AdvertisedMaxHTLC-variant EffectiveCapacity
	 */
	public static constructor_advertised_max_htlc(amount_msat: bigint): EffectiveCapacity {
		const ret: bigint = bindings.EffectiveCapacity_advertised_max_htlc(amount_msat);
		const ret_hu_conv: EffectiveCapacity = EffectiveCapacity.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Total-variant EffectiveCapacity
	 */
	public static constructor_total(capacity_msat: bigint, htlc_maximum_msat: bigint): EffectiveCapacity {
		const ret: bigint = bindings.EffectiveCapacity_total(capacity_msat, htlc_maximum_msat);
		const ret_hu_conv: EffectiveCapacity = EffectiveCapacity.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Infinite-variant EffectiveCapacity
	 */
	public static constructor_infinite(): EffectiveCapacity {
		const ret: bigint = bindings.EffectiveCapacity_infinite();
		const ret_hu_conv: EffectiveCapacity = EffectiveCapacity.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HintMaxHTLC-variant EffectiveCapacity
	 */
	public static constructor_hint_max_htlc(amount_msat: bigint): EffectiveCapacity {
		const ret: bigint = bindings.EffectiveCapacity_hint_max_htlc(amount_msat);
		const ret_hu_conv: EffectiveCapacity = EffectiveCapacity.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Unknown-variant EffectiveCapacity
	 */
	public static constructor_unknown(): EffectiveCapacity {
		const ret: bigint = bindings.EffectiveCapacity_unknown();
		const ret_hu_conv: EffectiveCapacity = EffectiveCapacity.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Returns the effective capacity denominated in millisatoshi.
	 */
	public as_msat(): bigint {
		const ret: bigint = bindings.EffectiveCapacity_as_msat(this.ptr);
		return ret;
	}

}
/** A EffectiveCapacity of type ExactLiquidity */
export class EffectiveCapacity_ExactLiquidity extends EffectiveCapacity {
	/**
	 * Either the inbound or outbound liquidity depending on the direction, denominated in
	 * millisatoshi.
	 */
	public liquidity_msat: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.liquidity_msat = bindings.LDKEffectiveCapacity_ExactLiquidity_get_liquidity_msat(ptr);
	}
}
/** A EffectiveCapacity of type AdvertisedMaxHTLC */
export class EffectiveCapacity_AdvertisedMaxHTLC extends EffectiveCapacity {
	/**
	 * The maximum HTLC amount denominated in millisatoshi.
	 */
	public amount_msat: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.amount_msat = bindings.LDKEffectiveCapacity_AdvertisedMaxHTLC_get_amount_msat(ptr);
	}
}
/** A EffectiveCapacity of type Total */
export class EffectiveCapacity_Total extends EffectiveCapacity {
	/**
	 * The funding amount denominated in millisatoshi.
	 */
	public capacity_msat: bigint;
	/**
	 * The maximum HTLC amount denominated in millisatoshi.
	 */
	public htlc_maximum_msat: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.capacity_msat = bindings.LDKEffectiveCapacity_Total_get_capacity_msat(ptr);
		this.htlc_maximum_msat = bindings.LDKEffectiveCapacity_Total_get_htlc_maximum_msat(ptr);
	}
}
/** A EffectiveCapacity of type Infinite */
export class EffectiveCapacity_Infinite extends EffectiveCapacity {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A EffectiveCapacity of type HintMaxHTLC */
export class EffectiveCapacity_HintMaxHTLC extends EffectiveCapacity {
	/**
	 * The maximum HTLC amount denominated in millisatoshi.
	 */
	public amount_msat: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.amount_msat = bindings.LDKEffectiveCapacity_HintMaxHTLC_get_amount_msat(ptr);
	}
}
/** A EffectiveCapacity of type Unknown */
export class EffectiveCapacity_Unknown extends EffectiveCapacity {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
