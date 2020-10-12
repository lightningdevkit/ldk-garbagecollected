package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class CommitmentSigned extends CommonBase {
	CommitmentSigned(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.CommitmentSigned_free(ptr); super.finalize();
	}

	public CommitmentSigned(CommitmentSigned orig) {
		super(bindings.CommitmentSigned_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_channel_id(CommitmentSigned this_ptr) {
		byte[] ret = bindings.CommitmentSigned_get_channel_id(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_id(CommitmentSigned this_ptr, byte[] val) {
		bindings.CommitmentSigned_set_channel_id(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_signature(CommitmentSigned this_ptr) {
		byte[] ret = bindings.CommitmentSigned_get_signature(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_signature(CommitmentSigned this_ptr, byte[] val) {
		bindings.CommitmentSigned_set_signature(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	// Skipped CommitmentSigned_set_htlc_signatures
	// Skipped CommitmentSigned_new
	// Skipped CommitmentSigned_write
	// Skipped CommitmentSigned_read
}
