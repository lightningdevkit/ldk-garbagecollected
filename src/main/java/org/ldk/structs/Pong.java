package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class Pong extends CommonBase {
	Pong(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.Pong_free(ptr); super.finalize();
	}

	public Pong(Pong orig) {
		super(bindings.Pong_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public short get_byteslen(Pong this_ptr) {
		short ret = bindings.Pong_get_byteslen(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_byteslen(Pong this_ptr, short val) {
		bindings.Pong_set_byteslen(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public Pong(short byteslen_arg) {
		super(bindings.Pong_new(byteslen_arg));
	}

	// Skipped Pong_write
	// Skipped Pong_read
}
