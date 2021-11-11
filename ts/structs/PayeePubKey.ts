
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class PayeePubKey extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.PayeePubKey_free(this.ptr);
                    }
                }
	public Uint8Array get_a() {
		Uint8Array ret = bindings.PayeePubKey_get_a(this.ptr);
		return ret;
	}

	public void set_a(Uint8Array val) {
		bindings.PayeePubKey_set_a(this.ptr, InternalUtils.check_arr_len(val, 33));
	}

	public static PayeePubKey constructor_new(Uint8Array a_arg) {
		number ret = bindings.PayeePubKey_new(InternalUtils.check_arr_len(a_arg, 33));
		const ret_hu_conv: PayeePubKey = new PayeePubKey(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.PayeePubKey_clone_ptr(this.ptr);
		return ret;
	}

	public PayeePubKey clone() {
		number ret = bindings.PayeePubKey_clone(this.ptr);
		const ret_hu_conv: PayeePubKey = new PayeePubKey(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public number hash() {
		number ret = bindings.PayeePubKey_hash(this.ptr);
		return ret;
	}

	public boolean eq(PayeePubKey b) {
		boolean ret = bindings.PayeePubKey_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

}
