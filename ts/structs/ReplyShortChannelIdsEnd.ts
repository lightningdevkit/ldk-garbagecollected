
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ReplyShortChannelIdsEnd extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ReplyShortChannelIdsEnd_free(this.ptr);
                    }
                }
	public Uint8Array get_chain_hash() {
		Uint8Array ret = bindings.ReplyShortChannelIdsEnd_get_chain_hash(this.ptr);
		return ret;
	}

	public void set_chain_hash(Uint8Array val) {
		bindings.ReplyShortChannelIdsEnd_set_chain_hash(this.ptr, val);
	}

	public boolean get_full_information() {
		boolean ret = bindings.ReplyShortChannelIdsEnd_get_full_information(this.ptr);
		return ret;
	}

	public void set_full_information(boolean val) {
		bindings.ReplyShortChannelIdsEnd_set_full_information(this.ptr, val);
	}

	public static ReplyShortChannelIdsEnd constructor_new(Uint8Array chain_hash_arg, boolean full_information_arg) {
		number ret = bindings.ReplyShortChannelIdsEnd_new(chain_hash_arg, full_information_arg);
		const ret_hu_conv: ReplyShortChannelIdsEnd = new ReplyShortChannelIdsEnd(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public ReplyShortChannelIdsEnd clone() {
		number ret = bindings.ReplyShortChannelIdsEnd_clone(this.ptr);
		const ret_hu_conv: ReplyShortChannelIdsEnd = new ReplyShortChannelIdsEnd(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.ReplyShortChannelIdsEnd_write(this.ptr);
		return ret;
	}

	public static Result_ReplyShortChannelIdsEndDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.ReplyShortChannelIdsEnd_read(ser);
		Result_ReplyShortChannelIdsEndDecodeErrorZ ret_hu_conv = Result_ReplyShortChannelIdsEndDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
