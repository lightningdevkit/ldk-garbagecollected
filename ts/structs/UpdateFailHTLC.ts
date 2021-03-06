
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class UpdateFailHTLC extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.UpdateFailHTLC_free(this.ptr);
                    }
                }
	public Uint8Array get_channel_id() {
		Uint8Array ret = bindings.UpdateFailHTLC_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(Uint8Array val) {
		bindings.UpdateFailHTLC_set_channel_id(this.ptr, val);
	}

	public number get_htlc_id() {
		number ret = bindings.UpdateFailHTLC_get_htlc_id(this.ptr);
		return ret;
	}

	public void set_htlc_id(number val) {
		bindings.UpdateFailHTLC_set_htlc_id(this.ptr, val);
	}

	public UpdateFailHTLC clone() {
		number ret = bindings.UpdateFailHTLC_clone(this.ptr);
		const ret_hu_conv: UpdateFailHTLC = new UpdateFailHTLC(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.UpdateFailHTLC_write(this.ptr);
		return ret;
	}

	public static Result_UpdateFailHTLCDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.UpdateFailHTLC_read(ser);
		Result_UpdateFailHTLCDecodeErrorZ ret_hu_conv = Result_UpdateFailHTLCDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
