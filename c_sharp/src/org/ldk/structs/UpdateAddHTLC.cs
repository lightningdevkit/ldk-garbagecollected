using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * An update_add_htlc message to be sent or received from a peer
 */
public class UpdateAddHTLC : CommonBase {
	internal UpdateAddHTLC(object _dummy, long ptr) : base(ptr) { }
	~UpdateAddHTLC() {
		if (ptr != 0) { bindings.UpdateAddHTLC_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.UpdateAddHTLC_get_channel_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.UpdateAddHTLC_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The HTLC ID
	 */
	public long get_htlc_id() {
		long ret = bindings.UpdateAddHTLC_get_htlc_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The HTLC ID
	 */
	public void set_htlc_id(long val) {
		bindings.UpdateAddHTLC_set_htlc_id(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The HTLC value in milli-satoshi
	 */
	public long get_amount_msat() {
		long ret = bindings.UpdateAddHTLC_get_amount_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The HTLC value in milli-satoshi
	 */
	public void set_amount_msat(long val) {
		bindings.UpdateAddHTLC_set_amount_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The payment hash, the pre-image of which controls HTLC redemption
	 */
	public byte[] get_payment_hash() {
		byte[] ret = bindings.UpdateAddHTLC_get_payment_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The payment hash, the pre-image of which controls HTLC redemption
	 */
	public void set_payment_hash(byte[] val) {
		bindings.UpdateAddHTLC_set_payment_hash(this.ptr, InternalUtils.check_arr_len(val, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The expiry height of the HTLC
	 */
	public int get_cltv_expiry() {
		int ret = bindings.UpdateAddHTLC_get_cltv_expiry(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The expiry height of the HTLC
	 */
	public void set_cltv_expiry(int val) {
		bindings.UpdateAddHTLC_set_cltv_expiry(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	internal long clone_ptr() {
		long ret = bindings.UpdateAddHTLC_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the UpdateAddHTLC
	 */
	public UpdateAddHTLC clone() {
		long ret = bindings.UpdateAddHTLC_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UpdateAddHTLC ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UpdateAddHTLC(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two UpdateAddHTLCs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.UpdateAddHTLC b) {
		bool ret = bindings.UpdateAddHTLC_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is UpdateAddHTLC)) return false;
		return this.eq((UpdateAddHTLC)o);
	}
	/**
	 * Serialize the UpdateAddHTLC object into a byte array which can be read by UpdateAddHTLC_read
	 */
	public byte[] write() {
		byte[] ret = bindings.UpdateAddHTLC_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a UpdateAddHTLC from a byte array, created by UpdateAddHTLC_write
	 */
	public static Result_UpdateAddHTLCDecodeErrorZ read(byte[] ser) {
		long ret = bindings.UpdateAddHTLC_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_UpdateAddHTLCDecodeErrorZ ret_hu_conv = Result_UpdateAddHTLCDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
