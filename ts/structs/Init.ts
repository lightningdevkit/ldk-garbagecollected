
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class Init extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.Init_free(this.ptr);
                    }
                }
	public Init clone() {
		number ret = bindings.Init_clone(this.ptr);
		const ret_hu_conv: Init = new Init(null, ret);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.Init_write(this.ptr);
		return ret;
	}

	public static Result_InitDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.Init_read(ser);
		Result_InitDecodeErrorZ ret_hu_conv = Result_InitDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
