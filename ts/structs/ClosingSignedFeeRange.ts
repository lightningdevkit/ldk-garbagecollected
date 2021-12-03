
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ClosingSignedFeeRange extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ClosingSignedFeeRange_free(this.ptr);
                    }
                }
	public number get_min_fee_satoshis() {
		number ret = bindings.ClosingSignedFeeRange_get_min_fee_satoshis(this.ptr);
		return ret;
	}

	public void set_min_fee_satoshis(number val) {
		bindings.ClosingSignedFeeRange_set_min_fee_satoshis(this.ptr, val);
	}

	public number get_max_fee_satoshis() {
		number ret = bindings.ClosingSignedFeeRange_get_max_fee_satoshis(this.ptr);
		return ret;
	}

	public void set_max_fee_satoshis(number val) {
		bindings.ClosingSignedFeeRange_set_max_fee_satoshis(this.ptr, val);
	}

	public static ClosingSignedFeeRange constructor_new(number min_fee_satoshis_arg, number max_fee_satoshis_arg) {
		number ret = bindings.ClosingSignedFeeRange_new(min_fee_satoshis_arg, max_fee_satoshis_arg);
		const ret_hu_conv: ClosingSignedFeeRange = new ClosingSignedFeeRange(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.ClosingSignedFeeRange_clone_ptr(this.ptr);
		return ret;
	}

	public ClosingSignedFeeRange clone() {
		number ret = bindings.ClosingSignedFeeRange_clone(this.ptr);
		const ret_hu_conv: ClosingSignedFeeRange = new ClosingSignedFeeRange(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.ClosingSignedFeeRange_write(this.ptr);
		return ret;
	}

	public static Result_ClosingSignedFeeRangeDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.ClosingSignedFeeRange_read(ser);
		Result_ClosingSignedFeeRangeDecodeErrorZ ret_hu_conv = Result_ClosingSignedFeeRangeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
