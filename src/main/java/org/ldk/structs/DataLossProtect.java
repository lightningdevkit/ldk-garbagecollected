package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * Proof that the sender knows the per-commitment secret of the previous commitment transaction.
 * This is used to convince the recipient that the channel is at a certain commitment
 * number even if they lost that data due to a local failure.  Of course, the peer may lie
 * and even later commitments may have been revoked.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class DataLossProtect extends CommonBase {
	DataLossProtect(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.DataLossProtect_free(ptr); }
	}

	/**
	 * Proof that the sender knows the per-commitment secret of a specific commitment transaction
	 * belonging to the recipient
	 */
	public byte[] get_your_last_per_commitment_secret() {
		byte[] ret = bindings.DataLossProtect_get_your_last_per_commitment_secret(this.ptr);
		return ret;
	}

	/**
	 * Proof that the sender knows the per-commitment secret of a specific commitment transaction
	 * belonging to the recipient
	 */
	public void set_your_last_per_commitment_secret(byte[] val) {
		bindings.DataLossProtect_set_your_last_per_commitment_secret(this.ptr, InternalUtils.check_arr_len(val, 32));
	}

	/**
	 * The sender's per-commitment point for their current commitment transaction
	 */
	public byte[] get_my_current_per_commitment_point() {
		byte[] ret = bindings.DataLossProtect_get_my_current_per_commitment_point(this.ptr);
		return ret;
	}

	/**
	 * The sender's per-commitment point for their current commitment transaction
	 */
	public void set_my_current_per_commitment_point(byte[] val) {
		bindings.DataLossProtect_set_my_current_per_commitment_point(this.ptr, InternalUtils.check_arr_len(val, 33));
	}

	/**
	 * Constructs a new DataLossProtect given each field
	 */
	public static DataLossProtect of(byte[] your_last_per_commitment_secret_arg, byte[] my_current_per_commitment_point_arg) {
		long ret = bindings.DataLossProtect_new(InternalUtils.check_arr_len(your_last_per_commitment_secret_arg, 32), InternalUtils.check_arr_len(my_current_per_commitment_point_arg, 33));
		if (ret >= 0 && ret <= 4096) { return null; }
		DataLossProtect ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new DataLossProtect(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.DataLossProtect_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the DataLossProtect
	 */
	public DataLossProtect clone() {
		long ret = bindings.DataLossProtect_clone(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		DataLossProtect ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new DataLossProtect(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
