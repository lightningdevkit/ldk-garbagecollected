
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ChainParameters extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ChainParameters_free(this.ptr);
                    }
                }
	public LDKNetwork get_network() {
		LDKNetwork ret = bindings.ChainParameters_get_network(this.ptr);
		return ret;
	}

	public void set_network(LDKNetwork val) {
		bindings.ChainParameters_set_network(this.ptr, val);
	}

	public Uint8Array get_latest_hash() {
		Uint8Array ret = bindings.ChainParameters_get_latest_hash(this.ptr);
		return ret;
	}

	public void set_latest_hash(Uint8Array val) {
		bindings.ChainParameters_set_latest_hash(this.ptr, val);
	}

	public number get_latest_height() {
		number ret = bindings.ChainParameters_get_latest_height(this.ptr);
		return ret;
	}

	public void set_latest_height(number val) {
		bindings.ChainParameters_set_latest_height(this.ptr, val);
	}

	public static ChainParameters constructor_new(LDKNetwork network_arg, Uint8Array latest_hash_arg, number latest_height_arg) {
		number ret = bindings.ChainParameters_new(network_arg, latest_hash_arg, latest_height_arg);
		const ret_hu_conv: ChainParameters = new ChainParameters(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
