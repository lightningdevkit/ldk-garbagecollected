
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class UnsignedChannelUpdate extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.UnsignedChannelUpdate_free(this.ptr);
                    }
                }
	public Uint8Array get_chain_hash() {
		Uint8Array ret = bindings.UnsignedChannelUpdate_get_chain_hash(this.ptr);
		return ret;
	}

	public void set_chain_hash(Uint8Array val) {
		bindings.UnsignedChannelUpdate_set_chain_hash(this.ptr, InternalUtils.check_arr_len(val, 32));
	}

	public number get_short_channel_id() {
		number ret = bindings.UnsignedChannelUpdate_get_short_channel_id(this.ptr);
		return ret;
	}

	public void set_short_channel_id(number val) {
		bindings.UnsignedChannelUpdate_set_short_channel_id(this.ptr, val);
	}

	public number get_timestamp() {
		number ret = bindings.UnsignedChannelUpdate_get_timestamp(this.ptr);
		return ret;
	}

	public void set_timestamp(number val) {
		bindings.UnsignedChannelUpdate_set_timestamp(this.ptr, val);
	}

	public number get_flags() {
		number ret = bindings.UnsignedChannelUpdate_get_flags(this.ptr);
		return ret;
	}

	public void set_flags(number val) {
		bindings.UnsignedChannelUpdate_set_flags(this.ptr, val);
	}

	public number get_cltv_expiry_delta() {
		number ret = bindings.UnsignedChannelUpdate_get_cltv_expiry_delta(this.ptr);
		return ret;
	}

	public void set_cltv_expiry_delta(number val) {
		bindings.UnsignedChannelUpdate_set_cltv_expiry_delta(this.ptr, val);
	}

	public number get_htlc_minimum_msat() {
		number ret = bindings.UnsignedChannelUpdate_get_htlc_minimum_msat(this.ptr);
		return ret;
	}

	public void set_htlc_minimum_msat(number val) {
		bindings.UnsignedChannelUpdate_set_htlc_minimum_msat(this.ptr, val);
	}

	public number get_fee_base_msat() {
		number ret = bindings.UnsignedChannelUpdate_get_fee_base_msat(this.ptr);
		return ret;
	}

	public void set_fee_base_msat(number val) {
		bindings.UnsignedChannelUpdate_set_fee_base_msat(this.ptr, val);
	}

	public number get_fee_proportional_millionths() {
		number ret = bindings.UnsignedChannelUpdate_get_fee_proportional_millionths(this.ptr);
		return ret;
	}

	public void set_fee_proportional_millionths(number val) {
		bindings.UnsignedChannelUpdate_set_fee_proportional_millionths(this.ptr, val);
	}

	public number clone_ptr() {
		number ret = bindings.UnsignedChannelUpdate_clone_ptr(this.ptr);
		return ret;
	}

	public UnsignedChannelUpdate clone() {
		number ret = bindings.UnsignedChannelUpdate_clone(this.ptr);
		const ret_hu_conv: UnsignedChannelUpdate = new UnsignedChannelUpdate(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.UnsignedChannelUpdate_write(this.ptr);
		return ret;
	}

	public static Result_UnsignedChannelUpdateDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.UnsignedChannelUpdate_read(ser);
		Result_UnsignedChannelUpdateDecodeErrorZ ret_hu_conv = Result_UnsignedChannelUpdateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
