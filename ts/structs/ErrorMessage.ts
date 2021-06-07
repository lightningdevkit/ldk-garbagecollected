
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ErrorMessage extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ErrorMessage_free(this.ptr);
                    }
                }
	public Uint8Array get_channel_id() {
		Uint8Array ret = bindings.ErrorMessage_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(Uint8Array val) {
		bindings.ErrorMessage_set_channel_id(this.ptr, val);
	}

	public String get_data() {
		String ret = bindings.ErrorMessage_get_data(this.ptr);
		return ret;
	}

	public void set_data(String val) {
		bindings.ErrorMessage_set_data(this.ptr, val);
	}

	public static ErrorMessage constructor_new(Uint8Array channel_id_arg, String data_arg) {
		number ret = bindings.ErrorMessage_new(channel_id_arg, data_arg);
		const ret_hu_conv: ErrorMessage = new ErrorMessage(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public ErrorMessage clone() {
		number ret = bindings.ErrorMessage_clone(this.ptr);
		const ret_hu_conv: ErrorMessage = new ErrorMessage(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.ErrorMessage_write(this.ptr);
		return ret;
	}

	public static Result_ErrorMessageDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.ErrorMessage_read(ser);
		Result_ErrorMessageDecodeErrorZ ret_hu_conv = Result_ErrorMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
