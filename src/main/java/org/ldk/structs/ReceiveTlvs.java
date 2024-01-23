package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Data to construct a [`BlindedHop`] for receiving a payment. This payload is custom to LDK and
 * may not be valid if received by another lightning implementation.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ReceiveTlvs extends CommonBase {
	ReceiveTlvs(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ReceiveTlvs_free(ptr); }
	}

	/**
	 * Used to authenticate the sender of a payment to the receiver and tie MPP HTLCs together.
	 */
	public byte[] get_payment_secret() {
		byte[] ret = bindings.ReceiveTlvs_get_payment_secret(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Used to authenticate the sender of a payment to the receiver and tie MPP HTLCs together.
	 */
	public void set_payment_secret(byte[] val) {
		bindings.ReceiveTlvs_set_payment_secret(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constraints for the receiver of this payment.
	 */
	public PaymentConstraints get_payment_constraints() {
		long ret = bindings.ReceiveTlvs_get_payment_constraints(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentConstraints ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PaymentConstraints(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constraints for the receiver of this payment.
	 */
	public void set_payment_constraints(org.ldk.structs.PaymentConstraints val) {
		bindings.ReceiveTlvs_set_payment_constraints(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Constructs a new ReceiveTlvs given each field
	 */
	public static ReceiveTlvs of(byte[] payment_secret_arg, org.ldk.structs.PaymentConstraints payment_constraints_arg) {
		long ret = bindings.ReceiveTlvs_new(InternalUtils.check_arr_len(payment_secret_arg, 32), payment_constraints_arg == null ? 0 : payment_constraints_arg.ptr);
		Reference.reachabilityFence(payment_secret_arg);
		Reference.reachabilityFence(payment_constraints_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ReceiveTlvs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ReceiveTlvs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(payment_constraints_arg); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ReceiveTlvs_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ReceiveTlvs
	 */
	public ReceiveTlvs clone() {
		long ret = bindings.ReceiveTlvs_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ReceiveTlvs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ReceiveTlvs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the ReceiveTlvs object into a byte array which can be read by ReceiveTlvs_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ReceiveTlvs_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
