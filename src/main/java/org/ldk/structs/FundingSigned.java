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
		super(bindings.FundingSigned_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_channel_id(FundingSigned this_ptr) {
		byte[] ret = bindings.FundingSigned_get_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_id(FundingSigned this_ptr, byte[] val) {
		bindings.FundingSigned_set_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_signature(FundingSigned this_ptr) {
		byte[] ret = bindings.FundingSigned_get_signature(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_signature(FundingSigned this_ptr, byte[] val) {
		bindings.FundingSigned_set_signature(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public FundingSigned(byte[] channel_id_arg, byte[] signature_arg) {
		super(bindings.FundingSigned_new(channel_id_arg, signature_arg));
	}

	// Skipped FundingSigned_write
	public FundingSigned(byte[] ser) {
		super(bindings.FundingSigned_read(ser));
	}

}
