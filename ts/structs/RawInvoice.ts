
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class RawInvoice extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.RawInvoice_free(this.ptr);
                    }
                }
	public RawDataPart get_data() {
		number ret = bindings.RawInvoice_get_data(this.ptr);
		const ret_hu_conv: RawDataPart = new RawDataPart(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_data(RawDataPart val) {
		bindings.RawInvoice_set_data(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	public boolean eq(RawInvoice b) {
		boolean ret = bindings.RawInvoice_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.RawInvoice_clone_ptr(this.ptr);
		return ret;
	}

	public RawInvoice clone() {
		number ret = bindings.RawInvoice_clone(this.ptr);
		const ret_hu_conv: RawInvoice = new RawInvoice(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array hash() {
		Uint8Array ret = bindings.RawInvoice_hash(this.ptr);
		return ret;
	}

	public Sha256 payment_hash() {
		number ret = bindings.RawInvoice_payment_hash(this.ptr);
		const ret_hu_conv: Sha256 = new Sha256(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Description description() {
		number ret = bindings.RawInvoice_description(this.ptr);
		const ret_hu_conv: Description = new Description(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public PayeePubKey payee_pub_key() {
		number ret = bindings.RawInvoice_payee_pub_key(this.ptr);
		const ret_hu_conv: PayeePubKey = new PayeePubKey(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Sha256 description_hash() {
		number ret = bindings.RawInvoice_description_hash(this.ptr);
		const ret_hu_conv: Sha256 = new Sha256(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public ExpiryTime expiry_time() {
		number ret = bindings.RawInvoice_expiry_time(this.ptr);
		const ret_hu_conv: ExpiryTime = new ExpiryTime(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public MinFinalCltvExpiry min_final_cltv_expiry() {
		number ret = bindings.RawInvoice_min_final_cltv_expiry(this.ptr);
		const ret_hu_conv: MinFinalCltvExpiry = new MinFinalCltvExpiry(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array payment_secret() {
		Uint8Array ret = bindings.RawInvoice_payment_secret(this.ptr);
		return ret;
	}

	public InvoiceFeatures features() {
		number ret = bindings.RawInvoice_features(this.ptr);
		const ret_hu_conv: InvoiceFeatures = new InvoiceFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public PrivateRoute[] private_routes() {
		number[] ret = bindings.RawInvoice_private_routes(this.ptr);
		PrivateRoute[] ret_conv_14_arr = new PrivateRoute[ret.length];
		for (int o = 0; o < ret.length; o++) {
			number ret_conv_14 = ret[o];
			const ret_conv_14_hu_conv: PrivateRoute = new PrivateRoute(null, ret_conv_14);
			ret_conv_14_hu_conv.ptrs_to.add(this);
			ret_conv_14_arr[o] = ret_conv_14_hu_conv;
		}
		return ret_conv_14_arr;
	}

	public Option_u64Z amount_pico_btc() {
		number ret = bindings.RawInvoice_amount_pico_btc(this.ptr);
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Currency currency() {
		Currency ret = bindings.RawInvoice_currency(this.ptr);
		return ret;
	}

}
