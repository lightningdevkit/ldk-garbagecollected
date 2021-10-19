
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class PaymentId extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.PaymentId_free(this.ptr);
                    }
                }
	public number hash() {
		number ret = bindings.PaymentId_hash(this.ptr);
		return ret;
	}

	public PaymentId clone() {
		number ret = bindings.PaymentId_clone(this.ptr);
		const ret_hu_conv: PaymentId = new PaymentId(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public boolean eq(PaymentId b) {
		boolean ret = bindings.PaymentId_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.PaymentId_write(this.ptr);
		return ret;
	}

	public static Result_PaymentIdDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.PaymentId_read(ser);
		Result_PaymentIdDecodeErrorZ ret_hu_conv = Result_PaymentIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
