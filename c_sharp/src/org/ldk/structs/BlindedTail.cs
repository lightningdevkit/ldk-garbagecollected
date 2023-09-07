using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * The blinded portion of a [`Path`], if we're routing to a recipient who provided blinded paths in
 * their [`Bolt12Invoice`].
 * 
 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
 */
public class BlindedTail : CommonBase {
	internal BlindedTail(object _dummy, long ptr) : base(ptr) { }
	~BlindedTail() {
		if (ptr != 0) { bindings.BlindedTail_free(ptr); }
	}

	/**
	 * The hops of the [`BlindedPath`] provided by the recipient.
	 * 
	 * [`BlindedPath`]: crate::blinded_path::BlindedPath
	 */
	public BlindedHop[] get_hops() {
		long[] ret = bindings.BlindedTail_get_hops(this.ptr);
		GC.KeepAlive(this);
		int ret_conv_12_len = ret.Length;
		BlindedHop[] ret_conv_12_arr = new BlindedHop[ret_conv_12_len];
		for (int m = 0; m < ret_conv_12_len; m++) {
			long ret_conv_12 = ret[m];
			org.ldk.structs.BlindedHop ret_conv_12_hu_conv = null; if (ret_conv_12 < 0 || ret_conv_12 > 4096) { ret_conv_12_hu_conv = new org.ldk.structs.BlindedHop(null, ret_conv_12); }
			if (ret_conv_12_hu_conv != null) { ret_conv_12_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_12_arr[m] = ret_conv_12_hu_conv;
		}
		return ret_conv_12_arr;
	}

	/**
	 * The hops of the [`BlindedPath`] provided by the recipient.
	 * 
	 * [`BlindedPath`]: crate::blinded_path::BlindedPath
	 */
	public void set_hops(BlindedHop[] val) {
		bindings.BlindedTail_set_hops(this.ptr, val != null ? InternalUtils.mapArray(val, val_conv_12 => val_conv_12 == null ? 0 : val_conv_12.ptr) : null);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		foreach (BlindedHop val_conv_12 in val) { if (this != null) { this.ptrs_to.AddLast(val_conv_12); }; };
	}

	/**
	 * The blinding point of the [`BlindedPath`] provided by the recipient.
	 * 
	 * [`BlindedPath`]: crate::blinded_path::BlindedPath
	 */
	public byte[] get_blinding_point() {
		byte[] ret = bindings.BlindedTail_get_blinding_point(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The blinding point of the [`BlindedPath`] provided by the recipient.
	 * 
	 * [`BlindedPath`]: crate::blinded_path::BlindedPath
	 */
	public void set_blinding_point(byte[] val) {
		bindings.BlindedTail_set_blinding_point(this.ptr, InternalUtils.check_arr_len(val, 33));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Excess CLTV delta added to the recipient's CLTV expiry to deter intermediate nodes from
	 * inferring the destination. May be 0.
	 */
	public int get_excess_final_cltv_expiry_delta() {
		int ret = bindings.BlindedTail_get_excess_final_cltv_expiry_delta(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Excess CLTV delta added to the recipient's CLTV expiry to deter intermediate nodes from
	 * inferring the destination. May be 0.
	 */
	public void set_excess_final_cltv_expiry_delta(int val) {
		bindings.BlindedTail_set_excess_final_cltv_expiry_delta(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The total amount paid on this [`Path`], excluding the fees.
	 */
	public long get_final_value_msat() {
		long ret = bindings.BlindedTail_get_final_value_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The total amount paid on this [`Path`], excluding the fees.
	 */
	public void set_final_value_msat(long val) {
		bindings.BlindedTail_set_final_value_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new BlindedTail given each field
	 */
	public static BlindedTail of(BlindedHop[] hops_arg, byte[] blinding_point_arg, int excess_final_cltv_expiry_delta_arg, long final_value_msat_arg) {
		long ret = bindings.BlindedTail_new(hops_arg != null ? InternalUtils.mapArray(hops_arg, hops_arg_conv_12 => hops_arg_conv_12 == null ? 0 : hops_arg_conv_12.ptr) : null, InternalUtils.check_arr_len(blinding_point_arg, 33), excess_final_cltv_expiry_delta_arg, final_value_msat_arg);
		GC.KeepAlive(hops_arg);
		GC.KeepAlive(blinding_point_arg);
		GC.KeepAlive(excess_final_cltv_expiry_delta_arg);
		GC.KeepAlive(final_value_msat_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedTail ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedTail(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		foreach (BlindedHop hops_arg_conv_12 in hops_arg) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(hops_arg_conv_12); }; };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.BlindedTail_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the BlindedTail
	 */
	public BlindedTail clone() {
		long ret = bindings.BlindedTail_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedTail ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedTail(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the BlindedTail.
	 */
	public long hash() {
		long ret = bindings.BlindedTail_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two BlindedTails contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.BlindedTail b) {
		bool ret = bindings.BlindedTail_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is BlindedTail)) return false;
		return this.eq((BlindedTail)o);
	}
	/**
	 * Serialize the BlindedTail object into a byte array which can be read by BlindedTail_read
	 */
	public byte[] write() {
		byte[] ret = bindings.BlindedTail_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a BlindedTail from a byte array, created by BlindedTail_write
	 */
	public static Result_BlindedTailDecodeErrorZ read(byte[] ser) {
		long ret = bindings.BlindedTail_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedTailDecodeErrorZ ret_hu_conv = Result_BlindedTailDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
