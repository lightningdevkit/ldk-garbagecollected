
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class HTLCOutputInCommitment extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.HTLCOutputInCommitment_free(this.ptr);
                    }
                }
	public boolean get_offered() {
		boolean ret = bindings.HTLCOutputInCommitment_get_offered(this.ptr);
		return ret;
	}

	public void set_offered(boolean val) {
		bindings.HTLCOutputInCommitment_set_offered(this.ptr, val);
	}

	public number get_amount_msat() {
		number ret = bindings.HTLCOutputInCommitment_get_amount_msat(this.ptr);
		return ret;
	}

	public void set_amount_msat(number val) {
		bindings.HTLCOutputInCommitment_set_amount_msat(this.ptr, val);
	}

	public number get_cltv_expiry() {
		number ret = bindings.HTLCOutputInCommitment_get_cltv_expiry(this.ptr);
		return ret;
	}

	public void set_cltv_expiry(number val) {
		bindings.HTLCOutputInCommitment_set_cltv_expiry(this.ptr, val);
	}

	public Uint8Array get_payment_hash() {
		Uint8Array ret = bindings.HTLCOutputInCommitment_get_payment_hash(this.ptr);
		return ret;
	}

	public void set_payment_hash(Uint8Array val) {
		bindings.HTLCOutputInCommitment_set_payment_hash(this.ptr, InternalUtils.check_arr_len(val, 32));
	}

	public Option_u32Z get_transaction_output_index() {
		number ret = bindings.HTLCOutputInCommitment_get_transaction_output_index(this.ptr);
		Option_u32Z ret_hu_conv = Option_u32Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_transaction_output_index(Option_u32Z val) {
		bindings.HTLCOutputInCommitment_set_transaction_output_index(this.ptr, val.ptr);
	}

	public static HTLCOutputInCommitment constructor_new(boolean offered_arg, number amount_msat_arg, number cltv_expiry_arg, Uint8Array payment_hash_arg, Option_u32Z transaction_output_index_arg) {
		number ret = bindings.HTLCOutputInCommitment_new(offered_arg, amount_msat_arg, cltv_expiry_arg, InternalUtils.check_arr_len(payment_hash_arg, 32), transaction_output_index_arg.ptr);
		const ret_hu_conv: HTLCOutputInCommitment = new HTLCOutputInCommitment(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.HTLCOutputInCommitment_clone_ptr(this.ptr);
		return ret;
	}

	public HTLCOutputInCommitment clone() {
		number ret = bindings.HTLCOutputInCommitment_clone(this.ptr);
		const ret_hu_conv: HTLCOutputInCommitment = new HTLCOutputInCommitment(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.HTLCOutputInCommitment_write(this.ptr);
		return ret;
	}

	public static Result_HTLCOutputInCommitmentDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.HTLCOutputInCommitment_read(ser);
		Result_HTLCOutputInCommitmentDecodeErrorZ ret_hu_conv = Result_HTLCOutputInCommitmentDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
