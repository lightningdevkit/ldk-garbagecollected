package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class OutPoint extends CommonBase {
	OutPoint(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.OutPoint_free(ptr); super.finalize();
	}

	public OutPoint(OutPoint orig) {
		super(bindings.OutPoint_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_txid(OutPoint this_ptr) {
		byte[] ret = bindings.OutPoint_get_txid(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_txid(OutPoint this_ptr, byte[] val) {
		bindings.OutPoint_set_txid(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public short get_index(OutPoint this_ptr) {
		short ret = bindings.OutPoint_get_index(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_index(OutPoint this_ptr, short val) {
		bindings.OutPoint_set_index(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public OutPoint(byte[] txid_arg, short index_arg) {
		super(bindings.OutPoint_new(txid_arg, index_arg));
	}

	public byte[] to_channel_id() {
		byte[] ret = bindings.OutPoint_to_channel_id(this.ptr);
		return ret;
	}

	// Skipped OutPoint_write
	// Skipped OutPoint_read
}
