
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ChannelCounterparty extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ChannelCounterparty_free(this.ptr);
                    }
                }
	public Uint8Array get_node_id() {
		Uint8Array ret = bindings.ChannelCounterparty_get_node_id(this.ptr);
		return ret;
	}

	public void set_node_id(Uint8Array val) {
		bindings.ChannelCounterparty_set_node_id(this.ptr, val);
	}

	public InitFeatures get_features() {
		number ret = bindings.ChannelCounterparty_get_features(this.ptr);
		const ret_hu_conv: InitFeatures = new InitFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_features(InitFeatures val) {
		bindings.ChannelCounterparty_set_features(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public number get_unspendable_punishment_reserve() {
		number ret = bindings.ChannelCounterparty_get_unspendable_punishment_reserve(this.ptr);
		return ret;
	}

	public void set_unspendable_punishment_reserve(number val) {
		bindings.ChannelCounterparty_set_unspendable_punishment_reserve(this.ptr, val);
	}

	public ChannelCounterparty clone() {
		number ret = bindings.ChannelCounterparty_clone(this.ptr);
		const ret_hu_conv: ChannelCounterparty = new ChannelCounterparty(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
