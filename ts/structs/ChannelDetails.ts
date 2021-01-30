
            
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
	public ChannelDetails clone() {
		number ret = bindings.ChannelDetails_clone(this.ptr);
		const ret_hu_conv: ChannelDetails = new ChannelDetails(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array get_channel_id() {
		Uint8Array ret = bindings.ChannelDetails_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(Uint8Array val) {
		bindings.ChannelDetails_set_channel_id(this.ptr, val);
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
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid this being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after this call, val is reset to null and is now a dummy object.
		val.ptr = 0;
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

	public boolean get_is_live() {
		boolean ret = bindings.ChannelDetails_get_is_live(this.ptr);
		return ret;
	}

	public void set_is_live(boolean val) {
		bindings.ChannelDetails_set_is_live(this.ptr, val);
	}

}
