package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A parallel struct to [`ChannelConfig`] to define partial updates.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelConfigUpdate extends CommonBase {
	ChannelConfigUpdate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelConfigUpdate_free(ptr); }
	}

	/**
	 * Amount (in millionths of a satoshi) charged per satoshi for payments forwarded outbound over the channel. See
	 * [`ChannelConfig::forwarding_fee_proportional_millionths`].
	 */
	public Option_u32Z get_forwarding_fee_proportional_millionths() {
		long ret = bindings.ChannelConfigUpdate_get_forwarding_fee_proportional_millionths(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u32Z ret_hu_conv = org.ldk.structs.Option_u32Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Amount (in millionths of a satoshi) charged per satoshi for payments forwarded outbound over the channel. See
	 * [`ChannelConfig::forwarding_fee_proportional_millionths`].
	 */
	public void set_forwarding_fee_proportional_millionths(org.ldk.structs.Option_u32Z val) {
		bindings.ChannelConfigUpdate_set_forwarding_fee_proportional_millionths(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Amount (in milli-satoshi) charged for payments forwarded outbound over the channel. See
	 * [`ChannelConfig::forwarding_fee_base_msat`].
	 */
	public Option_u32Z get_forwarding_fee_base_msat() {
		long ret = bindings.ChannelConfigUpdate_get_forwarding_fee_base_msat(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u32Z ret_hu_conv = org.ldk.structs.Option_u32Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Amount (in milli-satoshi) charged for payments forwarded outbound over the channel. See
	 * [`ChannelConfig::forwarding_fee_base_msat`].
	 */
	public void set_forwarding_fee_base_msat(org.ldk.structs.Option_u32Z val) {
		bindings.ChannelConfigUpdate_set_forwarding_fee_base_msat(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The difference in the CLTV value between incoming HTLCs and an outbound HTLC forwarded over the channel this
	 * config applies to. See [`ChannelConfig::cltv_expiry_delta`].
	 */
	public Option_u16Z get_cltv_expiry_delta() {
		long ret = bindings.ChannelConfigUpdate_get_cltv_expiry_delta(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u16Z ret_hu_conv = org.ldk.structs.Option_u16Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The difference in the CLTV value between incoming HTLCs and an outbound HTLC forwarded over the channel this
	 * config applies to. See [`ChannelConfig::cltv_expiry_delta`].
	 */
	public void set_cltv_expiry_delta(org.ldk.structs.Option_u16Z val) {
		bindings.ChannelConfigUpdate_set_cltv_expiry_delta(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The total exposure we are willing to allow to dust HTLCs. See [`ChannelConfig::max_dust_htlc_exposure`].
	 * 
	 * Returns a copy of the field.
	 */
	public Option_MaxDustHTLCExposureZ get_max_dust_htlc_exposure_msat() {
		long ret = bindings.ChannelConfigUpdate_get_max_dust_htlc_exposure_msat(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_MaxDustHTLCExposureZ ret_hu_conv = org.ldk.structs.Option_MaxDustHTLCExposureZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The total exposure we are willing to allow to dust HTLCs. See [`ChannelConfig::max_dust_htlc_exposure`].
	 */
	public void set_max_dust_htlc_exposure_msat(org.ldk.structs.Option_MaxDustHTLCExposureZ val) {
		bindings.ChannelConfigUpdate_set_max_dust_htlc_exposure_msat(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The additional fee we're willing to pay to avoid waiting for the counterparty's `to_self_delay` to reclaim
	 * funds. See [`ChannelConfig::force_close_avoidance_max_fee_satoshis`].
	 */
	public Option_u64Z get_force_close_avoidance_max_fee_satoshis() {
		long ret = bindings.ChannelConfigUpdate_get_force_close_avoidance_max_fee_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The additional fee we're willing to pay to avoid waiting for the counterparty's `to_self_delay` to reclaim
	 * funds. See [`ChannelConfig::force_close_avoidance_max_fee_satoshis`].
	 */
	public void set_force_close_avoidance_max_fee_satoshis(org.ldk.structs.Option_u64Z val) {
		bindings.ChannelConfigUpdate_set_force_close_avoidance_max_fee_satoshis(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * If set, allows this channel's counterparty to skim an additional fee off this node's inbound HTLCs. See
	 * [`ChannelConfig::accept_underpaying_htlcs`].
	 */
	public Option_boolZ get_accept_underpaying_htlcs() {
		long ret = bindings.ChannelConfigUpdate_get_accept_underpaying_htlcs(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_boolZ ret_hu_conv = org.ldk.structs.Option_boolZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * If set, allows this channel's counterparty to skim an additional fee off this node's inbound HTLCs. See
	 * [`ChannelConfig::accept_underpaying_htlcs`].
	 */
	public void set_accept_underpaying_htlcs(org.ldk.structs.Option_boolZ val) {
		bindings.ChannelConfigUpdate_set_accept_underpaying_htlcs(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new ChannelConfigUpdate given each field
	 */
	public static ChannelConfigUpdate of(org.ldk.structs.Option_u32Z forwarding_fee_proportional_millionths_arg, org.ldk.structs.Option_u32Z forwarding_fee_base_msat_arg, org.ldk.structs.Option_u16Z cltv_expiry_delta_arg, org.ldk.structs.Option_MaxDustHTLCExposureZ max_dust_htlc_exposure_msat_arg, org.ldk.structs.Option_u64Z force_close_avoidance_max_fee_satoshis_arg, org.ldk.structs.Option_boolZ accept_underpaying_htlcs_arg) {
		long ret = bindings.ChannelConfigUpdate_new(forwarding_fee_proportional_millionths_arg.ptr, forwarding_fee_base_msat_arg.ptr, cltv_expiry_delta_arg.ptr, max_dust_htlc_exposure_msat_arg.ptr, force_close_avoidance_max_fee_satoshis_arg.ptr, accept_underpaying_htlcs_arg.ptr);
		Reference.reachabilityFence(forwarding_fee_proportional_millionths_arg);
		Reference.reachabilityFence(forwarding_fee_base_msat_arg);
		Reference.reachabilityFence(cltv_expiry_delta_arg);
		Reference.reachabilityFence(max_dust_htlc_exposure_msat_arg);
		Reference.reachabilityFence(force_close_avoidance_max_fee_satoshis_arg);
		Reference.reachabilityFence(accept_underpaying_htlcs_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelConfigUpdate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelConfigUpdate(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ChannelConfigUpdate_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelConfigUpdate
	 */
	public ChannelConfigUpdate clone() {
		long ret = bindings.ChannelConfigUpdate_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelConfigUpdate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelConfigUpdate(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Build a ChannelConfigUpdate from a ChannelConfig
	 */
	public static ChannelConfigUpdate from_ChannelConfig(org.ldk.structs.ChannelConfig f) {
		long ret = bindings.ChannelConfigUpdate_from_ChannelConfig(f.ptr);
		Reference.reachabilityFence(f);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelConfigUpdate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelConfigUpdate(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}
