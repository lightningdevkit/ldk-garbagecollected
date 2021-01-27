
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ChannelHandshakeLimits extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ChannelHandshakeLimits_free(this.ptr);
                    }
                }
	public ChannelHandshakeLimits clone() {
		number ret = bindings.ChannelHandshakeLimits_clone(this.ptr);
		const ret_hu_conv: ChannelHandshakeLimits = new ChannelHandshakeLimits(null, ret);
		return ret_hu_conv;
	}

	public number get_min_funding_satoshis() {
		number ret = bindings.ChannelHandshakeLimits_get_min_funding_satoshis(this.ptr);
		return ret;
	}

	public void set_min_funding_satoshis(number val) {
		bindings.ChannelHandshakeLimits_set_min_funding_satoshis(this.ptr, val);
	}

	public number get_max_htlc_minimum_msat() {
		number ret = bindings.ChannelHandshakeLimits_get_max_htlc_minimum_msat(this.ptr);
		return ret;
	}

	public void set_max_htlc_minimum_msat(number val) {
		bindings.ChannelHandshakeLimits_set_max_htlc_minimum_msat(this.ptr, val);
	}

	public number get_min_max_htlc_value_in_flight_msat() {
		number ret = bindings.ChannelHandshakeLimits_get_min_max_htlc_value_in_flight_msat(this.ptr);
		return ret;
	}

	public void set_min_max_htlc_value_in_flight_msat(number val) {
		bindings.ChannelHandshakeLimits_set_min_max_htlc_value_in_flight_msat(this.ptr, val);
	}

	public number get_max_channel_reserve_satoshis() {
		number ret = bindings.ChannelHandshakeLimits_get_max_channel_reserve_satoshis(this.ptr);
		return ret;
	}

	public void set_max_channel_reserve_satoshis(number val) {
		bindings.ChannelHandshakeLimits_set_max_channel_reserve_satoshis(this.ptr, val);
	}

	public number get_min_max_accepted_htlcs() {
		number ret = bindings.ChannelHandshakeLimits_get_min_max_accepted_htlcs(this.ptr);
		return ret;
	}

	public void set_min_max_accepted_htlcs(number val) {
		bindings.ChannelHandshakeLimits_set_min_max_accepted_htlcs(this.ptr, val);
	}

	public number get_min_dust_limit_satoshis() {
		number ret = bindings.ChannelHandshakeLimits_get_min_dust_limit_satoshis(this.ptr);
		return ret;
	}

	public void set_min_dust_limit_satoshis(number val) {
		bindings.ChannelHandshakeLimits_set_min_dust_limit_satoshis(this.ptr, val);
	}

	public number get_max_dust_limit_satoshis() {
		number ret = bindings.ChannelHandshakeLimits_get_max_dust_limit_satoshis(this.ptr);
		return ret;
	}

	public void set_max_dust_limit_satoshis(number val) {
		bindings.ChannelHandshakeLimits_set_max_dust_limit_satoshis(this.ptr, val);
	}

	public number get_max_minimum_depth() {
		number ret = bindings.ChannelHandshakeLimits_get_max_minimum_depth(this.ptr);
		return ret;
	}

	public void set_max_minimum_depth(number val) {
		bindings.ChannelHandshakeLimits_set_max_minimum_depth(this.ptr, val);
	}

	public boolean get_force_announced_channel_preference() {
		boolean ret = bindings.ChannelHandshakeLimits_get_force_announced_channel_preference(this.ptr);
		return ret;
	}

	public void set_force_announced_channel_preference(boolean val) {
		bindings.ChannelHandshakeLimits_set_force_announced_channel_preference(this.ptr, val);
	}

	public number get_their_to_self_delay() {
		number ret = bindings.ChannelHandshakeLimits_get_their_to_self_delay(this.ptr);
		return ret;
	}

	public void set_their_to_self_delay(number val) {
		bindings.ChannelHandshakeLimits_set_their_to_self_delay(this.ptr, val);
	}

	public static ChannelHandshakeLimits constructor_new(number min_funding_satoshis_arg, number max_htlc_minimum_msat_arg, number min_max_htlc_value_in_flight_msat_arg, number max_channel_reserve_satoshis_arg, number min_max_accepted_htlcs_arg, number min_dust_limit_satoshis_arg, number max_dust_limit_satoshis_arg, number max_minimum_depth_arg, boolean force_announced_channel_preference_arg, number their_to_self_delay_arg) {
		number ret = bindings.ChannelHandshakeLimits_new(min_funding_satoshis_arg, max_htlc_minimum_msat_arg, min_max_htlc_value_in_flight_msat_arg, max_channel_reserve_satoshis_arg, min_max_accepted_htlcs_arg, min_dust_limit_satoshis_arg, max_dust_limit_satoshis_arg, max_minimum_depth_arg, force_announced_channel_preference_arg, their_to_self_delay_arg);
		const ret_hu_conv: ChannelHandshakeLimits = new ChannelHandshakeLimits(null, ret);
		return ret_hu_conv;
	}

	public static ChannelHandshakeLimits constructor_default() {
		number ret = bindings.ChannelHandshakeLimits_default();
		const ret_hu_conv: ChannelHandshakeLimits = new ChannelHandshakeLimits(null, ret);
		return ret_hu_conv;
	}

}
