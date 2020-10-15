package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class LightningError extends CommonBase {
	LightningError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.LightningError_free(ptr);
	}

	// Skipped LightningError_get_err
	public void set_err(LightningError this_ptr, byte[] val) {
		bindings.LightningError_set_err(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	// Skipped LightningError_get_action
	// Skipped LightningError_set_action
	// Skipped LightningError_new
}
