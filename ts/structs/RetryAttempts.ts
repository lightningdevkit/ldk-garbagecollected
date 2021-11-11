
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class RetryAttempts extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.RetryAttempts_free(this.ptr);
                    }
                }
	public number get_a() {
		number ret = bindings.RetryAttempts_get_a(this.ptr);
		return ret;
	}

	public void set_a(number val) {
		bindings.RetryAttempts_set_a(this.ptr, val);
	}

	public static RetryAttempts constructor_new(number a_arg) {
		number ret = bindings.RetryAttempts_new(a_arg);
		const ret_hu_conv: RetryAttempts = new RetryAttempts(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.RetryAttempts_clone_ptr(this.ptr);
		return ret;
	}

	public RetryAttempts clone() {
		number ret = bindings.RetryAttempts_clone(this.ptr);
		const ret_hu_conv: RetryAttempts = new RetryAttempts(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public boolean eq(RetryAttempts b) {
		boolean ret = bindings.RetryAttempts_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	public number hash() {
		number ret = bindings.RetryAttempts_hash(this.ptr);
		return ret;
	}

}
