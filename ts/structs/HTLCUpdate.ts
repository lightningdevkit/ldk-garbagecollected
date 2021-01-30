
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class HTLCUpdate extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.HTLCUpdate_free(this.ptr);
                    }
                }
	public HTLCUpdate clone() {
		number ret = bindings.HTLCUpdate_clone(this.ptr);
		const ret_hu_conv: HTLCUpdate = new HTLCUpdate(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.HTLCUpdate_write(this.ptr);
		return ret;
	}

	public static HTLCUpdate constructor_read(Uint8Array ser) {
		number ret = bindings.HTLCUpdate_read(ser);
		const ret_hu_conv: HTLCUpdate = new HTLCUpdate(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
