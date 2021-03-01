
            
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
	public InitFeatures get_features() {
		number ret = bindings.Init_get_features(this.ptr);
		const ret_hu_conv: InitFeatures = new InitFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_features(InitFeatures val) {
		bindings.Init_set_features(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public static Init constructor_new(InitFeatures features_arg) {
		number ret = bindings.Init_new(features_arg == null ? 0 : features_arg.ptr & ~1);
		const ret_hu_conv: Init = new Init(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(features_arg);
		return ret_hu_conv;
	}

	public Init clone() {
		number ret = bindings.Init_clone(this.ptr);
		const ret_hu_conv: Init = new Init(null, ret);
		ret_hu_conv.ptrs_to.add(this);
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
