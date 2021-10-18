
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ReadOnlyNetworkGraph extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ReadOnlyNetworkGraph_free(this.ptr);
                    }
                }
	public Option_CVec_NetAddressZZ get_addresses(Uint8Array pubkey) {
		number ret = bindings.ReadOnlyNetworkGraph_get_addresses(this.ptr, pubkey);
		Option_CVec_NetAddressZZ ret_hu_conv = Option_CVec_NetAddressZZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
