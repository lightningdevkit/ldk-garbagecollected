package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class CommitmentUpdate extends CommonBase {
	CommitmentUpdate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.CommitmentUpdate_free(ptr); super.finalize();
	}

	public CommitmentUpdate(CommitmentUpdate orig) {
		super(bindings.CommitmentUpdate_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	// Skipped CommitmentUpdate_set_update_add_htlcs
	// Skipped CommitmentUpdate_set_update_fulfill_htlcs
	// Skipped CommitmentUpdate_set_update_fail_htlcs
	// Skipped CommitmentUpdate_set_update_fail_malformed_htlcs
	public UpdateFee get_update_fee(CommitmentUpdate this_ptr) {
		UpdateFee ret = new UpdateFee(null, bindings.CommitmentUpdate_get_update_fee(this_ptr == null ? 0 : this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_update_fee(CommitmentUpdate this_ptr, UpdateFee val) {
		bindings.CommitmentUpdate_set_update_fee(this_ptr == null ? 0 : this_ptr.ptr & ~1, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	public CommitmentSigned get_commitment_signed(CommitmentUpdate this_ptr) {
		CommitmentSigned ret = new CommitmentSigned(null, bindings.CommitmentUpdate_get_commitment_signed(this_ptr == null ? 0 : this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_commitment_signed(CommitmentUpdate this_ptr, CommitmentSigned val) {
		bindings.CommitmentUpdate_set_commitment_signed(this_ptr == null ? 0 : this_ptr.ptr & ~1, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	// Skipped CommitmentUpdate_new
}
