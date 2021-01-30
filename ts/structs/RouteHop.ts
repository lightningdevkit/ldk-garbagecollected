
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class RouteHop extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.RouteHop_free(this.ptr);
                    }
                }
	public RouteHop clone() {
		number ret = bindings.RouteHop_clone(this.ptr);
		const ret_hu_conv: RouteHop = new RouteHop(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array get_pubkey() {
		Uint8Array ret = bindings.RouteHop_get_pubkey(this.ptr);
		return ret;
	}

	public void set_pubkey(Uint8Array val) {
		bindings.RouteHop_set_pubkey(this.ptr, val);
	}

	public NodeFeatures get_node_features() {
		number ret = bindings.RouteHop_get_node_features(this.ptr);
		const ret_hu_conv: NodeFeatures = new NodeFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_node_features(NodeFeatures val) {
		bindings.RouteHop_set_node_features(this.ptr, val == null ? 0 : val.ptr & ~1);
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

	public number get_short_channel_id() {
		number ret = bindings.RouteHop_get_short_channel_id(this.ptr);
		return ret;
	}

	public void set_short_channel_id(number val) {
		bindings.RouteHop_set_short_channel_id(this.ptr, val);
	}

	public ChannelFeatures get_channel_features() {
		number ret = bindings.RouteHop_get_channel_features(this.ptr);
		const ret_hu_conv: ChannelFeatures = new ChannelFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_channel_features(ChannelFeatures val) {
		bindings.RouteHop_set_channel_features(this.ptr, val == null ? 0 : val.ptr & ~1);
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

	public number get_fee_msat() {
		number ret = bindings.RouteHop_get_fee_msat(this.ptr);
		return ret;
	}

	public void set_fee_msat(number val) {
		bindings.RouteHop_set_fee_msat(this.ptr, val);
	}

	public number get_cltv_expiry_delta() {
		number ret = bindings.RouteHop_get_cltv_expiry_delta(this.ptr);
		return ret;
	}

	public void set_cltv_expiry_delta(number val) {
		bindings.RouteHop_set_cltv_expiry_delta(this.ptr, val);
	}

	public static RouteHop constructor_new(Uint8Array pubkey_arg, NodeFeatures node_features_arg, number short_channel_id_arg, ChannelFeatures channel_features_arg, number fee_msat_arg, number cltv_expiry_delta_arg) {
		number ret = bindings.RouteHop_new(pubkey_arg, node_features_arg == null ? 0 : node_features_arg.ptr & ~1, short_channel_id_arg, channel_features_arg == null ? 0 : channel_features_arg.ptr & ~1, fee_msat_arg, cltv_expiry_delta_arg);
		const ret_hu_conv: RouteHop = new RouteHop(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(node_features_arg);
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid ret_hu_conv being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after ret_hu_conv call, node_features_arg is reset to null and is now a dummy object.
		node_features_arg.ptr = 0;
		ret_hu_conv.ptrs_to.add(channel_features_arg);
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid ret_hu_conv being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after ret_hu_conv call, channel_features_arg is reset to null and is now a dummy object.
		channel_features_arg.ptr = 0;
		return ret_hu_conv;
	}

}
