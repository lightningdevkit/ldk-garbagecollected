
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class InvoiceSignature extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.InvoiceSignature_free(this.ptr);
                    }
                }
	public number clone_ptr() {
		number ret = bindings.InvoiceSignature_clone_ptr(this.ptr);
		return ret;
	}

	public InvoiceSignature clone() {
		number ret = bindings.InvoiceSignature_clone(this.ptr);
		const ret_hu_conv: InvoiceSignature = new InvoiceSignature(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public boolean eq(InvoiceSignature b) {
		boolean ret = bindings.InvoiceSignature_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

}
