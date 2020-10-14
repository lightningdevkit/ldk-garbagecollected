package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class RouteHint extends CommonBase {
	RouteHint(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.RouteHint_free(ptr);
	}

	public RouteHint(RouteHint orig) {
		super(bindings.RouteHint_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_src_node_id(RouteHint this_ptr) {
		byte[] ret = bindings.RouteHint_get_src_node_id(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_src_node_id(RouteHint this_ptr, byte[] val) {
		bindings.RouteHint_set_src_node_id(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_short_channel_id(RouteHint this_ptr) {
		long ret = bindings.RouteHint_get_short_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_short_channel_id(RouteHint this_ptr, long val) {
		bindings.RouteHint_set_short_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public RoutingFees get_fees(RouteHint this_ptr) {
		RoutingFees ret = new RoutingFees(null, bindings.RouteHint_get_fees(this_ptr == null ? 0 : this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_fees(RouteHint this_ptr, RoutingFees val) {
		bindings.RouteHint_set_fees(this_ptr == null ? 0 : this_ptr.ptr & ~1, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	public short get_cltv_expiry_delta(RouteHint this_ptr) {
		short ret = bindings.RouteHint_get_cltv_expiry_delta(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_cltv_expiry_delta(RouteHint this_ptr, short val) {
		bindings.RouteHint_set_cltv_expiry_delta(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_htlc_minimum_msat(RouteHint this_ptr) {
		long ret = bindings.RouteHint_get_htlc_minimum_msat(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_htlc_minimum_msat(RouteHint this_ptr, long val) {
		bindings.RouteHint_set_htlc_minimum_msat(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public RouteHint(byte[] src_node_id_arg, long short_channel_id_arg, RoutingFees fees_arg, short cltv_expiry_delta_arg, long htlc_minimum_msat_arg) {
		super(bindings.RouteHint_new(src_node_id_arg, short_channel_id_arg, fees_arg == null ? 0 : fees_arg.ptr & ~1, cltv_expiry_delta_arg, htlc_minimum_msat_arg));
		this.ptrs_to.add(fees_arg);
	}

}
