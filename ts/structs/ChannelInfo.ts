
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ChannelInfo extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ChannelInfo_free(this.ptr);
                    }
                }
	public ChannelFeatures get_features() {
		number ret = bindings.ChannelInfo_get_features(this.ptr);
		const ret_hu_conv: ChannelFeatures = new ChannelFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_features(ChannelFeatures val) {
		bindings.ChannelInfo_set_features(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid this being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after this call, val is reset to null and is now a dummy object.
		val.ptr = 0;
	}

	public Uint8Array get_node_one() {
		Uint8Array ret = bindings.ChannelInfo_get_node_one(this.ptr);
		return ret;
	}

	public void set_node_one(Uint8Array val) {
		bindings.ChannelInfo_set_node_one(this.ptr, val);
	}

	public DirectionalChannelInfo get_one_to_two() {
		number ret = bindings.ChannelInfo_get_one_to_two(this.ptr);
		const ret_hu_conv: DirectionalChannelInfo = new DirectionalChannelInfo(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_one_to_two(DirectionalChannelInfo val) {
		bindings.ChannelInfo_set_one_to_two(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public Uint8Array get_node_two() {
		Uint8Array ret = bindings.ChannelInfo_get_node_two(this.ptr);
		return ret;
	}

	public void set_node_two(Uint8Array val) {
		bindings.ChannelInfo_set_node_two(this.ptr, val);
	}

	public DirectionalChannelInfo get_two_to_one() {
		number ret = bindings.ChannelInfo_get_two_to_one(this.ptr);
		const ret_hu_conv: DirectionalChannelInfo = new DirectionalChannelInfo(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_two_to_one(DirectionalChannelInfo val) {
		bindings.ChannelInfo_set_two_to_one(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public ChannelAnnouncement get_announcement_message() {
		number ret = bindings.ChannelInfo_get_announcement_message(this.ptr);
		const ret_hu_conv: ChannelAnnouncement = new ChannelAnnouncement(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_announcement_message(ChannelAnnouncement val) {
		bindings.ChannelInfo_set_announcement_message(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.ChannelInfo_write(this.ptr);
		return ret;
	}

	public static ChannelInfo constructor_read(Uint8Array ser) {
		number ret = bindings.ChannelInfo_read(ser);
		const ret_hu_conv: ChannelInfo = new ChannelInfo(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
