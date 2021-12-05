
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class NodeFeatures extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.NodeFeatures_free(this.ptr);
                    }
                }
	public boolean eq(NodeFeatures b) {
		boolean ret = bindings.NodeFeatures_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.NodeFeatures_clone_ptr(this.ptr);
		return ret;
	}

	public NodeFeatures clone() {
		number ret = bindings.NodeFeatures_clone(this.ptr);
		const ret_hu_conv: NodeFeatures = new NodeFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static NodeFeatures constructor_empty() {
		number ret = bindings.NodeFeatures_empty();
		const ret_hu_conv: NodeFeatures = new NodeFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static NodeFeatures constructor_known() {
		number ret = bindings.NodeFeatures_known();
		const ret_hu_conv: NodeFeatures = new NodeFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public boolean requires_unknown_bits() {
		boolean ret = bindings.NodeFeatures_requires_unknown_bits(this.ptr);
		return ret;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.NodeFeatures_write(this.ptr);
		return ret;
	}

	public static Result_NodeFeaturesDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.NodeFeatures_read(ser);
		Result_NodeFeaturesDecodeErrorZ ret_hu_conv = Result_NodeFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
