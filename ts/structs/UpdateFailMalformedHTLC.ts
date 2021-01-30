
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class UpdateFailMalformedHTLC extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.UpdateFailMalformedHTLC_free(this.ptr);
                    }
                }
	public UpdateFailMalformedHTLC clone() {
		number ret = bindings.UpdateFailMalformedHTLC_clone(this.ptr);
		const ret_hu_conv: UpdateFailMalformedHTLC = new UpdateFailMalformedHTLC(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array get_channel_id() {
		Uint8Array ret = bindings.UpdateFailMalformedHTLC_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(Uint8Array val) {
		bindings.UpdateFailMalformedHTLC_set_channel_id(this.ptr, val);
	}

	public number get_htlc_id() {
		number ret = bindings.UpdateFailMalformedHTLC_get_htlc_id(this.ptr);
		return ret;
	}

	public void set_htlc_id(number val) {
		bindings.UpdateFailMalformedHTLC_set_htlc_id(this.ptr, val);
	}

	public number get_failure_code() {
		number ret = bindings.UpdateFailMalformedHTLC_get_failure_code(this.ptr);
		return ret;
	}

	public void set_failure_code(number val) {
		bindings.UpdateFailMalformedHTLC_set_failure_code(this.ptr, val);
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.UpdateFailMalformedHTLC_write(this.ptr);
		return ret;
	}

	public static UpdateFailMalformedHTLC constructor_read(Uint8Array ser) {
		number ret = bindings.UpdateFailMalformedHTLC_read(ser);
		const ret_hu_conv: UpdateFailMalformedHTLC = new UpdateFailMalformedHTLC(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
