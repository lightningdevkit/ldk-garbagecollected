
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class GossipTimestampFilter extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.GossipTimestampFilter_free(this.ptr);
                    }
                }
	public GossipTimestampFilter clone() {
		number ret = bindings.GossipTimestampFilter_clone(this.ptr);
		const ret_hu_conv: GossipTimestampFilter = new GossipTimestampFilter(null, ret);
		return ret_hu_conv;
	}

	public Uint8Array get_chain_hash() {
		Uint8Array ret = bindings.GossipTimestampFilter_get_chain_hash(this.ptr);
		return ret;
	}

	public void set_chain_hash(Uint8Array val) {
		bindings.GossipTimestampFilter_set_chain_hash(this.ptr, val);
	}

	public number get_first_timestamp() {
		number ret = bindings.GossipTimestampFilter_get_first_timestamp(this.ptr);
		return ret;
	}

	public void set_first_timestamp(number val) {
		bindings.GossipTimestampFilter_set_first_timestamp(this.ptr, val);
	}

	public number get_timestamp_range() {
		number ret = bindings.GossipTimestampFilter_get_timestamp_range(this.ptr);
		return ret;
	}

	public void set_timestamp_range(number val) {
		bindings.GossipTimestampFilter_set_timestamp_range(this.ptr, val);
	}

	public static GossipTimestampFilter constructor_new(Uint8Array chain_hash_arg, number first_timestamp_arg, number timestamp_range_arg) {
		number ret = bindings.GossipTimestampFilter_new(chain_hash_arg, first_timestamp_arg, timestamp_range_arg);
		const ret_hu_conv: GossipTimestampFilter = new GossipTimestampFilter(null, ret);
		return ret_hu_conv;
	}

	public static Result_GossipTimestampFilterDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.GossipTimestampFilter_read(ser);
		Result_GossipTimestampFilterDecodeErrorZ ret_hu_conv = Result_GossipTimestampFilterDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.GossipTimestampFilter_write(this.ptr);
		return ret;
	}

}
