package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class FundingLocked extends CommonBase {
	FundingLocked(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.FundingLocked_free(ptr); super.finalize();
	}

	public FundingLocked(FundingLocked orig) {
		super(bindings.FundingLocked_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_channel_id(FundingLocked this_ptr) {
		byte[] ret = bindings.FundingLocked_get_channel_id(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_id(FundingLocked this_ptr, byte[] val) {
		bindings.FundingLocked_set_channel_id(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_next_per_commitment_point(FundingLocked this_ptr) {
		byte[] ret = bindings.FundingLocked_get_next_per_commitment_point(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_next_per_commitment_point(FundingLocked this_ptr, byte[] val) {
		bindings.FundingLocked_set_next_per_commitment_point(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public FundingLocked(byte[] channel_id_arg, byte[] next_per_commitment_point_arg) {
		super(bindings.FundingLocked_new(channel_id_arg, next_per_commitment_point_arg));
	}

	// Skipped FundingLocked_write
	// Skipped FundingLocked_read
}
