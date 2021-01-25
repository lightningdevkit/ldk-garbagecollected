
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class UpdateAddHTLC extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.UpdateAddHTLC_free(this.ptr);
                    }
                }
	public UpdateAddHTLC clone() {
		number ret = bindings.UpdateAddHTLC_clone(this.ptr);
		const ret_hu_conv: UpdateAddHTLC = new UpdateAddHTLC(null, ret);
		return ret_hu_conv;
	}

	public Uint8Array get_channel_id() {
		Uint8Array ret = bindings.UpdateAddHTLC_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(Uint8Array val) {
		bindings.UpdateAddHTLC_set_channel_id(this.ptr, val);
	}

	public number get_htlc_id() {
		number ret = bindings.UpdateAddHTLC_get_htlc_id(this.ptr);
		return ret;
	}

	public void set_htlc_id(number val) {
		bindings.UpdateAddHTLC_set_htlc_id(this.ptr, val);
	}

	public number get_amount_msat() {
		number ret = bindings.UpdateAddHTLC_get_amount_msat(this.ptr);
		return ret;
	}

	public void set_amount_msat(number val) {
		bindings.UpdateAddHTLC_set_amount_msat(this.ptr, val);
	}

	public Uint8Array get_payment_hash() {
		Uint8Array ret = bindings.UpdateAddHTLC_get_payment_hash(this.ptr);
		return ret;
	}

	public void set_payment_hash(Uint8Array val) {
		bindings.UpdateAddHTLC_set_payment_hash(this.ptr, val);
	}

	public number get_cltv_expiry() {
		number ret = bindings.UpdateAddHTLC_get_cltv_expiry(this.ptr);
		return ret;
	}

	public void set_cltv_expiry(number val) {
		bindings.UpdateAddHTLC_set_cltv_expiry(this.ptr, val);
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.UpdateAddHTLC_write(this.ptr);
		return ret;
	}

	public static UpdateAddHTLC constructor_read(Uint8Array ser) {
		number ret = bindings.UpdateAddHTLC_read(ser);
		const ret_hu_conv: UpdateAddHTLC = new UpdateAddHTLC(null, ret);
		return ret_hu_conv;
	}

}
