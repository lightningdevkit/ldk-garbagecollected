package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Features used within a `node_announcement` message.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class NodeFeatures extends CommonBase {
	NodeFeatures(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.NodeFeatures_free(ptr); }
	}

	/**
	 * Serialize the NodeFeatures object into a byte array which can be read by NodeFeatures_read
	 */
	public byte[] write() {
		byte[] ret = bindings.NodeFeatures_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a NodeFeatures from a byte array, created by NodeFeatures_write
	 */
	public static Result_NodeFeaturesDecodeErrorZ read(byte[] ser) {
		long ret = bindings.NodeFeatures_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NodeFeaturesDecodeErrorZ ret_hu_conv = Result_NodeFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.NodeFeatures_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the NodeFeatures
	 */
	public NodeFeatures clone() {
		long ret = bindings.NodeFeatures_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the NodeFeatures.
	 */
	public long hash() {
		long ret = bindings.NodeFeatures_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Create a blank Features with no features set
	 */
	public static NodeFeatures empty() {
		long ret = bindings.NodeFeatures_empty();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns the feature set as a list of bytes, in little-endian. This is in reverse byte order
	 * from most on-the-wire encodings.
	 */
	public byte[] le_flags() {
		byte[] ret = bindings.NodeFeatures_le_flags(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns true if this `Features` has any optional flags set
	 */
	public boolean supports_any_optional_bits() {
		boolean ret = bindings.NodeFeatures_supports_any_optional_bits(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns true if this `Features` object contains required features unknown by `other`.
	 */
	public boolean requires_unknown_bits_from(org.ldk.structs.NodeFeatures other) {
		boolean ret = bindings.NodeFeatures_requires_unknown_bits_from(this.ptr, other.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(other);
		return ret;
	}

	/**
	 * Returns the set of required features unknown by `other`, as their bit position.
	 */
	public long[] required_unknown_bits_from(org.ldk.structs.NodeFeatures other) {
		long[] ret = bindings.NodeFeatures_required_unknown_bits_from(this.ptr, other.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(other);
		return ret;
	}

	/**
	 * Returns true if this `Features` object contains unknown feature flags which are set as
	 * \"required\".
	 */
	public boolean requires_unknown_bits() {
		boolean ret = bindings.NodeFeatures_requires_unknown_bits(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns true if this `Features` supports any bits which we do not know of
	 */
	public boolean supports_unknown_bits() {
		boolean ret = bindings.NodeFeatures_supports_unknown_bits(this.ptr);
		Reference.reachabilityFence(this);
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
	public Result_NoneNoneZ set_required_feature_bit(long bit) {
		long ret = bindings.NodeFeatures_set_required_feature_bit(this.ptr, bit);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(bit);
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
	public Result_NoneNoneZ set_optional_feature_bit(long bit) {
		long ret = bindings.NodeFeatures_set_optional_feature_bit(this.ptr, bit);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(bit);
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
	public Result_NoneNoneZ set_required_custom_bit(long bit) {
		long ret = bindings.NodeFeatures_set_required_custom_bit(this.ptr, bit);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(bit);
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
	public Result_NoneNoneZ set_optional_custom_bit(long bit) {
		long ret = bindings.NodeFeatures_set_optional_custom_bit(this.ptr, bit);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(bit);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_data_loss_protect_optional() {
		bindings.NodeFeatures_set_data_loss_protect_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_data_loss_protect_required() {
		bindings.NodeFeatures_set_data_loss_protect_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_data_loss_protect() {
		bindings.NodeFeatures_clear_data_loss_protect(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_data_loss_protect() {
		boolean ret = bindings.NodeFeatures_supports_data_loss_protect(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_data_loss_protect() {
		boolean ret = bindings.NodeFeatures_requires_data_loss_protect(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_upfront_shutdown_script_optional() {
		bindings.NodeFeatures_set_upfront_shutdown_script_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_upfront_shutdown_script_required() {
		bindings.NodeFeatures_set_upfront_shutdown_script_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_upfront_shutdown_script() {
		bindings.NodeFeatures_clear_upfront_shutdown_script(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_upfront_shutdown_script() {
		boolean ret = bindings.NodeFeatures_supports_upfront_shutdown_script(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_upfront_shutdown_script() {
		boolean ret = bindings.NodeFeatures_requires_upfront_shutdown_script(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_gossip_queries_optional() {
		bindings.NodeFeatures_set_gossip_queries_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_gossip_queries_required() {
		bindings.NodeFeatures_set_gossip_queries_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_gossip_queries() {
		bindings.NodeFeatures_clear_gossip_queries(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_gossip_queries() {
		boolean ret = bindings.NodeFeatures_supports_gossip_queries(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_gossip_queries() {
		boolean ret = bindings.NodeFeatures_requires_gossip_queries(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_variable_length_onion_optional() {
		bindings.NodeFeatures_set_variable_length_onion_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_variable_length_onion_required() {
		bindings.NodeFeatures_set_variable_length_onion_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_variable_length_onion() {
		bindings.NodeFeatures_clear_variable_length_onion(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_variable_length_onion() {
		boolean ret = bindings.NodeFeatures_supports_variable_length_onion(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_variable_length_onion() {
		boolean ret = bindings.NodeFeatures_requires_variable_length_onion(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_static_remote_key_optional() {
		bindings.NodeFeatures_set_static_remote_key_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_static_remote_key_required() {
		bindings.NodeFeatures_set_static_remote_key_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_static_remote_key() {
		bindings.NodeFeatures_clear_static_remote_key(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_static_remote_key() {
		boolean ret = bindings.NodeFeatures_supports_static_remote_key(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_static_remote_key() {
		boolean ret = bindings.NodeFeatures_requires_static_remote_key(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_payment_secret_optional() {
		bindings.NodeFeatures_set_payment_secret_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_payment_secret_required() {
		bindings.NodeFeatures_set_payment_secret_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_payment_secret() {
		bindings.NodeFeatures_clear_payment_secret(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_payment_secret() {
		boolean ret = bindings.NodeFeatures_supports_payment_secret(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_payment_secret() {
		boolean ret = bindings.NodeFeatures_requires_payment_secret(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_basic_mpp_optional() {
		bindings.NodeFeatures_set_basic_mpp_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_basic_mpp_required() {
		bindings.NodeFeatures_set_basic_mpp_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_basic_mpp() {
		bindings.NodeFeatures_clear_basic_mpp(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_basic_mpp() {
		boolean ret = bindings.NodeFeatures_supports_basic_mpp(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_basic_mpp() {
		boolean ret = bindings.NodeFeatures_requires_basic_mpp(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_wumbo_optional() {
		bindings.NodeFeatures_set_wumbo_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_wumbo_required() {
		bindings.NodeFeatures_set_wumbo_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_wumbo() {
		bindings.NodeFeatures_clear_wumbo(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_wumbo() {
		boolean ret = bindings.NodeFeatures_supports_wumbo(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_wumbo() {
		boolean ret = bindings.NodeFeatures_requires_wumbo(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_anchors_nonzero_fee_htlc_tx_optional() {
		bindings.NodeFeatures_set_anchors_nonzero_fee_htlc_tx_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_anchors_nonzero_fee_htlc_tx_required() {
		bindings.NodeFeatures_set_anchors_nonzero_fee_htlc_tx_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_anchors_nonzero_fee_htlc_tx() {
		bindings.NodeFeatures_clear_anchors_nonzero_fee_htlc_tx(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_anchors_nonzero_fee_htlc_tx() {
		boolean ret = bindings.NodeFeatures_supports_anchors_nonzero_fee_htlc_tx(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_anchors_nonzero_fee_htlc_tx() {
		boolean ret = bindings.NodeFeatures_requires_anchors_nonzero_fee_htlc_tx(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_anchors_zero_fee_htlc_tx_optional() {
		bindings.NodeFeatures_set_anchors_zero_fee_htlc_tx_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_anchors_zero_fee_htlc_tx_required() {
		bindings.NodeFeatures_set_anchors_zero_fee_htlc_tx_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_anchors_zero_fee_htlc_tx() {
		bindings.NodeFeatures_clear_anchors_zero_fee_htlc_tx(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_anchors_zero_fee_htlc_tx() {
		boolean ret = bindings.NodeFeatures_supports_anchors_zero_fee_htlc_tx(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_anchors_zero_fee_htlc_tx() {
		boolean ret = bindings.NodeFeatures_requires_anchors_zero_fee_htlc_tx(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_route_blinding_optional() {
		bindings.NodeFeatures_set_route_blinding_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_route_blinding_required() {
		bindings.NodeFeatures_set_route_blinding_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_route_blinding() {
		bindings.NodeFeatures_clear_route_blinding(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_route_blinding() {
		boolean ret = bindings.NodeFeatures_supports_route_blinding(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_route_blinding() {
		boolean ret = bindings.NodeFeatures_requires_route_blinding(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_shutdown_any_segwit_optional() {
		bindings.NodeFeatures_set_shutdown_any_segwit_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_shutdown_any_segwit_required() {
		bindings.NodeFeatures_set_shutdown_any_segwit_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_shutdown_anysegwit() {
		bindings.NodeFeatures_clear_shutdown_anysegwit(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_shutdown_anysegwit() {
		boolean ret = bindings.NodeFeatures_supports_shutdown_anysegwit(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_shutdown_anysegwit() {
		boolean ret = bindings.NodeFeatures_requires_shutdown_anysegwit(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_dual_fund_optional() {
		bindings.NodeFeatures_set_dual_fund_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_dual_fund_required() {
		bindings.NodeFeatures_set_dual_fund_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_dual_fund() {
		bindings.NodeFeatures_clear_dual_fund(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_dual_fund() {
		boolean ret = bindings.NodeFeatures_supports_dual_fund(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_dual_fund() {
		boolean ret = bindings.NodeFeatures_requires_dual_fund(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_taproot_optional() {
		bindings.NodeFeatures_set_taproot_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_taproot_required() {
		bindings.NodeFeatures_set_taproot_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_taproot() {
		bindings.NodeFeatures_clear_taproot(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_taproot() {
		boolean ret = bindings.NodeFeatures_supports_taproot(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_taproot() {
		boolean ret = bindings.NodeFeatures_requires_taproot(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_quiescence_optional() {
		bindings.NodeFeatures_set_quiescence_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_quiescence_required() {
		bindings.NodeFeatures_set_quiescence_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_quiescence() {
		bindings.NodeFeatures_clear_quiescence(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_quiescence() {
		boolean ret = bindings.NodeFeatures_supports_quiescence(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_quiescence() {
		boolean ret = bindings.NodeFeatures_requires_quiescence(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_onion_messages_optional() {
		bindings.NodeFeatures_set_onion_messages_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_onion_messages_required() {
		bindings.NodeFeatures_set_onion_messages_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_onion_messages() {
		bindings.NodeFeatures_clear_onion_messages(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_onion_messages() {
		boolean ret = bindings.NodeFeatures_supports_onion_messages(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_onion_messages() {
		boolean ret = bindings.NodeFeatures_requires_onion_messages(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_provide_storage_optional() {
		bindings.NodeFeatures_set_provide_storage_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_provide_storage_required() {
		bindings.NodeFeatures_set_provide_storage_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_provide_storage() {
		bindings.NodeFeatures_clear_provide_storage(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_provide_storage() {
		boolean ret = bindings.NodeFeatures_supports_provide_storage(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_provide_storage() {
		boolean ret = bindings.NodeFeatures_requires_provide_storage(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_channel_type_optional() {
		bindings.NodeFeatures_set_channel_type_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_channel_type_required() {
		bindings.NodeFeatures_set_channel_type_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_channel_type() {
		bindings.NodeFeatures_clear_channel_type(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_channel_type() {
		boolean ret = bindings.NodeFeatures_supports_channel_type(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_channel_type() {
		boolean ret = bindings.NodeFeatures_requires_channel_type(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_scid_privacy_optional() {
		bindings.NodeFeatures_set_scid_privacy_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_scid_privacy_required() {
		bindings.NodeFeatures_set_scid_privacy_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_scid_privacy() {
		bindings.NodeFeatures_clear_scid_privacy(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_scid_privacy() {
		boolean ret = bindings.NodeFeatures_supports_scid_privacy(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_scid_privacy() {
		boolean ret = bindings.NodeFeatures_requires_scid_privacy(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_zero_conf_optional() {
		bindings.NodeFeatures_set_zero_conf_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_zero_conf_required() {
		bindings.NodeFeatures_set_zero_conf_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void supports_zero_conf() {
		bindings.NodeFeatures_supports_zero_conf(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean requires_zero_conf() {
		boolean ret = bindings.NodeFeatures_requires_zero_conf(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_keysend_optional() {
		bindings.NodeFeatures_set_keysend_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_keysend_required() {
		bindings.NodeFeatures_set_keysend_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_keysend() {
		bindings.NodeFeatures_clear_keysend(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_keysend() {
		boolean ret = bindings.NodeFeatures_supports_keysend(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_keysend() {
		boolean ret = bindings.NodeFeatures_requires_keysend(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_trampoline_routing_optional() {
		bindings.NodeFeatures_set_trampoline_routing_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_trampoline_routing_required() {
		bindings.NodeFeatures_set_trampoline_routing_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_trampoline_routing() {
		bindings.NodeFeatures_clear_trampoline_routing(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_trampoline_routing() {
		boolean ret = bindings.NodeFeatures_supports_trampoline_routing(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_trampoline_routing() {
		boolean ret = bindings.NodeFeatures_requires_trampoline_routing(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_simple_close_optional() {
		bindings.NodeFeatures_set_simple_close_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_simple_close_required() {
		bindings.NodeFeatures_set_simple_close_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_simple_close() {
		bindings.NodeFeatures_clear_simple_close(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_simple_close() {
		boolean ret = bindings.NodeFeatures_supports_simple_close(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_simple_close() {
		boolean ret = bindings.NodeFeatures_requires_simple_close(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_splicing_production_optional() {
		bindings.NodeFeatures_set_splicing_production_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_splicing_production_required() {
		bindings.NodeFeatures_set_splicing_production_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_splicing_production() {
		bindings.NodeFeatures_clear_splicing_production(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_splicing_production() {
		boolean ret = bindings.NodeFeatures_supports_splicing_production(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_splicing_production() {
		boolean ret = bindings.NodeFeatures_requires_splicing_production(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_anchor_zero_fee_commitments_optional() {
		bindings.NodeFeatures_set_anchor_zero_fee_commitments_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_anchor_zero_fee_commitments_required() {
		bindings.NodeFeatures_set_anchor_zero_fee_commitments_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_anchor_zero_fee_commitments() {
		bindings.NodeFeatures_clear_anchor_zero_fee_commitments(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_anchor_zero_fee_commitments() {
		boolean ret = bindings.NodeFeatures_supports_anchor_zero_fee_commitments(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_anchor_zero_fee_commitments() {
		boolean ret = bindings.NodeFeatures_requires_anchor_zero_fee_commitments(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_htlc_hold_optional() {
		bindings.NodeFeatures_set_htlc_hold_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_htlc_hold_required() {
		bindings.NodeFeatures_set_htlc_hold_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_htlc_hold() {
		bindings.NodeFeatures_clear_htlc_hold(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_htlc_hold() {
		boolean ret = bindings.NodeFeatures_supports_htlc_hold(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_htlc_hold() {
		boolean ret = bindings.NodeFeatures_requires_htlc_hold(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_splicing_optional() {
		bindings.NodeFeatures_set_splicing_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_splicing_required() {
		bindings.NodeFeatures_set_splicing_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_splicing() {
		bindings.NodeFeatures_clear_splicing(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_splicing() {
		boolean ret = bindings.NodeFeatures_supports_splicing(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_splicing() {
		boolean ret = bindings.NodeFeatures_requires_splicing(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_dns_resolution_optional() {
		bindings.NodeFeatures_set_dns_resolution_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_dns_resolution_required() {
		bindings.NodeFeatures_set_dns_resolution_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_dns_resolution() {
		bindings.NodeFeatures_clear_dns_resolution(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_dns_resolution() {
		boolean ret = bindings.NodeFeatures_supports_dns_resolution(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_dns_resolution() {
		boolean ret = bindings.NodeFeatures_requires_dns_resolution(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
