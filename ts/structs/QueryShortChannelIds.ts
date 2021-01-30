
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class QueryShortChannelIds extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.QueryShortChannelIds_free(this.ptr);
                    }
                }
	public QueryShortChannelIds clone() {
		number ret = bindings.QueryShortChannelIds_clone(this.ptr);
		const ret_hu_conv: QueryShortChannelIds = new QueryShortChannelIds(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array get_chain_hash() {
		Uint8Array ret = bindings.QueryShortChannelIds_get_chain_hash(this.ptr);
		return ret;
	}

	public void set_chain_hash(Uint8Array val) {
		bindings.QueryShortChannelIds_set_chain_hash(this.ptr, val);
	}

	public void set_short_channel_ids(number[] val) {
		bindings.QueryShortChannelIds_set_short_channel_ids(this.ptr, val);
	}

	public static QueryShortChannelIds constructor_new(Uint8Array chain_hash_arg, number[] short_channel_ids_arg) {
		number ret = bindings.QueryShortChannelIds_new(chain_hash_arg, short_channel_ids_arg);
		const ret_hu_conv: QueryShortChannelIds = new QueryShortChannelIds(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static Result_QueryShortChannelIdsDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.QueryShortChannelIds_read(ser);
		Result_QueryShortChannelIdsDecodeErrorZ ret_hu_conv = Result_QueryShortChannelIdsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.QueryShortChannelIds_write(this.ptr);
		return ret;
	}

}
