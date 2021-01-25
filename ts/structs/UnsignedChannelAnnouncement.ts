
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class UnsignedChannelAnnouncement extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.UnsignedChannelAnnouncement_free(this.ptr);
                    }
                }
	public UnsignedChannelAnnouncement clone() {
		number ret = bindings.UnsignedChannelAnnouncement_clone(this.ptr);
		const ret_hu_conv: UnsignedChannelAnnouncement = new UnsignedChannelAnnouncement(null, ret);
		return ret_hu_conv;
	}

	public ChannelFeatures get_features() {
		number ret = bindings.UnsignedChannelAnnouncement_get_features(this.ptr);
		const ret_hu_conv: ChannelFeatures = new ChannelFeatures(null, ret);
		return ret_hu_conv;
	}

	public void set_features(ChannelFeatures val) {
		bindings.UnsignedChannelAnnouncement_set_features(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public Uint8Array get_chain_hash() {
		Uint8Array ret = bindings.UnsignedChannelAnnouncement_get_chain_hash(this.ptr);
		return ret;
	}

	public void set_chain_hash(Uint8Array val) {
		bindings.UnsignedChannelAnnouncement_set_chain_hash(this.ptr, val);
	}

	public number get_short_channel_id() {
		number ret = bindings.UnsignedChannelAnnouncement_get_short_channel_id(this.ptr);
		return ret;
	}

	public void set_short_channel_id(number val) {
		bindings.UnsignedChannelAnnouncement_set_short_channel_id(this.ptr, val);
	}

	public Uint8Array get_node_id_1() {
		Uint8Array ret = bindings.UnsignedChannelAnnouncement_get_node_id_1(this.ptr);
		return ret;
	}

	public void set_node_id_1(Uint8Array val) {
		bindings.UnsignedChannelAnnouncement_set_node_id_1(this.ptr, val);
	}

	public Uint8Array get_node_id_2() {
		Uint8Array ret = bindings.UnsignedChannelAnnouncement_get_node_id_2(this.ptr);
		return ret;
	}

	public void set_node_id_2(Uint8Array val) {
		bindings.UnsignedChannelAnnouncement_set_node_id_2(this.ptr, val);
	}

	public Uint8Array get_bitcoin_key_1() {
		Uint8Array ret = bindings.UnsignedChannelAnnouncement_get_bitcoin_key_1(this.ptr);
		return ret;
	}

	public void set_bitcoin_key_1(Uint8Array val) {
		bindings.UnsignedChannelAnnouncement_set_bitcoin_key_1(this.ptr, val);
	}

	public Uint8Array get_bitcoin_key_2() {
		Uint8Array ret = bindings.UnsignedChannelAnnouncement_get_bitcoin_key_2(this.ptr);
		return ret;
	}

	public void set_bitcoin_key_2(Uint8Array val) {
		bindings.UnsignedChannelAnnouncement_set_bitcoin_key_2(this.ptr, val);
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.UnsignedChannelAnnouncement_write(this.ptr);
		return ret;
	}

	public static Result_UnsignedChannelAnnouncementDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.UnsignedChannelAnnouncement_read(ser);
		Result_UnsignedChannelAnnouncementDecodeErrorZ ret_hu_conv = Result_UnsignedChannelAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
