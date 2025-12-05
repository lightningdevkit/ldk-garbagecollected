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
	 * The list of unblinded Trampoline hops. When using Trampoline, must contain at least one hop.
	 * 
	 * Note that the first [`TrampolineHop`] node must also be present as the last [`RouteHop`] node,
	 * where the [`RouteHop`]'s fee_msat is the fee paid for use of the entire blinded path, including
	 * any Trampoline hops.
	 */
	public TrampolineHop[] get_trampoline_hops() {
		long ret = bindings.BlindedTail_get_trampoline_hops(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_15_len = InternalUtils.getArrayLength(ret);
		TrampolineHop[] ret_conv_15_arr = new TrampolineHop[ret_conv_15_len];
		for (int p = 0; p < ret_conv_15_len; p++) {
			long ret_conv_15 = InternalUtils.getU64ArrayElem(ret, p);
			org.ldk.structs.TrampolineHop ret_conv_15_hu_conv = null; if (ret_conv_15 < 0 || ret_conv_15 > 4096) { ret_conv_15_hu_conv = new org.ldk.structs.TrampolineHop(null, ret_conv_15); }
			if (ret_conv_15_hu_conv != null) { ret_conv_15_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_15_arr[p] = ret_conv_15_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_15_arr;
	}

	/**
	 * The list of unblinded Trampoline hops. When using Trampoline, must contain at least one hop.
	 * 
	 * Note that the first [`TrampolineHop`] node must also be present as the last [`RouteHop`] node,
	 * where the [`RouteHop`]'s fee_msat is the fee paid for use of the entire blinded path, including
	 * any Trampoline hops.
	 */
	public void set_trampoline_hops(TrampolineHop[] val) {
		bindings.BlindedTail_set_trampoline_hops(this.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(val, val_conv_15 => val_conv_15.ptr)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The hops of the [`BlindedPaymentPath`] provided by the recipient.
	 */
	public BlindedHop[] get_hops() {
		long ret = bindings.BlindedTail_get_hops(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_12_len = InternalUtils.getArrayLength(ret);
		BlindedHop[] ret_conv_12_arr = new BlindedHop[ret_conv_12_len];
		for (int m = 0; m < ret_conv_12_len; m++) {
			long ret_conv_12 = InternalUtils.getU64ArrayElem(ret, m);
			org.ldk.structs.BlindedHop ret_conv_12_hu_conv = null; if (ret_conv_12 < 0 || ret_conv_12 > 4096) { ret_conv_12_hu_conv = new org.ldk.structs.BlindedHop(null, ret_conv_12); }
			if (ret_conv_12_hu_conv != null) { ret_conv_12_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_12_arr[m] = ret_conv_12_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_12_arr;
	}

	/**
	 * The hops of the [`BlindedPaymentPath`] provided by the recipient.
	 */
	public void set_hops(BlindedHop[] val) {
		bindings.BlindedTail_set_hops(this.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(val, val_conv_12 => val_conv_12.ptr)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The blinding point of the [`BlindedPaymentPath`] provided by the recipient.
	 */
	public byte[] get_blinding_point() {
		long ret = bindings.BlindedTail_get_blinding_point(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The blinding point of the [`BlindedPaymentPath`] provided by the recipient.
	 */
	public void set_blinding_point(byte[] val) {
		bindings.BlindedTail_set_blinding_point(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
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
	public static org.ldk.structs.BlindedTail of(TrampolineHop[] trampoline_hops_arg, BlindedHop[] hops_arg, byte[] blinding_point_arg, int excess_final_cltv_expiry_delta_arg, long final_value_msat_arg) {
		long ret = bindings.BlindedTail_new(InternalUtils.encodeUint64Array(InternalUtils.mapArray(trampoline_hops_arg, trampoline_hops_arg_conv_15 => trampoline_hops_arg_conv_15.ptr)), InternalUtils.encodeUint64Array(InternalUtils.mapArray(hops_arg, hops_arg_conv_12 => hops_arg_conv_12.ptr)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(blinding_point_arg, 33)), excess_final_cltv_expiry_delta_arg, final_value_msat_arg);
		GC.KeepAlive(trampoline_hops_arg);
		GC.KeepAlive(hops_arg);
		GC.KeepAlive(blinding_point_arg);
		GC.KeepAlive(excess_final_cltv_expiry_delta_arg);
		GC.KeepAlive(final_value_msat_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedTail ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedTail(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
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
	public org.ldk.structs.BlindedTail clone() {
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
		bool ret = bindings.BlindedTail_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
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
		long ret = bindings.BlindedTail_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a BlindedTail from a byte array, created by BlindedTail_write
	 */
	public static org.ldk.structs.Result_BlindedTailDecodeErrorZ read(byte[] ser) {
		long ret = bindings.BlindedTail_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedTailDecodeErrorZ ret_hu_conv = Result_BlindedTailDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
