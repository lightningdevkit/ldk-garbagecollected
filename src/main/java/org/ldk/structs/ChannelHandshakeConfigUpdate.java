package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Config structure for overriding channel handshake parameters.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelHandshakeConfigUpdate extends CommonBase {
	ChannelHandshakeConfigUpdate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelHandshakeConfigUpdate_free(ptr); }
	}

	/**
	 * Overrides the percentage of the channel value we will cap the total value of outstanding inbound HTLCs to. See
	 * [`ChannelHandshakeConfig::max_inbound_htlc_value_in_flight_percent_of_channel`].
	 */
	public Option_u8Z get_max_inbound_htlc_value_in_flight_percent_of_channel() {
		long ret = bindings.ChannelHandshakeConfigUpdate_get_max_inbound_htlc_value_in_flight_percent_of_channel(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u8Z ret_hu_conv = org.ldk.structs.Option_u8Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Overrides the percentage of the channel value we will cap the total value of outstanding inbound HTLCs to. See
	 * [`ChannelHandshakeConfig::max_inbound_htlc_value_in_flight_percent_of_channel`].
	 */
	public void set_max_inbound_htlc_value_in_flight_percent_of_channel(org.ldk.structs.Option_u8Z val) {
		bindings.ChannelHandshakeConfigUpdate_set_max_inbound_htlc_value_in_flight_percent_of_channel(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Overrides the smallest value HTLC we will accept to process. See [`ChannelHandshakeConfig::our_htlc_minimum_msat`].
	 */
	public Option_u64Z get_htlc_minimum_msat() {
		long ret = bindings.ChannelHandshakeConfigUpdate_get_htlc_minimum_msat(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Overrides the smallest value HTLC we will accept to process. See [`ChannelHandshakeConfig::our_htlc_minimum_msat`].
	 */
	public void set_htlc_minimum_msat(org.ldk.structs.Option_u64Z val) {
		bindings.ChannelHandshakeConfigUpdate_set_htlc_minimum_msat(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Overrides confirmations we will wait for before considering the channel locked in. See
	 * [`ChannelHandshakeConfig::minimum_depth`].
	 */
	public Option_u32Z get_minimum_depth() {
		long ret = bindings.ChannelHandshakeConfigUpdate_get_minimum_depth(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u32Z ret_hu_conv = org.ldk.structs.Option_u32Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Overrides confirmations we will wait for before considering the channel locked in. See
	 * [`ChannelHandshakeConfig::minimum_depth`].
	 */
	public void set_minimum_depth(org.ldk.structs.Option_u32Z val) {
		bindings.ChannelHandshakeConfigUpdate_set_minimum_depth(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Overrides the number of blocks we require our counterparty to wait to claim their money. See
	 * [`ChannelHandshakeConfig::our_to_self_delay`].
	 */
	public Option_u16Z get_to_self_delay() {
		long ret = bindings.ChannelHandshakeConfigUpdate_get_to_self_delay(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u16Z ret_hu_conv = org.ldk.structs.Option_u16Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Overrides the number of blocks we require our counterparty to wait to claim their money. See
	 * [`ChannelHandshakeConfig::our_to_self_delay`].
	 */
	public void set_to_self_delay(org.ldk.structs.Option_u16Z val) {
		bindings.ChannelHandshakeConfigUpdate_set_to_self_delay(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The maximum number of HTLCs in-flight from our counterparty towards us at the same time. See
	 * [`ChannelHandshakeConfig::our_max_accepted_htlcs`].
	 */
	public Option_u16Z get_max_accepted_htlcs() {
		long ret = bindings.ChannelHandshakeConfigUpdate_get_max_accepted_htlcs(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u16Z ret_hu_conv = org.ldk.structs.Option_u16Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The maximum number of HTLCs in-flight from our counterparty towards us at the same time. See
	 * [`ChannelHandshakeConfig::our_max_accepted_htlcs`].
	 */
	public void set_max_accepted_htlcs(org.ldk.structs.Option_u16Z val) {
		bindings.ChannelHandshakeConfigUpdate_set_max_accepted_htlcs(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The Proportion of the channel value to configure as counterparty's channel reserve. See
	 * [`ChannelHandshakeConfig::their_channel_reserve_proportional_millionths`].
	 */
	public Option_u32Z get_channel_reserve_proportional_millionths() {
		long ret = bindings.ChannelHandshakeConfigUpdate_get_channel_reserve_proportional_millionths(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u32Z ret_hu_conv = org.ldk.structs.Option_u32Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The Proportion of the channel value to configure as counterparty's channel reserve. See
	 * [`ChannelHandshakeConfig::their_channel_reserve_proportional_millionths`].
	 */
	public void set_channel_reserve_proportional_millionths(org.ldk.structs.Option_u32Z val) {
		bindings.ChannelHandshakeConfigUpdate_set_channel_reserve_proportional_millionths(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new ChannelHandshakeConfigUpdate given each field
	 */
	public static ChannelHandshakeConfigUpdate of(org.ldk.structs.Option_u8Z max_inbound_htlc_value_in_flight_percent_of_channel_arg, org.ldk.structs.Option_u64Z htlc_minimum_msat_arg, org.ldk.structs.Option_u32Z minimum_depth_arg, org.ldk.structs.Option_u16Z to_self_delay_arg, org.ldk.structs.Option_u16Z max_accepted_htlcs_arg, org.ldk.structs.Option_u32Z channel_reserve_proportional_millionths_arg) {
		long ret = bindings.ChannelHandshakeConfigUpdate_new(max_inbound_htlc_value_in_flight_percent_of_channel_arg.ptr, htlc_minimum_msat_arg.ptr, minimum_depth_arg.ptr, to_self_delay_arg.ptr, max_accepted_htlcs_arg.ptr, channel_reserve_proportional_millionths_arg.ptr);
		Reference.reachabilityFence(max_inbound_htlc_value_in_flight_percent_of_channel_arg);
		Reference.reachabilityFence(htlc_minimum_msat_arg);
		Reference.reachabilityFence(minimum_depth_arg);
		Reference.reachabilityFence(to_self_delay_arg);
		Reference.reachabilityFence(max_accepted_htlcs_arg);
		Reference.reachabilityFence(channel_reserve_proportional_millionths_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelHandshakeConfigUpdate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelHandshakeConfigUpdate(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ChannelHandshakeConfigUpdate_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelHandshakeConfigUpdate
	 */
	public ChannelHandshakeConfigUpdate clone() {
		long ret = bindings.ChannelHandshakeConfigUpdate_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelHandshakeConfigUpdate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelHandshakeConfigUpdate(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
