
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class QueryChannelRange extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.QueryChannelRange_free(this.ptr);
                    }
                }
	public QueryChannelRange clone() {
		number ret = bindings.QueryChannelRange_clone(this.ptr);
		const ret_hu_conv: QueryChannelRange = new QueryChannelRange(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array get_chain_hash() {
		Uint8Array ret = bindings.QueryChannelRange_get_chain_hash(this.ptr);
		return ret;
	}

	public void set_chain_hash(Uint8Array val) {
		bindings.QueryChannelRange_set_chain_hash(this.ptr, val);
	}

	public number get_first_blocknum() {
		number ret = bindings.QueryChannelRange_get_first_blocknum(this.ptr);
		return ret;
	}

	public void set_first_blocknum(number val) {
		bindings.QueryChannelRange_set_first_blocknum(this.ptr, val);
	}

	public number get_number_of_blocks() {
		number ret = bindings.QueryChannelRange_get_number_of_blocks(this.ptr);
		return ret;
	}

	public void set_number_of_blocks(number val) {
		bindings.QueryChannelRange_set_number_of_blocks(this.ptr, val);
	}

	public static QueryChannelRange constructor_new(Uint8Array chain_hash_arg, number first_blocknum_arg, number number_of_blocks_arg) {
		number ret = bindings.QueryChannelRange_new(chain_hash_arg, first_blocknum_arg, number_of_blocks_arg);
		const ret_hu_conv: QueryChannelRange = new QueryChannelRange(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static Result_QueryChannelRangeDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.QueryChannelRange_read(ser);
		Result_QueryChannelRangeDecodeErrorZ ret_hu_conv = Result_QueryChannelRangeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.QueryChannelRange_write(this.ptr);
		return ret;
	}

}
