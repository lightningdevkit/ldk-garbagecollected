
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Features used within an `offer`.
 */
export class OfferFeatures extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.OfferFeatures_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.OfferFeatures_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the OfferFeatures
	 */
	public clone(): OfferFeatures {
		const ret: bigint = bindings.OfferFeatures_clone(this.ptr);
		const ret_hu_conv: OfferFeatures = new OfferFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the OfferFeatures.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.OfferFeatures_hash(this.ptr);
		return ret;
	}

	/**
	 * Create a blank Features with no features set
	 */
	public static constructor_empty(): OfferFeatures {
		const ret: bigint = bindings.OfferFeatures_empty();
		const ret_hu_conv: OfferFeatures = new OfferFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Returns the feature set as a list of bytes, in little-endian. This is in reverse byte order
	 * from most on-the-wire encodings.
	 */
	public le_flags(): Uint8Array {
		const ret: number = bindings.OfferFeatures_le_flags(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns true if this `Features` has any optional flags set
	 */
	public supports_any_optional_bits(): boolean {
		const ret: boolean = bindings.OfferFeatures_supports_any_optional_bits(this.ptr);
		return ret;
	}

	/**
	 * Returns true if this `Features` object contains required features unknown by `other`.
	 */
	public requires_unknown_bits_from(other: OfferFeatures): boolean {
		const ret: boolean = bindings.OfferFeatures_requires_unknown_bits_from(this.ptr, CommonBase.get_ptr_of(other));
		return ret;
	}

	/**
	 * Returns the set of required features unknown by `other`, as their bit position.
	 */
	public required_unknown_bits_from(other: OfferFeatures): BigUint64Array {
		const ret: number = bindings.OfferFeatures_required_unknown_bits_from(this.ptr, CommonBase.get_ptr_of(other));
		const ret_conv: BigUint64Array = bindings.decodeUint64Array(ret);
		return ret_conv;
	}

	/**
	 * Returns true if this `Features` object contains unknown feature flags which are set as
	 * \"required\".
	 */
	public requires_unknown_bits(): boolean {
		const ret: boolean = bindings.OfferFeatures_requires_unknown_bits(this.ptr);
		return ret;
	}

	/**
	 * Returns true if this `Features` supports any bits which we do not know of
	 */
	public supports_unknown_bits(): boolean {
		const ret: boolean = bindings.OfferFeatures_supports_unknown_bits(this.ptr);
		return ret;
	}

	/**
	 * Sets a required feature bit. Errors if `bit` is outside the feature range as defined
	 * by [BOLT 9].
	 * 
	 * Note: Required bits are even. If an odd bit is given, then the corresponding even bit will
	 * be set instead (i.e., `bit - 1`).
	 * 
	 * [BOLT 9]: https://github.com/lightning/bolts/blob/master/09-features.md
	 */
	public set_required_feature_bit(bit: number): Result_NoneNoneZ {
		const ret: bigint = bindings.OfferFeatures_set_required_feature_bit(this.ptr, bit);
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sets an optional feature bit. Errors if `bit` is outside the feature range as defined
	 * by [BOLT 9].
	 * 
	 * Note: Optional bits are odd. If an even bit is given, then the corresponding odd bit will be
	 * set instead (i.e., `bit + 1`).
	 * 
	 * [BOLT 9]: https://github.com/lightning/bolts/blob/master/09-features.md
	 */
	public set_optional_feature_bit(bit: number): Result_NoneNoneZ {
		const ret: bigint = bindings.OfferFeatures_set_optional_feature_bit(this.ptr, bit);
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sets a required custom feature bit. Errors if `bit` is outside the custom range as defined
	 * by [bLIP 2] or if it is a known `T` feature.
	 * 
	 * Note: Required bits are even. If an odd bit is given, then the corresponding even bit will
	 * be set instead (i.e., `bit - 1`).
	 * 
	 * [bLIP 2]: https://github.com/lightning/blips/blob/master/blip-0002.md#feature-bits
	 */
	public set_required_custom_bit(bit: number): Result_NoneNoneZ {
		const ret: bigint = bindings.OfferFeatures_set_required_custom_bit(this.ptr, bit);
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sets an optional custom feature bit. Errors if `bit` is outside the custom range as defined
	 * by [bLIP 2] or if it is a known `T` feature.
	 * 
	 * Note: Optional bits are odd. If an even bit is given, then the corresponding odd bit will be
	 * set instead (i.e., `bit + 1`).
	 * 
	 * [bLIP 2]: https://github.com/lightning/blips/blob/master/blip-0002.md#feature-bits
	 */
	public set_optional_custom_bit(bit: number): Result_NoneNoneZ {
		const ret: bigint = bindings.OfferFeatures_set_optional_custom_bit(this.ptr, bit);
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
