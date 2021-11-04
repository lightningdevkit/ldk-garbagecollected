
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class Invoice extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.Invoice_free(this.ptr);
                    }
                }
	public boolean eq(Invoice b) {
		boolean ret = bindings.Invoice_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	public Invoice clone() {
		number ret = bindings.Invoice_clone(this.ptr);
		const ret_hu_conv: Invoice = new Invoice(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public SignedRawInvoice into_signed_raw() {
		number ret = bindings.Invoice_into_signed_raw(this.ptr);
		const ret_hu_conv: SignedRawInvoice = new SignedRawInvoice(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Result_NoneSemanticErrorZ check_signature() {
		number ret = bindings.Invoice_check_signature(this.ptr);
		Result_NoneSemanticErrorZ ret_hu_conv = Result_NoneSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_InvoiceSemanticErrorZ constructor_from_signed(SignedRawInvoice signed_invoice) {
		number ret = bindings.Invoice_from_signed(signed_invoice == null ? 0 : signed_invoice.ptr & ~1);
		Result_InvoiceSemanticErrorZ ret_hu_conv = Result_InvoiceSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public number timestamp() {
		number ret = bindings.Invoice_timestamp(this.ptr);
		return ret;
	}

	public Uint8Array payment_hash() {
		Uint8Array ret = bindings.Invoice_payment_hash(this.ptr);
		return ret;
	}

	public Uint8Array payee_pub_key() {
		Uint8Array ret = bindings.Invoice_payee_pub_key(this.ptr);
		return ret;
	}

	public Uint8Array payment_secret() {
		Uint8Array ret = bindings.Invoice_payment_secret(this.ptr);
		return ret;
	}

	public InvoiceFeatures features() {
		number ret = bindings.Invoice_features(this.ptr);
		const ret_hu_conv: InvoiceFeatures = new InvoiceFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array recover_payee_pub_key() {
		Uint8Array ret = bindings.Invoice_recover_payee_pub_key(this.ptr);
		return ret;
	}

	public number expiry_time() {
		number ret = bindings.Invoice_expiry_time(this.ptr);
		return ret;
	}

	public boolean is_expired() {
		boolean ret = bindings.Invoice_is_expired(this.ptr);
		return ret;
	}

	public number min_final_cltv_expiry() {
		number ret = bindings.Invoice_min_final_cltv_expiry(this.ptr);
		return ret;
	}

	public PrivateRoute[] private_routes() {
		number[] ret = bindings.Invoice_private_routes(this.ptr);
		PrivateRoute[] ret_conv_14_arr = new PrivateRoute[ret.length];
		for (int o = 0; o < ret.length; o++) {
			number ret_conv_14 = ret[o];
			const ret_conv_14_hu_conv: PrivateRoute = new PrivateRoute(null, ret_conv_14);
			ret_conv_14_hu_conv.ptrs_to.add(this);
			ret_conv_14_arr[o] = ret_conv_14_hu_conv;
		}
		return ret_conv_14_arr;
	}

	public RouteHint[] route_hints() {
		number[] ret = bindings.Invoice_route_hints(this.ptr);
		RouteHint[] ret_conv_11_arr = new RouteHint[ret.length];
		for (int l = 0; l < ret.length; l++) {
			number ret_conv_11 = ret[l];
			const ret_conv_11_hu_conv: RouteHint = new RouteHint(null, ret_conv_11);
			ret_conv_11_hu_conv.ptrs_to.add(this);
			ret_conv_11_arr[l] = ret_conv_11_hu_conv;
		}
		return ret_conv_11_arr;
	}

	public Currency currency() {
		Currency ret = bindings.Invoice_currency(this.ptr);
		return ret;
	}

	public Option_u64Z amount_milli_satoshis() {
		number ret = bindings.Invoice_amount_milli_satoshis(this.ptr);
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static Result_InvoiceNoneZ constructor_from_str(String s) {
		number ret = bindings.Invoice_from_str(s);
		Result_InvoiceNoneZ ret_hu_conv = Result_InvoiceNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public String to_str() {
		String ret = bindings.Invoice_to_str(this.ptr);
		return ret;
	}

}
