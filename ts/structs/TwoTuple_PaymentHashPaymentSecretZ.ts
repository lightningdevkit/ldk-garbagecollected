
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class C2Tuple_PaymentHashPaymentSecretZ extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.C2Tuple_PaymentHashPaymentSecretZ_free(this.ptr);
                    }
                }
	public Uint8Array get_a() {
		Uint8Array ret = bindings.C2Tuple_PaymentHashPaymentSecretZ_get_a(this.ptr);
		return ret;
	}

	public Uint8Array get_b() {
		Uint8Array ret = bindings.C2Tuple_PaymentHashPaymentSecretZ_get_b(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.C2Tuple_PaymentHashPaymentSecretZ_clone_ptr(this.ptr);
		return ret;
	}

	public TwoTuple_PaymentHashPaymentSecretZ clone() {
		number ret = bindings.C2Tuple_PaymentHashPaymentSecretZ_clone(this.ptr);
		TwoTuple_PaymentHashPaymentSecretZ ret_hu_conv = new TwoTuple_PaymentHashPaymentSecretZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static TwoTuple_PaymentHashPaymentSecretZ constructor_new(Uint8Array a, Uint8Array b) {
		number ret = bindings.C2Tuple_PaymentHashPaymentSecretZ_new(InternalUtils.check_arr_len(a, 32), InternalUtils.check_arr_len(b, 32));
		TwoTuple_PaymentHashPaymentSecretZ ret_hu_conv = new TwoTuple_PaymentHashPaymentSecretZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}