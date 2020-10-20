package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class LightningError extends CommonBase {
	LightningError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.LightningError_free(ptr);
	}

	public String get_err() {
		String ret = bindings.LightningError_get_err(this.ptr);
		return ret;
	}

	public void set_err(byte[] val) {
		bindings.LightningError_set_err(this.ptr, val);
	}

	// Skipped LightningError_get_action
	// Skipped LightningError_set_action
	// Skipped LightningError_new
}
