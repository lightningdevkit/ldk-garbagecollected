
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_free(this.ptr);
                    }
                }
	public Uint8Array get_a() {
		Uint8Array ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_a(this.ptr);
		return ret;
	}

	public TwoTuple_u32TxOutZ[] get_b() {
		number[] ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_b(this.ptr);
		TwoTuple_u32TxOutZ[] ret_conv_20_arr = new TwoTuple_u32TxOutZ[ret.length];
		for (int u = 0; u < ret.length; u++) {
			number ret_conv_20 = ret[u];
			TwoTuple_u32TxOutZ ret_conv_20_hu_conv = new TwoTuple_u32TxOutZ(null, ret_conv_20);
			ret_conv_20_hu_conv.ptrs_to.add(this);
			ret_conv_20_arr[u] = ret_conv_20_hu_conv;
		}
		return ret_conv_20_arr;
	}

	public TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ clone() {
		number ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_clone(this.ptr);
		TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ ret_hu_conv = new TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ constructor_new(Uint8Array a, TwoTuple_u32TxOutZ[] b) {
		number ret = bindings.C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_new(a, b != null ? Arrays.stream(b).map(b_conv_20 -> b_conv_20 != null ? b_conv_20.ptr : 0).toArray(number[]::new) : null);
		TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ ret_hu_conv = new TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
