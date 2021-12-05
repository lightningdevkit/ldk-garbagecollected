package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An update_fail_malformed_htlc message to be sent or received from a peer
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class UpdateFailMalformedHTLC extends CommonBase {
	UpdateFailMalformedHTLC(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UpdateFailMalformedHTLC_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.UpdateFailMalformedHTLC_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.UpdateFailMalformedHTLC_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The HTLC ID
	 */
	public long get_htlc_id() {
		long ret = bindings.UpdateFailMalformedHTLC_get_htlc_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The HTLC ID
	 */
	public void set_htlc_id(long val) {
		bindings.UpdateFailMalformedHTLC_set_htlc_id(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The failure code
	 */
	public short get_failure_code() {
		short ret = bindings.UpdateFailMalformedHTLC_get_failure_code(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The failure code
	 */
	public void set_failure_code(short val) {
		bindings.UpdateFailMalformedHTLC_set_failure_code(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	long clone_ptr() {
		long ret = bindings.UpdateFailMalformedHTLC_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the UpdateFailMalformedHTLC
	 */
	public UpdateFailMalformedHTLC clone() {
		long ret = bindings.UpdateFailMalformedHTLC_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		UpdateFailMalformedHTLC ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new UpdateFailMalformedHTLC(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the UpdateFailMalformedHTLC object into a byte array which can be read by UpdateFailMalformedHTLC_read
	 */
	public byte[] write() {
		byte[] ret = bindings.UpdateFailMalformedHTLC_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a UpdateFailMalformedHTLC from a byte array, created by UpdateFailMalformedHTLC_write
	 */
	public static Result_UpdateFailMalformedHTLCDecodeErrorZ read(byte[] ser) {
		long ret = bindings.UpdateFailMalformedHTLC_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_UpdateFailMalformedHTLCDecodeErrorZ ret_hu_conv = Result_UpdateFailMalformedHTLCDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
