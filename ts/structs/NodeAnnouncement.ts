
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class NodeAnnouncement extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.NodeAnnouncement_free(this.ptr);
                    }
                }
	public NodeAnnouncement clone() {
		number ret = bindings.NodeAnnouncement_clone(this.ptr);
		const ret_hu_conv: NodeAnnouncement = new NodeAnnouncement(null, ret);
		return ret_hu_conv;
	}

	public Uint8Array get_signature() {
		Uint8Array ret = bindings.NodeAnnouncement_get_signature(this.ptr);
		return ret;
	}

	public void set_signature(Uint8Array val) {
		bindings.NodeAnnouncement_set_signature(this.ptr, val);
	}

	public UnsignedNodeAnnouncement get_contents() {
		number ret = bindings.NodeAnnouncement_get_contents(this.ptr);
		const ret_hu_conv: UnsignedNodeAnnouncement = new UnsignedNodeAnnouncement(null, ret);
		return ret_hu_conv;
	}

	public void set_contents(UnsignedNodeAnnouncement val) {
		bindings.NodeAnnouncement_set_contents(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public static NodeAnnouncement constructor_new(Uint8Array signature_arg, UnsignedNodeAnnouncement contents_arg) {
		number ret = bindings.NodeAnnouncement_new(signature_arg, contents_arg == null ? 0 : contents_arg.ptr & ~1);
		const ret_hu_conv: NodeAnnouncement = new NodeAnnouncement(null, ret);
		ret_hu_conv.ptrs_to.add(contents_arg);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.NodeAnnouncement_write(this.ptr);
		return ret;
	}

	public static NodeAnnouncement constructor_read(Uint8Array ser) {
		number ret = bindings.NodeAnnouncement_read(ser);
		const ret_hu_conv: NodeAnnouncement = new NodeAnnouncement(null, ret);
		return ret_hu_conv;
	}

}
