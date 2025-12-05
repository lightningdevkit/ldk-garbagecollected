using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Data to construct a [`BlindedHop`] for forwarding a Trampoline payment.
 */
public class TrampolineForwardTlvs : CommonBase {
	internal TrampolineForwardTlvs(object _dummy, long ptr) : base(ptr) { }
	~TrampolineForwardTlvs() {
		if (ptr != 0) { bindings.TrampolineForwardTlvs_free(ptr); }
	}

	/**
	 * The node id to which the trampoline node must find a route.
	 */
	public byte[] get_next_trampoline() {
		long ret = bindings.TrampolineForwardTlvs_get_next_trampoline(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The node id to which the trampoline node must find a route.
	 */
	public void set_next_trampoline(byte[] val) {
		bindings.TrampolineForwardTlvs_set_next_trampoline(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Payment parameters for relaying over [`Self::next_trampoline`].
	 */
	public org.ldk.structs.PaymentRelay get_payment_relay() {
		long ret = bindings.TrampolineForwardTlvs_get_payment_relay(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentRelay ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PaymentRelay(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Payment parameters for relaying over [`Self::next_trampoline`].
	 */
	public void set_payment_relay(org.ldk.structs.PaymentRelay val) {
		bindings.TrampolineForwardTlvs_set_payment_relay(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Payment constraints for relaying over [`Self::next_trampoline`].
	 */
	public org.ldk.structs.PaymentConstraints get_payment_constraints() {
		long ret = bindings.TrampolineForwardTlvs_get_payment_constraints(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentConstraints ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PaymentConstraints(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Payment constraints for relaying over [`Self::next_trampoline`].
	 */
	public void set_payment_constraints(org.ldk.structs.PaymentConstraints val) {
		bindings.TrampolineForwardTlvs_set_payment_constraints(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Supported and required features when relaying a payment onion containing this object's
	 * corresponding [`BlindedHop::encrypted_payload`].
	 * 
	 * [`BlindedHop::encrypted_payload`]: crate::blinded_path::BlindedHop::encrypted_payload
	 */
	public org.ldk.structs.BlindedHopFeatures get_features() {
		long ret = bindings.TrampolineForwardTlvs_get_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedHopFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedHopFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Supported and required features when relaying a payment onion containing this object's
	 * corresponding [`BlindedHop::encrypted_payload`].
	 * 
	 * [`BlindedHop::encrypted_payload`]: crate::blinded_path::BlindedHop::encrypted_payload
	 */
	public void set_features(org.ldk.structs.BlindedHopFeatures val) {
		bindings.TrampolineForwardTlvs_set_features(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Set if this [`BlindedPaymentPath`] is concatenated to another, to indicate the
	 * [`BlindedPaymentPath::blinding_point`] of the appended blinded path.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public byte[] get_next_blinding_override() {
		long ret = bindings.TrampolineForwardTlvs_get_next_blinding_override(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Set if this [`BlindedPaymentPath`] is concatenated to another, to indicate the
	 * [`BlindedPaymentPath::blinding_point`] of the appended blinded path.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_next_blinding_override(byte[] val) {
		bindings.TrampolineForwardTlvs_set_next_blinding_override(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new TrampolineForwardTlvs given each field
	 * 
	 * Note that next_blinding_override_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static org.ldk.structs.TrampolineForwardTlvs of(byte[] next_trampoline_arg, org.ldk.structs.PaymentRelay payment_relay_arg, org.ldk.structs.PaymentConstraints payment_constraints_arg, org.ldk.structs.BlindedHopFeatures features_arg, byte[] next_blinding_override_arg) {
		long ret = bindings.TrampolineForwardTlvs_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(next_trampoline_arg, 33)), payment_relay_arg.ptr, payment_constraints_arg.ptr, features_arg.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(next_blinding_override_arg, 33)));
		GC.KeepAlive(next_trampoline_arg);
		GC.KeepAlive(payment_relay_arg);
		GC.KeepAlive(payment_constraints_arg);
		GC.KeepAlive(features_arg);
		GC.KeepAlive(next_blinding_override_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TrampolineForwardTlvs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TrampolineForwardTlvs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.TrampolineForwardTlvs_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the TrampolineForwardTlvs
	 */
	public org.ldk.structs.TrampolineForwardTlvs clone() {
		long ret = bindings.TrampolineForwardTlvs_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TrampolineForwardTlvs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TrampolineForwardTlvs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the TrampolineForwardTlvs object into a byte array which can be read by TrampolineForwardTlvs_read
	 */
	public byte[] write() {
		long ret = bindings.TrampolineForwardTlvs_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

}
} } }
