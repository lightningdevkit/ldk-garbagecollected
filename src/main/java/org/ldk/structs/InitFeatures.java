package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Features used within an `init` message.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class InitFeatures extends CommonBase {
	InitFeatures(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.InitFeatures_free(ptr); }
	}

	/**
	 * Checks if two InitFeaturess contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(InitFeatures b) {
		boolean ret = bindings.InitFeatures_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof InitFeatures)) return false;
		return this.eq((InitFeatures)o);
	}
	long clone_ptr() {
		long ret = bindings.InitFeatures_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the InitFeatures
	 */
	public InitFeatures clone() {
		long ret = bindings.InitFeatures_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InitFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InitFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Create a blank Features with no features set
	 */
	public static InitFeatures empty() {
		long ret = bindings.InitFeatures_empty();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InitFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InitFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Creates a Features with the bits set which are known by the implementation
	 */
	public static InitFeatures known() {
		long ret = bindings.InitFeatures_known();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InitFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InitFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns true if this `Features` object contains unknown feature flags which are set as
	 * \"required\".
	 */
	public boolean requires_unknown_bits() {
		boolean ret = bindings.InitFeatures_requires_unknown_bits(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Serialize the InitFeatures object into a byte array which can be read by InitFeatures_read
	 */
	public byte[] write() {
		byte[] ret = bindings.InitFeatures_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a InitFeatures from a byte array, created by InitFeatures_write
	 */
	public static Result_InitFeaturesDecodeErrorZ read(byte[] ser) {
		long ret = bindings.InitFeatures_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InitFeaturesDecodeErrorZ ret_hu_conv = Result_InitFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_data_loss_protect_optional() {
		bindings.InitFeatures_set_data_loss_protect_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_data_loss_protect_required() {
		bindings.InitFeatures_set_data_loss_protect_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_data_loss_protect() {
		boolean ret = bindings.InitFeatures_supports_data_loss_protect(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_data_loss_protect() {
		boolean ret = bindings.InitFeatures_requires_data_loss_protect(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_initial_routing_sync_optional() {
		bindings.InitFeatures_set_initial_routing_sync_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_initial_routing_sync_required() {
		bindings.InitFeatures_set_initial_routing_sync_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean initial_routing_sync() {
		boolean ret = bindings.InitFeatures_initial_routing_sync(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_upfront_shutdown_script_optional() {
		bindings.InitFeatures_set_upfront_shutdown_script_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_upfront_shutdown_script_required() {
		bindings.InitFeatures_set_upfront_shutdown_script_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_upfront_shutdown_script() {
		boolean ret = bindings.InitFeatures_supports_upfront_shutdown_script(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_upfront_shutdown_script() {
		boolean ret = bindings.InitFeatures_requires_upfront_shutdown_script(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_gossip_queries_optional() {
		bindings.InitFeatures_set_gossip_queries_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_gossip_queries_required() {
		bindings.InitFeatures_set_gossip_queries_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_gossip_queries() {
		boolean ret = bindings.InitFeatures_supports_gossip_queries(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_gossip_queries() {
		boolean ret = bindings.InitFeatures_requires_gossip_queries(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_variable_length_onion_optional() {
		bindings.InitFeatures_set_variable_length_onion_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_variable_length_onion_required() {
		bindings.InitFeatures_set_variable_length_onion_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_variable_length_onion() {
		boolean ret = bindings.InitFeatures_supports_variable_length_onion(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_variable_length_onion() {
		boolean ret = bindings.InitFeatures_requires_variable_length_onion(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_static_remote_key_optional() {
		bindings.InitFeatures_set_static_remote_key_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_static_remote_key_required() {
		bindings.InitFeatures_set_static_remote_key_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_static_remote_key() {
		boolean ret = bindings.InitFeatures_supports_static_remote_key(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_static_remote_key() {
		boolean ret = bindings.InitFeatures_requires_static_remote_key(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_payment_secret_optional() {
		bindings.InitFeatures_set_payment_secret_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_payment_secret_required() {
		bindings.InitFeatures_set_payment_secret_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_payment_secret() {
		boolean ret = bindings.InitFeatures_supports_payment_secret(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_payment_secret() {
		boolean ret = bindings.InitFeatures_requires_payment_secret(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_basic_mpp_optional() {
		bindings.InitFeatures_set_basic_mpp_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_basic_mpp_required() {
		bindings.InitFeatures_set_basic_mpp_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_basic_mpp() {
		boolean ret = bindings.InitFeatures_supports_basic_mpp(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_basic_mpp() {
		boolean ret = bindings.InitFeatures_requires_basic_mpp(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_wumbo_optional() {
		bindings.InitFeatures_set_wumbo_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_wumbo_required() {
		bindings.InitFeatures_set_wumbo_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_wumbo() {
		boolean ret = bindings.InitFeatures_supports_wumbo(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_wumbo() {
		boolean ret = bindings.InitFeatures_requires_wumbo(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_shutdown_any_segwit_optional() {
		bindings.InitFeatures_set_shutdown_any_segwit_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_shutdown_any_segwit_required() {
		bindings.InitFeatures_set_shutdown_any_segwit_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_shutdown_anysegwit() {
		boolean ret = bindings.InitFeatures_supports_shutdown_anysegwit(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_shutdown_anysegwit() {
		boolean ret = bindings.InitFeatures_requires_shutdown_anysegwit(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_channel_type_optional() {
		bindings.InitFeatures_set_channel_type_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_channel_type_required() {
		bindings.InitFeatures_set_channel_type_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_channel_type() {
		boolean ret = bindings.InitFeatures_supports_channel_type(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_channel_type() {
		boolean ret = bindings.InitFeatures_requires_channel_type(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_scid_privacy_optional() {
		bindings.InitFeatures_set_scid_privacy_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_scid_privacy_required() {
		bindings.InitFeatures_set_scid_privacy_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_scid_privacy() {
		boolean ret = bindings.InitFeatures_supports_scid_privacy(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_scid_privacy() {
		boolean ret = bindings.InitFeatures_requires_scid_privacy(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_zero_conf_optional() {
		bindings.InitFeatures_set_zero_conf_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_zero_conf_required() {
		bindings.InitFeatures_set_zero_conf_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_zero_conf() {
		boolean ret = bindings.InitFeatures_supports_zero_conf(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_zero_conf() {
		boolean ret = bindings.InitFeatures_requires_zero_conf(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
