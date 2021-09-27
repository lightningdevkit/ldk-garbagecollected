
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class C2Tuple_usizeTransactionZ extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.C2Tuple_usizeTransactionZ_free(this.ptr);
                    }
                }
	public number get_a() {
		number ret = bindings.C2Tuple_usizeTransactionZ_get_a(this.ptr);
		return ret;
	}

	public Uint8Array get_b() {
		Uint8Array ret = bindings.C2Tuple_usizeTransactionZ_get_b(this.ptr);
		return ret;
	}

	public TwoTuple_usizeTransactionZ clone() {
		number ret = bindings.C2Tuple_usizeTransactionZ_clone(this.ptr);
		TwoTuple_usizeTransactionZ ret_hu_conv = new TwoTuple_usizeTransactionZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static TwoTuple_usizeTransactionZ constructor_new(number a, Uint8Array b) {
		number ret = bindings.C2Tuple_usizeTransactionZ_new(a, b);
		TwoTuple_usizeTransactionZ ret_hu_conv = new TwoTuple_usizeTransactionZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
