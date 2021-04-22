
            
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
	public InvoiceSignature clone() {
		number ret = bindings.InvoiceSignature_clone(this.ptr);
		const ret_hu_conv: InvoiceSignature = new InvoiceSignature(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
