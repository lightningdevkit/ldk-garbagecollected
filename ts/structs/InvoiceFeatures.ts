
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class InvoiceFeatures extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.InvoiceFeatures_free(this.ptr);
                    }
                }
	public InvoiceFeatures clone() {
		number ret = bindings.InvoiceFeatures_clone(this.ptr);
		const ret_hu_conv: InvoiceFeatures = new InvoiceFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static InvoiceFeatures constructor_empty() {
		number ret = bindings.InvoiceFeatures_empty();
		const ret_hu_conv: InvoiceFeatures = new InvoiceFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static InvoiceFeatures constructor_known() {
		number ret = bindings.InvoiceFeatures_known();
		const ret_hu_conv: InvoiceFeatures = new InvoiceFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.InvoiceFeatures_write(this.ptr);
		return ret;
	}

	public static Result_InvoiceFeaturesDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.InvoiceFeatures_read(ser);
		Result_InvoiceFeaturesDecodeErrorZ ret_hu_conv = Result_InvoiceFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
