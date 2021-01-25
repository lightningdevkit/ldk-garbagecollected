
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class UpdateFee extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.UpdateFee_free(this.ptr);
                    }
                }
	public UpdateFee clone() {
		number ret = bindings.UpdateFee_clone(this.ptr);
		const ret_hu_conv: UpdateFee = new UpdateFee(null, ret);
		return ret_hu_conv;
	}

	public Uint8Array get_channel_id() {
		Uint8Array ret = bindings.UpdateFee_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(Uint8Array val) {
		bindings.UpdateFee_set_channel_id(this.ptr, val);
	}

	public number get_feerate_per_kw() {
		number ret = bindings.UpdateFee_get_feerate_per_kw(this.ptr);
		return ret;
	}

	public void set_feerate_per_kw(number val) {
		bindings.UpdateFee_set_feerate_per_kw(this.ptr, val);
	}

	public static UpdateFee constructor_new(Uint8Array channel_id_arg, number feerate_per_kw_arg) {
		number ret = bindings.UpdateFee_new(channel_id_arg, feerate_per_kw_arg);
		const ret_hu_conv: UpdateFee = new UpdateFee(null, ret);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.UpdateFee_write(this.ptr);
		return ret;
	}

	public static UpdateFee constructor_read(Uint8Array ser) {
		number ret = bindings.UpdateFee_read(ser);
		const ret_hu_conv: UpdateFee = new UpdateFee(null, ret);
		return ret_hu_conv;
	}

}
