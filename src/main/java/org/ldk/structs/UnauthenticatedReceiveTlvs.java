package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An unauthenticated [`ReceiveTlvs`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class UnauthenticatedReceiveTlvs extends CommonBase {
	UnauthenticatedReceiveTlvs(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UnauthenticatedReceiveTlvs_free(ptr); }
	}

	/**
	 * Used to authenticate the sender of a payment to the receiver and tie MPP HTLCs together.
	 */
	public byte[] get_payment_secret() {
		byte[] ret = bindings.UnauthenticatedReceiveTlvs_get_payment_secret(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Used to authenticate the sender of a payment to the receiver and tie MPP HTLCs together.
	 */
	public void set_payment_secret(byte[] val) {
		bindings.UnauthenticatedReceiveTlvs_set_payment_secret(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constraints for the receiver of this payment.
	 */
	public PaymentConstraints get_payment_constraints() {
		long ret = bindings.UnauthenticatedReceiveTlvs_get_payment_constraints(this.ptr);
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
		bindings.UnauthenticatedReceiveTlvs_set_payment_constraints(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Context for the receiver of this payment.
	 */
	public PaymentContext get_payment_context() {
		long ret = bindings.UnauthenticatedReceiveTlvs_get_payment_context(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentContext ret_hu_conv = org.ldk.structs.PaymentContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Context for the receiver of this payment.
	 */
	public void set_payment_context(org.ldk.structs.PaymentContext val) {
		bindings.UnauthenticatedReceiveTlvs_set_payment_context(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new UnauthenticatedReceiveTlvs given each field
	 */
	public static UnauthenticatedReceiveTlvs of(byte[] payment_secret_arg, org.ldk.structs.PaymentConstraints payment_constraints_arg, org.ldk.structs.PaymentContext payment_context_arg) {
		long ret = bindings.UnauthenticatedReceiveTlvs_new(InternalUtils.check_arr_len(payment_secret_arg, 32), payment_constraints_arg.ptr, payment_context_arg.ptr);
		Reference.reachabilityFence(payment_secret_arg);
		Reference.reachabilityFence(payment_constraints_arg);
		Reference.reachabilityFence(payment_context_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnauthenticatedReceiveTlvs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UnauthenticatedReceiveTlvs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.UnauthenticatedReceiveTlvs_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the UnauthenticatedReceiveTlvs
	 */
	public UnauthenticatedReceiveTlvs clone() {
		long ret = bindings.UnauthenticatedReceiveTlvs_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnauthenticatedReceiveTlvs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UnauthenticatedReceiveTlvs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates an authenticated [`ReceiveTlvs`], which includes an HMAC and the provide [`Nonce`]
	 * that can be use later to verify it authenticity.
	 */
	public ReceiveTlvs authenticate(org.ldk.structs.Nonce nonce, org.ldk.structs.ExpandedKey expanded_key) {
		long ret = bindings.UnauthenticatedReceiveTlvs_authenticate(this.ptr, nonce.ptr, expanded_key.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(nonce);
		Reference.reachabilityFence(expanded_key);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ReceiveTlvs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ReceiveTlvs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		;
		return ret_hu_conv;
	}

	/**
	 * Serialize the UnauthenticatedReceiveTlvs object into a byte array which can be read by UnauthenticatedReceiveTlvs_read
	 */
	public byte[] write() {
		byte[] ret = bindings.UnauthenticatedReceiveTlvs_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Constructs a new Verification which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Verification must be freed before this_arg is
	 */
	public Verification as_Verification() {
		long ret = bindings.UnauthenticatedReceiveTlvs_as_Verification(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Verification ret_hu_conv = new Verification(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
