package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An update_fulfill_htlc message to be sent or received from a peer
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class UpdateFulfillHTLC extends CommonBase {
	UpdateFulfillHTLC(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UpdateFulfillHTLC_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.UpdateFulfillHTLC_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.UpdateFulfillHTLC_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The HTLC ID
	 */
	public long get_htlc_id() {
		long ret = bindings.UpdateFulfillHTLC_get_htlc_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The HTLC ID
	 */
	public void set_htlc_id(long val) {
		bindings.UpdateFulfillHTLC_set_htlc_id(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The pre-image of the payment hash, allowing HTLC redemption
	 */
	public byte[] get_payment_preimage() {
		byte[] ret = bindings.UpdateFulfillHTLC_get_payment_preimage(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The pre-image of the payment hash, allowing HTLC redemption
	 */
	public void set_payment_preimage(byte[] val) {
		bindings.UpdateFulfillHTLC_set_payment_preimage(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new UpdateFulfillHTLC given each field
	 */
	public static UpdateFulfillHTLC of(byte[] channel_id_arg, long htlc_id_arg, byte[] payment_preimage_arg) {
		long ret = bindings.UpdateFulfillHTLC_new(InternalUtils.check_arr_len(channel_id_arg, 32), htlc_id_arg, InternalUtils.check_arr_len(payment_preimage_arg, 32));
		Reference.reachabilityFence(channel_id_arg);
		Reference.reachabilityFence(htlc_id_arg);
		Reference.reachabilityFence(payment_preimage_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		UpdateFulfillHTLC ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new UpdateFulfillHTLC(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.UpdateFulfillHTLC_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the UpdateFulfillHTLC
	 */
	public UpdateFulfillHTLC clone() {
		long ret = bindings.UpdateFulfillHTLC_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		UpdateFulfillHTLC ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new UpdateFulfillHTLC(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the UpdateFulfillHTLC object into a byte array which can be read by UpdateFulfillHTLC_read
	 */
	public byte[] write() {
		byte[] ret = bindings.UpdateFulfillHTLC_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a UpdateFulfillHTLC from a byte array, created by UpdateFulfillHTLC_write
	 */
	public static Result_UpdateFulfillHTLCDecodeErrorZ read(byte[] ser) {
		long ret = bindings.UpdateFulfillHTLC_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_UpdateFulfillHTLCDecodeErrorZ ret_hu_conv = Result_UpdateFulfillHTLCDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
