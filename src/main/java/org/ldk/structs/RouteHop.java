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
		if (ptr != 0) { bindings.RouteHop_free(ptr); }
	}

	public RouteHop clone() {
		long ret = bindings.RouteHop_clone(this.ptr);
		RouteHop ret_hu_conv = new RouteHop(null, ret);
		ret_hu_conv.ptrs_to.add(this);
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
		long ret = bindings.RouteHop_new(pubkey_arg, node_features_arg == null ? 0 : node_features_arg.ptr & ~1, short_channel_id_arg, channel_features_arg == null ? 0 : channel_features_arg.ptr & ~1, fee_msat_arg, cltv_expiry_delta_arg);
		RouteHop ret_hu_conv = new RouteHop(null, ret);
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
