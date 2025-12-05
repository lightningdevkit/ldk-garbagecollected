
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Features used within an `init` message.
 */
export class InitFeatures extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.InitFeatures_free);
	}

	/**
	 * Serialize the InitFeatures object into a byte array which can be read by InitFeatures_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.InitFeatures_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a InitFeatures from a byte array, created by InitFeatures_write
	 */
	public static constructor_read(ser: Uint8Array): Result_InitFeaturesDecodeErrorZ {
		const ret: bigint = bindings.InitFeatures_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_InitFeaturesDecodeErrorZ = Result_InitFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.InitFeatures_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the InitFeatures
	 */
	public clone(): InitFeatures {
		const ret: bigint = bindings.InitFeatures_clone(this.ptr);
		const ret_hu_conv: InitFeatures = new InitFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the InitFeatures.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.InitFeatures_hash(this.ptr);
		return ret;
	}

	/**
	 * Create a blank Features with no features set
	 */
	public static constructor_empty(): InitFeatures {
		const ret: bigint = bindings.InitFeatures_empty();
		const ret_hu_conv: InitFeatures = new InitFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Returns the feature set as a list of bytes, in little-endian. This is in reverse byte order
	 * from most on-the-wire encodings.
	 */
	public le_flags(): Uint8Array {
		const ret: number = bindings.InitFeatures_le_flags(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns true if this `Features` has any optional flags set
	 */
	public supports_any_optional_bits(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_any_optional_bits(this.ptr);
		return ret;
	}

	/**
	 * Returns true if this `Features` object contains required features unknown by `other`.
	 */
	public requires_unknown_bits_from(other: InitFeatures): boolean {
		const ret: boolean = bindings.InitFeatures_requires_unknown_bits_from(this.ptr, CommonBase.get_ptr_of(other));
		return ret;
	}

	/**
	 * Returns the set of required features unknown by `other`, as their bit position.
	 */
	public required_unknown_bits_from(other: InitFeatures): BigUint64Array {
		const ret: number = bindings.InitFeatures_required_unknown_bits_from(this.ptr, CommonBase.get_ptr_of(other));
		const ret_conv: BigUint64Array = bindings.decodeUint64Array(ret);
		return ret_conv;
	}

	/**
	 * Returns true if this `Features` object contains unknown feature flags which are set as
	 * \"required\".
	 */
	public requires_unknown_bits(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_unknown_bits(this.ptr);
		return ret;
	}

	/**
	 * Returns true if this `Features` supports any bits which we do not know of
	 */
	public supports_unknown_bits(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_unknown_bits(this.ptr);
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
		const ret: bigint = bindings.InitFeatures_set_required_feature_bit(this.ptr, bit);
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
		const ret: bigint = bindings.InitFeatures_set_optional_feature_bit(this.ptr, bit);
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
		const ret: bigint = bindings.InitFeatures_set_required_custom_bit(this.ptr, bit);
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
		const ret: bigint = bindings.InitFeatures_set_optional_custom_bit(this.ptr, bit);
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_data_loss_protect_optional(): void {
		bindings.InitFeatures_set_data_loss_protect_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_data_loss_protect_required(): void {
		bindings.InitFeatures_set_data_loss_protect_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_data_loss_protect(): void {
		bindings.InitFeatures_clear_data_loss_protect(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_data_loss_protect(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_data_loss_protect(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_data_loss_protect(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_data_loss_protect(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_initial_routing_sync_optional(): void {
		bindings.InitFeatures_set_initial_routing_sync_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_initial_routing_sync_required(): void {
		bindings.InitFeatures_set_initial_routing_sync_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_initial_routing_sync(): void {
		bindings.InitFeatures_clear_initial_routing_sync(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public initial_routing_sync(): boolean {
		const ret: boolean = bindings.InitFeatures_initial_routing_sync(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_upfront_shutdown_script_optional(): void {
		bindings.InitFeatures_set_upfront_shutdown_script_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_upfront_shutdown_script_required(): void {
		bindings.InitFeatures_set_upfront_shutdown_script_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_upfront_shutdown_script(): void {
		bindings.InitFeatures_clear_upfront_shutdown_script(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_upfront_shutdown_script(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_upfront_shutdown_script(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_upfront_shutdown_script(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_upfront_shutdown_script(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_gossip_queries_optional(): void {
		bindings.InitFeatures_set_gossip_queries_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_gossip_queries_required(): void {
		bindings.InitFeatures_set_gossip_queries_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_gossip_queries(): void {
		bindings.InitFeatures_clear_gossip_queries(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_gossip_queries(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_gossip_queries(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_gossip_queries(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_gossip_queries(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_variable_length_onion_optional(): void {
		bindings.InitFeatures_set_variable_length_onion_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_variable_length_onion_required(): void {
		bindings.InitFeatures_set_variable_length_onion_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_variable_length_onion(): void {
		bindings.InitFeatures_clear_variable_length_onion(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_variable_length_onion(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_variable_length_onion(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_variable_length_onion(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_variable_length_onion(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_static_remote_key_optional(): void {
		bindings.InitFeatures_set_static_remote_key_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_static_remote_key_required(): void {
		bindings.InitFeatures_set_static_remote_key_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_static_remote_key(): void {
		bindings.InitFeatures_clear_static_remote_key(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_static_remote_key(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_static_remote_key(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_static_remote_key(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_static_remote_key(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_payment_secret_optional(): void {
		bindings.InitFeatures_set_payment_secret_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_payment_secret_required(): void {
		bindings.InitFeatures_set_payment_secret_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_payment_secret(): void {
		bindings.InitFeatures_clear_payment_secret(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_payment_secret(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_payment_secret(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_payment_secret(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_payment_secret(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_basic_mpp_optional(): void {
		bindings.InitFeatures_set_basic_mpp_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_basic_mpp_required(): void {
		bindings.InitFeatures_set_basic_mpp_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_basic_mpp(): void {
		bindings.InitFeatures_clear_basic_mpp(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_basic_mpp(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_basic_mpp(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_basic_mpp(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_basic_mpp(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_wumbo_optional(): void {
		bindings.InitFeatures_set_wumbo_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_wumbo_required(): void {
		bindings.InitFeatures_set_wumbo_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_wumbo(): void {
		bindings.InitFeatures_clear_wumbo(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_wumbo(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_wumbo(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_wumbo(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_wumbo(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_anchors_nonzero_fee_htlc_tx_optional(): void {
		bindings.InitFeatures_set_anchors_nonzero_fee_htlc_tx_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_anchors_nonzero_fee_htlc_tx_required(): void {
		bindings.InitFeatures_set_anchors_nonzero_fee_htlc_tx_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_anchors_nonzero_fee_htlc_tx(): void {
		bindings.InitFeatures_clear_anchors_nonzero_fee_htlc_tx(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_anchors_nonzero_fee_htlc_tx(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_anchors_nonzero_fee_htlc_tx(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_anchors_nonzero_fee_htlc_tx(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_anchors_nonzero_fee_htlc_tx(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_anchors_zero_fee_htlc_tx_optional(): void {
		bindings.InitFeatures_set_anchors_zero_fee_htlc_tx_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_anchors_zero_fee_htlc_tx_required(): void {
		bindings.InitFeatures_set_anchors_zero_fee_htlc_tx_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_anchors_zero_fee_htlc_tx(): void {
		bindings.InitFeatures_clear_anchors_zero_fee_htlc_tx(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_anchors_zero_fee_htlc_tx(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_anchors_zero_fee_htlc_tx(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_anchors_zero_fee_htlc_tx(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_anchors_zero_fee_htlc_tx(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_route_blinding_optional(): void {
		bindings.InitFeatures_set_route_blinding_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_route_blinding_required(): void {
		bindings.InitFeatures_set_route_blinding_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_route_blinding(): void {
		bindings.InitFeatures_clear_route_blinding(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_route_blinding(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_route_blinding(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_route_blinding(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_route_blinding(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_shutdown_any_segwit_optional(): void {
		bindings.InitFeatures_set_shutdown_any_segwit_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_shutdown_any_segwit_required(): void {
		bindings.InitFeatures_set_shutdown_any_segwit_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_shutdown_anysegwit(): void {
		bindings.InitFeatures_clear_shutdown_anysegwit(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_shutdown_anysegwit(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_shutdown_anysegwit(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_shutdown_anysegwit(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_shutdown_anysegwit(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_dual_fund_optional(): void {
		bindings.InitFeatures_set_dual_fund_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_dual_fund_required(): void {
		bindings.InitFeatures_set_dual_fund_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_dual_fund(): void {
		bindings.InitFeatures_clear_dual_fund(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_dual_fund(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_dual_fund(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_dual_fund(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_dual_fund(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_taproot_optional(): void {
		bindings.InitFeatures_set_taproot_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_taproot_required(): void {
		bindings.InitFeatures_set_taproot_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_taproot(): void {
		bindings.InitFeatures_clear_taproot(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_taproot(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_taproot(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_taproot(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_taproot(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_quiescence_optional(): void {
		bindings.InitFeatures_set_quiescence_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_quiescence_required(): void {
		bindings.InitFeatures_set_quiescence_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_quiescence(): void {
		bindings.InitFeatures_clear_quiescence(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_quiescence(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_quiescence(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_quiescence(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_quiescence(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_onion_messages_optional(): void {
		bindings.InitFeatures_set_onion_messages_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_onion_messages_required(): void {
		bindings.InitFeatures_set_onion_messages_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_onion_messages(): void {
		bindings.InitFeatures_clear_onion_messages(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_onion_messages(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_onion_messages(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_onion_messages(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_onion_messages(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_provide_storage_optional(): void {
		bindings.InitFeatures_set_provide_storage_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_provide_storage_required(): void {
		bindings.InitFeatures_set_provide_storage_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_provide_storage(): void {
		bindings.InitFeatures_clear_provide_storage(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_provide_storage(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_provide_storage(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_provide_storage(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_provide_storage(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_channel_type_optional(): void {
		bindings.InitFeatures_set_channel_type_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_channel_type_required(): void {
		bindings.InitFeatures_set_channel_type_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_channel_type(): void {
		bindings.InitFeatures_clear_channel_type(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_channel_type(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_channel_type(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_channel_type(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_channel_type(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_scid_privacy_optional(): void {
		bindings.InitFeatures_set_scid_privacy_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_scid_privacy_required(): void {
		bindings.InitFeatures_set_scid_privacy_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_scid_privacy(): void {
		bindings.InitFeatures_clear_scid_privacy(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_scid_privacy(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_scid_privacy(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_scid_privacy(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_scid_privacy(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_zero_conf_optional(): void {
		bindings.InitFeatures_set_zero_conf_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_zero_conf_required(): void {
		bindings.InitFeatures_set_zero_conf_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public supports_zero_conf(): void {
		bindings.InitFeatures_supports_zero_conf(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public requires_zero_conf(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_zero_conf(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_trampoline_routing_optional(): void {
		bindings.InitFeatures_set_trampoline_routing_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_trampoline_routing_required(): void {
		bindings.InitFeatures_set_trampoline_routing_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_trampoline_routing(): void {
		bindings.InitFeatures_clear_trampoline_routing(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_trampoline_routing(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_trampoline_routing(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_trampoline_routing(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_trampoline_routing(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_simple_close_optional(): void {
		bindings.InitFeatures_set_simple_close_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_simple_close_required(): void {
		bindings.InitFeatures_set_simple_close_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_simple_close(): void {
		bindings.InitFeatures_clear_simple_close(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_simple_close(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_simple_close(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_simple_close(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_simple_close(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_splicing_production_optional(): void {
		bindings.InitFeatures_set_splicing_production_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_splicing_production_required(): void {
		bindings.InitFeatures_set_splicing_production_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_splicing_production(): void {
		bindings.InitFeatures_clear_splicing_production(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_splicing_production(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_splicing_production(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_splicing_production(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_splicing_production(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_anchor_zero_fee_commitments_optional(): void {
		bindings.InitFeatures_set_anchor_zero_fee_commitments_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_anchor_zero_fee_commitments_required(): void {
		bindings.InitFeatures_set_anchor_zero_fee_commitments_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_anchor_zero_fee_commitments(): void {
		bindings.InitFeatures_clear_anchor_zero_fee_commitments(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_anchor_zero_fee_commitments(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_anchor_zero_fee_commitments(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_anchor_zero_fee_commitments(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_anchor_zero_fee_commitments(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_htlc_hold_optional(): void {
		bindings.InitFeatures_set_htlc_hold_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_htlc_hold_required(): void {
		bindings.InitFeatures_set_htlc_hold_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_htlc_hold(): void {
		bindings.InitFeatures_clear_htlc_hold(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_htlc_hold(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_htlc_hold(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_htlc_hold(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_htlc_hold(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_splicing_optional(): void {
		bindings.InitFeatures_set_splicing_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_splicing_required(): void {
		bindings.InitFeatures_set_splicing_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_splicing(): void {
		bindings.InitFeatures_clear_splicing(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_splicing(): boolean {
		const ret: boolean = bindings.InitFeatures_supports_splicing(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_splicing(): boolean {
		const ret: boolean = bindings.InitFeatures_requires_splicing(this.ptr);
		return ret;
	}

}
