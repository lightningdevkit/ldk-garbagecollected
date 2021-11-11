
            
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
	public Uint8Array get_channel_id() {
		Uint8Array ret = bindings.UpdateFee_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(Uint8Array val) {
		bindings.UpdateFee_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
	}

	public number get_feerate_per_kw() {
		number ret = bindings.UpdateFee_get_feerate_per_kw(this.ptr);
		return ret;
	}

	public void set_feerate_per_kw(number val) {
		bindings.UpdateFee_set_feerate_per_kw(this.ptr, val);
	}

	public static UpdateFee constructor_new(Uint8Array channel_id_arg, number feerate_per_kw_arg) {
		number ret = bindings.UpdateFee_new(InternalUtils.check_arr_len(channel_id_arg, 32), feerate_per_kw_arg);
		const ret_hu_conv: UpdateFee = new UpdateFee(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.UpdateFee_clone_ptr(this.ptr);
		return ret;
	}

	public UpdateFee clone() {
		number ret = bindings.UpdateFee_clone(this.ptr);
		const ret_hu_conv: UpdateFee = new UpdateFee(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.UpdateFee_write(this.ptr);
		return ret;
	}

	public static Result_UpdateFeeDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.UpdateFee_read(ser);
		Result_UpdateFeeDecodeErrorZ ret_hu_conv = Result_UpdateFeeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
