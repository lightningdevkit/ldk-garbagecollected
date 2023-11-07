using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Parameters needed to find a [`Route`].
 * 
 * Passed to [`find_route`] and [`build_route_from_hops`].
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
	 * The maximum total fees, in millisatoshi, that may accrue during route finding.
	 * 
	 * This limit also applies to the total fees that may arise while retrying failed payment
	 * paths.
	 * 
	 * Note that values below a few sats may result in some paths being spuriously ignored.
	 */
	public Option_u64Z get_max_total_routing_fee_msat() {
		long ret = bindings.RouteParameters_get_max_total_routing_fee_msat(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The maximum total fees, in millisatoshi, that may accrue during route finding.
	 * 
	 * This limit also applies to the total fees that may arise while retrying failed payment
	 * paths.
	 * 
	 * Note that values below a few sats may result in some paths being spuriously ignored.
	 */
	public void set_max_total_routing_fee_msat(org.ldk.structs.Option_u64Z val) {
		bindings.RouteParameters_set_max_total_routing_fee_msat(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Constructs a new RouteParameters given each field
	 */
	public static RouteParameters of(org.ldk.structs.PaymentParameters payment_params_arg, long final_value_msat_arg, org.ldk.structs.Option_u64Z max_total_routing_fee_msat_arg) {
		long ret = bindings.RouteParameters_new(payment_params_arg == null ? 0 : payment_params_arg.ptr, final_value_msat_arg, max_total_routing_fee_msat_arg.ptr);
		GC.KeepAlive(payment_params_arg);
		GC.KeepAlive(final_value_msat_arg);
		GC.KeepAlive(max_total_routing_fee_msat_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RouteParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RouteParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(payment_params_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(max_total_routing_fee_msat_arg); };
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
	 * Generates a non-cryptographic 64-bit hash of the RouteParameters.
	 */
	public long hash() {
		long ret = bindings.RouteParameters_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two RouteParameterss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.RouteParameters b) {
		bool ret = bindings.RouteParameters_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is RouteParameters)) return false;
		return this.eq((RouteParameters)o);
	}
	/**
	 * Constructs [`RouteParameters`] from the given [`PaymentParameters`] and a payment amount.
	 * 
	 * [`Self::max_total_routing_fee_msat`] defaults to 1% of the payment amount + 50 sats
	 */
	public static RouteParameters from_payment_params_and_value(org.ldk.structs.PaymentParameters payment_params, long final_value_msat) {
		long ret = bindings.RouteParameters_from_payment_params_and_value(payment_params == null ? 0 : payment_params.ptr, final_value_msat);
		GC.KeepAlive(payment_params);
		GC.KeepAlive(final_value_msat);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RouteParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RouteParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(payment_params); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the RouteParameters object into a byte array which can be read by RouteParameters_read
	 */
	public byte[] write() {
		long ret = bindings.RouteParameters_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a RouteParameters from a byte array, created by RouteParameters_write
	 */
	public static Result_RouteParametersDecodeErrorZ read(byte[] ser) {
		long ret = bindings.RouteParameters_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteParametersDecodeErrorZ ret_hu_conv = Result_RouteParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
