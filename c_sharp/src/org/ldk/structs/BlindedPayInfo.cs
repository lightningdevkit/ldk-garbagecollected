using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Information needed to route a payment across a [`BlindedPath`].
 */
public class BlindedPayInfo : CommonBase {
	internal BlindedPayInfo(object _dummy, long ptr) : base(ptr) { }
	~BlindedPayInfo() {
		if (ptr != 0) { bindings.BlindedPayInfo_free(ptr); }
	}

	/**
	 * Base fee charged (in millisatoshi) for the entire blinded path.
	 */
	public int get_fee_base_msat() {
		int ret = bindings.BlindedPayInfo_get_fee_base_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Base fee charged (in millisatoshi) for the entire blinded path.
	 */
	public void set_fee_base_msat(int val) {
		bindings.BlindedPayInfo_set_fee_base_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Liquidity fee charged (in millionths of the amount transferred) for the entire blinded path
	 * (i.e., 10,000 is 1%).
	 */
	public int get_fee_proportional_millionths() {
		int ret = bindings.BlindedPayInfo_get_fee_proportional_millionths(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Liquidity fee charged (in millionths of the amount transferred) for the entire blinded path
	 * (i.e., 10,000 is 1%).
	 */
	public void set_fee_proportional_millionths(int val) {
		bindings.BlindedPayInfo_set_fee_proportional_millionths(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Number of blocks subtracted from an incoming HTLC's `cltv_expiry` for the entire blinded
	 * path.
	 */
	public short get_cltv_expiry_delta() {
		short ret = bindings.BlindedPayInfo_get_cltv_expiry_delta(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Number of blocks subtracted from an incoming HTLC's `cltv_expiry` for the entire blinded
	 * path.
	 */
	public void set_cltv_expiry_delta(short val) {
		bindings.BlindedPayInfo_set_cltv_expiry_delta(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The minimum HTLC value (in millisatoshi) that is acceptable to all channel peers on the
	 * blinded path from the introduction node to the recipient, accounting for any fees, i.e., as
	 * seen by the recipient.
	 */
	public long get_htlc_minimum_msat() {
		long ret = bindings.BlindedPayInfo_get_htlc_minimum_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The minimum HTLC value (in millisatoshi) that is acceptable to all channel peers on the
	 * blinded path from the introduction node to the recipient, accounting for any fees, i.e., as
	 * seen by the recipient.
	 */
	public void set_htlc_minimum_msat(long val) {
		bindings.BlindedPayInfo_set_htlc_minimum_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The maximum HTLC value (in millisatoshi) that is acceptable to all channel peers on the
	 * blinded path from the introduction node to the recipient, accounting for any fees, i.e., as
	 * seen by the recipient.
	 */
	public long get_htlc_maximum_msat() {
		long ret = bindings.BlindedPayInfo_get_htlc_maximum_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The maximum HTLC value (in millisatoshi) that is acceptable to all channel peers on the
	 * blinded path from the introduction node to the recipient, accounting for any fees, i.e., as
	 * seen by the recipient.
	 */
	public void set_htlc_maximum_msat(long val) {
		bindings.BlindedPayInfo_set_htlc_maximum_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Features set in `encrypted_data_tlv` for the `encrypted_recipient_data` TLV record in an
	 * onion payload.
	 */
	public BlindedHopFeatures get_features() {
		long ret = bindings.BlindedPayInfo_get_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedHopFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedHopFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Features set in `encrypted_data_tlv` for the `encrypted_recipient_data` TLV record in an
	 * onion payload.
	 */
	public void set_features(org.ldk.structs.BlindedHopFeatures val) {
		bindings.BlindedPayInfo_set_features(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Constructs a new BlindedPayInfo given each field
	 */
	public static BlindedPayInfo of(int fee_base_msat_arg, int fee_proportional_millionths_arg, short cltv_expiry_delta_arg, long htlc_minimum_msat_arg, long htlc_maximum_msat_arg, org.ldk.structs.BlindedHopFeatures features_arg) {
		long ret = bindings.BlindedPayInfo_new(fee_base_msat_arg, fee_proportional_millionths_arg, cltv_expiry_delta_arg, htlc_minimum_msat_arg, htlc_maximum_msat_arg, features_arg == null ? 0 : features_arg.ptr);
		GC.KeepAlive(fee_base_msat_arg);
		GC.KeepAlive(fee_proportional_millionths_arg);
		GC.KeepAlive(cltv_expiry_delta_arg);
		GC.KeepAlive(htlc_minimum_msat_arg);
		GC.KeepAlive(htlc_maximum_msat_arg);
		GC.KeepAlive(features_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedPayInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedPayInfo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(features_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.BlindedPayInfo_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the BlindedPayInfo
	 */
	public BlindedPayInfo clone() {
		long ret = bindings.BlindedPayInfo_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedPayInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedPayInfo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the BlindedPayInfo.
	 */
	public long hash() {
		long ret = bindings.BlindedPayInfo_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two BlindedPayInfos contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.BlindedPayInfo b) {
		bool ret = bindings.BlindedPayInfo_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is BlindedPayInfo)) return false;
		return this.eq((BlindedPayInfo)o);
	}
	/**
	 * Serialize the BlindedPayInfo object into a byte array which can be read by BlindedPayInfo_read
	 */
	public byte[] write() {
		byte[] ret = bindings.BlindedPayInfo_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a BlindedPayInfo from a byte array, created by BlindedPayInfo_write
	 */
	public static Result_BlindedPayInfoDecodeErrorZ read(byte[] ser) {
		long ret = bindings.BlindedPayInfo_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedPayInfoDecodeErrorZ ret_hu_conv = Result_BlindedPayInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
