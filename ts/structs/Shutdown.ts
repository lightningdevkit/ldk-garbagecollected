
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class Shutdown extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.Shutdown_free(this.ptr);
                    }
                }
	public Shutdown clone() {
		number ret = bindings.Shutdown_clone(this.ptr);
		const ret_hu_conv: Shutdown = new Shutdown(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array get_channel_id() {
		Uint8Array ret = bindings.Shutdown_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(Uint8Array val) {
		bindings.Shutdown_set_channel_id(this.ptr, val);
	}

	public Uint8Array get_scriptpubkey() {
		Uint8Array ret = bindings.Shutdown_get_scriptpubkey(this.ptr);
		return ret;
	}

	public void set_scriptpubkey(Uint8Array val) {
		bindings.Shutdown_set_scriptpubkey(this.ptr, val);
	}

	public static Shutdown constructor_new(Uint8Array channel_id_arg, Uint8Array scriptpubkey_arg) {
		number ret = bindings.Shutdown_new(channel_id_arg, scriptpubkey_arg);
		const ret_hu_conv: Shutdown = new Shutdown(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.Shutdown_write(this.ptr);
		return ret;
	}

	public static Shutdown constructor_read(Uint8Array ser) {
		number ret = bindings.Shutdown_read(ser);
		const ret_hu_conv: Shutdown = new Shutdown(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
