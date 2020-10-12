package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class ClosingSigned extends CommonBase {
	ClosingSigned(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.ClosingSigned_free(ptr); super.finalize();
	}

	public ClosingSigned(ClosingSigned orig) {
		super(bindings.ClosingSigned_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_channel_id(ClosingSigned this_ptr) {
		byte[] ret = bindings.ClosingSigned_get_channel_id(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_id(ClosingSigned this_ptr, byte[] val) {
		bindings.ClosingSigned_set_channel_id(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_fee_satoshis(ClosingSigned this_ptr) {
		long ret = bindings.ClosingSigned_get_fee_satoshis(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_fee_satoshis(ClosingSigned this_ptr, long val) {
		bindings.ClosingSigned_set_fee_satoshis(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_signature(ClosingSigned this_ptr) {
		byte[] ret = bindings.ClosingSigned_get_signature(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_signature(ClosingSigned this_ptr, byte[] val) {
		bindings.ClosingSigned_set_signature(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public ClosingSigned(byte[] channel_id_arg, long fee_satoshis_arg, byte[] signature_arg) {
		super(bindings.ClosingSigned_new(channel_id_arg, fee_satoshis_arg, signature_arg));
	}

	// Skipped ClosingSigned_write
	// Skipped ClosingSigned_read
}
