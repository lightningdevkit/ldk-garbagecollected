
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class InitFeatures extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.InitFeatures_free(this.ptr);
                    }
                }
	public boolean eq(InitFeatures b) {
		boolean ret = bindings.InitFeatures_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	public InitFeatures clone() {
		number ret = bindings.InitFeatures_clone(this.ptr);
		const ret_hu_conv: InitFeatures = new InitFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static InitFeatures constructor_empty() {
		number ret = bindings.InitFeatures_empty();
		const ret_hu_conv: InitFeatures = new InitFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static InitFeatures constructor_known() {
		number ret = bindings.InitFeatures_known();
		const ret_hu_conv: InitFeatures = new InitFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public boolean supports_payment_secret() {
		boolean ret = bindings.InitFeatures_supports_payment_secret(this.ptr);
		return ret;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.InitFeatures_write(this.ptr);
		return ret;
	}

	public static Result_InitFeaturesDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.InitFeatures_read(ser);
		Result_InitFeaturesDecodeErrorZ ret_hu_conv = Result_InitFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
