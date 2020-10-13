package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class Route extends CommonBase {
	Route(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.Route_free(ptr); super.finalize();
	}

	public Route(Route orig) {
		super(bindings.Route_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	// Skipped Route_set_paths
	// Skipped Route_new
	// Skipped Route_write
	public Route(byte[] ser) {
		super(bindings.Route_read(ser));
	}

}
