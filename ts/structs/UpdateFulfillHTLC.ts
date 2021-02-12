
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class UpdateFulfillHTLC extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.UpdateFulfillHTLC_free(this.ptr);
                    }
                }
	public Uint8Array get_channel_id() {
		Uint8Array ret = bindings.UpdateFulfillHTLC_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(Uint8Array val) {
		bindings.UpdateFulfillHTLC_set_channel_id(this.ptr, val);
	}

	public number get_htlc_id() {
		number ret = bindings.UpdateFulfillHTLC_get_htlc_id(this.ptr);
		return ret;
	}

	public void set_htlc_id(number val) {
		bindings.UpdateFulfillHTLC_set_htlc_id(this.ptr, val);
	}

	public Uint8Array get_payment_preimage() {
		Uint8Array ret = bindings.UpdateFulfillHTLC_get_payment_preimage(this.ptr);
		return ret;
	}

	public void set_payment_preimage(Uint8Array val) {
		bindings.UpdateFulfillHTLC_set_payment_preimage(this.ptr, val);
	}

	public static UpdateFulfillHTLC constructor_new(Uint8Array channel_id_arg, number htlc_id_arg, Uint8Array payment_preimage_arg) {
		number ret = bindings.UpdateFulfillHTLC_new(channel_id_arg, htlc_id_arg, payment_preimage_arg);
		const ret_hu_conv: UpdateFulfillHTLC = new UpdateFulfillHTLC(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public UpdateFulfillHTLC clone() {
		number ret = bindings.UpdateFulfillHTLC_clone(this.ptr);
		const ret_hu_conv: UpdateFulfillHTLC = new UpdateFulfillHTLC(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.UpdateFulfillHTLC_write(this.ptr);
		return ret;
	}

	public static Result_UpdateFulfillHTLCDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.UpdateFulfillHTLC_read(ser);
		Result_UpdateFulfillHTLCDecodeErrorZ ret_hu_conv = Result_UpdateFulfillHTLCDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
