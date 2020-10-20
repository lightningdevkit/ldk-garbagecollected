package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class RouteHop extends CommonBase {
	RouteHop(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.RouteHop_free(ptr);
	}

	public static RouteHop constructor_clone(RouteHop orig) {
		long ret = bindings.RouteHop_clone(orig == null ? 0 : orig.ptr & ~1);
		RouteHop ret_hu_conv = new RouteHop(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
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
		long ret = bindings.RouteHop_get_node_features(this.ptr);
		NodeFeatures ret_hu_conv = new NodeFeatures(null, ret);
		return ret_hu_conv;
	}

	// Skipped RouteHop_set_node_features
	public long get_short_channel_id() {
		long ret = bindings.RouteHop_get_short_channel_id(this.ptr);
		return ret;
	}

	public void set_short_channel_id(long val) {
		bindings.RouteHop_set_short_channel_id(this.ptr, val);
	}

	public ChannelFeatures get_channel_features() {
		long ret = bindings.RouteHop_get_channel_features(this.ptr);
		ChannelFeatures ret_hu_conv = new ChannelFeatures(null, ret);
		return ret_hu_conv;
	}

	// Skipped RouteHop_set_channel_features
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

	// Skipped RouteHop_new
}
