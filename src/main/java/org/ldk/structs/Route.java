package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class Route extends CommonBase {
	Route(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.Route_free(ptr);
	}

	public Route(Route orig) {
		super(bindings.Route_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	// Skipped Route_set_paths
	// Skipped Route_new
	public byte[] write(Route obj) {
		byte[] ret = bindings.Route_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public Route(byte[] ser) {
		super(bindings.Route_read(ser));
	}

}
