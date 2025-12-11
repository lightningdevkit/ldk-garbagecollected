package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A unique 32-byte identifier for a channel.
 * Depending on how the ID is generated, several varieties are distinguished
 * (but all are stored as 32 bytes):
 * _v1_ and _temporary_.
 * A _v1_ channel ID is generated based on funding tx outpoint (txid & index).
 * A _temporary_ ID is generated randomly.
 * (Later revocation-point-based _v2_ is a possibility.)
 * The variety (context) is not stored, it is relevant only at creation.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelId extends CommonBase {
	ChannelId(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelId_free(ptr); }
	}

	public byte[] get_a() {
		byte[] ret = bindings.ChannelId_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	public void set_a(byte[] val) {
		bindings.ChannelId_set_a(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new ChannelId given each field
	 */
	public static ChannelId of(byte[] a_arg) {
		long ret = bindings.ChannelId_new(InternalUtils.check_arr_len(a_arg, 32));
		Reference.reachabilityFence(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ChannelId_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelId
	 */
	public ChannelId clone() {
		long ret = bindings.ChannelId_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two ChannelIds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.ChannelId b) {
		boolean ret = bindings.ChannelId_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof ChannelId)) return false;
		return this.eq((ChannelId)o);
	}
	/**
	 * Generates a non-cryptographic 64-bit hash of the ChannelId.
	 */
	public long hash() {
		long ret = bindings.ChannelId_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Create _v1_ channel ID based on a funding TX ID and output index
	 */
	public static ChannelId v1_from_funding_txid(byte[] txid, short output_index) {
		long ret = bindings.ChannelId_v1_from_funding_txid(InternalUtils.check_arr_len(txid, 32), output_index);
		Reference.reachabilityFence(txid);
		Reference.reachabilityFence(output_index);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Create _v1_ channel ID from a funding tx outpoint
	 */
	public static ChannelId v1_from_funding_outpoint(org.ldk.structs.OutPoint outpoint) {
		long ret = bindings.ChannelId_v1_from_funding_outpoint(outpoint.ptr);
		Reference.reachabilityFence(outpoint);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Create a _temporary_ channel ID randomly, based on an entropy source.
	 */
	public static ChannelId temporary_from_entropy_source(org.ldk.structs.EntropySource entropy_source) {
		long ret = bindings.ChannelId_temporary_from_entropy_source(entropy_source.ptr);
		Reference.reachabilityFence(entropy_source);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(entropy_source); };
		return ret_hu_conv;
	}

	/**
	 * Generic constructor; create a new channel ID from the provided data.
	 * Use a more specific `*_from_*` constructor when possible.
	 */
	public static ChannelId from_bytes(byte[] data) {
		long ret = bindings.ChannelId_from_bytes(InternalUtils.check_arr_len(data, 32));
		Reference.reachabilityFence(data);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Create a channel ID consisting of all-zeros data (e.g. when uninitialized or a placeholder).
	 */
	public static ChannelId new_zero() {
		long ret = bindings.ChannelId_new_zero();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Check whether ID is consisting of all zeros (uninitialized)
	 */
	public boolean is_zero() {
		boolean ret = bindings.ChannelId_is_zero(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Create _v2_ channel ID by concatenating the holder revocation basepoint with the counterparty
	 * revocation basepoint and hashing the result. The basepoints will be concatenated in increasing
	 * sorted order.
	 */
	public static ChannelId v2_from_revocation_basepoints(org.ldk.structs.RevocationBasepoint ours, org.ldk.structs.RevocationBasepoint theirs) {
		long ret = bindings.ChannelId_v2_from_revocation_basepoints(ours.ptr, theirs.ptr);
		Reference.reachabilityFence(ours);
		Reference.reachabilityFence(theirs);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Create temporary _v2_ channel ID by concatenating a zeroed out basepoint with the holder
	 * revocation basepoint and hashing the result.
	 */
	public static ChannelId temporary_v2_from_revocation_basepoint(org.ldk.structs.RevocationBasepoint our_revocation_basepoint) {
		long ret = bindings.ChannelId_temporary_v2_from_revocation_basepoint(our_revocation_basepoint.ptr);
		Reference.reachabilityFence(our_revocation_basepoint);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Indicates whether this is a V2 channel ID for the given local and remote revocation basepoints.
	 */
	public boolean is_v2_channel_id(org.ldk.structs.RevocationBasepoint ours, org.ldk.structs.RevocationBasepoint theirs) {
		boolean ret = bindings.ChannelId_is_v2_channel_id(this.ptr, ours.ptr, theirs.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(ours);
		Reference.reachabilityFence(theirs);
		return ret;
	}

	/**
	 * Serialize the ChannelId object into a byte array which can be read by ChannelId_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ChannelId_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a ChannelId from a byte array, created by ChannelId_write
	 */
	public static Result_ChannelIdDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ChannelId_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelIdDecodeErrorZ ret_hu_conv = Result_ChannelIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
