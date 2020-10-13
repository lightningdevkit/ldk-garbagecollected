package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class Ping extends CommonBase {
	Ping(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.Ping_free(ptr); super.finalize();
	}

	public Ping(Ping orig) {
		super(bindings.Ping_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public short get_ponglen(Ping this_ptr) {
		short ret = bindings.Ping_get_ponglen(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_ponglen(Ping this_ptr, short val) {
		bindings.Ping_set_ponglen(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public short get_byteslen(Ping this_ptr) {
		short ret = bindings.Ping_get_byteslen(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_byteslen(Ping this_ptr, short val) {
		bindings.Ping_set_byteslen(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public Ping(short ponglen_arg, short byteslen_arg) {
		super(bindings.Ping_new(ponglen_arg, byteslen_arg));
	}

	// Skipped Ping_write
	public Ping(byte[] ser) {
		super(bindings.Ping_read(ser));
	}

}
