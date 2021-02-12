
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class UnsignedNodeAnnouncement extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.UnsignedNodeAnnouncement_free(this.ptr);
                    }
                }
	public NodeFeatures get_features() {
		number ret = bindings.UnsignedNodeAnnouncement_get_features(this.ptr);
		const ret_hu_conv: NodeFeatures = new NodeFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_features(NodeFeatures val) {
		bindings.UnsignedNodeAnnouncement_set_features(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public number get_timestamp() {
		number ret = bindings.UnsignedNodeAnnouncement_get_timestamp(this.ptr);
		return ret;
	}

	public void set_timestamp(number val) {
		bindings.UnsignedNodeAnnouncement_set_timestamp(this.ptr, val);
	}

	public Uint8Array get_node_id() {
		Uint8Array ret = bindings.UnsignedNodeAnnouncement_get_node_id(this.ptr);
		return ret;
	}

	public void set_node_id(Uint8Array val) {
		bindings.UnsignedNodeAnnouncement_set_node_id(this.ptr, val);
	}

	public Uint8Array get_rgb() {
		Uint8Array ret = bindings.UnsignedNodeAnnouncement_get_rgb(this.ptr);
		return ret;
	}

	public void set_rgb(Uint8Array val) {
		bindings.UnsignedNodeAnnouncement_set_rgb(this.ptr, val);
	}

	public Uint8Array get_alias() {
		Uint8Array ret = bindings.UnsignedNodeAnnouncement_get_alias(this.ptr);
		return ret;
	}

	public void set_alias(Uint8Array val) {
		bindings.UnsignedNodeAnnouncement_set_alias(this.ptr, val);
	}

	public void set_addresses(NetAddress[] val) {
		bindings.UnsignedNodeAnnouncement_set_addresses(this.ptr, Arrays.stream(val).map(arr_conv_12 -> arr_conv_12.ptr).toArray(number[]::new));
		/* TODO 2 NetAddress  */;
	}

	public UnsignedNodeAnnouncement clone() {
		number ret = bindings.UnsignedNodeAnnouncement_clone(this.ptr);
		const ret_hu_conv: UnsignedNodeAnnouncement = new UnsignedNodeAnnouncement(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.UnsignedNodeAnnouncement_write(this.ptr);
		return ret;
	}

	public static Result_UnsignedNodeAnnouncementDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.UnsignedNodeAnnouncement_read(ser);
		Result_UnsignedNodeAnnouncementDecodeErrorZ ret_hu_conv = Result_UnsignedNodeAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
