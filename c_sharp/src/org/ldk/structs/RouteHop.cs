using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A hop in a route, and additional metadata about it. \"Hop\" is defined as a node and the channel
 * that leads to it.
 */
public class RouteHop : CommonBase {
	internal RouteHop(object _dummy, long ptr) : base(ptr) { }
	~RouteHop() {
		if (ptr != 0) { bindings.RouteHop_free(ptr); }
	}

	/**
	 * The node_id of the node at this hop.
	 */
	public byte[] get_pubkey() {
		long ret = bindings.RouteHop_get_pubkey(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The node_id of the node at this hop.
	 */
	public void set_pubkey(byte[] val) {
		bindings.RouteHop_set_pubkey(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The node_announcement features of the node at this hop. For the last hop, these may be
	 * amended to match the features present in the invoice this node generated.
	 */
	public NodeFeatures get_node_features() {
		long ret = bindings.RouteHop_get_node_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The node_announcement features of the node at this hop. For the last hop, these may be
	 * amended to match the features present in the invoice this node generated.
	 */
	public void set_node_features(org.ldk.structs.NodeFeatures val) {
		bindings.RouteHop_set_node_features(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The channel that should be used from the previous hop to reach this node.
	 */
	public long get_short_channel_id() {
		long ret = bindings.RouteHop_get_short_channel_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The channel that should be used from the previous hop to reach this node.
	 */
	public void set_short_channel_id(long val) {
		bindings.RouteHop_set_short_channel_id(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The channel_announcement features of the channel that should be used from the previous hop
	 * to reach this node.
	 */
	public ChannelFeatures get_channel_features() {
		long ret = bindings.RouteHop_get_channel_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The channel_announcement features of the channel that should be used from the previous hop
	 * to reach this node.
	 */
	public void set_channel_features(org.ldk.structs.ChannelFeatures val) {
		bindings.RouteHop_set_channel_features(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The fee taken on this hop (for paying for the use of the *next* channel in the path).
	 * If this is the last hop in [`Path::hops`]:
	 * if we're sending to a [`BlindedPath`], this is the fee paid for use of the entire blinded path
	 * otherwise, this is the full value of this [`Path`]'s part of the payment
	 * 
	 * [`BlindedPath`]: crate::blinded_path::BlindedPath
	 */
	public long get_fee_msat() {
		long ret = bindings.RouteHop_get_fee_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The fee taken on this hop (for paying for the use of the *next* channel in the path).
	 * If this is the last hop in [`Path::hops`]:
	 * if we're sending to a [`BlindedPath`], this is the fee paid for use of the entire blinded path
	 * otherwise, this is the full value of this [`Path`]'s part of the payment
	 * 
	 * [`BlindedPath`]: crate::blinded_path::BlindedPath
	 */
	public void set_fee_msat(long val) {
		bindings.RouteHop_set_fee_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The CLTV delta added for this hop.
	 * If this is the last hop in [`Path::hops`]:
	 * if we're sending to a [`BlindedPath`], this is the CLTV delta for the entire blinded path
	 * otherwise, this is the CLTV delta expected at the destination
	 * 
	 * [`BlindedPath`]: crate::blinded_path::BlindedPath
	 */
	public int get_cltv_expiry_delta() {
		int ret = bindings.RouteHop_get_cltv_expiry_delta(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The CLTV delta added for this hop.
	 * If this is the last hop in [`Path::hops`]:
	 * if we're sending to a [`BlindedPath`], this is the CLTV delta for the entire blinded path
	 * otherwise, this is the CLTV delta expected at the destination
	 * 
	 * [`BlindedPath`]: crate::blinded_path::BlindedPath
	 */
	public void set_cltv_expiry_delta(int val) {
		bindings.RouteHop_set_cltv_expiry_delta(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Indicates whether this hop is possibly announced in the public network graph.
	 * 
	 * Will be `true` if there is a possibility that the channel is publicly known, i.e., if we
	 * either know for sure it's announced in the public graph, or if any public channels exist
	 * for which the given `short_channel_id` could be an alias for. Will be `false` if we believe
	 * the channel to be unannounced.
	 * 
	 * Will be `true` for objects serialized with LDK version 0.0.116 and before.
	 */
	public bool get_maybe_announced_channel() {
		bool ret = bindings.RouteHop_get_maybe_announced_channel(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Indicates whether this hop is possibly announced in the public network graph.
	 * 
	 * Will be `true` if there is a possibility that the channel is publicly known, i.e., if we
	 * either know for sure it's announced in the public graph, or if any public channels exist
	 * for which the given `short_channel_id` could be an alias for. Will be `false` if we believe
	 * the channel to be unannounced.
	 * 
	 * Will be `true` for objects serialized with LDK version 0.0.116 and before.
	 */
	public void set_maybe_announced_channel(bool val) {
		bindings.RouteHop_set_maybe_announced_channel(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new RouteHop given each field
	 */
	public static RouteHop of(byte[] pubkey_arg, org.ldk.structs.NodeFeatures node_features_arg, long short_channel_id_arg, org.ldk.structs.ChannelFeatures channel_features_arg, long fee_msat_arg, int cltv_expiry_delta_arg, bool maybe_announced_channel_arg) {
		long ret = bindings.RouteHop_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(pubkey_arg, 33)), node_features_arg == null ? 0 : node_features_arg.ptr, short_channel_id_arg, channel_features_arg == null ? 0 : channel_features_arg.ptr, fee_msat_arg, cltv_expiry_delta_arg, maybe_announced_channel_arg);
		GC.KeepAlive(pubkey_arg);
		GC.KeepAlive(node_features_arg);
		GC.KeepAlive(short_channel_id_arg);
		GC.KeepAlive(channel_features_arg);
		GC.KeepAlive(fee_msat_arg);
		GC.KeepAlive(cltv_expiry_delta_arg);
		GC.KeepAlive(maybe_announced_channel_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RouteHop ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RouteHop(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(node_features_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(channel_features_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.RouteHop_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the RouteHop
	 */
	public RouteHop clone() {
		long ret = bindings.RouteHop_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RouteHop ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RouteHop(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the RouteHop.
	 */
	public long hash() {
		long ret = bindings.RouteHop_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two RouteHops contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.RouteHop b) {
		bool ret = bindings.RouteHop_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is RouteHop)) return false;
		return this.eq((RouteHop)o);
	}
	/**
	 * Serialize the RouteHop object into a byte array which can be read by RouteHop_read
	 */
	public byte[] write() {
		long ret = bindings.RouteHop_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a RouteHop from a byte array, created by RouteHop_write
	 */
	public static Result_RouteHopDecodeErrorZ read(byte[] ser) {
		long ret = bindings.RouteHop_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteHopDecodeErrorZ ret_hu_conv = Result_RouteHopDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
