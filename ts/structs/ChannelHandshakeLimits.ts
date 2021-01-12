
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class ChannelHandshakeLimits extends CommonBase {
	ChannelHandshakeLimits(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelHandshakeLimits_free(ptr); }
	}

	public ChannelHandshakeLimits clone() {
		uint32_t ret = bindings.ChannelHandshakeLimits_clone(this.ptr);
		ChannelHandshakeLimits ret_hu_conv = new ChannelHandshakeLimits(null, ret);
		return ret_hu_conv;
	}

	public long get_min_funding_satoshis() {
		long ret = bindings.ChannelHandshakeLimits_get_min_funding_satoshis(this.ptr);
		return ret;
	}

	public void set_min_funding_satoshis(long val) {
		bindings.ChannelHandshakeLimits_set_min_funding_satoshis(this.ptr, val);
	}

	public long get_max_htlc_minimum_msat() {
		long ret = bindings.ChannelHandshakeLimits_get_max_htlc_minimum_msat(this.ptr);
		return ret;
	}

	public void set_max_htlc_minimum_msat(long val) {
		bindings.ChannelHandshakeLimits_set_max_htlc_minimum_msat(this.ptr, val);
	}

	public long get_min_max_htlc_value_in_flight_msat() {
		long ret = bindings.ChannelHandshakeLimits_get_min_max_htlc_value_in_flight_msat(this.ptr);
		return ret;
	}

	public void set_min_max_htlc_value_in_flight_msat(long val) {
		bindings.ChannelHandshakeLimits_set_min_max_htlc_value_in_flight_msat(this.ptr, val);
	}

	public long get_max_channel_reserve_satoshis() {
		long ret = bindings.ChannelHandshakeLimits_get_max_channel_reserve_satoshis(this.ptr);
		return ret;
	}

	public void set_max_channel_reserve_satoshis(long val) {
		bindings.ChannelHandshakeLimits_set_max_channel_reserve_satoshis(this.ptr, val);
	}

	public short get_min_max_accepted_htlcs() {
		short ret = bindings.ChannelHandshakeLimits_get_min_max_accepted_htlcs(this.ptr);
		return ret;
	}

	public void set_min_max_accepted_htlcs(short val) {
		bindings.ChannelHandshakeLimits_set_min_max_accepted_htlcs(this.ptr, val);
	}

	public long get_min_dust_limit_satoshis() {
		long ret = bindings.ChannelHandshakeLimits_get_min_dust_limit_satoshis(this.ptr);
		return ret;
	}

	public void set_min_dust_limit_satoshis(long val) {
		bindings.ChannelHandshakeLimits_set_min_dust_limit_satoshis(this.ptr, val);
	}

	public long get_max_dust_limit_satoshis() {
		long ret = bindings.ChannelHandshakeLimits_get_max_dust_limit_satoshis(this.ptr);
		return ret;
	}

	public void set_max_dust_limit_satoshis(long val) {
		bindings.ChannelHandshakeLimits_set_max_dust_limit_satoshis(this.ptr, val);
	}

	public int get_max_minimum_depth() {
		int ret = bindings.ChannelHandshakeLimits_get_max_minimum_depth(this.ptr);
		return ret;
	}

	public void set_max_minimum_depth(int val) {
		bindings.ChannelHandshakeLimits_set_max_minimum_depth(this.ptr, val);
	}

	public boolean get_force_announced_channel_preference() {
		boolean ret = bindings.ChannelHandshakeLimits_get_force_announced_channel_preference(this.ptr);
		return ret;
	}

	public void set_force_announced_channel_preference(boolean val) {
		bindings.ChannelHandshakeLimits_set_force_announced_channel_preference(this.ptr, val);
	}

	public short get_their_to_self_delay() {
		short ret = bindings.ChannelHandshakeLimits_get_their_to_self_delay(this.ptr);
		return ret;
	}

	public void set_their_to_self_delay(short val) {
		bindings.ChannelHandshakeLimits_set_their_to_self_delay(this.ptr, val);
	}

	public static ChannelHandshakeLimits constructor_new(long min_funding_satoshis_arg, long max_htlc_minimum_msat_arg, long min_max_htlc_value_in_flight_msat_arg, long max_channel_reserve_satoshis_arg, short min_max_accepted_htlcs_arg, long min_dust_limit_satoshis_arg, long max_dust_limit_satoshis_arg, int max_minimum_depth_arg, boolean force_announced_channel_preference_arg, short their_to_self_delay_arg) {
		uint32_t ret = bindings.ChannelHandshakeLimits_new(min_funding_satoshis_arg, max_htlc_minimum_msat_arg, min_max_htlc_value_in_flight_msat_arg, max_channel_reserve_satoshis_arg, min_max_accepted_htlcs_arg, min_dust_limit_satoshis_arg, max_dust_limit_satoshis_arg, max_minimum_depth_arg, force_announced_channel_preference_arg, their_to_self_delay_arg);
		ChannelHandshakeLimits ret_hu_conv = new ChannelHandshakeLimits(null, ret);
		return ret_hu_conv;
	}

	public static ChannelHandshakeLimits constructor_default() {
		uint32_t ret = bindings.ChannelHandshakeLimits_default();
		ChannelHandshakeLimits ret_hu_conv = new ChannelHandshakeLimits(null, ret);
		return ret_hu_conv;
	}

}
