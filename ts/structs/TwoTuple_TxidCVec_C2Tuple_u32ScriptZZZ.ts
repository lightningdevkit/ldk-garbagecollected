
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_free(this.ptr);
                    }
                }
	public Uint8Array get_a() {
		Uint8Array ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_get_a(this.ptr);
		return ret;
	}

	public TwoTuple_u32ScriptZ[] get_b() {
		number[] ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_get_b(this.ptr);
		TwoTuple_u32ScriptZ[] ret_conv_21_arr = new TwoTuple_u32ScriptZ[ret.length];
		for (int v = 0; v < ret.length; v++) {
			number ret_conv_21 = ret[v];
			TwoTuple_u32ScriptZ ret_conv_21_hu_conv = new TwoTuple_u32ScriptZ(null, ret_conv_21);
			ret_conv_21_hu_conv.ptrs_to.add(this);
			ret_conv_21_arr[v] = ret_conv_21_hu_conv;
		}
		return ret_conv_21_arr;
	}

	public TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ clone() {
		number ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_clone(this.ptr);
		TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ ret_hu_conv = new TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ constructor_new(Uint8Array a, TwoTuple_u32ScriptZ[] b) {
		number ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_new(a, b != null ? Arrays.stream(b).map(b_conv_21 -> b_conv_21 != null ? b_conv_21.ptr : 0).toArray(number[]::new) : null);
		TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ ret_hu_conv = new TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
