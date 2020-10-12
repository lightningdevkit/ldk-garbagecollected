package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class ChannelHandshakeLimits extends CommonBase {
	ChannelHandshakeLimits(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.ChannelHandshakeLimits_free(ptr); super.finalize();
	}

	public ChannelHandshakeLimits(ChannelHandshakeLimits orig) {
		super(bindings.ChannelHandshakeLimits_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public long get_min_funding_satoshis(ChannelHandshakeLimits this_ptr) {
		long ret = bindings.ChannelHandshakeLimits_get_min_funding_satoshis(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_min_funding_satoshis(ChannelHandshakeLimits this_ptr, long val) {
		bindings.ChannelHandshakeLimits_set_min_funding_satoshis(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_max_htlc_minimum_msat(ChannelHandshakeLimits this_ptr) {
		long ret = bindings.ChannelHandshakeLimits_get_max_htlc_minimum_msat(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_max_htlc_minimum_msat(ChannelHandshakeLimits this_ptr, long val) {
		bindings.ChannelHandshakeLimits_set_max_htlc_minimum_msat(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_min_max_htlc_value_in_flight_msat(ChannelHandshakeLimits this_ptr) {
		long ret = bindings.ChannelHandshakeLimits_get_min_max_htlc_value_in_flight_msat(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_min_max_htlc_value_in_flight_msat(ChannelHandshakeLimits this_ptr, long val) {
		bindings.ChannelHandshakeLimits_set_min_max_htlc_value_in_flight_msat(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_max_channel_reserve_satoshis(ChannelHandshakeLimits this_ptr) {
		long ret = bindings.ChannelHandshakeLimits_get_max_channel_reserve_satoshis(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_max_channel_reserve_satoshis(ChannelHandshakeLimits this_ptr, long val) {
		bindings.ChannelHandshakeLimits_set_max_channel_reserve_satoshis(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public short get_min_max_accepted_htlcs(ChannelHandshakeLimits this_ptr) {
		short ret = bindings.ChannelHandshakeLimits_get_min_max_accepted_htlcs(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_min_max_accepted_htlcs(ChannelHandshakeLimits this_ptr, short val) {
		bindings.ChannelHandshakeLimits_set_min_max_accepted_htlcs(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_min_dust_limit_satoshis(ChannelHandshakeLimits this_ptr) {
		long ret = bindings.ChannelHandshakeLimits_get_min_dust_limit_satoshis(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_min_dust_limit_satoshis(ChannelHandshakeLimits this_ptr, long val) {
		bindings.ChannelHandshakeLimits_set_min_dust_limit_satoshis(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_max_dust_limit_satoshis(ChannelHandshakeLimits this_ptr) {
		long ret = bindings.ChannelHandshakeLimits_get_max_dust_limit_satoshis(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_max_dust_limit_satoshis(ChannelHandshakeLimits this_ptr, long val) {
		bindings.ChannelHandshakeLimits_set_max_dust_limit_satoshis(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public int get_max_minimum_depth(ChannelHandshakeLimits this_ptr) {
		int ret = bindings.ChannelHandshakeLimits_get_max_minimum_depth(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_max_minimum_depth(ChannelHandshakeLimits this_ptr, int val) {
		bindings.ChannelHandshakeLimits_set_max_minimum_depth(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public boolean get_force_announced_channel_preference(ChannelHandshakeLimits this_ptr) {
		boolean ret = bindings.ChannelHandshakeLimits_get_force_announced_channel_preference(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_force_announced_channel_preference(ChannelHandshakeLimits this_ptr, boolean val) {
		bindings.ChannelHandshakeLimits_set_force_announced_channel_preference(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public short get_their_to_self_delay(ChannelHandshakeLimits this_ptr) {
		short ret = bindings.ChannelHandshakeLimits_get_their_to_self_delay(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_their_to_self_delay(ChannelHandshakeLimits this_ptr, short val) {
		bindings.ChannelHandshakeLimits_set_their_to_self_delay(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public ChannelHandshakeLimits(long min_funding_satoshis_arg, long max_htlc_minimum_msat_arg, long min_max_htlc_value_in_flight_msat_arg, long max_channel_reserve_satoshis_arg, short min_max_accepted_htlcs_arg, long min_dust_limit_satoshis_arg, long max_dust_limit_satoshis_arg, int max_minimum_depth_arg, boolean force_announced_channel_preference_arg, short their_to_self_delay_arg) {
		super(bindings.ChannelHandshakeLimits_new(min_funding_satoshis_arg, max_htlc_minimum_msat_arg, min_max_htlc_value_in_flight_msat_arg, max_channel_reserve_satoshis_arg, min_max_accepted_htlcs_arg, min_dust_limit_satoshis_arg, max_dust_limit_satoshis_arg, max_minimum_depth_arg, force_announced_channel_preference_arg, their_to_self_delay_arg));
	}

	public ChannelHandshakeLimits() {
		super(bindings.ChannelHandshakeLimits_default());
	}

}
