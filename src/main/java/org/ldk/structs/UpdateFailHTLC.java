package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An update_fail_htlc message to be sent or received from a peer
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
		UpdateFailHTLC ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new UpdateFailHTLC(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
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
