
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class Ping extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.Ping_free(this.ptr);
                    }
                }
	public Ping clone() {
		number ret = bindings.Ping_clone(this.ptr);
		const ret_hu_conv: Ping = new Ping(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public number get_ponglen() {
		number ret = bindings.Ping_get_ponglen(this.ptr);
		return ret;
	}

	public void set_ponglen(number val) {
		bindings.Ping_set_ponglen(this.ptr, val);
	}

	public number get_byteslen() {
		number ret = bindings.Ping_get_byteslen(this.ptr);
		return ret;
	}

	public void set_byteslen(number val) {
		bindings.Ping_set_byteslen(this.ptr, val);
	}

	public static Ping constructor_new(number ponglen_arg, number byteslen_arg) {
		number ret = bindings.Ping_new(ponglen_arg, byteslen_arg);
		const ret_hu_conv: Ping = new Ping(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.Ping_write(this.ptr);
		return ret;
	}

	public static Result_PingDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.Ping_read(ser);
		Result_PingDecodeErrorZ ret_hu_conv = Result_PingDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
