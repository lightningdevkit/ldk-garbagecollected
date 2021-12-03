
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class BestBlock extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.BestBlock_free(this.ptr);
                    }
                }
	public number clone_ptr() {
		number ret = bindings.BestBlock_clone_ptr(this.ptr);
		return ret;
	}

	public BestBlock clone() {
		number ret = bindings.BestBlock_clone(this.ptr);
		const ret_hu_conv: BestBlock = new BestBlock(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static BestBlock constructor_from_genesis(Network network) {
		number ret = bindings.BestBlock_from_genesis(network);
		const ret_hu_conv: BestBlock = new BestBlock(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static BestBlock constructor_new(Uint8Array block_hash, number height) {
		number ret = bindings.BestBlock_new(InternalUtils.check_arr_len(block_hash, 32), height);
		const ret_hu_conv: BestBlock = new BestBlock(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public Uint8Array block_hash() {
		Uint8Array ret = bindings.BestBlock_block_hash(this.ptr);
		return ret;
	}

	public number height() {
		number ret = bindings.BestBlock_height(this.ptr);
		return ret;
	}

}
