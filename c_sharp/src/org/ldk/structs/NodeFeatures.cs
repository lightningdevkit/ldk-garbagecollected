using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Features used within a `node_announcement` message.
 */
public class NodeFeatures : CommonBase {
	internal NodeFeatures(object _dummy, long ptr) : base(ptr) { }
	~NodeFeatures() {
		if (ptr != 0) { bindings.NodeFeatures_free(ptr); }
	}

	/**
	 * Serialize the NodeFeatures object into a byte array which can be read by NodeFeatures_read
	 */
	public byte[] write() {
		long ret = bindings.NodeFeatures_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a NodeFeatures from a byte array, created by NodeFeatures_write
	 */
	public static org.ldk.structs.Result_NodeFeaturesDecodeErrorZ read(byte[] ser) {
		long ret = bindings.NodeFeatures_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NodeFeaturesDecodeErrorZ ret_hu_conv = Result_NodeFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.NodeFeatures_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the NodeFeatures
	 */
	public org.ldk.structs.NodeFeatures clone() {
		long ret = bindings.NodeFeatures_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the NodeFeatures.
	 */
	public long hash() {
		long ret = bindings.NodeFeatures_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Create a blank Features with no features set
	 */
	public static org.ldk.structs.NodeFeatures empty() {
		long ret = bindings.NodeFeatures_empty();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns the feature set as a list of bytes, in little-endian. This is in reverse byte order
	 * from most on-the-wire encodings.
	 */
	public byte[] le_flags() {
		long ret = bindings.NodeFeatures_le_flags(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns true if this `Features` has any optional flags set
	 */
	public bool supports_any_optional_bits() {
		bool ret = bindings.NodeFeatures_supports_any_optional_bits(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Returns true if this `Features` object contains required features unknown by `other`.
	 */
	public bool requires_unknown_bits_from(org.ldk.structs.NodeFeatures other) {
		bool ret = bindings.NodeFeatures_requires_unknown_bits_from(this.ptr, other.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(other);
		return ret;
	}

	/**
	 * Returns the set of required features unknown by `other`, as their bit position.
	 */
	public long[] required_unknown_bits_from(org.ldk.structs.NodeFeatures other) {
		long ret = bindings.NodeFeatures_required_unknown_bits_from(this.ptr, other.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(other);
		if (ret >= 0 && ret <= 4096) { return null; }
		long[] ret_conv = InternalUtils.decodeUint64Array(ret);
		return ret_conv;
	}

	/**
	 * Returns true if this `Features` object contains unknown feature flags which are set as
	 * \"required\".
	 */
	public bool requires_unknown_bits() {
		bool ret = bindings.NodeFeatures_requires_unknown_bits(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Returns true if this `Features` supports any bits which we do not know of
	 */
	public bool supports_unknown_bits() {
		bool ret = bindings.NodeFeatures_supports_unknown_bits(this.ptr);
		GC.KeepAlive(this);
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
	public org.ldk.structs.Result_NoneNoneZ set_required_feature_bit(long bit) {
		long ret = bindings.NodeFeatures_set_required_feature_bit(this.ptr, bit);
		GC.KeepAlive(this);
		GC.KeepAlive(bit);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
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
	public org.ldk.structs.Result_NoneNoneZ set_optional_feature_bit(long bit) {
		long ret = bindings.NodeFeatures_set_optional_feature_bit(this.ptr, bit);
		GC.KeepAlive(this);
		GC.KeepAlive(bit);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
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
	public org.ldk.structs.Result_NoneNoneZ set_required_custom_bit(long bit) {
		long ret = bindings.NodeFeatures_set_required_custom_bit(this.ptr, bit);
		GC.KeepAlive(this);
		GC.KeepAlive(bit);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
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
	public org.ldk.structs.Result_NoneNoneZ set_optional_custom_bit(long bit) {
		long ret = bindings.NodeFeatures_set_optional_custom_bit(this.ptr, bit);
		GC.KeepAlive(this);
		GC.KeepAlive(bit);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_data_loss_protect_optional() {
		bindings.NodeFeatures_set_data_loss_protect_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_data_loss_protect_required() {
		bindings.NodeFeatures_set_data_loss_protect_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_data_loss_protect() {
		bindings.NodeFeatures_clear_data_loss_protect(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_data_loss_protect() {
		bool ret = bindings.NodeFeatures_supports_data_loss_protect(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_data_loss_protect() {
		bool ret = bindings.NodeFeatures_requires_data_loss_protect(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_upfront_shutdown_script_optional() {
		bindings.NodeFeatures_set_upfront_shutdown_script_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_upfront_shutdown_script_required() {
		bindings.NodeFeatures_set_upfront_shutdown_script_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_upfront_shutdown_script() {
		bindings.NodeFeatures_clear_upfront_shutdown_script(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_upfront_shutdown_script() {
		bool ret = bindings.NodeFeatures_supports_upfront_shutdown_script(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_upfront_shutdown_script() {
		bool ret = bindings.NodeFeatures_requires_upfront_shutdown_script(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_gossip_queries_optional() {
		bindings.NodeFeatures_set_gossip_queries_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_gossip_queries_required() {
		bindings.NodeFeatures_set_gossip_queries_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_gossip_queries() {
		bindings.NodeFeatures_clear_gossip_queries(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_gossip_queries() {
		bool ret = bindings.NodeFeatures_supports_gossip_queries(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_gossip_queries() {
		bool ret = bindings.NodeFeatures_requires_gossip_queries(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_variable_length_onion_optional() {
		bindings.NodeFeatures_set_variable_length_onion_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_variable_length_onion_required() {
		bindings.NodeFeatures_set_variable_length_onion_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_variable_length_onion() {
		bindings.NodeFeatures_clear_variable_length_onion(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_variable_length_onion() {
		bool ret = bindings.NodeFeatures_supports_variable_length_onion(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_variable_length_onion() {
		bool ret = bindings.NodeFeatures_requires_variable_length_onion(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_static_remote_key_optional() {
		bindings.NodeFeatures_set_static_remote_key_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_static_remote_key_required() {
		bindings.NodeFeatures_set_static_remote_key_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_static_remote_key() {
		bindings.NodeFeatures_clear_static_remote_key(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_static_remote_key() {
		bool ret = bindings.NodeFeatures_supports_static_remote_key(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_static_remote_key() {
		bool ret = bindings.NodeFeatures_requires_static_remote_key(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_payment_secret_optional() {
		bindings.NodeFeatures_set_payment_secret_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_payment_secret_required() {
		bindings.NodeFeatures_set_payment_secret_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_payment_secret() {
		bindings.NodeFeatures_clear_payment_secret(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_payment_secret() {
		bool ret = bindings.NodeFeatures_supports_payment_secret(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_payment_secret() {
		bool ret = bindings.NodeFeatures_requires_payment_secret(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_basic_mpp_optional() {
		bindings.NodeFeatures_set_basic_mpp_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_basic_mpp_required() {
		bindings.NodeFeatures_set_basic_mpp_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_basic_mpp() {
		bindings.NodeFeatures_clear_basic_mpp(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_basic_mpp() {
		bool ret = bindings.NodeFeatures_supports_basic_mpp(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_basic_mpp() {
		bool ret = bindings.NodeFeatures_requires_basic_mpp(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_wumbo_optional() {
		bindings.NodeFeatures_set_wumbo_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_wumbo_required() {
		bindings.NodeFeatures_set_wumbo_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_wumbo() {
		bindings.NodeFeatures_clear_wumbo(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_wumbo() {
		bool ret = bindings.NodeFeatures_supports_wumbo(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_wumbo() {
		bool ret = bindings.NodeFeatures_requires_wumbo(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_anchors_nonzero_fee_htlc_tx_optional() {
		bindings.NodeFeatures_set_anchors_nonzero_fee_htlc_tx_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_anchors_nonzero_fee_htlc_tx_required() {
		bindings.NodeFeatures_set_anchors_nonzero_fee_htlc_tx_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_anchors_nonzero_fee_htlc_tx() {
		bindings.NodeFeatures_clear_anchors_nonzero_fee_htlc_tx(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_anchors_nonzero_fee_htlc_tx() {
		bool ret = bindings.NodeFeatures_supports_anchors_nonzero_fee_htlc_tx(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_anchors_nonzero_fee_htlc_tx() {
		bool ret = bindings.NodeFeatures_requires_anchors_nonzero_fee_htlc_tx(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_anchors_zero_fee_htlc_tx_optional() {
		bindings.NodeFeatures_set_anchors_zero_fee_htlc_tx_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_anchors_zero_fee_htlc_tx_required() {
		bindings.NodeFeatures_set_anchors_zero_fee_htlc_tx_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_anchors_zero_fee_htlc_tx() {
		bindings.NodeFeatures_clear_anchors_zero_fee_htlc_tx(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_anchors_zero_fee_htlc_tx() {
		bool ret = bindings.NodeFeatures_supports_anchors_zero_fee_htlc_tx(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_anchors_zero_fee_htlc_tx() {
		bool ret = bindings.NodeFeatures_requires_anchors_zero_fee_htlc_tx(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_route_blinding_optional() {
		bindings.NodeFeatures_set_route_blinding_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_route_blinding_required() {
		bindings.NodeFeatures_set_route_blinding_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_route_blinding() {
		bindings.NodeFeatures_clear_route_blinding(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_route_blinding() {
		bool ret = bindings.NodeFeatures_supports_route_blinding(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_route_blinding() {
		bool ret = bindings.NodeFeatures_requires_route_blinding(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_shutdown_any_segwit_optional() {
		bindings.NodeFeatures_set_shutdown_any_segwit_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_shutdown_any_segwit_required() {
		bindings.NodeFeatures_set_shutdown_any_segwit_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_shutdown_anysegwit() {
		bindings.NodeFeatures_clear_shutdown_anysegwit(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_shutdown_anysegwit() {
		bool ret = bindings.NodeFeatures_supports_shutdown_anysegwit(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_shutdown_anysegwit() {
		bool ret = bindings.NodeFeatures_requires_shutdown_anysegwit(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_dual_fund_optional() {
		bindings.NodeFeatures_set_dual_fund_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_dual_fund_required() {
		bindings.NodeFeatures_set_dual_fund_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_dual_fund() {
		bindings.NodeFeatures_clear_dual_fund(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_dual_fund() {
		bool ret = bindings.NodeFeatures_supports_dual_fund(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_dual_fund() {
		bool ret = bindings.NodeFeatures_requires_dual_fund(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_taproot_optional() {
		bindings.NodeFeatures_set_taproot_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_taproot_required() {
		bindings.NodeFeatures_set_taproot_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_taproot() {
		bindings.NodeFeatures_clear_taproot(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_taproot() {
		bool ret = bindings.NodeFeatures_supports_taproot(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_taproot() {
		bool ret = bindings.NodeFeatures_requires_taproot(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_quiescence_optional() {
		bindings.NodeFeatures_set_quiescence_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_quiescence_required() {
		bindings.NodeFeatures_set_quiescence_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_quiescence() {
		bindings.NodeFeatures_clear_quiescence(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_quiescence() {
		bool ret = bindings.NodeFeatures_supports_quiescence(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_quiescence() {
		bool ret = bindings.NodeFeatures_requires_quiescence(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_onion_messages_optional() {
		bindings.NodeFeatures_set_onion_messages_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_onion_messages_required() {
		bindings.NodeFeatures_set_onion_messages_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_onion_messages() {
		bindings.NodeFeatures_clear_onion_messages(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_onion_messages() {
		bool ret = bindings.NodeFeatures_supports_onion_messages(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_onion_messages() {
		bool ret = bindings.NodeFeatures_requires_onion_messages(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_provide_storage_optional() {
		bindings.NodeFeatures_set_provide_storage_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_provide_storage_required() {
		bindings.NodeFeatures_set_provide_storage_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_provide_storage() {
		bindings.NodeFeatures_clear_provide_storage(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_provide_storage() {
		bool ret = bindings.NodeFeatures_supports_provide_storage(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_provide_storage() {
		bool ret = bindings.NodeFeatures_requires_provide_storage(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_channel_type_optional() {
		bindings.NodeFeatures_set_channel_type_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_channel_type_required() {
		bindings.NodeFeatures_set_channel_type_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_channel_type() {
		bindings.NodeFeatures_clear_channel_type(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_channel_type() {
		bool ret = bindings.NodeFeatures_supports_channel_type(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_channel_type() {
		bool ret = bindings.NodeFeatures_requires_channel_type(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_scid_privacy_optional() {
		bindings.NodeFeatures_set_scid_privacy_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_scid_privacy_required() {
		bindings.NodeFeatures_set_scid_privacy_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_scid_privacy() {
		bindings.NodeFeatures_clear_scid_privacy(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_scid_privacy() {
		bool ret = bindings.NodeFeatures_supports_scid_privacy(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_scid_privacy() {
		bool ret = bindings.NodeFeatures_requires_scid_privacy(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_zero_conf_optional() {
		bindings.NodeFeatures_set_zero_conf_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_zero_conf_required() {
		bindings.NodeFeatures_set_zero_conf_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_zero_conf() {
		bindings.NodeFeatures_clear_zero_conf(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_zero_conf() {
		bool ret = bindings.NodeFeatures_supports_zero_conf(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_zero_conf() {
		bool ret = bindings.NodeFeatures_requires_zero_conf(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_keysend_optional() {
		bindings.NodeFeatures_set_keysend_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_keysend_required() {
		bindings.NodeFeatures_set_keysend_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_keysend() {
		bindings.NodeFeatures_clear_keysend(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_keysend() {
		bool ret = bindings.NodeFeatures_supports_keysend(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_keysend() {
		bool ret = bindings.NodeFeatures_requires_keysend(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_trampoline_routing_optional() {
		bindings.NodeFeatures_set_trampoline_routing_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_trampoline_routing_required() {
		bindings.NodeFeatures_set_trampoline_routing_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_trampoline_routing() {
		bindings.NodeFeatures_clear_trampoline_routing(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_trampoline_routing() {
		bool ret = bindings.NodeFeatures_supports_trampoline_routing(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_trampoline_routing() {
		bool ret = bindings.NodeFeatures_requires_trampoline_routing(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_simple_close_optional() {
		bindings.NodeFeatures_set_simple_close_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_simple_close_required() {
		bindings.NodeFeatures_set_simple_close_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_simple_close() {
		bindings.NodeFeatures_clear_simple_close(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_simple_close() {
		bool ret = bindings.NodeFeatures_supports_simple_close(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_simple_close() {
		bool ret = bindings.NodeFeatures_requires_simple_close(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_splicing_production_optional() {
		bindings.NodeFeatures_set_splicing_production_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_splicing_production_required() {
		bindings.NodeFeatures_set_splicing_production_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_splicing_production() {
		bindings.NodeFeatures_clear_splicing_production(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_splicing_production() {
		bool ret = bindings.NodeFeatures_supports_splicing_production(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_splicing_production() {
		bool ret = bindings.NodeFeatures_requires_splicing_production(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_anchor_zero_fee_commitments_optional() {
		bindings.NodeFeatures_set_anchor_zero_fee_commitments_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_anchor_zero_fee_commitments_required() {
		bindings.NodeFeatures_set_anchor_zero_fee_commitments_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_anchor_zero_fee_commitments() {
		bindings.NodeFeatures_clear_anchor_zero_fee_commitments(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_anchor_zero_fee_commitments() {
		bool ret = bindings.NodeFeatures_supports_anchor_zero_fee_commitments(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_anchor_zero_fee_commitments() {
		bool ret = bindings.NodeFeatures_requires_anchor_zero_fee_commitments(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_htlc_hold_optional() {
		bindings.NodeFeatures_set_htlc_hold_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_htlc_hold_required() {
		bindings.NodeFeatures_set_htlc_hold_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_htlc_hold() {
		bindings.NodeFeatures_clear_htlc_hold(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_htlc_hold() {
		bool ret = bindings.NodeFeatures_supports_htlc_hold(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_htlc_hold() {
		bool ret = bindings.NodeFeatures_requires_htlc_hold(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_splicing_optional() {
		bindings.NodeFeatures_set_splicing_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_splicing_required() {
		bindings.NodeFeatures_set_splicing_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_splicing() {
		bindings.NodeFeatures_clear_splicing(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_splicing() {
		bool ret = bindings.NodeFeatures_supports_splicing(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_splicing() {
		bool ret = bindings.NodeFeatures_requires_splicing(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_dns_resolution_optional() {
		bindings.NodeFeatures_set_dns_resolution_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_dns_resolution_required() {
		bindings.NodeFeatures_set_dns_resolution_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_dns_resolution() {
		bindings.NodeFeatures_clear_dns_resolution(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_dns_resolution() {
		bool ret = bindings.NodeFeatures_supports_dns_resolution(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_dns_resolution() {
		bool ret = bindings.NodeFeatures_requires_dns_resolution(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
