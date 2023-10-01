package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Constraints for relaying over a given [`BlindedHop`].
 * 
 * [`BlindedHop`]: crate::blinded_path::BlindedHop
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PaymentConstraints extends CommonBase {
	PaymentConstraints(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PaymentConstraints_free(ptr); }
	}

	/**
	 * The maximum total CLTV delta that is acceptable when relaying a payment over this
	 * [`BlindedHop`].
	 */
	public int get_max_cltv_expiry() {
		int ret = bindings.PaymentConstraints_get_max_cltv_expiry(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The maximum total CLTV delta that is acceptable when relaying a payment over this
	 * [`BlindedHop`].
	 */
	public void set_max_cltv_expiry(int val) {
		bindings.PaymentConstraints_set_max_cltv_expiry(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The minimum value, in msat, that may be accepted by the node corresponding to this
	 * [`BlindedHop`].
	 */
	public long get_htlc_minimum_msat() {
		long ret = bindings.PaymentConstraints_get_htlc_minimum_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The minimum value, in msat, that may be accepted by the node corresponding to this
	 * [`BlindedHop`].
	 */
	public void set_htlc_minimum_msat(long val) {
		bindings.PaymentConstraints_set_htlc_minimum_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new PaymentConstraints given each field
	 */
	public static PaymentConstraints of(int max_cltv_expiry_arg, long htlc_minimum_msat_arg) {
		long ret = bindings.PaymentConstraints_new(max_cltv_expiry_arg, htlc_minimum_msat_arg);
		Reference.reachabilityFence(max_cltv_expiry_arg);
		Reference.reachabilityFence(htlc_minimum_msat_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentConstraints ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PaymentConstraints(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.PaymentConstraints_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the PaymentConstraints
	 */
	public PaymentConstraints clone() {
		long ret = bindings.PaymentConstraints_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentConstraints ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PaymentConstraints(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the PaymentConstraints object into a byte array which can be read by PaymentConstraints_read
	 */
	public byte[] write() {
		byte[] ret = bindings.PaymentConstraints_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a PaymentConstraints from a byte array, created by PaymentConstraints_write
	 */
	public static Result_PaymentConstraintsDecodeErrorZ read(byte[] ser) {
		long ret = bindings.PaymentConstraints_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentConstraintsDecodeErrorZ ret_hu_conv = Result_PaymentConstraintsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
