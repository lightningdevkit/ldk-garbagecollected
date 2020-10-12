package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class FundingSigned extends CommonBase {
	FundingSigned(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.FundingSigned_free(ptr); super.finalize();
	}

	public FundingSigned(FundingSigned orig) {
		super(bindings.FundingSigned_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_channel_id(FundingSigned this_ptr) {
		byte[] ret = bindings.FundingSigned_get_channel_id(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_id(FundingSigned this_ptr, byte[] val) {
		bindings.FundingSigned_set_channel_id(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	// Skipped FundingSigned_get_signature
	// Skipped FundingSigned_set_signature
	// Skipped FundingSigned_new
	// Skipped FundingSigned_write
	// Skipped FundingSigned_read
}
