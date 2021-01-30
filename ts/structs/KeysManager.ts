
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class KeysManager extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.KeysManager_free(this.ptr);
                    }
                }
	public static KeysManager constructor_new(Uint8Array seed, LDKNetwork network, number starting_time_secs, number starting_time_nanos) {
		number ret = bindings.KeysManager_new(seed, network, starting_time_secs, starting_time_nanos);
		const ret_hu_conv: KeysManager = new KeysManager(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public InMemoryChannelKeys derive_channel_keys(number channel_value_satoshis, number params_1, number params_2) {
		number ret = bindings.KeysManager_derive_channel_keys(this.ptr, channel_value_satoshis, params_1, params_2);
		const ret_hu_conv: InMemoryChannelKeys = new InMemoryChannelKeys(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public KeysInterface as_KeysInterface() {
		number ret = bindings.KeysManager_as_KeysInterface(this.ptr);
		KeysInterface ret_hu_conv = new KeysInterface(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
