
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ChannelReestablish extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ChannelReestablish_free(this.ptr);
                    }
                }
	public ChannelReestablish clone() {
		number ret = bindings.ChannelReestablish_clone(this.ptr);
		const ret_hu_conv: ChannelReestablish = new ChannelReestablish(null, ret);
		return ret_hu_conv;
	}

	public Uint8Array get_channel_id() {
		Uint8Array ret = bindings.ChannelReestablish_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(Uint8Array val) {
		bindings.ChannelReestablish_set_channel_id(this.ptr, val);
	}

	public number get_next_local_commitment_number() {
		number ret = bindings.ChannelReestablish_get_next_local_commitment_number(this.ptr);
		return ret;
	}

	public void set_next_local_commitment_number(number val) {
		bindings.ChannelReestablish_set_next_local_commitment_number(this.ptr, val);
	}

	public number get_next_remote_commitment_number() {
		number ret = bindings.ChannelReestablish_get_next_remote_commitment_number(this.ptr);
		return ret;
	}

	public void set_next_remote_commitment_number(number val) {
		bindings.ChannelReestablish_set_next_remote_commitment_number(this.ptr, val);
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.ChannelReestablish_write(this.ptr);
		return ret;
	}

	public static Result_ChannelReestablishDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.ChannelReestablish_read(ser);
		Result_ChannelReestablishDecodeErrorZ ret_hu_conv = Result_ChannelReestablishDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
