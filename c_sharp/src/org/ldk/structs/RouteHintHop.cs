using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A channel descriptor for a hop along a payment path.
 */
public class RouteHintHop : CommonBase {
	internal RouteHintHop(object _dummy, long ptr) : base(ptr) { }
	~RouteHintHop() {
		if (ptr != 0) { bindings.RouteHintHop_free(ptr); }
	}

	/**
	 * The node_id of the non-target end of the route
	 */
	public byte[] get_src_node_id() {
		byte[] ret = bindings.RouteHintHop_get_src_node_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The node_id of the non-target end of the route
	 */
	public void set_src_node_id(byte[] val) {
		bindings.RouteHintHop_set_src_node_id(this.ptr, InternalUtils.check_arr_len(val, 33));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The short_channel_id of this channel
	 */
	public long get_short_channel_id() {
		long ret = bindings.RouteHintHop_get_short_channel_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The short_channel_id of this channel
	 */
	public void set_short_channel_id(long val) {
		bindings.RouteHintHop_set_short_channel_id(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The fees which must be paid to use this channel
	 */
	public RoutingFees get_fees() {
		long ret = bindings.RouteHintHop_get_fees(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RoutingFees ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RoutingFees(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The fees which must be paid to use this channel
	 */
	public void set_fees(org.ldk.structs.RoutingFees val) {
		bindings.RouteHintHop_set_fees(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The difference in CLTV values between this node and the next node.
	 */
	public short get_cltv_expiry_delta() {
		short ret = bindings.RouteHintHop_get_cltv_expiry_delta(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The difference in CLTV values between this node and the next node.
	 */
	public void set_cltv_expiry_delta(short val) {
		bindings.RouteHintHop_set_cltv_expiry_delta(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The minimum value, in msat, which must be relayed to the next hop.
	 */
	public Option_u64Z get_htlc_minimum_msat() {
		long ret = bindings.RouteHintHop_get_htlc_minimum_msat(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The minimum value, in msat, which must be relayed to the next hop.
	 */
	public void set_htlc_minimum_msat(org.ldk.structs.Option_u64Z val) {
		bindings.RouteHintHop_set_htlc_minimum_msat(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The maximum value in msat available for routing with a single HTLC.
	 */
	public Option_u64Z get_htlc_maximum_msat() {
		long ret = bindings.RouteHintHop_get_htlc_maximum_msat(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The maximum value in msat available for routing with a single HTLC.
	 */
	public void set_htlc_maximum_msat(org.ldk.structs.Option_u64Z val) {
		bindings.RouteHintHop_set_htlc_maximum_msat(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new RouteHintHop given each field
	 */
	public static RouteHintHop of(byte[] src_node_id_arg, long short_channel_id_arg, org.ldk.structs.RoutingFees fees_arg, short cltv_expiry_delta_arg, org.ldk.structs.Option_u64Z htlc_minimum_msat_arg, org.ldk.structs.Option_u64Z htlc_maximum_msat_arg) {
		long ret = bindings.RouteHintHop_new(InternalUtils.check_arr_len(src_node_id_arg, 33), short_channel_id_arg, fees_arg == null ? 0 : fees_arg.ptr, cltv_expiry_delta_arg, htlc_minimum_msat_arg.ptr, htlc_maximum_msat_arg.ptr);
		GC.KeepAlive(src_node_id_arg);
		GC.KeepAlive(short_channel_id_arg);
		GC.KeepAlive(fees_arg);
		GC.KeepAlive(cltv_expiry_delta_arg);
		GC.KeepAlive(htlc_minimum_msat_arg);
		GC.KeepAlive(htlc_maximum_msat_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RouteHintHop ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RouteHintHop(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(fees_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.RouteHintHop_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the RouteHintHop
	 */
	public RouteHintHop clone() {
		long ret = bindings.RouteHintHop_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RouteHintHop ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RouteHintHop(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two RouteHintHops contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.RouteHintHop_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two RouteHintHops contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.RouteHintHop b) {
		bool ret = bindings.RouteHintHop_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is RouteHintHop)) return false;
		return this.eq((RouteHintHop)o);
	}
	/**
	 * Serialize the RouteHintHop object into a byte array which can be read by RouteHintHop_read
	 */
	public byte[] write() {
		byte[] ret = bindings.RouteHintHop_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a RouteHintHop from a byte array, created by RouteHintHop_write
	 */
	public static Result_RouteHintHopDecodeErrorZ read(byte[] ser) {
		long ret = bindings.RouteHintHop_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteHintHopDecodeErrorZ ret_hu_conv = Result_RouteHintHopDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
