
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class FundingSigned extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.FundingSigned_free(this.ptr);
                    }
                }
	public FundingSigned clone() {
		number ret = bindings.FundingSigned_clone(this.ptr);
		const ret_hu_conv: FundingSigned = new FundingSigned(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array get_channel_id() {
		Uint8Array ret = bindings.FundingSigned_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(Uint8Array val) {
		bindings.FundingSigned_set_channel_id(this.ptr, val);
	}

	public Uint8Array get_signature() {
		Uint8Array ret = bindings.FundingSigned_get_signature(this.ptr);
		return ret;
	}

	public void set_signature(Uint8Array val) {
		bindings.FundingSigned_set_signature(this.ptr, val);
	}

	public static FundingSigned constructor_new(Uint8Array channel_id_arg, Uint8Array signature_arg) {
		number ret = bindings.FundingSigned_new(channel_id_arg, signature_arg);
		const ret_hu_conv: FundingSigned = new FundingSigned(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.FundingSigned_write(this.ptr);
		return ret;
	}

	public static FundingSigned constructor_read(Uint8Array ser) {
		number ret = bindings.FundingSigned_read(ser);
		const ret_hu_conv: FundingSigned = new FundingSigned(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
