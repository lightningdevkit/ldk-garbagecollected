package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class Init extends CommonBase {
	Init(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.Init_free(ptr);
	}

	public Init(Init orig) {
		super(bindings.Init_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] write(Init obj) {
		byte[] ret = bindings.Init_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public Init(byte[] ser) {
		super(bindings.Init_read(ser));
	}

}
