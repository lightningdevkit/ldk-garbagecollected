
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ChannelDetails extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ChannelDetails_free(this.ptr);
                    }
                }
	public Uint8Array get_channel_id() {
		Uint8Array ret = bindings.ChannelDetails_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(Uint8Array val) {
		bindings.ChannelDetails_set_channel_id(this.ptr, val);
	}

	public OutPoint get_funding_txo() {
		number ret = bindings.ChannelDetails_get_funding_txo(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_funding_txo(OutPoint val) {
		bindings.ChannelDetails_set_funding_txo(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public Option_u64Z get_short_channel_id() {
		number ret = bindings.ChannelDetails_get_short_channel_id(this.ptr);
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_short_channel_id(Option_u64Z val) {
		bindings.ChannelDetails_set_short_channel_id(this.ptr, val.ptr);
	}

	public Uint8Array get_remote_network_id() {
		Uint8Array ret = bindings.ChannelDetails_get_remote_network_id(this.ptr);
		return ret;
	}

	public void set_remote_network_id(Uint8Array val) {
		bindings.ChannelDetails_set_remote_network_id(this.ptr, val);
	}

	public InitFeatures get_counterparty_features() {
		number ret = bindings.ChannelDetails_get_counterparty_features(this.ptr);
		const ret_hu_conv: InitFeatures = new InitFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_counterparty_features(InitFeatures val) {
		bindings.ChannelDetails_set_counterparty_features(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public number get_channel_value_satoshis() {
		number ret = bindings.ChannelDetails_get_channel_value_satoshis(this.ptr);
		return ret;
	}

	public void set_channel_value_satoshis(number val) {
		bindings.ChannelDetails_set_channel_value_satoshis(this.ptr, val);
	}

	public number get_user_id() {
		number ret = bindings.ChannelDetails_get_user_id(this.ptr);
		return ret;
	}

	public void set_user_id(number val) {
		bindings.ChannelDetails_set_user_id(this.ptr, val);
	}

	public number get_outbound_capacity_msat() {
		number ret = bindings.ChannelDetails_get_outbound_capacity_msat(this.ptr);
		return ret;
	}

	public void set_outbound_capacity_msat(number val) {
		bindings.ChannelDetails_set_outbound_capacity_msat(this.ptr, val);
	}

	public number get_inbound_capacity_msat() {
		number ret = bindings.ChannelDetails_get_inbound_capacity_msat(this.ptr);
		return ret;
	}

	public void set_inbound_capacity_msat(number val) {
		bindings.ChannelDetails_set_inbound_capacity_msat(this.ptr, val);
	}

	public boolean get_is_outbound() {
		boolean ret = bindings.ChannelDetails_get_is_outbound(this.ptr);
		return ret;
	}

	public void set_is_outbound(boolean val) {
		bindings.ChannelDetails_set_is_outbound(this.ptr, val);
	}

	public boolean get_is_funding_locked() {
		boolean ret = bindings.ChannelDetails_get_is_funding_locked(this.ptr);
		return ret;
	}

	public void set_is_funding_locked(boolean val) {
		bindings.ChannelDetails_set_is_funding_locked(this.ptr, val);
	}

	public boolean get_is_usable() {
		boolean ret = bindings.ChannelDetails_get_is_usable(this.ptr);
		return ret;
	}

	public void set_is_usable(boolean val) {
		bindings.ChannelDetails_set_is_usable(this.ptr, val);
	}

	public boolean get_is_public() {
		boolean ret = bindings.ChannelDetails_get_is_public(this.ptr);
		return ret;
	}

	public void set_is_public(boolean val) {
		bindings.ChannelDetails_set_is_public(this.ptr, val);
	}

	public ChannelDetails clone() {
		number ret = bindings.ChannelDetails_clone(this.ptr);
		const ret_hu_conv: ChannelDetails = new ChannelDetails(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
