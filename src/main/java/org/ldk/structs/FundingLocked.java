package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class FundingLocked extends CommonBase {
	FundingLocked(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.FundingLocked_free(ptr); }
	}

	public byte[] get_channel_id() {
		byte[] ret = bindings.FundingLocked_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(byte[] val) {
		bindings.FundingLocked_set_channel_id(this.ptr, val);
	}

	public byte[] get_next_per_commitment_point() {
		byte[] ret = bindings.FundingLocked_get_next_per_commitment_point(this.ptr);
		return ret;
	}

	public void set_next_per_commitment_point(byte[] val) {
		bindings.FundingLocked_set_next_per_commitment_point(this.ptr, val);
	}

	public static FundingLocked constructor_new(byte[] channel_id_arg, byte[] next_per_commitment_point_arg) {
		long ret = bindings.FundingLocked_new(channel_id_arg, next_per_commitment_point_arg);
		FundingLocked ret_hu_conv = new FundingLocked(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public FundingLocked clone() {
		long ret = bindings.FundingLocked_clone(this.ptr);
		FundingLocked ret_hu_conv = new FundingLocked(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.FundingLocked_write(this.ptr);
		return ret;
	}

	public static Result_FundingLockedDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.FundingLocked_read(ser);
		Result_FundingLockedDecodeErrorZ ret_hu_conv = Result_FundingLockedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
