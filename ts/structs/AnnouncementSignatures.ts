
            
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
	public Uint8Array get_channel_id() {
		Uint8Array ret = bindings.AnnouncementSignatures_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(Uint8Array val) {
		bindings.AnnouncementSignatures_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
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
		bindings.AnnouncementSignatures_set_node_signature(this.ptr, InternalUtils.check_arr_len(val, 64));
	}

	public Uint8Array get_bitcoin_signature() {
		Uint8Array ret = bindings.AnnouncementSignatures_get_bitcoin_signature(this.ptr);
		return ret;
	}

	public void set_bitcoin_signature(Uint8Array val) {
		bindings.AnnouncementSignatures_set_bitcoin_signature(this.ptr, InternalUtils.check_arr_len(val, 64));
	}

	public static AnnouncementSignatures constructor_new(Uint8Array channel_id_arg, number short_channel_id_arg, Uint8Array node_signature_arg, Uint8Array bitcoin_signature_arg) {
		number ret = bindings.AnnouncementSignatures_new(InternalUtils.check_arr_len(channel_id_arg, 32), short_channel_id_arg, InternalUtils.check_arr_len(node_signature_arg, 64), InternalUtils.check_arr_len(bitcoin_signature_arg, 64));
		const ret_hu_conv: AnnouncementSignatures = new AnnouncementSignatures(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.AnnouncementSignatures_clone_ptr(this.ptr);
		return ret;
	}

	public AnnouncementSignatures clone() {
		number ret = bindings.AnnouncementSignatures_clone(this.ptr);
		const ret_hu_conv: AnnouncementSignatures = new AnnouncementSignatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.AnnouncementSignatures_write(this.ptr);
		return ret;
	}

	public static Result_AnnouncementSignaturesDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.AnnouncementSignatures_read(ser);
		Result_AnnouncementSignaturesDecodeErrorZ ret_hu_conv = Result_AnnouncementSignaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
