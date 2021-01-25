
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ChannelUpdate extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ChannelUpdate_free(this.ptr);
                    }
                }
	public ChannelUpdate clone() {
		number ret = bindings.ChannelUpdate_clone(this.ptr);
		const ret_hu_conv: ChannelUpdate = new ChannelUpdate(null, ret);
		return ret_hu_conv;
	}

	public Uint8Array get_signature() {
		Uint8Array ret = bindings.ChannelUpdate_get_signature(this.ptr);
		return ret;
	}

	public void set_signature(Uint8Array val) {
		bindings.ChannelUpdate_set_signature(this.ptr, val);
	}

	public UnsignedChannelUpdate get_contents() {
		number ret = bindings.ChannelUpdate_get_contents(this.ptr);
		const ret_hu_conv: UnsignedChannelUpdate = new UnsignedChannelUpdate(null, ret);
		return ret_hu_conv;
	}

	public void set_contents(UnsignedChannelUpdate val) {
		bindings.ChannelUpdate_set_contents(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public static ChannelUpdate constructor_new(Uint8Array signature_arg, UnsignedChannelUpdate contents_arg) {
		number ret = bindings.ChannelUpdate_new(signature_arg, contents_arg == null ? 0 : contents_arg.ptr & ~1);
		const ret_hu_conv: ChannelUpdate = new ChannelUpdate(null, ret);
		ret_hu_conv.ptrs_to.add(contents_arg);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.ChannelUpdate_write(this.ptr);
		return ret;
	}

	public static ChannelUpdate constructor_read(Uint8Array ser) {
		number ret = bindings.ChannelUpdate_read(ser);
		const ret_hu_conv: ChannelUpdate = new ChannelUpdate(null, ret);
		return ret_hu_conv;
	}

}
