package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class Shutdown extends CommonBase {
	Shutdown(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.Shutdown_free(ptr); super.finalize();
	}

	public Shutdown(Shutdown orig) {
		super(bindings.Shutdown_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_channel_id(Shutdown this_ptr) {
		byte[] ret = bindings.Shutdown_get_channel_id(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_id(Shutdown this_ptr, byte[] val) {
		bindings.Shutdown_set_channel_id(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	// Skipped Shutdown_get_scriptpubkey
	// Skipped Shutdown_set_scriptpubkey
	// Skipped Shutdown_new
	// Skipped Shutdown_write
	// Skipped Shutdown_read
}
