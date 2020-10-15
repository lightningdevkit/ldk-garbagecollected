package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class FundingLocked extends CommonBase {
	FundingLocked(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.FundingLocked_free(ptr);
	}

	public FundingLocked(FundingLocked orig) {
		super(bindings.FundingLocked_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_channel_id(FundingLocked this_ptr) {
		byte[] ret = bindings.FundingLocked_get_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_id(FundingLocked this_ptr, byte[] val) {
		bindings.FundingLocked_set_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_next_per_commitment_point(FundingLocked this_ptr) {
		byte[] ret = bindings.FundingLocked_get_next_per_commitment_point(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_next_per_commitment_point(FundingLocked this_ptr, byte[] val) {
		bindings.FundingLocked_set_next_per_commitment_point(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public FundingLocked(byte[] channel_id_arg, byte[] next_per_commitment_point_arg) {
		super(bindings.FundingLocked_new(channel_id_arg, next_per_commitment_point_arg));
	}

	public byte[] write(FundingLocked obj) {
		byte[] ret = bindings.FundingLocked_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public FundingLocked(byte[] ser) {
		super(bindings.FundingLocked_read(ser));
	}

}
