package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A funding_locked message to be sent or received from a peer
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class FundingLocked extends CommonBase {
	FundingLocked(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.FundingLocked_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.FundingLocked_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.FundingLocked_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The per-commitment point of the second commitment transaction
	 */
	public byte[] get_next_per_commitment_point() {
		byte[] ret = bindings.FundingLocked_get_next_per_commitment_point(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The per-commitment point of the second commitment transaction
	 */
	public void set_next_per_commitment_point(byte[] val) {
		bindings.FundingLocked_set_next_per_commitment_point(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new FundingLocked given each field
	 */
	public static FundingLocked of(byte[] channel_id_arg, byte[] next_per_commitment_point_arg) {
		long ret = bindings.FundingLocked_new(InternalUtils.check_arr_len(channel_id_arg, 32), InternalUtils.check_arr_len(next_per_commitment_point_arg, 33));
		Reference.reachabilityFence(channel_id_arg);
		Reference.reachabilityFence(next_per_commitment_point_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		FundingLocked ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new FundingLocked(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.FundingLocked_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the FundingLocked
	 */
	public FundingLocked clone() {
		long ret = bindings.FundingLocked_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		FundingLocked ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new FundingLocked(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the FundingLocked object into a byte array which can be read by FundingLocked_read
	 */
	public byte[] write() {
		byte[] ret = bindings.FundingLocked_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a FundingLocked from a byte array, created by FundingLocked_write
	 */
	public static Result_FundingLockedDecodeErrorZ read(byte[] ser) {
		long ret = bindings.FundingLocked_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_FundingLockedDecodeErrorZ ret_hu_conv = Result_FundingLockedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
