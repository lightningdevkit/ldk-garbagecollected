package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class UpdateAddHTLC extends CommonBase {
	UpdateAddHTLC(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.UpdateAddHTLC_free(ptr); super.finalize();
	}

	public UpdateAddHTLC(UpdateAddHTLC orig) {
		super(bindings.UpdateAddHTLC_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_channel_id(UpdateAddHTLC this_ptr) {
		byte[] ret = bindings.UpdateAddHTLC_get_channel_id(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_id(UpdateAddHTLC this_ptr, byte[] val) {
		bindings.UpdateAddHTLC_set_channel_id(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_htlc_id(UpdateAddHTLC this_ptr) {
		long ret = bindings.UpdateAddHTLC_get_htlc_id(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_htlc_id(UpdateAddHTLC this_ptr, long val) {
		bindings.UpdateAddHTLC_set_htlc_id(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_amount_msat(UpdateAddHTLC this_ptr) {
		long ret = bindings.UpdateAddHTLC_get_amount_msat(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_amount_msat(UpdateAddHTLC this_ptr, long val) {
		bindings.UpdateAddHTLC_set_amount_msat(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_payment_hash(UpdateAddHTLC this_ptr) {
		byte[] ret = bindings.UpdateAddHTLC_get_payment_hash(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_payment_hash(UpdateAddHTLC this_ptr, byte[] val) {
		bindings.UpdateAddHTLC_set_payment_hash(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public int get_cltv_expiry(UpdateAddHTLC this_ptr) {
		int ret = bindings.UpdateAddHTLC_get_cltv_expiry(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_cltv_expiry(UpdateAddHTLC this_ptr, int val) {
		bindings.UpdateAddHTLC_set_cltv_expiry(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	// Skipped UpdateAddHTLC_write
	// Skipped UpdateAddHTLC_read
}
