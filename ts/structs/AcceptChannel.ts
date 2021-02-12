
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class AcceptChannel extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.AcceptChannel_free(this.ptr);
                    }
                }
	public Uint8Array get_temporary_channel_id() {
		Uint8Array ret = bindings.AcceptChannel_get_temporary_channel_id(this.ptr);
		return ret;
	}

	public void set_temporary_channel_id(Uint8Array val) {
		bindings.AcceptChannel_set_temporary_channel_id(this.ptr, val);
	}

	public number get_dust_limit_satoshis() {
		number ret = bindings.AcceptChannel_get_dust_limit_satoshis(this.ptr);
		return ret;
	}

	public void set_dust_limit_satoshis(number val) {
		bindings.AcceptChannel_set_dust_limit_satoshis(this.ptr, val);
	}

	public number get_max_htlc_value_in_flight_msat() {
		number ret = bindings.AcceptChannel_get_max_htlc_value_in_flight_msat(this.ptr);
		return ret;
	}

	public void set_max_htlc_value_in_flight_msat(number val) {
		bindings.AcceptChannel_set_max_htlc_value_in_flight_msat(this.ptr, val);
	}

	public number get_channel_reserve_satoshis() {
		number ret = bindings.AcceptChannel_get_channel_reserve_satoshis(this.ptr);
		return ret;
	}

	public void set_channel_reserve_satoshis(number val) {
		bindings.AcceptChannel_set_channel_reserve_satoshis(this.ptr, val);
	}

	public number get_htlc_minimum_msat() {
		number ret = bindings.AcceptChannel_get_htlc_minimum_msat(this.ptr);
		return ret;
	}

	public void set_htlc_minimum_msat(number val) {
		bindings.AcceptChannel_set_htlc_minimum_msat(this.ptr, val);
	}

	public number get_minimum_depth() {
		number ret = bindings.AcceptChannel_get_minimum_depth(this.ptr);
		return ret;
	}

	public void set_minimum_depth(number val) {
		bindings.AcceptChannel_set_minimum_depth(this.ptr, val);
	}

	public number get_to_self_delay() {
		number ret = bindings.AcceptChannel_get_to_self_delay(this.ptr);
		return ret;
	}

	public void set_to_self_delay(number val) {
		bindings.AcceptChannel_set_to_self_delay(this.ptr, val);
	}

	public number get_max_accepted_htlcs() {
		number ret = bindings.AcceptChannel_get_max_accepted_htlcs(this.ptr);
		return ret;
	}

	public void set_max_accepted_htlcs(number val) {
		bindings.AcceptChannel_set_max_accepted_htlcs(this.ptr, val);
	}

	public Uint8Array get_funding_pubkey() {
		Uint8Array ret = bindings.AcceptChannel_get_funding_pubkey(this.ptr);
		return ret;
	}

	public void set_funding_pubkey(Uint8Array val) {
		bindings.AcceptChannel_set_funding_pubkey(this.ptr, val);
	}

	public Uint8Array get_revocation_basepoint() {
		Uint8Array ret = bindings.AcceptChannel_get_revocation_basepoint(this.ptr);
		return ret;
	}

	public void set_revocation_basepoint(Uint8Array val) {
		bindings.AcceptChannel_set_revocation_basepoint(this.ptr, val);
	}

	public Uint8Array get_payment_point() {
		Uint8Array ret = bindings.AcceptChannel_get_payment_point(this.ptr);
		return ret;
	}

	public void set_payment_point(Uint8Array val) {
		bindings.AcceptChannel_set_payment_point(this.ptr, val);
	}

	public Uint8Array get_delayed_payment_basepoint() {
		Uint8Array ret = bindings.AcceptChannel_get_delayed_payment_basepoint(this.ptr);
		return ret;
	}

	public void set_delayed_payment_basepoint(Uint8Array val) {
		bindings.AcceptChannel_set_delayed_payment_basepoint(this.ptr, val);
	}

	public Uint8Array get_htlc_basepoint() {
		Uint8Array ret = bindings.AcceptChannel_get_htlc_basepoint(this.ptr);
		return ret;
	}

	public void set_htlc_basepoint(Uint8Array val) {
		bindings.AcceptChannel_set_htlc_basepoint(this.ptr, val);
	}

	public Uint8Array get_first_per_commitment_point() {
		Uint8Array ret = bindings.AcceptChannel_get_first_per_commitment_point(this.ptr);
		return ret;
	}

	public void set_first_per_commitment_point(Uint8Array val) {
		bindings.AcceptChannel_set_first_per_commitment_point(this.ptr, val);
	}

	public AcceptChannel clone() {
		number ret = bindings.AcceptChannel_clone(this.ptr);
		const ret_hu_conv: AcceptChannel = new AcceptChannel(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.AcceptChannel_write(this.ptr);
		return ret;
	}

	public static Result_AcceptChannelDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.AcceptChannel_read(ser);
		Result_AcceptChannelDecodeErrorZ ret_hu_conv = Result_AcceptChannelDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
