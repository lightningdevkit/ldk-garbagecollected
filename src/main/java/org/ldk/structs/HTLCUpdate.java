package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class HTLCUpdate extends CommonBase {
	HTLCUpdate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.HTLCUpdate_free(ptr);
	}

	public HTLCUpdate(HTLCUpdate orig) {
		super(bindings.HTLCUpdate_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] write(HTLCUpdate obj) {
		byte[] ret = bindings.HTLCUpdate_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public HTLCUpdate(byte[] ser) {
		super(bindings.HTLCUpdate_read(ser));
	}

}
