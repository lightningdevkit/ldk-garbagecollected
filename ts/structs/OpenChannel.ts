
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class OpenChannel extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.OpenChannel_free(this.ptr);
                    }
                }
	public OpenChannel clone() {
		number ret = bindings.OpenChannel_clone(this.ptr);
		const ret_hu_conv: OpenChannel = new OpenChannel(null, ret);
		return ret_hu_conv;
	}

	public Uint8Array get_chain_hash() {
		Uint8Array ret = bindings.OpenChannel_get_chain_hash(this.ptr);
		return ret;
	}

	public void set_chain_hash(Uint8Array val) {
		bindings.OpenChannel_set_chain_hash(this.ptr, val);
	}

	public Uint8Array get_temporary_channel_id() {
		Uint8Array ret = bindings.OpenChannel_get_temporary_channel_id(this.ptr);
		return ret;
	}

	public void set_temporary_channel_id(Uint8Array val) {
		bindings.OpenChannel_set_temporary_channel_id(this.ptr, val);
	}

	public number get_funding_satoshis() {
		number ret = bindings.OpenChannel_get_funding_satoshis(this.ptr);
		return ret;
	}

	public void set_funding_satoshis(number val) {
		bindings.OpenChannel_set_funding_satoshis(this.ptr, val);
	}

	public number get_push_msat() {
		number ret = bindings.OpenChannel_get_push_msat(this.ptr);
		return ret;
	}

	public void set_push_msat(number val) {
		bindings.OpenChannel_set_push_msat(this.ptr, val);
	}

	public number get_dust_limit_satoshis() {
		number ret = bindings.OpenChannel_get_dust_limit_satoshis(this.ptr);
		return ret;
	}

	public void set_dust_limit_satoshis(number val) {
		bindings.OpenChannel_set_dust_limit_satoshis(this.ptr, val);
	}

	public number get_max_htlc_value_in_flight_msat() {
		number ret = bindings.OpenChannel_get_max_htlc_value_in_flight_msat(this.ptr);
		return ret;
	}

	public void set_max_htlc_value_in_flight_msat(number val) {
		bindings.OpenChannel_set_max_htlc_value_in_flight_msat(this.ptr, val);
	}

	public number get_channel_reserve_satoshis() {
		number ret = bindings.OpenChannel_get_channel_reserve_satoshis(this.ptr);
		return ret;
	}

	public void set_channel_reserve_satoshis(number val) {
		bindings.OpenChannel_set_channel_reserve_satoshis(this.ptr, val);
	}

	public number get_htlc_minimum_msat() {
		number ret = bindings.OpenChannel_get_htlc_minimum_msat(this.ptr);
		return ret;
	}

	public void set_htlc_minimum_msat(number val) {
		bindings.OpenChannel_set_htlc_minimum_msat(this.ptr, val);
	}

	public number get_feerate_per_kw() {
		number ret = bindings.OpenChannel_get_feerate_per_kw(this.ptr);
		return ret;
	}

	public void set_feerate_per_kw(number val) {
		bindings.OpenChannel_set_feerate_per_kw(this.ptr, val);
	}

	public number get_to_self_delay() {
		number ret = bindings.OpenChannel_get_to_self_delay(this.ptr);
		return ret;
	}

	public void set_to_self_delay(number val) {
		bindings.OpenChannel_set_to_self_delay(this.ptr, val);
	}

	public number get_max_accepted_htlcs() {
		number ret = bindings.OpenChannel_get_max_accepted_htlcs(this.ptr);
		return ret;
	}

	public void set_max_accepted_htlcs(number val) {
		bindings.OpenChannel_set_max_accepted_htlcs(this.ptr, val);
	}

	public Uint8Array get_funding_pubkey() {
		Uint8Array ret = bindings.OpenChannel_get_funding_pubkey(this.ptr);
		return ret;
	}

	public void set_funding_pubkey(Uint8Array val) {
		bindings.OpenChannel_set_funding_pubkey(this.ptr, val);
	}

	public Uint8Array get_revocation_basepoint() {
		Uint8Array ret = bindings.OpenChannel_get_revocation_basepoint(this.ptr);
		return ret;
	}

	public void set_revocation_basepoint(Uint8Array val) {
		bindings.OpenChannel_set_revocation_basepoint(this.ptr, val);
	}

	public Uint8Array get_payment_point() {
		Uint8Array ret = bindings.OpenChannel_get_payment_point(this.ptr);
		return ret;
	}

	public void set_payment_point(Uint8Array val) {
		bindings.OpenChannel_set_payment_point(this.ptr, val);
	}

	public Uint8Array get_delayed_payment_basepoint() {
		Uint8Array ret = bindings.OpenChannel_get_delayed_payment_basepoint(this.ptr);
		return ret;
	}

	public void set_delayed_payment_basepoint(Uint8Array val) {
		bindings.OpenChannel_set_delayed_payment_basepoint(this.ptr, val);
	}

	public Uint8Array get_htlc_basepoint() {
		Uint8Array ret = bindings.OpenChannel_get_htlc_basepoint(this.ptr);
		return ret;
	}

	public void set_htlc_basepoint(Uint8Array val) {
		bindings.OpenChannel_set_htlc_basepoint(this.ptr, val);
	}

	public Uint8Array get_first_per_commitment_point() {
		Uint8Array ret = bindings.OpenChannel_get_first_per_commitment_point(this.ptr);
		return ret;
	}

	public void set_first_per_commitment_point(Uint8Array val) {
		bindings.OpenChannel_set_first_per_commitment_point(this.ptr, val);
	}

	public number get_channel_flags() {
		number ret = bindings.OpenChannel_get_channel_flags(this.ptr);
		return ret;
	}

	public void set_channel_flags(number val) {
		bindings.OpenChannel_set_channel_flags(this.ptr, val);
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.OpenChannel_write(this.ptr);
		return ret;
	}

	public static OpenChannel constructor_read(Uint8Array ser) {
		number ret = bindings.OpenChannel_read(ser);
		const ret_hu_conv: OpenChannel = new OpenChannel(null, ret);
		return ret_hu_conv;
	}

}
