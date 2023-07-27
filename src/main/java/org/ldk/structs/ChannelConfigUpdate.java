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

	public Option_u32Z get_forwarding_fee_proportional_millionths() {
		long ret = bindings.ChannelConfigUpdate_get_forwarding_fee_proportional_millionths(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u32Z ret_hu_conv = org.ldk.structs.Option_u32Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	public void set_forwarding_fee_proportional_millionths(org.ldk.structs.Option_u32Z val) {
		bindings.ChannelConfigUpdate_set_forwarding_fee_proportional_millionths(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	public Option_u32Z get_forwarding_fee_base_msat() {
		long ret = bindings.ChannelConfigUpdate_get_forwarding_fee_base_msat(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u32Z ret_hu_conv = org.ldk.structs.Option_u32Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	public void set_forwarding_fee_base_msat(org.ldk.structs.Option_u32Z val) {
		bindings.ChannelConfigUpdate_set_forwarding_fee_base_msat(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	public Option_u16Z get_cltv_expiry_delta() {
		long ret = bindings.ChannelConfigUpdate_get_cltv_expiry_delta(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u16Z ret_hu_conv = org.ldk.structs.Option_u16Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	public void set_cltv_expiry_delta(org.ldk.structs.Option_u16Z val) {
		bindings.ChannelConfigUpdate_set_cltv_expiry_delta(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
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

	public void set_max_dust_htlc_exposure_msat(org.ldk.structs.Option_MaxDustHTLCExposureZ val) {
		bindings.ChannelConfigUpdate_set_max_dust_htlc_exposure_msat(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	public Option_u64Z get_force_close_avoidance_max_fee_satoshis() {
		long ret = bindings.ChannelConfigUpdate_get_force_close_avoidance_max_fee_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	public void set_force_close_avoidance_max_fee_satoshis(org.ldk.structs.Option_u64Z val) {
		bindings.ChannelConfigUpdate_set_force_close_avoidance_max_fee_satoshis(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Constructs a new ChannelConfigUpdate given each field
	 */
	public static ChannelConfigUpdate of(org.ldk.structs.Option_u32Z forwarding_fee_proportional_millionths_arg, org.ldk.structs.Option_u32Z forwarding_fee_base_msat_arg, org.ldk.structs.Option_u16Z cltv_expiry_delta_arg, org.ldk.structs.Option_MaxDustHTLCExposureZ max_dust_htlc_exposure_msat_arg, org.ldk.structs.Option_u64Z force_close_avoidance_max_fee_satoshis_arg) {
		long ret = bindings.ChannelConfigUpdate_new(forwarding_fee_proportional_millionths_arg.ptr, forwarding_fee_base_msat_arg.ptr, cltv_expiry_delta_arg.ptr, max_dust_htlc_exposure_msat_arg.ptr, force_close_avoidance_max_fee_satoshis_arg.ptr);
		Reference.reachabilityFence(forwarding_fee_proportional_millionths_arg);
		Reference.reachabilityFence(forwarding_fee_base_msat_arg);
		Reference.reachabilityFence(cltv_expiry_delta_arg);
		Reference.reachabilityFence(max_dust_htlc_exposure_msat_arg);
		Reference.reachabilityFence(force_close_avoidance_max_fee_satoshis_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelConfigUpdate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelConfigUpdate(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(forwarding_fee_proportional_millionths_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(forwarding_fee_base_msat_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(cltv_expiry_delta_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(max_dust_htlc_exposure_msat_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(force_close_avoidance_max_fee_satoshis_arg); };
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" ChannelConfigUpdate. See struct and individual field documentaiton for details on which values are used.
	 */
	public static ChannelConfigUpdate with_default() {
		long ret = bindings.ChannelConfigUpdate_default();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelConfigUpdate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelConfigUpdate(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}
