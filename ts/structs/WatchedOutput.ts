
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class WatchedOutput extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.WatchedOutput_free(this.ptr);
                    }
                }
	public Uint8Array get_block_hash() {
		Uint8Array ret = bindings.WatchedOutput_get_block_hash(this.ptr);
		return ret;
	}

	public void set_block_hash(Uint8Array val) {
		bindings.WatchedOutput_set_block_hash(this.ptr, val);
	}

	public OutPoint get_outpoint() {
		number ret = bindings.WatchedOutput_get_outpoint(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_outpoint(OutPoint val) {
		bindings.WatchedOutput_set_outpoint(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public Uint8Array get_script_pubkey() {
		Uint8Array ret = bindings.WatchedOutput_get_script_pubkey(this.ptr);
		return ret;
	}

	public void set_script_pubkey(Uint8Array val) {
		bindings.WatchedOutput_set_script_pubkey(this.ptr, val);
	}

	public static WatchedOutput constructor_new(Uint8Array block_hash_arg, OutPoint outpoint_arg, Uint8Array script_pubkey_arg) {
		number ret = bindings.WatchedOutput_new(block_hash_arg, outpoint_arg == null ? 0 : outpoint_arg.ptr & ~1, script_pubkey_arg);
		const ret_hu_conv: WatchedOutput = new WatchedOutput(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(outpoint_arg);
		return ret_hu_conv;
	}

	public WatchedOutput clone() {
		number ret = bindings.WatchedOutput_clone(this.ptr);
		const ret_hu_conv: WatchedOutput = new WatchedOutput(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public number hash() {
		number ret = bindings.WatchedOutput_hash(this.ptr);
		return ret;
	}

}
