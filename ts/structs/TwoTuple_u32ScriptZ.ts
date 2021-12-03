
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class C2Tuple_u32ScriptZ extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.C2Tuple_u32ScriptZ_free(this.ptr);
                    }
                }
	public number get_a() {
		number ret = bindings.C2Tuple_u32ScriptZ_get_a(this.ptr);
		return ret;
	}

	public Uint8Array get_b() {
		Uint8Array ret = bindings.C2Tuple_u32ScriptZ_get_b(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.C2Tuple_u32ScriptZ_clone_ptr(this.ptr);
		return ret;
	}

	public TwoTuple_u32ScriptZ clone() {
		number ret = bindings.C2Tuple_u32ScriptZ_clone(this.ptr);
		TwoTuple_u32ScriptZ ret_hu_conv = new TwoTuple_u32ScriptZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static TwoTuple_u32ScriptZ constructor_new(number a, Uint8Array b) {
		number ret = bindings.C2Tuple_u32ScriptZ_new(a, b);
		TwoTuple_u32ScriptZ ret_hu_conv = new TwoTuple_u32ScriptZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
