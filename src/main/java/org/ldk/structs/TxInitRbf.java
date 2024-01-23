package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A tx_init_rbf message which initiates a replacement of the transaction after it's been
 * completed.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class TxInitRbf extends CommonBase {
	TxInitRbf(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.TxInitRbf_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.TxInitRbf_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.TxInitRbf_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The locktime of the transaction
	 */
	public int get_locktime() {
		int ret = bindings.TxInitRbf_get_locktime(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The locktime of the transaction
	 */
	public void set_locktime(int val) {
		bindings.TxInitRbf_set_locktime(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The feerate of the transaction
	 */
	public int get_feerate_sat_per_1000_weight() {
		int ret = bindings.TxInitRbf_get_feerate_sat_per_1000_weight(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The feerate of the transaction
	 */
	public void set_feerate_sat_per_1000_weight(int val) {
		bindings.TxInitRbf_set_feerate_sat_per_1000_weight(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The number of satoshis the sender will contribute to or, if negative, remove from
	 * (e.g. splice-out) the funding output of the transaction
	 */
	public Option_i64Z get_funding_output_contribution() {
		long ret = bindings.TxInitRbf_get_funding_output_contribution(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_i64Z ret_hu_conv = org.ldk.structs.Option_i64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The number of satoshis the sender will contribute to or, if negative, remove from
	 * (e.g. splice-out) the funding output of the transaction
	 */
	public void set_funding_output_contribution(org.ldk.structs.Option_i64Z val) {
		bindings.TxInitRbf_set_funding_output_contribution(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Constructs a new TxInitRbf given each field
	 */
	public static TxInitRbf of(byte[] channel_id_arg, int locktime_arg, int feerate_sat_per_1000_weight_arg, org.ldk.structs.Option_i64Z funding_output_contribution_arg) {
		long ret = bindings.TxInitRbf_new(InternalUtils.check_arr_len(channel_id_arg, 32), locktime_arg, feerate_sat_per_1000_weight_arg, funding_output_contribution_arg.ptr);
		Reference.reachabilityFence(channel_id_arg);
		Reference.reachabilityFence(locktime_arg);
		Reference.reachabilityFence(feerate_sat_per_1000_weight_arg);
		Reference.reachabilityFence(funding_output_contribution_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxInitRbf ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxInitRbf(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(funding_output_contribution_arg); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.TxInitRbf_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the TxInitRbf
	 */
	public TxInitRbf clone() {
		long ret = bindings.TxInitRbf_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxInitRbf ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxInitRbf(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the TxInitRbf.
	 */
	public long hash() {
		long ret = bindings.TxInitRbf_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two TxInitRbfs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.TxInitRbf b) {
		boolean ret = bindings.TxInitRbf_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof TxInitRbf)) return false;
		return this.eq((TxInitRbf)o);
	}
	/**
	 * Serialize the TxInitRbf object into a byte array which can be read by TxInitRbf_read
	 */
	public byte[] write() {
		byte[] ret = bindings.TxInitRbf_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a TxInitRbf from a byte array, created by TxInitRbf_write
	 */
	public static Result_TxInitRbfDecodeErrorZ read(byte[] ser) {
		long ret = bindings.TxInitRbf_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxInitRbfDecodeErrorZ ret_hu_conv = Result_TxInitRbfDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
