
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class PeerHandleError extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.PeerHandleError_free(this.ptr);
                    }
                }
	public boolean get_no_connection_possible() {
		boolean ret = bindings.PeerHandleError_get_no_connection_possible(this.ptr);
		return ret;
	}

	public void set_no_connection_possible(boolean val) {
		bindings.PeerHandleError_set_no_connection_possible(this.ptr, val);
	}

	public static PeerHandleError constructor_new(boolean no_connection_possible_arg) {
		number ret = bindings.PeerHandleError_new(no_connection_possible_arg);
		const ret_hu_conv: PeerHandleError = new PeerHandleError(null, ret);
		return ret_hu_conv;
	}

}
