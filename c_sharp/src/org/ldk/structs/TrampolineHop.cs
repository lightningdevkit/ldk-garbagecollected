using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Trampoline hop in a route, and additional metadata about it. \"Hop\" is defined as a node.
 */
public class TrampolineHop : CommonBase {
	internal TrampolineHop(object _dummy, long ptr) : base(ptr) { }
	~TrampolineHop() {
		if (ptr != 0) { bindings.TrampolineHop_free(ptr); }
	}

	/**
	 * The node_id of the node at this hop.
	 */
	public byte[] get_pubkey() {
		long ret = bindings.TrampolineHop_get_pubkey(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The node_id of the node at this hop.
	 */
	public void set_pubkey(byte[] val) {
		bindings.TrampolineHop_set_pubkey(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The node_announcement features of the node at this hop.
	 */
	public org.ldk.structs.NodeFeatures get_node_features() {
		long ret = bindings.TrampolineHop_get_node_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The node_announcement features of the node at this hop.
	 */
	public void set_node_features(org.ldk.structs.NodeFeatures val) {
		bindings.TrampolineHop_set_node_features(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The fee this hop should use to pay for routing towards the next Trampoline hop, or to the
	 * recipient if this is the last Trampoline hop.
	 * If this is the last Trampoline hop within [`BlindedTail`], this is the fee paid for the use of
	 * the entire blinded path.
	 */
	public long get_fee_msat() {
		long ret = bindings.TrampolineHop_get_fee_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The fee this hop should use to pay for routing towards the next Trampoline hop, or to the
	 * recipient if this is the last Trampoline hop.
	 * If this is the last Trampoline hop within [`BlindedTail`], this is the fee paid for the use of
	 * the entire blinded path.
	 */
	public void set_fee_msat(long val) {
		bindings.TrampolineHop_set_fee_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The CLTV delta added for this hop.
	 * If this is the last Trampoline hop within [`BlindedTail`], this is the CLTV delta for the entire
	 * blinded path.
	 */
	public int get_cltv_expiry_delta() {
		int ret = bindings.TrampolineHop_get_cltv_expiry_delta(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The CLTV delta added for this hop.
	 * If this is the last Trampoline hop within [`BlindedTail`], this is the CLTV delta for the entire
	 * blinded path.
	 */
	public void set_cltv_expiry_delta(int val) {
		bindings.TrampolineHop_set_cltv_expiry_delta(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new TrampolineHop given each field
	 */
	public static org.ldk.structs.TrampolineHop of(byte[] pubkey_arg, org.ldk.structs.NodeFeatures node_features_arg, long fee_msat_arg, int cltv_expiry_delta_arg) {
		long ret = bindings.TrampolineHop_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(pubkey_arg, 33)), node_features_arg.ptr, fee_msat_arg, cltv_expiry_delta_arg);
		GC.KeepAlive(pubkey_arg);
		GC.KeepAlive(node_features_arg);
		GC.KeepAlive(fee_msat_arg);
		GC.KeepAlive(cltv_expiry_delta_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TrampolineHop ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TrampolineHop(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.TrampolineHop_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the TrampolineHop
	 */
	public org.ldk.structs.TrampolineHop clone() {
		long ret = bindings.TrampolineHop_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TrampolineHop ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TrampolineHop(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the TrampolineHop.
	 */
	public long hash() {
		long ret = bindings.TrampolineHop_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two TrampolineHops contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.TrampolineHop b) {
		bool ret = bindings.TrampolineHop_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is TrampolineHop)) return false;
		return this.eq((TrampolineHop)o);
	}
	/**
	 * Serialize the TrampolineHop object into a byte array which can be read by TrampolineHop_read
	 */
	public byte[] write() {
		long ret = bindings.TrampolineHop_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a TrampolineHop from a byte array, created by TrampolineHop_write
	 */
	public static org.ldk.structs.Result_TrampolineHopDecodeErrorZ read(byte[] ser) {
		long ret = bindings.TrampolineHop_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TrampolineHopDecodeErrorZ ret_hu_conv = Result_TrampolineHopDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
