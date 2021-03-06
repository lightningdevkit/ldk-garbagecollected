
            
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
		bindings.HTLCOutputInCommitment_set_payment_hash(this.ptr, val);
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
