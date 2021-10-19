
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class NodeId extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.NodeId_free(this.ptr);
                    }
                }
	public NodeId clone() {
		number ret = bindings.NodeId_clone(this.ptr);
		const ret_hu_conv: NodeId = new NodeId(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static NodeId constructor_from_pubkey(Uint8Array pubkey) {
		number ret = bindings.NodeId_from_pubkey(pubkey);
		const ret_hu_conv: NodeId = new NodeId(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public Uint8Array as_slice() {
		Uint8Array ret = bindings.NodeId_as_slice(this.ptr);
		return ret;
	}

	public number hash() {
		number ret = bindings.NodeId_hash(this.ptr);
		return ret;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.NodeId_write(this.ptr);
		return ret;
	}

	public static Result_NodeIdDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.NodeId_read(ser);
		Result_NodeIdDecodeErrorZ ret_hu_conv = Result_NodeIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
