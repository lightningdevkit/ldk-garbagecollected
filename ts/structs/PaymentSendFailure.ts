
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class PaymentSendFailure extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.PaymentSendFailure_free(this.ptr);
                    }
                }
	public PaymentSendFailure clone() {
		number ret = bindings.PaymentSendFailure_clone(this.ptr);
		const ret_hu_conv: PaymentSendFailure = new PaymentSendFailure(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
