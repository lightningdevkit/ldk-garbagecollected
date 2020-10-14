package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class HTLCOutputInCommitment extends CommonBase {
	HTLCOutputInCommitment(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.HTLCOutputInCommitment_free(ptr);
	}

	public HTLCOutputInCommitment(HTLCOutputInCommitment orig) {
		super(bindings.HTLCOutputInCommitment_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public boolean get_offered(HTLCOutputInCommitment this_ptr) {
		boolean ret = bindings.HTLCOutputInCommitment_get_offered(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_offered(HTLCOutputInCommitment this_ptr, boolean val) {
		bindings.HTLCOutputInCommitment_set_offered(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_amount_msat(HTLCOutputInCommitment this_ptr) {
		long ret = bindings.HTLCOutputInCommitment_get_amount_msat(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_amount_msat(HTLCOutputInCommitment this_ptr, long val) {
		bindings.HTLCOutputInCommitment_set_amount_msat(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public int get_cltv_expiry(HTLCOutputInCommitment this_ptr) {
		int ret = bindings.HTLCOutputInCommitment_get_cltv_expiry(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_cltv_expiry(HTLCOutputInCommitment this_ptr, int val) {
		bindings.HTLCOutputInCommitment_set_cltv_expiry(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_payment_hash(HTLCOutputInCommitment this_ptr) {
		byte[] ret = bindings.HTLCOutputInCommitment_get_payment_hash(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_payment_hash(HTLCOutputInCommitment this_ptr, byte[] val) {
		bindings.HTLCOutputInCommitment_set_payment_hash(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	// Skipped HTLCOutputInCommitment_write
	public HTLCOutputInCommitment(byte[] ser) {
		super(bindings.HTLCOutputInCommitment_read(ser));
	}

}
