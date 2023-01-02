using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Parameters needed to find a [`Route`].
 * 
 * Passed to [`find_route`] and [`build_route_from_hops`], but also provided in
 * [`Event::PaymentPathFailed`] for retrying a failed payment path.
 * 
 * [`Event::PaymentPathFailed`]: crate::util::events::Event::PaymentPathFailed
 */
public class RouteParameters : CommonBase {
	internal RouteParameters(object _dummy, long ptr) : base(ptr) { }
	~RouteParameters() {
		if (ptr != 0) { bindings.RouteParameters_free(ptr); }
	}

	/**
	 * The parameters of the failed payment path.
	 */
	public PaymentParameters get_payment_params() {
		long ret = bindings.RouteParameters_get_payment_params(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PaymentParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The parameters of the failed payment path.
	 */
	public void set_payment_params(org.ldk.structs.PaymentParameters val) {
		bindings.RouteParameters_set_payment_params(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The amount in msats sent on the failed payment path.
	 */
	public long get_final_value_msat() {
		long ret = bindings.RouteParameters_get_final_value_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The amount in msats sent on the failed payment path.
	 */
	public void set_final_value_msat(long val) {
		bindings.RouteParameters_set_final_value_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The CLTV on the final hop of the failed payment path.
	 */
	public int get_final_cltv_expiry_delta() {
		int ret = bindings.RouteParameters_get_final_cltv_expiry_delta(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The CLTV on the final hop of the failed payment path.
	 */
	public void set_final_cltv_expiry_delta(int val) {
		bindings.RouteParameters_set_final_cltv_expiry_delta(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new RouteParameters given each field
	 */
	public static RouteParameters of(org.ldk.structs.PaymentParameters payment_params_arg, long final_value_msat_arg, int final_cltv_expiry_delta_arg) {
		long ret = bindings.RouteParameters_new(payment_params_arg == null ? 0 : payment_params_arg.ptr, final_value_msat_arg, final_cltv_expiry_delta_arg);
		GC.KeepAlive(payment_params_arg);
		GC.KeepAlive(final_value_msat_arg);
		GC.KeepAlive(final_cltv_expiry_delta_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RouteParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RouteParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(payment_params_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.RouteParameters_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the RouteParameters
	 */
	public RouteParameters clone() {
		long ret = bindings.RouteParameters_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RouteParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RouteParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the RouteParameters object into a byte array which can be read by RouteParameters_read
	 */
	public byte[] write() {
		byte[] ret = bindings.RouteParameters_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a RouteParameters from a byte array, created by RouteParameters_write
	 */
	public static Result_RouteParametersDecodeErrorZ read(byte[] ser) {
		long ret = bindings.RouteParameters_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteParametersDecodeErrorZ ret_hu_conv = Result_RouteParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
