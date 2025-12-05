
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Features used within the channel_type field in an OpenChannel message.
 * 
 * A channel is always of some known \"type\", describing the transaction formats used and the exact
 * semantics of our interaction with our peer.
 * 
 * Note that because a channel is a specific type which is proposed by the opener and accepted by
 * the counterparty, only required features are allowed here.
 * 
 * This is serialized differently from other feature types - it is not prefixed by a length, and
 * thus must only appear inside a TLV where its length is known in advance.
 */
export class ChannelTypeFeatures extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelTypeFeatures_free);
	}

	/**
	 * Serialize the ChannelTypeFeatures object into a byte array which can be read by ChannelTypeFeatures_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ChannelTypeFeatures_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ChannelTypeFeatures from a byte array, created by ChannelTypeFeatures_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ChannelTypeFeaturesDecodeErrorZ {
		const ret: bigint = bindings.ChannelTypeFeatures_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ChannelTypeFeaturesDecodeErrorZ = Result_ChannelTypeFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChannelTypeFeatures_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelTypeFeatures
	 */
	public clone(): ChannelTypeFeatures {
		const ret: bigint = bindings.ChannelTypeFeatures_clone(this.ptr);
		const ret_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ChannelTypeFeatures.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.ChannelTypeFeatures_hash(this.ptr);
		return ret;
	}

	/**
	 * Constructs a ChannelTypeFeatures with only static_remotekey set
	 */
	public static constructor_only_static_remote_key(): ChannelTypeFeatures {
		const ret: bigint = bindings.ChannelTypeFeatures_only_static_remote_key();
		const ret_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a ChannelTypeFeatures with anchors support
	 */
	public static constructor_anchors_zero_htlc_fee_and_dependencies(): ChannelTypeFeatures {
		const ret: bigint = bindings.ChannelTypeFeatures_anchors_zero_htlc_fee_and_dependencies();
		const ret_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a ChannelTypeFeatures with zero fee commitment anchors support.
	 */
	public static constructor_anchors_zero_fee_commitments(): ChannelTypeFeatures {
		const ret: bigint = bindings.ChannelTypeFeatures_anchors_zero_fee_commitments();
		const ret_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Create a blank Features with no features set
	 */
	public static constructor_empty(): ChannelTypeFeatures {
		const ret: bigint = bindings.ChannelTypeFeatures_empty();
		const ret_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Returns the feature set as a list of bytes, in little-endian. This is in reverse byte order
	 * from most on-the-wire encodings.
	 */
	public le_flags(): Uint8Array {
		const ret: number = bindings.ChannelTypeFeatures_le_flags(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns true if this `Features` has any optional flags set
	 */
	public supports_any_optional_bits(): boolean {
		const ret: boolean = bindings.ChannelTypeFeatures_supports_any_optional_bits(this.ptr);
		return ret;
	}

	/**
	 * Returns true if this `Features` object contains required features unknown by `other`.
	 */
	public requires_unknown_bits_from(other: ChannelTypeFeatures): boolean {
		const ret: boolean = bindings.ChannelTypeFeatures_requires_unknown_bits_from(this.ptr, CommonBase.get_ptr_of(other));
		return ret;
	}

	/**
	 * Returns the set of required features unknown by `other`, as their bit position.
	 */
	public required_unknown_bits_from(other: ChannelTypeFeatures): BigUint64Array {
		const ret: number = bindings.ChannelTypeFeatures_required_unknown_bits_from(this.ptr, CommonBase.get_ptr_of(other));
		const ret_conv: BigUint64Array = bindings.decodeUint64Array(ret);
		return ret_conv;
	}

	/**
	 * Returns true if this `Features` object contains unknown feature flags which are set as
	 * \"required\".
	 */
	public requires_unknown_bits(): boolean {
		const ret: boolean = bindings.ChannelTypeFeatures_requires_unknown_bits(this.ptr);
		return ret;
	}

	/**
	 * Returns true if this `Features` supports any bits which we do not know of
	 */
	public supports_unknown_bits(): boolean {
		const ret: boolean = bindings.ChannelTypeFeatures_supports_unknown_bits(this.ptr);
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
		const ret: bigint = bindings.ChannelTypeFeatures_set_required_feature_bit(this.ptr, bit);
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
		const ret: bigint = bindings.ChannelTypeFeatures_set_optional_feature_bit(this.ptr, bit);
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
		const ret: bigint = bindings.ChannelTypeFeatures_set_required_custom_bit(this.ptr, bit);
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
		const ret: bigint = bindings.ChannelTypeFeatures_set_optional_custom_bit(this.ptr, bit);
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_static_remote_key_optional(): void {
		bindings.ChannelTypeFeatures_set_static_remote_key_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_static_remote_key_required(): void {
		bindings.ChannelTypeFeatures_set_static_remote_key_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_static_remote_key(): void {
		bindings.ChannelTypeFeatures_clear_static_remote_key(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_static_remote_key(): boolean {
		const ret: boolean = bindings.ChannelTypeFeatures_supports_static_remote_key(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_static_remote_key(): boolean {
		const ret: boolean = bindings.ChannelTypeFeatures_requires_static_remote_key(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_anchors_nonzero_fee_htlc_tx_optional(): void {
		bindings.ChannelTypeFeatures_set_anchors_nonzero_fee_htlc_tx_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_anchors_nonzero_fee_htlc_tx_required(): void {
		bindings.ChannelTypeFeatures_set_anchors_nonzero_fee_htlc_tx_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_anchors_nonzero_fee_htlc_tx(): void {
		bindings.ChannelTypeFeatures_clear_anchors_nonzero_fee_htlc_tx(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_anchors_nonzero_fee_htlc_tx(): boolean {
		const ret: boolean = bindings.ChannelTypeFeatures_supports_anchors_nonzero_fee_htlc_tx(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_anchors_nonzero_fee_htlc_tx(): boolean {
		const ret: boolean = bindings.ChannelTypeFeatures_requires_anchors_nonzero_fee_htlc_tx(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_anchors_zero_fee_htlc_tx_optional(): void {
		bindings.ChannelTypeFeatures_set_anchors_zero_fee_htlc_tx_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_anchors_zero_fee_htlc_tx_required(): void {
		bindings.ChannelTypeFeatures_set_anchors_zero_fee_htlc_tx_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_anchors_zero_fee_htlc_tx(): void {
		bindings.ChannelTypeFeatures_clear_anchors_zero_fee_htlc_tx(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_anchors_zero_fee_htlc_tx(): boolean {
		const ret: boolean = bindings.ChannelTypeFeatures_supports_anchors_zero_fee_htlc_tx(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_anchors_zero_fee_htlc_tx(): boolean {
		const ret: boolean = bindings.ChannelTypeFeatures_requires_anchors_zero_fee_htlc_tx(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_taproot_optional(): void {
		bindings.ChannelTypeFeatures_set_taproot_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_taproot_required(): void {
		bindings.ChannelTypeFeatures_set_taproot_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_taproot(): void {
		bindings.ChannelTypeFeatures_clear_taproot(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_taproot(): boolean {
		const ret: boolean = bindings.ChannelTypeFeatures_supports_taproot(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_taproot(): boolean {
		const ret: boolean = bindings.ChannelTypeFeatures_requires_taproot(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_scid_privacy_optional(): void {
		bindings.ChannelTypeFeatures_set_scid_privacy_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_scid_privacy_required(): void {
		bindings.ChannelTypeFeatures_set_scid_privacy_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_scid_privacy(): void {
		bindings.ChannelTypeFeatures_clear_scid_privacy(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_scid_privacy(): boolean {
		const ret: boolean = bindings.ChannelTypeFeatures_supports_scid_privacy(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_scid_privacy(): boolean {
		const ret: boolean = bindings.ChannelTypeFeatures_requires_scid_privacy(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_zero_conf_optional(): void {
		bindings.ChannelTypeFeatures_set_zero_conf_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_zero_conf_required(): void {
		bindings.ChannelTypeFeatures_set_zero_conf_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public supports_zero_conf(): void {
		bindings.ChannelTypeFeatures_supports_zero_conf(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public requires_zero_conf(): boolean {
		const ret: boolean = bindings.ChannelTypeFeatures_requires_zero_conf(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_anchor_zero_fee_commitments_optional(): void {
		bindings.ChannelTypeFeatures_set_anchor_zero_fee_commitments_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_anchor_zero_fee_commitments_required(): void {
		bindings.ChannelTypeFeatures_set_anchor_zero_fee_commitments_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_anchor_zero_fee_commitments(): void {
		bindings.ChannelTypeFeatures_clear_anchor_zero_fee_commitments(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_anchor_zero_fee_commitments(): boolean {
		const ret: boolean = bindings.ChannelTypeFeatures_supports_anchor_zero_fee_commitments(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_anchor_zero_fee_commitments(): boolean {
		const ret: boolean = bindings.ChannelTypeFeatures_requires_anchor_zero_fee_commitments(this.ptr);
		return ret;
	}

}
