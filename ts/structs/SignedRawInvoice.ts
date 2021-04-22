
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class SignedRawInvoice extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.SignedRawInvoice_free(this.ptr);
                    }
                }
	public SignedRawInvoice clone() {
		number ret = bindings.SignedRawInvoice_clone(this.ptr);
		const ret_hu_conv: SignedRawInvoice = new SignedRawInvoice(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public ThreeTuple<RawInvoice, Uint8Array, InvoiceSignature> into_parts() {
		number ret = bindings.SignedRawInvoice_into_parts(this.ptr);
		number ret_a = bindings.LDKC3Tuple_RawInvoice_u832InvoiceSignatureZ_get_a(ret);
		const ret_a_hu_conv: RawInvoice = new RawInvoice(null, ret_a);
		ret_a_hu_conv.ptrs_to.add(this);;
		Uint8Array ret_b = bindings.LDKC3Tuple_RawInvoice_u832InvoiceSignatureZ_get_b(ret);
		number ret_c = bindings.LDKC3Tuple_RawInvoice_u832InvoiceSignatureZ_get_c(ret);
		const ret_c_hu_conv: InvoiceSignature = new InvoiceSignature(null, ret_c);
		ret_c_hu_conv.ptrs_to.add(this);;
		ThreeTuple<RawInvoice, Uint8Array, InvoiceSignature> ret_conv = new ThreeTuple<RawInvoice, Uint8Array, InvoiceSignature>(ret_a_hu_conv, ret_b, ret_c_hu_conv, () -> {
			bindings.C3Tuple_RawInvoice_u832InvoiceSignatureZ_free(ret);
		});
		ret_a_hu_conv.ptrs_to.add(ret_conv);
		ret_c_hu_conv.ptrs_to.add(ret_conv);
		return ret_conv;
	}

	public RawInvoice raw_invoice() {
		number ret = bindings.SignedRawInvoice_raw_invoice(this.ptr);
		const ret_hu_conv: RawInvoice = new RawInvoice(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array hash() {
		Uint8Array ret = bindings.SignedRawInvoice_hash(this.ptr);
		return ret;
	}

	public InvoiceSignature signature() {
		number ret = bindings.SignedRawInvoice_signature(this.ptr);
		const ret_hu_conv: InvoiceSignature = new InvoiceSignature(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Result_PayeePubKeyErrorZ recover_payee_pub_key() {
		number ret = bindings.SignedRawInvoice_recover_payee_pub_key(this.ptr);
		Result_PayeePubKeyErrorZ ret_hu_conv = Result_PayeePubKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean check_signature() {
		boolean ret = bindings.SignedRawInvoice_check_signature(this.ptr);
		return ret;
	}

	public static Result_SignedRawInvoiceNoneZ constructor_from_str(String s) {
		number ret = bindings.SignedRawInvoice_from_str(s);
		Result_SignedRawInvoiceNoneZ ret_hu_conv = Result_SignedRawInvoiceNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public String to_str() {
		String ret = bindings.SignedRawInvoice_to_str(this.ptr);
		return ret;
	}

}
