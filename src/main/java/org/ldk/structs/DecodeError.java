package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class DecodeError extends CommonBase {
	DecodeError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.DecodeError_free(ptr); super.finalize();
	}

}
