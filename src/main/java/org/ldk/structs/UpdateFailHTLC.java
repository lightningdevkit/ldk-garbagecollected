package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class UpdateFailHTLC extends CommonBase {
	UpdateFailHTLC(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.UpdateFailHTLC_free(ptr);
	}

	public UpdateFailHTLC(UpdateFailHTLC orig) {
		super(bindings.UpdateFailHTLC_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_channel_id(UpdateFailHTLC this_ptr) {
		byte[] ret = bindings.UpdateFailHTLC_get_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_id(UpdateFailHTLC this_ptr, byte[] val) {
		bindings.UpdateFailHTLC_set_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_htlc_id(UpdateFailHTLC this_ptr) {
		long ret = bindings.UpdateFailHTLC_get_htlc_id(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_htlc_id(UpdateFailHTLC this_ptr, long val) {
		bindings.UpdateFailHTLC_set_htlc_id(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	// Skipped UpdateFailHTLC_write
	public UpdateFailHTLC(byte[] ser) {
		super(bindings.UpdateFailHTLC_read(ser));
	}

}
