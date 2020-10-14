package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class UpdateFailMalformedHTLC extends CommonBase {
	UpdateFailMalformedHTLC(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.UpdateFailMalformedHTLC_free(ptr);
	}

	public UpdateFailMalformedHTLC(UpdateFailMalformedHTLC orig) {
		super(bindings.UpdateFailMalformedHTLC_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_channel_id(UpdateFailMalformedHTLC this_ptr) {
		byte[] ret = bindings.UpdateFailMalformedHTLC_get_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_id(UpdateFailMalformedHTLC this_ptr, byte[] val) {
		bindings.UpdateFailMalformedHTLC_set_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_htlc_id(UpdateFailMalformedHTLC this_ptr) {
		long ret = bindings.UpdateFailMalformedHTLC_get_htlc_id(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_htlc_id(UpdateFailMalformedHTLC this_ptr, long val) {
		bindings.UpdateFailMalformedHTLC_set_htlc_id(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public short get_failure_code(UpdateFailMalformedHTLC this_ptr) {
		short ret = bindings.UpdateFailMalformedHTLC_get_failure_code(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_failure_code(UpdateFailMalformedHTLC this_ptr, short val) {
		bindings.UpdateFailMalformedHTLC_set_failure_code(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	// Skipped UpdateFailMalformedHTLC_write
	public UpdateFailMalformedHTLC(byte[] ser) {
		super(bindings.UpdateFailMalformedHTLC_read(ser));
	}

}
