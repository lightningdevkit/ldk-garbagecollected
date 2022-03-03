package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Parameters needed to find a [`Route`].
 * 
 * Passed to [`find_route`] and also provided in [`Event::PaymentPathFailed`] for retrying a failed
 * payment path.
 * 
 * [`Event::PaymentPathFailed`]: crate::util::events::Event::PaymentPathFailed
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class RouteParameters extends CommonBase {
	RouteParameters(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.RouteParameters_free(ptr); }
	}

	/**
	 * The parameters of the failed payment path.
	 */
	public PaymentParameters get_payment_params() {
		long ret = bindings.RouteParameters_get_payment_params(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		PaymentParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new PaymentParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The parameters of the failed payment path.
	 */
	public void set_payment_params(PaymentParameters val) {
		bindings.RouteParameters_set_payment_params(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The amount in msats sent on the failed payment path.
	 */
	public long get_final_value_msat() {
		long ret = bindings.RouteParameters_get_final_value_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The amount in msats sent on the failed payment path.
	 */
	public void set_final_value_msat(long val) {
		bindings.RouteParameters_set_final_value_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The CLTV on the final hop of the failed payment path.
	 */
	public int get_final_cltv_expiry_delta() {
		int ret = bindings.RouteParameters_get_final_cltv_expiry_delta(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The CLTV on the final hop of the failed payment path.
	 */
	public void set_final_cltv_expiry_delta(int val) {
		bindings.RouteParameters_set_final_cltv_expiry_delta(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new RouteParameters given each field
	 */
	public static RouteParameters of(PaymentParameters payment_params_arg, long final_value_msat_arg, int final_cltv_expiry_delta_arg) {
		long ret = bindings.RouteParameters_new(payment_params_arg == null ? 0 : payment_params_arg.ptr & ~1, final_value_msat_arg, final_cltv_expiry_delta_arg);
		Reference.reachabilityFence(payment_params_arg);
		Reference.reachabilityFence(final_value_msat_arg);
		Reference.reachabilityFence(final_cltv_expiry_delta_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		RouteParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new RouteParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.RouteParameters_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the RouteParameters
	 */
	public RouteParameters clone() {
		long ret = bindings.RouteParameters_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		RouteParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new RouteParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the RouteParameters object into a byte array which can be read by RouteParameters_read
	 */
	public byte[] write() {
		byte[] ret = bindings.RouteParameters_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a RouteParameters from a byte array, created by RouteParameters_write
	 */
	public static Result_RouteParametersDecodeErrorZ read(byte[] ser) {
		long ret = bindings.RouteParameters_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteParametersDecodeErrorZ ret_hu_conv = Result_RouteParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
