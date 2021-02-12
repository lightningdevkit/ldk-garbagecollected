
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class FundingLocked extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.FundingLocked_free(this.ptr);
                    }
                }
	public Uint8Array get_channel_id() {
		Uint8Array ret = bindings.FundingLocked_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(Uint8Array val) {
		bindings.FundingLocked_set_channel_id(this.ptr, val);
	}

	public Uint8Array get_next_per_commitment_point() {
		Uint8Array ret = bindings.FundingLocked_get_next_per_commitment_point(this.ptr);
		return ret;
	}

	public void set_next_per_commitment_point(Uint8Array val) {
		bindings.FundingLocked_set_next_per_commitment_point(this.ptr, val);
	}

	public static FundingLocked constructor_new(Uint8Array channel_id_arg, Uint8Array next_per_commitment_point_arg) {
		number ret = bindings.FundingLocked_new(channel_id_arg, next_per_commitment_point_arg);
		const ret_hu_conv: FundingLocked = new FundingLocked(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public FundingLocked clone() {
		number ret = bindings.FundingLocked_clone(this.ptr);
		const ret_hu_conv: FundingLocked = new FundingLocked(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.FundingLocked_write(this.ptr);
		return ret;
	}

	public static Result_FundingLockedDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.FundingLocked_read(ser);
		Result_FundingLockedDecodeErrorZ ret_hu_conv = Result_FundingLockedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
