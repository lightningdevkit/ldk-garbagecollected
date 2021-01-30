
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ChannelMonitorUpdate extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ChannelMonitorUpdate_free(this.ptr);
                    }
                }
	public ChannelMonitorUpdate clone() {
		number ret = bindings.ChannelMonitorUpdate_clone(this.ptr);
		const ret_hu_conv: ChannelMonitorUpdate = new ChannelMonitorUpdate(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public number get_update_id() {
		number ret = bindings.ChannelMonitorUpdate_get_update_id(this.ptr);
		return ret;
	}

	public void set_update_id(number val) {
		bindings.ChannelMonitorUpdate_set_update_id(this.ptr, val);
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.ChannelMonitorUpdate_write(this.ptr);
		return ret;
	}

	public static Result_ChannelMonitorUpdateDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.ChannelMonitorUpdate_read(ser);
		Result_ChannelMonitorUpdateDecodeErrorZ ret_hu_conv = Result_ChannelMonitorUpdateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
