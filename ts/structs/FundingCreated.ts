
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class FundingCreated extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.FundingCreated_free(this.ptr);
                    }
                }
	public Uint8Array get_temporary_channel_id() {
		Uint8Array ret = bindings.FundingCreated_get_temporary_channel_id(this.ptr);
		return ret;
	}

	public void set_temporary_channel_id(Uint8Array val) {
		bindings.FundingCreated_set_temporary_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
	}

	public Uint8Array get_funding_txid() {
		Uint8Array ret = bindings.FundingCreated_get_funding_txid(this.ptr);
		return ret;
	}

	public void set_funding_txid(Uint8Array val) {
		bindings.FundingCreated_set_funding_txid(this.ptr, InternalUtils.check_arr_len(val, 32));
	}

	public number get_funding_output_index() {
		number ret = bindings.FundingCreated_get_funding_output_index(this.ptr);
		return ret;
	}

	public void set_funding_output_index(number val) {
		bindings.FundingCreated_set_funding_output_index(this.ptr, val);
	}

	public Uint8Array get_signature() {
		Uint8Array ret = bindings.FundingCreated_get_signature(this.ptr);
		return ret;
	}

	public void set_signature(Uint8Array val) {
		bindings.FundingCreated_set_signature(this.ptr, InternalUtils.check_arr_len(val, 64));
	}

	public static FundingCreated constructor_new(Uint8Array temporary_channel_id_arg, Uint8Array funding_txid_arg, number funding_output_index_arg, Uint8Array signature_arg) {
		number ret = bindings.FundingCreated_new(InternalUtils.check_arr_len(temporary_channel_id_arg, 32), InternalUtils.check_arr_len(funding_txid_arg, 32), funding_output_index_arg, InternalUtils.check_arr_len(signature_arg, 64));
		const ret_hu_conv: FundingCreated = new FundingCreated(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.FundingCreated_clone_ptr(this.ptr);
		return ret;
	}

	public FundingCreated clone() {
		number ret = bindings.FundingCreated_clone(this.ptr);
		const ret_hu_conv: FundingCreated = new FundingCreated(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.FundingCreated_write(this.ptr);
		return ret;
	}

	public static Result_FundingCreatedDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.FundingCreated_read(ser);
		Result_FundingCreatedDecodeErrorZ ret_hu_conv = Result_FundingCreatedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
