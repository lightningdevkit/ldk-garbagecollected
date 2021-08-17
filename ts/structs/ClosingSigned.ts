
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ClosingSigned extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ClosingSigned_free(this.ptr);
                    }
                }
	public Uint8Array get_channel_id() {
		Uint8Array ret = bindings.ClosingSigned_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(Uint8Array val) {
		bindings.ClosingSigned_set_channel_id(this.ptr, val);
	}

	public number get_fee_satoshis() {
		number ret = bindings.ClosingSigned_get_fee_satoshis(this.ptr);
		return ret;
	}

	public void set_fee_satoshis(number val) {
		bindings.ClosingSigned_set_fee_satoshis(this.ptr, val);
	}

	public Uint8Array get_signature() {
		Uint8Array ret = bindings.ClosingSigned_get_signature(this.ptr);
		return ret;
	}

	public void set_signature(Uint8Array val) {
		bindings.ClosingSigned_set_signature(this.ptr, val);
	}

	public ClosingSignedFeeRange get_fee_range() {
		number ret = bindings.ClosingSigned_get_fee_range(this.ptr);
		const ret_hu_conv: ClosingSignedFeeRange = new ClosingSignedFeeRange(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_fee_range(ClosingSignedFeeRange val) {
		bindings.ClosingSigned_set_fee_range(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public static ClosingSigned constructor_new(Uint8Array channel_id_arg, number fee_satoshis_arg, Uint8Array signature_arg, ClosingSignedFeeRange fee_range_arg) {
		number ret = bindings.ClosingSigned_new(channel_id_arg, fee_satoshis_arg, signature_arg, fee_range_arg == null ? 0 : fee_range_arg.ptr & ~1);
		const ret_hu_conv: ClosingSigned = new ClosingSigned(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(fee_range_arg);
		return ret_hu_conv;
	}

	public ClosingSigned clone() {
		number ret = bindings.ClosingSigned_clone(this.ptr);
		const ret_hu_conv: ClosingSigned = new ClosingSigned(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.ClosingSigned_write(this.ptr);
		return ret;
	}

	public static Result_ClosingSignedDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.ClosingSigned_read(ser);
		Result_ClosingSignedDecodeErrorZ ret_hu_conv = Result_ClosingSignedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
