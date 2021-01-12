
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class RouteHop extends CommonBase {
	RouteHop(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.RouteHop_free(ptr); }
	}

	public RouteHop clone() {
		uint32_t ret = bindings.RouteHop_clone(this.ptr);
		RouteHop ret_hu_conv = new RouteHop(null, ret);
		return ret_hu_conv;
	}

	public byte[] get_pubkey() {
		byte[] ret = bindings.RouteHop_get_pubkey(this.ptr);
		return ret;
	}

	public void set_pubkey(byte[] val) {
		bindings.RouteHop_set_pubkey(this.ptr, val);
	}

	public NodeFeatures get_node_features() {
		uint32_t ret = bindings.RouteHop_get_node_features(this.ptr);
		NodeFeatures ret_hu_conv = new NodeFeatures(null, ret);
		return ret_hu_conv;
	}

	public void set_node_features(NodeFeatures val) {
		bindings.RouteHop_set_node_features(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public long get_short_channel_id() {
		long ret = bindings.RouteHop_get_short_channel_id(this.ptr);
		return ret;
	}

	public void set_short_channel_id(long val) {
		bindings.RouteHop_set_short_channel_id(this.ptr, val);
	}

	public ChannelFeatures get_channel_features() {
		uint32_t ret = bindings.RouteHop_get_channel_features(this.ptr);
		ChannelFeatures ret_hu_conv = new ChannelFeatures(null, ret);
		return ret_hu_conv;
	}

	public void set_channel_features(ChannelFeatures val) {
		bindings.RouteHop_set_channel_features(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public long get_fee_msat() {
		long ret = bindings.RouteHop_get_fee_msat(this.ptr);
		return ret;
	}

	public void set_fee_msat(long val) {
		bindings.RouteHop_set_fee_msat(this.ptr, val);
	}

	public int get_cltv_expiry_delta() {
		int ret = bindings.RouteHop_get_cltv_expiry_delta(this.ptr);
		return ret;
	}

	public void set_cltv_expiry_delta(int val) {
		bindings.RouteHop_set_cltv_expiry_delta(this.ptr, val);
	}

	public static RouteHop constructor_new(byte[] pubkey_arg, NodeFeatures node_features_arg, long short_channel_id_arg, ChannelFeatures channel_features_arg, long fee_msat_arg, int cltv_expiry_delta_arg) {
		uint32_t ret = bindings.RouteHop_new(pubkey_arg, node_features_arg == null ? 0 : node_features_arg.ptr & ~1, short_channel_id_arg, channel_features_arg == null ? 0 : channel_features_arg.ptr & ~1, fee_msat_arg, cltv_expiry_delta_arg);
		RouteHop ret_hu_conv = new RouteHop(null, ret);
		ret_hu_conv.ptrs_to.add(node_features_arg);
		ret_hu_conv.ptrs_to.add(channel_features_arg);
		return ret_hu_conv;
	}

}
