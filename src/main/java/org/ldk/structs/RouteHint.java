package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * A channel descriptor which provides a last-hop route to get_route
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class RouteHint extends CommonBase {
	RouteHint(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.RouteHint_free(ptr); }
	}

	/**
	 * The node_id of the non-target end of the route
	 */
	public byte[] get_src_node_id() {
		byte[] ret = bindings.RouteHint_get_src_node_id(this.ptr);
		return ret;
	}

	/**
	 * The node_id of the non-target end of the route
	 */
	public void set_src_node_id(byte[] val) {
		bindings.RouteHint_set_src_node_id(this.ptr, val);
	}

	/**
	 * The short_channel_id of this channel
	 */
	public long get_short_channel_id() {
		long ret = bindings.RouteHint_get_short_channel_id(this.ptr);
		return ret;
	}

	/**
	 * The short_channel_id of this channel
	 */
	public void set_short_channel_id(long val) {
		bindings.RouteHint_set_short_channel_id(this.ptr, val);
	}

	/**
	 * The fees which must be paid to use this channel
	 */
	public RoutingFees get_fees() {
		long ret = bindings.RouteHint_get_fees(this.ptr);
		RoutingFees ret_hu_conv = new RoutingFees(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The fees which must be paid to use this channel
	 */
	public void set_fees(RoutingFees val) {
		bindings.RouteHint_set_fees(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	/**
	 * The difference in CLTV values between this node and the next node.
	 */
	public short get_cltv_expiry_delta() {
		short ret = bindings.RouteHint_get_cltv_expiry_delta(this.ptr);
		return ret;
	}

	/**
	 * The difference in CLTV values between this node and the next node.
	 */
	public void set_cltv_expiry_delta(short val) {
		bindings.RouteHint_set_cltv_expiry_delta(this.ptr, val);
	}

	/**
	 * The minimum value, in msat, which must be relayed to the next hop.
	 */
	public Option_u64Z get_htlc_minimum_msat() {
		long ret = bindings.RouteHint_get_htlc_minimum_msat(this.ptr);
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The minimum value, in msat, which must be relayed to the next hop.
	 */
	public void set_htlc_minimum_msat(Option_u64Z val) {
		bindings.RouteHint_set_htlc_minimum_msat(this.ptr, val.ptr);
	}

	/**
	 * The maximum value in msat available for routing with a single HTLC.
	 */
	public Option_u64Z get_htlc_maximum_msat() {
		long ret = bindings.RouteHint_get_htlc_maximum_msat(this.ptr);
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The maximum value in msat available for routing with a single HTLC.
	 */
	public void set_htlc_maximum_msat(Option_u64Z val) {
		bindings.RouteHint_set_htlc_maximum_msat(this.ptr, val.ptr);
	}

	/**
	 * Constructs a new RouteHint given each field
	 */
	public static RouteHint constructor_new(byte[] src_node_id_arg, long short_channel_id_arg, RoutingFees fees_arg, short cltv_expiry_delta_arg, Option_u64Z htlc_minimum_msat_arg, Option_u64Z htlc_maximum_msat_arg) {
		long ret = bindings.RouteHint_new(src_node_id_arg, short_channel_id_arg, fees_arg == null ? 0 : fees_arg.ptr & ~1, cltv_expiry_delta_arg, htlc_minimum_msat_arg.ptr, htlc_maximum_msat_arg.ptr);
		RouteHint ret_hu_conv = new RouteHint(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(fees_arg);
		return ret_hu_conv;
	}

	/**
	 * Creates a copy of the RouteHint
	 */
	public RouteHint clone() {
		long ret = bindings.RouteHint_clone(this.ptr);
		RouteHint ret_hu_conv = new RouteHint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
