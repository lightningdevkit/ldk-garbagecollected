package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An [`update_fail_htlc`] message to be sent to or received from a peer.
 * 
 * [`update_fail_htlc`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#removing-an-htlc-update_fulfill_htlc-update_fail_htlc-and-update_fail_malformed_htlc
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class UpdateFailHTLC extends CommonBase {
	UpdateFailHTLC(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UpdateFailHTLC_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.UpdateFailHTLC_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.UpdateFailHTLC_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The HTLC ID
	 */
	public long get_htlc_id() {
		long ret = bindings.UpdateFailHTLC_get_htlc_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The HTLC ID
	 */
	public void set_htlc_id(long val) {
		bindings.UpdateFailHTLC_set_htlc_id(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	long clone_ptr() {
		long ret = bindings.UpdateFailHTLC_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the UpdateFailHTLC
	 */
	public UpdateFailHTLC clone() {
		long ret = bindings.UpdateFailHTLC_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UpdateFailHTLC ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UpdateFailHTLC(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the UpdateFailHTLC.
	 */
	public long hash() {
		long ret = bindings.UpdateFailHTLC_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two UpdateFailHTLCs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.UpdateFailHTLC b) {
		boolean ret = bindings.UpdateFailHTLC_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof UpdateFailHTLC)) return false;
		return this.eq((UpdateFailHTLC)o);
	}
	/**
	 * Serialize the UpdateFailHTLC object into a byte array which can be read by UpdateFailHTLC_read
	 */
	public byte[] write() {
		byte[] ret = bindings.UpdateFailHTLC_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a UpdateFailHTLC from a byte array, created by UpdateFailHTLC_write
	 */
	public static Result_UpdateFailHTLCDecodeErrorZ read(byte[] ser) {
		long ret = bindings.UpdateFailHTLC_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_UpdateFailHTLCDecodeErrorZ ret_hu_conv = Result_UpdateFailHTLCDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
