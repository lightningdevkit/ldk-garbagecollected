
            
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
	public boolean eq(SignedRawInvoice b) {
		boolean ret = bindings.SignedRawInvoice_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	public SignedRawInvoice clone() {
		number ret = bindings.SignedRawInvoice_clone(this.ptr);
		const ret_hu_conv: SignedRawInvoice = new SignedRawInvoice(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public ThreeTuple_RawInvoice_u832InvoiceSignatureZ into_parts() {
		number ret = bindings.SignedRawInvoice_into_parts(this.ptr);
		ThreeTuple_RawInvoice_u832InvoiceSignatureZ ret_hu_conv = new ThreeTuple_RawInvoice_u832InvoiceSignatureZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
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
