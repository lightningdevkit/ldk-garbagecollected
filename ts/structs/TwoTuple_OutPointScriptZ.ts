
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class C2Tuple_OutPointScriptZ extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.C2Tuple_OutPointScriptZ_free(this.ptr);
                    }
                }
	public OutPoint get_a() {
		number ret = bindings.C2Tuple_OutPointScriptZ_get_a(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array get_b() {
		Uint8Array ret = bindings.C2Tuple_OutPointScriptZ_get_b(this.ptr);
		return ret;
	}

	public TwoTuple_OutPointScriptZ clone() {
		number ret = bindings.C2Tuple_OutPointScriptZ_clone(this.ptr);
		TwoTuple_OutPointScriptZ ret_hu_conv = new TwoTuple_OutPointScriptZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static TwoTuple_OutPointScriptZ constructor_new(OutPoint a, Uint8Array b) {
		number ret = bindings.C2Tuple_OutPointScriptZ_new(a == null ? 0 : a.ptr & ~1, b);
		TwoTuple_OutPointScriptZ ret_hu_conv = new TwoTuple_OutPointScriptZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(a);
		return ret_hu_conv;
	}

}
