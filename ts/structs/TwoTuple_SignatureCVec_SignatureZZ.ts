
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class C2Tuple_SignatureCVec_SignatureZZ extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.C2Tuple_SignatureCVec_SignatureZZ_free(this.ptr);
                    }
                }
	public Uint8Array get_a() {
		Uint8Array ret = bindings.C2Tuple_SignatureCVec_SignatureZZ_get_a(this.ptr);
		return ret;
	}

	public Uint8Array[] get_b() {
		Uint8Array[] ret = bindings.C2Tuple_SignatureCVec_SignatureZZ_get_b(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.C2Tuple_SignatureCVec_SignatureZZ_clone_ptr(this.ptr);
		return ret;
	}

	public TwoTuple_SignatureCVec_SignatureZZ clone() {
		number ret = bindings.C2Tuple_SignatureCVec_SignatureZZ_clone(this.ptr);
		TwoTuple_SignatureCVec_SignatureZZ ret_hu_conv = new TwoTuple_SignatureCVec_SignatureZZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static TwoTuple_SignatureCVec_SignatureZZ constructor_new(Uint8Array a, Uint8Array[] b) {
		number ret = bindings.C2Tuple_SignatureCVec_SignatureZZ_new(InternalUtils.check_arr_len(a, 64), b != null ? Arrays.stream(b).map(b_conv_12 -> InternalUtils.check_arr_len(b_conv_12, 64)).toArray(Uint8Array[]::new) : null);
		TwoTuple_SignatureCVec_SignatureZZ ret_hu_conv = new TwoTuple_SignatureCVec_SignatureZZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
