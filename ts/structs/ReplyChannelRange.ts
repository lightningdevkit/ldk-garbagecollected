
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ReplyChannelRange extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ReplyChannelRange_free(this.ptr);
                    }
                }
	public Uint8Array get_chain_hash() {
		Uint8Array ret = bindings.ReplyChannelRange_get_chain_hash(this.ptr);
		return ret;
	}

	public void set_chain_hash(Uint8Array val) {
		bindings.ReplyChannelRange_set_chain_hash(this.ptr, val);
	}

	public number get_first_blocknum() {
		number ret = bindings.ReplyChannelRange_get_first_blocknum(this.ptr);
		return ret;
	}

	public void set_first_blocknum(number val) {
		bindings.ReplyChannelRange_set_first_blocknum(this.ptr, val);
	}

	public number get_number_of_blocks() {
		number ret = bindings.ReplyChannelRange_get_number_of_blocks(this.ptr);
		return ret;
	}

	public void set_number_of_blocks(number val) {
		bindings.ReplyChannelRange_set_number_of_blocks(this.ptr, val);
	}

	public boolean get_sync_complete() {
		boolean ret = bindings.ReplyChannelRange_get_sync_complete(this.ptr);
		return ret;
	}

	public void set_sync_complete(boolean val) {
		bindings.ReplyChannelRange_set_sync_complete(this.ptr, val);
	}

	public void set_short_channel_ids(number[] val) {
		bindings.ReplyChannelRange_set_short_channel_ids(this.ptr, val);
	}

	public static ReplyChannelRange constructor_new(Uint8Array chain_hash_arg, number first_blocknum_arg, number number_of_blocks_arg, boolean sync_complete_arg, number[] short_channel_ids_arg) {
		number ret = bindings.ReplyChannelRange_new(chain_hash_arg, first_blocknum_arg, number_of_blocks_arg, sync_complete_arg, short_channel_ids_arg);
		const ret_hu_conv: ReplyChannelRange = new ReplyChannelRange(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public ReplyChannelRange clone() {
		number ret = bindings.ReplyChannelRange_clone(this.ptr);
		const ret_hu_conv: ReplyChannelRange = new ReplyChannelRange(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static Result_ReplyChannelRangeDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.ReplyChannelRange_read(ser);
		Result_ReplyChannelRangeDecodeErrorZ ret_hu_conv = Result_ReplyChannelRangeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.ReplyChannelRange_write(this.ptr);
		return ret;
	}

}
