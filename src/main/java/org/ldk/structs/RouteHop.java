package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A hop in a route
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class RouteHop extends CommonBase {
	RouteHop(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.RouteHop_free(ptr); }
	}

	/**
	 * The node_id of the node at this hop.
	 */
	public byte[] get_pubkey() {
		byte[] ret = bindings.RouteHop_get_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The node_id of the node at this hop.
	 */
	public void set_pubkey(byte[] val) {
		bindings.RouteHop_set_pubkey(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The node_announcement features of the node at this hop. For the last hop, these may be
	 * amended to match the features present in the invoice this node generated.
	 */
	public NodeFeatures get_node_features() {
		long ret = bindings.RouteHop_get_node_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		NodeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new NodeFeatures(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The node_announcement features of the node at this hop. For the last hop, these may be
	 * amended to match the features present in the invoice this node generated.
	 */
	public void set_node_features(NodeFeatures val) {
		bindings.RouteHop_set_node_features(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The channel that should be used from the previous hop to reach this node.
	 */
	public long get_short_channel_id() {
		long ret = bindings.RouteHop_get_short_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel that should be used from the previous hop to reach this node.
	 */
	public void set_short_channel_id(long val) {
		bindings.RouteHop_set_short_channel_id(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The channel_announcement features of the channel that should be used from the previous hop
	 * to reach this node.
	 */
	public ChannelFeatures get_channel_features() {
		long ret = bindings.RouteHop_get_channel_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelFeatures(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The channel_announcement features of the channel that should be used from the previous hop
	 * to reach this node.
	 */
	public void set_channel_features(ChannelFeatures val) {
		bindings.RouteHop_set_channel_features(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The fee taken on this hop (for paying for the use of the *next* channel in the path).
	 * For the last hop, this should be the full value of the payment (might be more than
	 * requested if we had to match htlc_minimum_msat).
	 */
	public long get_fee_msat() {
		long ret = bindings.RouteHop_get_fee_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The fee taken on this hop (for paying for the use of the *next* channel in the path).
	 * For the last hop, this should be the full value of the payment (might be more than
	 * requested if we had to match htlc_minimum_msat).
	 */
	public void set_fee_msat(long val) {
		bindings.RouteHop_set_fee_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The CLTV delta added for this hop. For the last hop, this should be the full CLTV value
	 * expected at the destination, in excess of the current block height.
	 */
	public int get_cltv_expiry_delta() {
		int ret = bindings.RouteHop_get_cltv_expiry_delta(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The CLTV delta added for this hop. For the last hop, this should be the full CLTV value
	 * expected at the destination, in excess of the current block height.
	 */
	public void set_cltv_expiry_delta(int val) {
		bindings.RouteHop_set_cltv_expiry_delta(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new RouteHop given each field
	 */
	public static RouteHop of(byte[] pubkey_arg, NodeFeatures node_features_arg, long short_channel_id_arg, ChannelFeatures channel_features_arg, long fee_msat_arg, int cltv_expiry_delta_arg) {
		long ret = bindings.RouteHop_new(InternalUtils.check_arr_len(pubkey_arg, 33), node_features_arg == null ? 0 : node_features_arg.ptr & ~1, short_channel_id_arg, channel_features_arg == null ? 0 : channel_features_arg.ptr & ~1, fee_msat_arg, cltv_expiry_delta_arg);
		Reference.reachabilityFence(pubkey_arg);
		Reference.reachabilityFence(node_features_arg);
		Reference.reachabilityFence(short_channel_id_arg);
		Reference.reachabilityFence(channel_features_arg);
		Reference.reachabilityFence(fee_msat_arg);
		Reference.reachabilityFence(cltv_expiry_delta_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		RouteHop ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new RouteHop(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.RouteHop_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the RouteHop
	 */
	public RouteHop clone() {
		long ret = bindings.RouteHop_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		RouteHop ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new RouteHop(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two RouteHops contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.RouteHop_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two RouteHops contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(RouteHop b) {
		boolean ret = bindings.RouteHop_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		this.ptrs_to.add(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof RouteHop)) return false;
		return this.eq((RouteHop)o);
	}
	/**
	 * Serialize the RouteHop object into a byte array which can be read by RouteHop_read
	 */
	public byte[] write() {
		byte[] ret = bindings.RouteHop_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a RouteHop from a byte array, created by RouteHop_write
	 */
	public static Result_RouteHopDecodeErrorZ read(byte[] ser) {
		long ret = bindings.RouteHop_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteHopDecodeErrorZ ret_hu_conv = Result_RouteHopDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
