
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class MinFinalCltvExpiry extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.MinFinalCltvExpiry_free(this.ptr);
                    }
                }
	public number get_a() {
		number ret = bindings.MinFinalCltvExpiry_get_a(this.ptr);
		return ret;
	}

	public void set_a(number val) {
		bindings.MinFinalCltvExpiry_set_a(this.ptr, val);
	}

	public static MinFinalCltvExpiry constructor_new(number a_arg) {
		number ret = bindings.MinFinalCltvExpiry_new(a_arg);
		const ret_hu_conv: MinFinalCltvExpiry = new MinFinalCltvExpiry(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.MinFinalCltvExpiry_clone_ptr(this.ptr);
		return ret;
	}

	public MinFinalCltvExpiry clone() {
		number ret = bindings.MinFinalCltvExpiry_clone(this.ptr);
		const ret_hu_conv: MinFinalCltvExpiry = new MinFinalCltvExpiry(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public number hash() {
		number ret = bindings.MinFinalCltvExpiry_hash(this.ptr);
		return ret;
	}

	public boolean eq(MinFinalCltvExpiry b) {
		boolean ret = bindings.MinFinalCltvExpiry_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

}
