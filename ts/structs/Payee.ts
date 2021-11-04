
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class Payee extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.Payee_free(this.ptr);
                    }
                }
	public Uint8Array get_pubkey() {
		Uint8Array ret = bindings.Payee_get_pubkey(this.ptr);
		return ret;
	}

	public void set_pubkey(Uint8Array val) {
		bindings.Payee_set_pubkey(this.ptr, val);
	}

	public InvoiceFeatures get_features() {
		number ret = bindings.Payee_get_features(this.ptr);
		const ret_hu_conv: InvoiceFeatures = new InvoiceFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_features(InvoiceFeatures val) {
		bindings.Payee_set_features(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	public RouteHint[] get_route_hints() {
		number[] ret = bindings.Payee_get_route_hints(this.ptr);
		RouteHint[] ret_conv_11_arr = new RouteHint[ret.length];
		for (int l = 0; l < ret.length; l++) {
			number ret_conv_11 = ret[l];
			const ret_conv_11_hu_conv: RouteHint = new RouteHint(null, ret_conv_11);
			ret_conv_11_hu_conv.ptrs_to.add(this);
			ret_conv_11_arr[l] = ret_conv_11_hu_conv;
		}
		return ret_conv_11_arr;
	}

	public void set_route_hints(RouteHint[] val) {
		bindings.Payee_set_route_hints(this.ptr, val != null ? Arrays.stream(val).map(val_conv_11 -> val_conv_11 == null ? 0 : val_conv_11.ptr & ~1).toArray(number[]::new) : null);
	}

	public Option_u64Z get_expiry_time() {
		number ret = bindings.Payee_get_expiry_time(this.ptr);
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_expiry_time(Option_u64Z val) {
		bindings.Payee_set_expiry_time(this.ptr, val.ptr);
	}

	public static Payee constructor_new(Uint8Array pubkey_arg, InvoiceFeatures features_arg, RouteHint[] route_hints_arg, Option_u64Z expiry_time_arg) {
		number ret = bindings.Payee_new(pubkey_arg, features_arg == null ? 0 : features_arg.ptr & ~1, route_hints_arg != null ? Arrays.stream(route_hints_arg).map(route_hints_arg_conv_11 -> route_hints_arg_conv_11 == null ? 0 : route_hints_arg_conv_11.ptr & ~1).toArray(number[]::new) : null, expiry_time_arg.ptr);
		const ret_hu_conv: Payee = new Payee(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public Payee clone() {
		number ret = bindings.Payee_clone(this.ptr);
		const ret_hu_conv: Payee = new Payee(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public number hash() {
		number ret = bindings.Payee_hash(this.ptr);
		return ret;
	}

	public boolean eq(Payee b) {
		boolean ret = bindings.Payee_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.Payee_write(this.ptr);
		return ret;
	}

	public static Result_PayeeDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.Payee_read(ser);
		Result_PayeeDecodeErrorZ ret_hu_conv = Result_PayeeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Payee constructor_from_node_id(Uint8Array pubkey) {
		number ret = bindings.Payee_from_node_id(pubkey);
		const ret_hu_conv: Payee = new Payee(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static Payee constructor_for_keysend(Uint8Array pubkey) {
		number ret = bindings.Payee_for_keysend(pubkey);
		const ret_hu_conv: Payee = new Payee(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
