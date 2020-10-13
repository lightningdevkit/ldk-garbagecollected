package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class HTLCUpdate extends CommonBase {
	HTLCUpdate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.HTLCUpdate_free(ptr); super.finalize();
	}

	public HTLCUpdate(HTLCUpdate orig) {
		super(bindings.HTLCUpdate_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	// Skipped HTLCUpdate_write
	public HTLCUpdate(byte[] ser) {
		super(bindings.HTLCUpdate_read(ser));
	}

}
