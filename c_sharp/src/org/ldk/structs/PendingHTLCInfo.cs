using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Information about an incoming HTLC, including the [`PendingHTLCRouting`] describing where it
 * should go next.
 */
public class PendingHTLCInfo : CommonBase {
	internal PendingHTLCInfo(object _dummy, long ptr) : base(ptr) { }
	~PendingHTLCInfo() {
		if (ptr != 0) { bindings.PendingHTLCInfo_free(ptr); }
	}

	/**
	 * Further routing details based on whether the HTLC is being forwarded or received.
	 */
	public PendingHTLCRouting get_routing() {
		long ret = bindings.PendingHTLCInfo_get_routing(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PendingHTLCRouting ret_hu_conv = org.ldk.structs.PendingHTLCRouting.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Further routing details based on whether the HTLC is being forwarded or received.
	 */
	public void set_routing(org.ldk.structs.PendingHTLCRouting val) {
		bindings.PendingHTLCInfo_set_routing(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The onion shared secret we build with the sender used to decrypt the onion.
	 * 
	 * This is later used to encrypt failure packets in the event that the HTLC is failed.
	 */
	public byte[] get_incoming_shared_secret() {
		long ret = bindings.PendingHTLCInfo_get_incoming_shared_secret(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The onion shared secret we build with the sender used to decrypt the onion.
	 * 
	 * This is later used to encrypt failure packets in the event that the HTLC is failed.
	 */
	public void set_incoming_shared_secret(byte[] val) {
		bindings.PendingHTLCInfo_set_incoming_shared_secret(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Hash of the payment preimage, to lock the payment until the receiver releases the preimage.
	 */
	public byte[] get_payment_hash() {
		long ret = bindings.PendingHTLCInfo_get_payment_hash(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Hash of the payment preimage, to lock the payment until the receiver releases the preimage.
	 */
	public void set_payment_hash(byte[] val) {
		bindings.PendingHTLCInfo_set_payment_hash(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Amount received in the incoming HTLC.
	 * 
	 * This field was added in LDK 0.0.113 and will be `None` for objects written by prior
	 * versions.
	 */
	public Option_u64Z get_incoming_amt_msat() {
		long ret = bindings.PendingHTLCInfo_get_incoming_amt_msat(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Amount received in the incoming HTLC.
	 * 
	 * This field was added in LDK 0.0.113 and will be `None` for objects written by prior
	 * versions.
	 */
	public void set_incoming_amt_msat(org.ldk.structs.Option_u64Z val) {
		bindings.PendingHTLCInfo_set_incoming_amt_msat(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The amount the sender indicated should be forwarded on to the next hop or amount the sender
	 * intended for us to receive for received payments.
	 * 
	 * If the received amount is less than this for received payments, an intermediary hop has
	 * attempted to steal some of our funds and we should fail the HTLC (the sender should retry
	 * it along another path).
	 * 
	 * Because nodes can take less than their required fees, and because senders may wish to
	 * improve their own privacy, this amount may be less than [`Self::incoming_amt_msat`] for
	 * received payments. In such cases, recipients must handle this HTLC as if it had received
	 * [`Self::outgoing_amt_msat`].
	 */
	public long get_outgoing_amt_msat() {
		long ret = bindings.PendingHTLCInfo_get_outgoing_amt_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The amount the sender indicated should be forwarded on to the next hop or amount the sender
	 * intended for us to receive for received payments.
	 * 
	 * If the received amount is less than this for received payments, an intermediary hop has
	 * attempted to steal some of our funds and we should fail the HTLC (the sender should retry
	 * it along another path).
	 * 
	 * Because nodes can take less than their required fees, and because senders may wish to
	 * improve their own privacy, this amount may be less than [`Self::incoming_amt_msat`] for
	 * received payments. In such cases, recipients must handle this HTLC as if it had received
	 * [`Self::outgoing_amt_msat`].
	 */
	public void set_outgoing_amt_msat(long val) {
		bindings.PendingHTLCInfo_set_outgoing_amt_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The CLTV the sender has indicated we should set on the forwarded HTLC (or has indicated
	 * should have been set on the received HTLC for received payments).
	 */
	public int get_outgoing_cltv_value() {
		int ret = bindings.PendingHTLCInfo_get_outgoing_cltv_value(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The CLTV the sender has indicated we should set on the forwarded HTLC (or has indicated
	 * should have been set on the received HTLC for received payments).
	 */
	public void set_outgoing_cltv_value(int val) {
		bindings.PendingHTLCInfo_set_outgoing_cltv_value(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The fee taken for this HTLC in addition to the standard protocol HTLC fees.
	 * 
	 * If this is a payment for forwarding, this is the fee we are taking before forwarding the
	 * HTLC.
	 * 
	 * If this is a received payment, this is the fee that our counterparty took.
	 * 
	 * This is used to allow LSPs to take fees as a part of payments, without the sender having to
	 * shoulder them.
	 */
	public Option_u64Z get_skimmed_fee_msat() {
		long ret = bindings.PendingHTLCInfo_get_skimmed_fee_msat(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The fee taken for this HTLC in addition to the standard protocol HTLC fees.
	 * 
	 * If this is a payment for forwarding, this is the fee we are taking before forwarding the
	 * HTLC.
	 * 
	 * If this is a received payment, this is the fee that our counterparty took.
	 * 
	 * This is used to allow LSPs to take fees as a part of payments, without the sender having to
	 * shoulder them.
	 */
	public void set_skimmed_fee_msat(org.ldk.structs.Option_u64Z val) {
		bindings.PendingHTLCInfo_set_skimmed_fee_msat(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Constructs a new PendingHTLCInfo given each field
	 */
	public static PendingHTLCInfo of(org.ldk.structs.PendingHTLCRouting routing_arg, byte[] incoming_shared_secret_arg, byte[] payment_hash_arg, org.ldk.structs.Option_u64Z incoming_amt_msat_arg, long outgoing_amt_msat_arg, int outgoing_cltv_value_arg, org.ldk.structs.Option_u64Z skimmed_fee_msat_arg) {
		long ret = bindings.PendingHTLCInfo_new(routing_arg.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(incoming_shared_secret_arg, 32)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_hash_arg, 32)), incoming_amt_msat_arg.ptr, outgoing_amt_msat_arg, outgoing_cltv_value_arg, skimmed_fee_msat_arg.ptr);
		GC.KeepAlive(routing_arg);
		GC.KeepAlive(incoming_shared_secret_arg);
		GC.KeepAlive(payment_hash_arg);
		GC.KeepAlive(incoming_amt_msat_arg);
		GC.KeepAlive(outgoing_amt_msat_arg);
		GC.KeepAlive(outgoing_cltv_value_arg);
		GC.KeepAlive(skimmed_fee_msat_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PendingHTLCInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PendingHTLCInfo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(routing_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(incoming_amt_msat_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(skimmed_fee_msat_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.PendingHTLCInfo_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the PendingHTLCInfo
	 */
	public PendingHTLCInfo clone() {
		long ret = bindings.PendingHTLCInfo_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PendingHTLCInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PendingHTLCInfo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the PendingHTLCInfo object into a byte array which can be read by PendingHTLCInfo_read
	 */
	public byte[] write() {
		long ret = bindings.PendingHTLCInfo_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a PendingHTLCInfo from a byte array, created by PendingHTLCInfo_write
	 */
	public static Result_PendingHTLCInfoDecodeErrorZ read(byte[] ser) {
		long ret = bindings.PendingHTLCInfo_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PendingHTLCInfoDecodeErrorZ ret_hu_conv = Result_PendingHTLCInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
