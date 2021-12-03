
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class C3Tuple_RawInvoice_u832InvoiceSignatureZ extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.C3Tuple_RawInvoice_u832InvoiceSignatureZ_free(this.ptr);
                    }
                }
	public RawInvoice get_a() {
		number ret = bindings.C3Tuple_RawInvoice_u832InvoiceSignatureZ_get_a(this.ptr);
		const ret_hu_conv: RawInvoice = new RawInvoice(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array get_b() {
		Uint8Array ret = bindings.C3Tuple_RawInvoice_u832InvoiceSignatureZ_get_b(this.ptr);
		return ret;
	}

	public InvoiceSignature get_c() {
		number ret = bindings.C3Tuple_RawInvoice_u832InvoiceSignatureZ_get_c(this.ptr);
		const ret_hu_conv: InvoiceSignature = new InvoiceSignature(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.C3Tuple_RawInvoice_u832InvoiceSignatureZ_clone_ptr(this.ptr);
		return ret;
	}

	public ThreeTuple_RawInvoice_u832InvoiceSignatureZ clone() {
		number ret = bindings.C3Tuple_RawInvoice_u832InvoiceSignatureZ_clone(this.ptr);
		ThreeTuple_RawInvoice_u832InvoiceSignatureZ ret_hu_conv = new ThreeTuple_RawInvoice_u832InvoiceSignatureZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static ThreeTuple_RawInvoice_u832InvoiceSignatureZ constructor_new(RawInvoice a, Uint8Array b, InvoiceSignature c) {
		number ret = bindings.C3Tuple_RawInvoice_u832InvoiceSignatureZ_new(a == null ? 0 : a.ptr & ~1, InternalUtils.check_arr_len(b, 32), c == null ? 0 : c.ptr & ~1);
		ThreeTuple_RawInvoice_u832InvoiceSignatureZ ret_hu_conv = new ThreeTuple_RawInvoice_u832InvoiceSignatureZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
