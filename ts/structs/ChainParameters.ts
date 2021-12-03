
            
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
	public Network get_network() {
		Network ret = bindings.ChainParameters_get_network(this.ptr);
		return ret;
	}

	public void set_network(Network val) {
		bindings.ChainParameters_set_network(this.ptr, val);
	}

	public BestBlock get_best_block() {
		number ret = bindings.ChainParameters_get_best_block(this.ptr);
		const ret_hu_conv: BestBlock = new BestBlock(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_best_block(BestBlock val) {
		bindings.ChainParameters_set_best_block(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	public static ChainParameters constructor_new(Network network_arg, BestBlock best_block_arg) {
		number ret = bindings.ChainParameters_new(network_arg, best_block_arg == null ? 0 : best_block_arg.ptr & ~1);
		const ret_hu_conv: ChainParameters = new ChainParameters(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.ChainParameters_clone_ptr(this.ptr);
		return ret;
	}

	public ChainParameters clone() {
		number ret = bindings.ChainParameters_clone(this.ptr);
		const ret_hu_conv: ChainParameters = new ChainParameters(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
