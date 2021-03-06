
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class Pong extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.Pong_free(this.ptr);
                    }
                }
	public number get_byteslen() {
		number ret = bindings.Pong_get_byteslen(this.ptr);
		return ret;
	}

	public void set_byteslen(number val) {
		bindings.Pong_set_byteslen(this.ptr, val);
	}

	public static Pong constructor_new(number byteslen_arg) {
		number ret = bindings.Pong_new(byteslen_arg);
		const ret_hu_conv: Pong = new Pong(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public Pong clone() {
		number ret = bindings.Pong_clone(this.ptr);
		const ret_hu_conv: Pong = new Pong(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.Pong_write(this.ptr);
		return ret;
	}

	public static Result_PongDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.Pong_read(ser);
		Result_PongDecodeErrorZ ret_hu_conv = Result_PongDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
