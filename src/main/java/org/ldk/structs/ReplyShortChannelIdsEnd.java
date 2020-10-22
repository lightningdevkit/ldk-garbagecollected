package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ReplyShortChannelIdsEnd extends CommonBase {
	ReplyShortChannelIdsEnd(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ReplyShortChannelIdsEnd_free(ptr); }
	}

	public static ReplyShortChannelIdsEnd constructor_clone(ReplyShortChannelIdsEnd orig) {
		long ret = bindings.ReplyShortChannelIdsEnd_clone(orig == null ? 0 : orig.ptr & ~1);
		ReplyShortChannelIdsEnd ret_hu_conv = new ReplyShortChannelIdsEnd(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public byte[] get_chain_hash() {
		byte[] ret = bindings.ReplyShortChannelIdsEnd_get_chain_hash(this.ptr);
		return ret;
	}

	public void set_chain_hash(byte[] val) {
		bindings.ReplyShortChannelIdsEnd_set_chain_hash(this.ptr, val);
	}

	public boolean get_full_information() {
		boolean ret = bindings.ReplyShortChannelIdsEnd_get_full_information(this.ptr);
		return ret;
	}

	public void set_full_information(boolean val) {
		bindings.ReplyShortChannelIdsEnd_set_full_information(this.ptr, val);
	}

	public static ReplyShortChannelIdsEnd constructor_new(byte[] chain_hash_arg, boolean full_information_arg) {
		long ret = bindings.ReplyShortChannelIdsEnd_new(chain_hash_arg, full_information_arg);
		ReplyShortChannelIdsEnd ret_hu_conv = new ReplyShortChannelIdsEnd(null, ret);
		return ret_hu_conv;
	}

	public static ReplyShortChannelIdsEnd constructor_read(byte[] ser) {
		long ret = bindings.ReplyShortChannelIdsEnd_read(ser);
		ReplyShortChannelIdsEnd ret_hu_conv = new ReplyShortChannelIdsEnd(null, ret);
		return ret_hu_conv;
	}

	public byte[] write(ReplyShortChannelIdsEnd obj) {
		byte[] ret = bindings.ReplyShortChannelIdsEnd_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

}
