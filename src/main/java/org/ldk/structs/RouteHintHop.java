package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A channel descriptor for a hop along a payment path.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class RouteHintHop extends CommonBase {
	RouteHintHop(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.RouteHintHop_free(ptr); }
	}

	/**
	 * The node_id of the non-target end of the route
	 */
	public byte[] get_src_node_id() {
		byte[] ret = bindings.RouteHintHop_get_src_node_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The node_id of the non-target end of the route
	 */
	public void set_src_node_id(byte[] val) {
		bindings.RouteHintHop_set_src_node_id(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The short_channel_id of this channel
	 */
	public long get_short_channel_id() {
		long ret = bindings.RouteHintHop_get_short_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The short_channel_id of this channel
	 */
	public void set_short_channel_id(long val) {
		bindings.RouteHintHop_set_short_channel_id(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The fees which must be paid to use this channel
	 */
	public RoutingFees get_fees() {
		long ret = bindings.RouteHintHop_get_fees(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		RoutingFees ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new RoutingFees(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The fees which must be paid to use this channel
	 */
	public void set_fees(RoutingFees val) {
		bindings.RouteHintHop_set_fees(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The difference in CLTV values between this node and the next node.
	 */
	public short get_cltv_expiry_delta() {
		short ret = bindings.RouteHintHop_get_cltv_expiry_delta(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The difference in CLTV values between this node and the next node.
	 */
	public void set_cltv_expiry_delta(short val) {
		bindings.RouteHintHop_set_cltv_expiry_delta(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The minimum value, in msat, which must be relayed to the next hop.
	 */
	public Option_u64Z get_htlc_minimum_msat() {
		long ret = bindings.RouteHintHop_get_htlc_minimum_msat(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The minimum value, in msat, which must be relayed to the next hop.
	 */
	public void set_htlc_minimum_msat(Option_u64Z val) {
		bindings.RouteHintHop_set_htlc_minimum_msat(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The maximum value in msat available for routing with a single HTLC.
	 */
	public Option_u64Z get_htlc_maximum_msat() {
		long ret = bindings.RouteHintHop_get_htlc_maximum_msat(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The maximum value in msat available for routing with a single HTLC.
	 */
	public void set_htlc_maximum_msat(Option_u64Z val) {
		bindings.RouteHintHop_set_htlc_maximum_msat(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new RouteHintHop given each field
	 */
	public static RouteHintHop of(byte[] src_node_id_arg, long short_channel_id_arg, RoutingFees fees_arg, short cltv_expiry_delta_arg, Option_u64Z htlc_minimum_msat_arg, Option_u64Z htlc_maximum_msat_arg) {
		long ret = bindings.RouteHintHop_new(InternalUtils.check_arr_len(src_node_id_arg, 33), short_channel_id_arg, fees_arg == null ? 0 : fees_arg.ptr & ~1, cltv_expiry_delta_arg, htlc_minimum_msat_arg.ptr, htlc_maximum_msat_arg.ptr);
		Reference.reachabilityFence(src_node_id_arg);
		Reference.reachabilityFence(short_channel_id_arg);
		Reference.reachabilityFence(fees_arg);
		Reference.reachabilityFence(cltv_expiry_delta_arg);
		Reference.reachabilityFence(htlc_minimum_msat_arg);
		Reference.reachabilityFence(htlc_maximum_msat_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		RouteHintHop ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new RouteHintHop(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.RouteHintHop_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the RouteHintHop
	 */
	public RouteHintHop clone() {
		long ret = bindings.RouteHintHop_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		RouteHintHop ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new RouteHintHop(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two RouteHintHops contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.RouteHintHop_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two RouteHintHops contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(RouteHintHop b) {
		boolean ret = bindings.RouteHintHop_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		this.ptrs_to.add(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof RouteHintHop)) return false;
		return this.eq((RouteHintHop)o);
	}
	/**
	 * Serialize the RouteHintHop object into a byte array which can be read by RouteHintHop_read
	 */
	public byte[] write() {
		byte[] ret = bindings.RouteHintHop_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a RouteHintHop from a byte array, created by RouteHintHop_write
	 */
	public static Result_RouteHintHopDecodeErrorZ read(byte[] ser) {
		long ret = bindings.RouteHintHop_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteHintHopDecodeErrorZ ret_hu_conv = Result_RouteHintHopDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
