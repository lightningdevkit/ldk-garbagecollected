
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class AnnouncementSignatures extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.AnnouncementSignatures_free(this.ptr);
                    }
                }
	public AnnouncementSignatures clone() {
		number ret = bindings.AnnouncementSignatures_clone(this.ptr);
		const ret_hu_conv: AnnouncementSignatures = new AnnouncementSignatures(null, ret);
		return ret_hu_conv;
	}

	public Uint8Array get_channel_id() {
		Uint8Array ret = bindings.AnnouncementSignatures_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(Uint8Array val) {
		bindings.AnnouncementSignatures_set_channel_id(this.ptr, val);
	}

	public number get_short_channel_id() {
		number ret = bindings.AnnouncementSignatures_get_short_channel_id(this.ptr);
		return ret;
	}

	public void set_short_channel_id(number val) {
		bindings.AnnouncementSignatures_set_short_channel_id(this.ptr, val);
	}

	public Uint8Array get_node_signature() {
		Uint8Array ret = bindings.AnnouncementSignatures_get_node_signature(this.ptr);
		return ret;
	}

	public void set_node_signature(Uint8Array val) {
		bindings.AnnouncementSignatures_set_node_signature(this.ptr, val);
	}

	public Uint8Array get_bitcoin_signature() {
		Uint8Array ret = bindings.AnnouncementSignatures_get_bitcoin_signature(this.ptr);
		return ret;
	}

	public void set_bitcoin_signature(Uint8Array val) {
		bindings.AnnouncementSignatures_set_bitcoin_signature(this.ptr, val);
	}

	public static AnnouncementSignatures constructor_new(Uint8Array channel_id_arg, number short_channel_id_arg, Uint8Array node_signature_arg, Uint8Array bitcoin_signature_arg) {
		number ret = bindings.AnnouncementSignatures_new(channel_id_arg, short_channel_id_arg, node_signature_arg, bitcoin_signature_arg);
		const ret_hu_conv: AnnouncementSignatures = new AnnouncementSignatures(null, ret);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.AnnouncementSignatures_write(this.ptr);
		return ret;
	}

	public static AnnouncementSignatures constructor_read(Uint8Array ser) {
		number ret = bindings.AnnouncementSignatures_read(ser);
		const ret_hu_conv: AnnouncementSignatures = new AnnouncementSignatures(null, ret);
		return ret_hu_conv;
	}

}
