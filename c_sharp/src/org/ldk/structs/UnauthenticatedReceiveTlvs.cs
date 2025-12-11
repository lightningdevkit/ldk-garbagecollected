using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * An unauthenticated [`ReceiveTlvs`].
 */
public class UnauthenticatedReceiveTlvs : CommonBase {
	internal UnauthenticatedReceiveTlvs(object _dummy, long ptr) : base(ptr) { }
	~UnauthenticatedReceiveTlvs() {
		if (ptr != 0) { bindings.UnauthenticatedReceiveTlvs_free(ptr); }
	}

	/**
	 * Used to authenticate the sender of a payment to the receiver and tie MPP HTLCs together.
	 */
	public byte[] get_payment_secret() {
		long ret = bindings.UnauthenticatedReceiveTlvs_get_payment_secret(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Used to authenticate the sender of a payment to the receiver and tie MPP HTLCs together.
	 */
	public void set_payment_secret(byte[] val) {
		bindings.UnauthenticatedReceiveTlvs_set_payment_secret(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constraints for the receiver of this payment.
	 */
	public org.ldk.structs.PaymentConstraints get_payment_constraints() {
		long ret = bindings.UnauthenticatedReceiveTlvs_get_payment_constraints(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentConstraints ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PaymentConstraints(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constraints for the receiver of this payment.
	 */
	public void set_payment_constraints(org.ldk.structs.PaymentConstraints val) {
		bindings.UnauthenticatedReceiveTlvs_set_payment_constraints(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Context for the receiver of this payment.
	 */
	public org.ldk.structs.PaymentContext get_payment_context() {
		long ret = bindings.UnauthenticatedReceiveTlvs_get_payment_context(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentContext ret_hu_conv = org.ldk.structs.PaymentContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Context for the receiver of this payment.
	 */
	public void set_payment_context(org.ldk.structs.PaymentContext val) {
		bindings.UnauthenticatedReceiveTlvs_set_payment_context(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new UnauthenticatedReceiveTlvs given each field
	 */
	public static org.ldk.structs.UnauthenticatedReceiveTlvs of(byte[] payment_secret_arg, org.ldk.structs.PaymentConstraints payment_constraints_arg, org.ldk.structs.PaymentContext payment_context_arg) {
		long ret = bindings.UnauthenticatedReceiveTlvs_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_secret_arg, 32)), payment_constraints_arg.ptr, payment_context_arg.ptr);
		GC.KeepAlive(payment_secret_arg);
		GC.KeepAlive(payment_constraints_arg);
		GC.KeepAlive(payment_context_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnauthenticatedReceiveTlvs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UnauthenticatedReceiveTlvs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.UnauthenticatedReceiveTlvs_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the UnauthenticatedReceiveTlvs
	 */
	public org.ldk.structs.UnauthenticatedReceiveTlvs clone() {
		long ret = bindings.UnauthenticatedReceiveTlvs_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnauthenticatedReceiveTlvs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UnauthenticatedReceiveTlvs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates an authenticated [`ReceiveTlvs`], which includes an HMAC and the provide [`Nonce`]
	 * that can be use later to verify it authenticity.
	 */
	public org.ldk.structs.ReceiveTlvs authenticate(org.ldk.structs.Nonce nonce, org.ldk.structs.ExpandedKey expanded_key) {
		long ret = bindings.UnauthenticatedReceiveTlvs_authenticate(this.ptr, nonce.ptr, expanded_key.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(nonce);
		GC.KeepAlive(expanded_key);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ReceiveTlvs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ReceiveTlvs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		;
		return ret_hu_conv;
	}

	/**
	 * Serialize the UnauthenticatedReceiveTlvs object into a byte array which can be read by UnauthenticatedReceiveTlvs_read
	 */
	public byte[] write() {
		long ret = bindings.UnauthenticatedReceiveTlvs_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Constructs a new Verification which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Verification must be freed before this_arg is
	 */
	public org.ldk.structs.Verification as_Verification() {
		long ret = bindings.UnauthenticatedReceiveTlvs_as_Verification(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Verification ret_hu_conv = new Verification(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
