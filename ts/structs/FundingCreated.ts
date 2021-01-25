
            
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
	public FundingCreated clone() {
		number ret = bindings.FundingCreated_clone(this.ptr);
		const ret_hu_conv: FundingCreated = new FundingCreated(null, ret);
		return ret_hu_conv;
	}

	public Uint8Array get_temporary_channel_id() {
		Uint8Array ret = bindings.FundingCreated_get_temporary_channel_id(this.ptr);
		return ret;
	}

	public void set_temporary_channel_id(Uint8Array val) {
		bindings.FundingCreated_set_temporary_channel_id(this.ptr, val);
	}

	public Uint8Array get_funding_txid() {
		Uint8Array ret = bindings.FundingCreated_get_funding_txid(this.ptr);
		return ret;
	}

	public void set_funding_txid(Uint8Array val) {
		bindings.FundingCreated_set_funding_txid(this.ptr, val);
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
		bindings.FundingCreated_set_signature(this.ptr, val);
	}

	public static FundingCreated constructor_new(Uint8Array temporary_channel_id_arg, Uint8Array funding_txid_arg, number funding_output_index_arg, Uint8Array signature_arg) {
		number ret = bindings.FundingCreated_new(temporary_channel_id_arg, funding_txid_arg, funding_output_index_arg, signature_arg);
		const ret_hu_conv: FundingCreated = new FundingCreated(null, ret);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.FundingCreated_write(this.ptr);
		return ret;
	}

	public static FundingCreated constructor_read(Uint8Array ser) {
		number ret = bindings.FundingCreated_read(ser);
		const ret_hu_conv: FundingCreated = new FundingCreated(null, ret);
		return ret_hu_conv;
	}

}
