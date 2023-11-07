using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Data to construct a [`BlindedHop`] for forwarding a payment.
 */
public class ForwardTlvs : CommonBase {
	internal ForwardTlvs(object _dummy, long ptr) : base(ptr) { }
	~ForwardTlvs() {
		if (ptr != 0) { bindings.ForwardTlvs_free(ptr); }
	}

	/**
	 * The short channel id this payment should be forwarded out over.
	 */
	public long get_short_channel_id() {
		long ret = bindings.ForwardTlvs_get_short_channel_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The short channel id this payment should be forwarded out over.
	 */
	public void set_short_channel_id(long val) {
		bindings.ForwardTlvs_set_short_channel_id(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Payment parameters for relaying over [`Self::short_channel_id`].
	 */
	public PaymentRelay get_payment_relay() {
		long ret = bindings.ForwardTlvs_get_payment_relay(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentRelay ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PaymentRelay(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Payment parameters for relaying over [`Self::short_channel_id`].
	 */
	public void set_payment_relay(org.ldk.structs.PaymentRelay val) {
		bindings.ForwardTlvs_set_payment_relay(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Payment constraints for relaying over [`Self::short_channel_id`].
	 */
	public PaymentConstraints get_payment_constraints() {
		long ret = bindings.ForwardTlvs_get_payment_constraints(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentConstraints ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PaymentConstraints(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Payment constraints for relaying over [`Self::short_channel_id`].
	 */
	public void set_payment_constraints(org.ldk.structs.PaymentConstraints val) {
		bindings.ForwardTlvs_set_payment_constraints(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Supported and required features when relaying a payment onion containing this object's
	 * corresponding [`BlindedHop::encrypted_payload`].
	 * 
	 * [`BlindedHop::encrypted_payload`]: crate::blinded_path::BlindedHop::encrypted_payload
	 */
	public BlindedHopFeatures get_features() {
		long ret = bindings.ForwardTlvs_get_features(this.ptr);
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
		bindings.ForwardTlvs_set_features(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Constructs a new ForwardTlvs given each field
	 */
	public static ForwardTlvs of(long short_channel_id_arg, org.ldk.structs.PaymentRelay payment_relay_arg, org.ldk.structs.PaymentConstraints payment_constraints_arg, org.ldk.structs.BlindedHopFeatures features_arg) {
		long ret = bindings.ForwardTlvs_new(short_channel_id_arg, payment_relay_arg == null ? 0 : payment_relay_arg.ptr, payment_constraints_arg == null ? 0 : payment_constraints_arg.ptr, features_arg == null ? 0 : features_arg.ptr);
		GC.KeepAlive(short_channel_id_arg);
		GC.KeepAlive(payment_relay_arg);
		GC.KeepAlive(payment_constraints_arg);
		GC.KeepAlive(features_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ForwardTlvs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ForwardTlvs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(payment_relay_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(payment_constraints_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(features_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.ForwardTlvs_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ForwardTlvs
	 */
	public ForwardTlvs clone() {
		long ret = bindings.ForwardTlvs_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ForwardTlvs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ForwardTlvs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the ForwardTlvs object into a byte array which can be read by ForwardTlvs_read
	 */
	public byte[] write() {
		long ret = bindings.ForwardTlvs_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

}
} } }
