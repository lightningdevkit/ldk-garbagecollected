using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Constraints for relaying over a given [`BlindedHop`].
 * 
 * [`BlindedHop`]: crate::blinded_path::BlindedHop
 */
public class PaymentConstraints : CommonBase {
	internal PaymentConstraints(object _dummy, long ptr) : base(ptr) { }
	~PaymentConstraints() {
		if (ptr != 0) { bindings.PaymentConstraints_free(ptr); }
	}

	/**
	 * The maximum total CLTV that is acceptable when relaying a payment over this [`BlindedHop`].
	 */
	public int get_max_cltv_expiry() {
		int ret = bindings.PaymentConstraints_get_max_cltv_expiry(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The maximum total CLTV that is acceptable when relaying a payment over this [`BlindedHop`].
	 */
	public void set_max_cltv_expiry(int val) {
		bindings.PaymentConstraints_set_max_cltv_expiry(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The minimum value, in msat, that may be accepted by the node corresponding to this
	 * [`BlindedHop`].
	 */
	public long get_htlc_minimum_msat() {
		long ret = bindings.PaymentConstraints_get_htlc_minimum_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The minimum value, in msat, that may be accepted by the node corresponding to this
	 * [`BlindedHop`].
	 */
	public void set_htlc_minimum_msat(long val) {
		bindings.PaymentConstraints_set_htlc_minimum_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new PaymentConstraints given each field
	 */
	public static PaymentConstraints of(int max_cltv_expiry_arg, long htlc_minimum_msat_arg) {
		long ret = bindings.PaymentConstraints_new(max_cltv_expiry_arg, htlc_minimum_msat_arg);
		GC.KeepAlive(max_cltv_expiry_arg);
		GC.KeepAlive(htlc_minimum_msat_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentConstraints ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PaymentConstraints(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.PaymentConstraints_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the PaymentConstraints
	 */
	public PaymentConstraints clone() {
		long ret = bindings.PaymentConstraints_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentConstraints ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PaymentConstraints(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the PaymentConstraints object into a byte array which can be read by PaymentConstraints_read
	 */
	public byte[] write() {
		long ret = bindings.PaymentConstraints_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a PaymentConstraints from a byte array, created by PaymentConstraints_write
	 */
	public static Result_PaymentConstraintsDecodeErrorZ read(byte[] ser) {
		long ret = bindings.PaymentConstraints_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentConstraintsDecodeErrorZ ret_hu_conv = Result_PaymentConstraintsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
