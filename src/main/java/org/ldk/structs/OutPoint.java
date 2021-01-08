package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OutPoint extends CommonBase {
	OutPoint(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.OutPoint_free(ptr); }
	}

	public OutPoint clone() {
		long ret = bindings.OutPoint_clone(this.ptr);
		OutPoint ret_hu_conv = new OutPoint(null, ret);
		return ret_hu_conv;
	}

	public byte[] get_txid() {
		byte[] ret = bindings.OutPoint_get_txid(this.ptr);
		return ret;
	}

	public void set_txid(byte[] val) {
		bindings.OutPoint_set_txid(this.ptr, val);
	}

	public short get_index() {
		short ret = bindings.OutPoint_get_index(this.ptr);
		return ret;
	}

	public void set_index(short val) {
		bindings.OutPoint_set_index(this.ptr, val);
	}

	public static OutPoint constructor_new(byte[] txid_arg, short index_arg) {
		long ret = bindings.OutPoint_new(txid_arg, index_arg);
		OutPoint ret_hu_conv = new OutPoint(null, ret);
		return ret_hu_conv;
	}

	public byte[] to_channel_id() {
		byte[] ret = bindings.OutPoint_to_channel_id(this.ptr);
		return ret;
	}

	public byte[] write() {
		byte[] ret = bindings.OutPoint_write(this.ptr);
		return ret;
	}

	public static OutPoint constructor_read(byte[] ser) {
		long ret = bindings.OutPoint_read(ser);
		OutPoint ret_hu_conv = new OutPoint(null, ret);
		return ret_hu_conv;
	}

}
