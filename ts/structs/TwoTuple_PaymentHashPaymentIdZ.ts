
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class C2Tuple_PaymentHashPaymentIdZ extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.C2Tuple_PaymentHashPaymentIdZ_free(this.ptr);
                    }
                }
	public Uint8Array get_a() {
		Uint8Array ret = bindings.C2Tuple_PaymentHashPaymentIdZ_get_a(this.ptr);
		return ret;
	}

	public Uint8Array get_b() {
		Uint8Array ret = bindings.C2Tuple_PaymentHashPaymentIdZ_get_b(this.ptr);
		return ret;
	}

	public TwoTuple_PaymentHashPaymentIdZ clone() {
		number ret = bindings.C2Tuple_PaymentHashPaymentIdZ_clone(this.ptr);
		TwoTuple_PaymentHashPaymentIdZ ret_hu_conv = new TwoTuple_PaymentHashPaymentIdZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static TwoTuple_PaymentHashPaymentIdZ constructor_new(Uint8Array a, Uint8Array b) {
		number ret = bindings.C2Tuple_PaymentHashPaymentIdZ_new(a, b);
		TwoTuple_PaymentHashPaymentIdZ ret_hu_conv = new TwoTuple_PaymentHashPaymentIdZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
