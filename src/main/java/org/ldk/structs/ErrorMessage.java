package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class ErrorMessage extends CommonBase {
	ErrorMessage(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.ErrorMessage_free(ptr); super.finalize();
	}

	public ErrorMessage(ErrorMessage orig) {
		super(bindings.ErrorMessage_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_channel_id(ErrorMessage this_ptr) {
		byte[] ret = bindings.ErrorMessage_get_channel_id(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_id(ErrorMessage this_ptr, byte[] val) {
		bindings.ErrorMessage_set_channel_id(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	// Skipped ErrorMessage_get_data
	// Skipped ErrorMessage_set_data
	// Skipped ErrorMessage_new
	// Skipped ErrorMessage_write
	// Skipped ErrorMessage_read
}
