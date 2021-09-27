
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class C2Tuple_u32TxOutZ extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.C2Tuple_u32TxOutZ_free(this.ptr);
                    }
                }
	public number get_a() {
		number ret = bindings.C2Tuple_u32TxOutZ_get_a(this.ptr);
		return ret;
	}

	public TxOut get_b() {
		number ret = bindings.C2Tuple_u32TxOutZ_get_b(this.ptr);
		TxOut ret_conv = new TxOut(null, ret);
		return ret_conv;
	}

	public TwoTuple_u32TxOutZ clone() {
		number ret = bindings.C2Tuple_u32TxOutZ_clone(this.ptr);
		TwoTuple_u32TxOutZ ret_hu_conv = new TwoTuple_u32TxOutZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static TwoTuple_u32TxOutZ constructor_new(number a, TxOut b) {
		number ret = bindings.C2Tuple_u32TxOutZ_new(a, b.ptr);
		TwoTuple_u32TxOutZ ret_hu_conv = new TwoTuple_u32TxOutZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
