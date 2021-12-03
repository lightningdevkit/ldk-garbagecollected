
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class C2Tuple_PublicKeyTypeZ extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.C2Tuple_PublicKeyTypeZ_free(this.ptr);
                    }
                }
	public Uint8Array get_a() {
		Uint8Array ret = bindings.C2Tuple_PublicKeyTypeZ_get_a(this.ptr);
		return ret;
	}

	public Type get_b() {
		number ret = bindings.C2Tuple_PublicKeyTypeZ_get_b(this.ptr);
		Type ret_hu_conv = new Type(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.C2Tuple_PublicKeyTypeZ_clone_ptr(this.ptr);
		return ret;
	}

	public TwoTuple_PublicKeyTypeZ clone() {
		number ret = bindings.C2Tuple_PublicKeyTypeZ_clone(this.ptr);
		TwoTuple_PublicKeyTypeZ ret_hu_conv = new TwoTuple_PublicKeyTypeZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static TwoTuple_PublicKeyTypeZ constructor_new(Uint8Array a, Type b) {
		number ret = bindings.C2Tuple_PublicKeyTypeZ_new(InternalUtils.check_arr_len(a, 33), b == null ? 0 : b.ptr);
		TwoTuple_PublicKeyTypeZ ret_hu_conv = new TwoTuple_PublicKeyTypeZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(b);
		return ret_hu_conv;
	}

}
