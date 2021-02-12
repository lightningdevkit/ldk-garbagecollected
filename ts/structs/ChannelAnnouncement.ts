
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ChannelAnnouncement extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ChannelAnnouncement_free(this.ptr);
                    }
                }
	public Uint8Array get_node_signature_1() {
		Uint8Array ret = bindings.ChannelAnnouncement_get_node_signature_1(this.ptr);
		return ret;
	}

	public void set_node_signature_1(Uint8Array val) {
		bindings.ChannelAnnouncement_set_node_signature_1(this.ptr, val);
	}

	public Uint8Array get_node_signature_2() {
		Uint8Array ret = bindings.ChannelAnnouncement_get_node_signature_2(this.ptr);
		return ret;
	}

	public void set_node_signature_2(Uint8Array val) {
		bindings.ChannelAnnouncement_set_node_signature_2(this.ptr, val);
	}

	public Uint8Array get_bitcoin_signature_1() {
		Uint8Array ret = bindings.ChannelAnnouncement_get_bitcoin_signature_1(this.ptr);
		return ret;
	}

	public void set_bitcoin_signature_1(Uint8Array val) {
		bindings.ChannelAnnouncement_set_bitcoin_signature_1(this.ptr, val);
	}

	public Uint8Array get_bitcoin_signature_2() {
		Uint8Array ret = bindings.ChannelAnnouncement_get_bitcoin_signature_2(this.ptr);
		return ret;
	}

	public void set_bitcoin_signature_2(Uint8Array val) {
		bindings.ChannelAnnouncement_set_bitcoin_signature_2(this.ptr, val);
	}

	public UnsignedChannelAnnouncement get_contents() {
		number ret = bindings.ChannelAnnouncement_get_contents(this.ptr);
		const ret_hu_conv: UnsignedChannelAnnouncement = new UnsignedChannelAnnouncement(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_contents(UnsignedChannelAnnouncement val) {
		bindings.ChannelAnnouncement_set_contents(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public static ChannelAnnouncement constructor_new(Uint8Array node_signature_1_arg, Uint8Array node_signature_2_arg, Uint8Array bitcoin_signature_1_arg, Uint8Array bitcoin_signature_2_arg, UnsignedChannelAnnouncement contents_arg) {
		number ret = bindings.ChannelAnnouncement_new(node_signature_1_arg, node_signature_2_arg, bitcoin_signature_1_arg, bitcoin_signature_2_arg, contents_arg == null ? 0 : contents_arg.ptr & ~1);
		const ret_hu_conv: ChannelAnnouncement = new ChannelAnnouncement(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(contents_arg);
		return ret_hu_conv;
	}

	public ChannelAnnouncement clone() {
		number ret = bindings.ChannelAnnouncement_clone(this.ptr);
		const ret_hu_conv: ChannelAnnouncement = new ChannelAnnouncement(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.ChannelAnnouncement_write(this.ptr);
		return ret;
	}

	public static Result_ChannelAnnouncementDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.ChannelAnnouncement_read(ser);
		Result_ChannelAnnouncementDecodeErrorZ ret_hu_conv = Result_ChannelAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
