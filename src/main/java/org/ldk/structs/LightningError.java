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
	// Skipped LightningError_set_err
	// Skipped LightningError_get_action
	// Skipped LightningError_set_action
	// Skipped LightningError_new
}
