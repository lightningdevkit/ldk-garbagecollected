package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class ErrorMessage extends CommonBase {
	ErrorMessage(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.ErrorMessage_free(ptr);
	}

	public ErrorMessage(ErrorMessage orig) {
		super(bindings.ErrorMessage_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_channel_id(ErrorMessage this_ptr) {
		byte[] ret = bindings.ErrorMessage_get_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_id(ErrorMessage this_ptr, byte[] val) {
		bindings.ErrorMessage_set_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	// Skipped ErrorMessage_get_data
	// Skipped ErrorMessage_set_data
	// Skipped ErrorMessage_new
	// Skipped ErrorMessage_write
	public ErrorMessage(byte[] ser) {
		super(bindings.ErrorMessage_read(ser));
	}

}
