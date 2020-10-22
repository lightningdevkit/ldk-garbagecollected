package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class QueryChannelRange extends CommonBase {
	QueryChannelRange(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.QueryChannelRange_free(ptr); }
	}

	public static QueryChannelRange constructor_clone(QueryChannelRange orig) {
		long ret = bindings.QueryChannelRange_clone(orig == null ? 0 : orig.ptr & ~1);
		QueryChannelRange ret_hu_conv = new QueryChannelRange(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public byte[] get_chain_hash() {
		byte[] ret = bindings.QueryChannelRange_get_chain_hash(this.ptr);
		return ret;
	}

	public void set_chain_hash(byte[] val) {
		bindings.QueryChannelRange_set_chain_hash(this.ptr, val);
	}

	public int get_first_blocknum() {
		int ret = bindings.QueryChannelRange_get_first_blocknum(this.ptr);
		return ret;
	}

	public void set_first_blocknum(int val) {
		bindings.QueryChannelRange_set_first_blocknum(this.ptr, val);
	}

	public int get_number_of_blocks() {
		int ret = bindings.QueryChannelRange_get_number_of_blocks(this.ptr);
		return ret;
	}

	public void set_number_of_blocks(int val) {
		bindings.QueryChannelRange_set_number_of_blocks(this.ptr, val);
	}

	public static QueryChannelRange constructor_new(byte[] chain_hash_arg, int first_blocknum_arg, int number_of_blocks_arg) {
		long ret = bindings.QueryChannelRange_new(chain_hash_arg, first_blocknum_arg, number_of_blocks_arg);
		QueryChannelRange ret_hu_conv = new QueryChannelRange(null, ret);
		return ret_hu_conv;
	}

	public static QueryChannelRange constructor_read(byte[] ser) {
		long ret = bindings.QueryChannelRange_read(ser);
		QueryChannelRange ret_hu_conv = new QueryChannelRange(null, ret);
		return ret_hu_conv;
	}

	public byte[] write(QueryChannelRange obj) {
		byte[] ret = bindings.QueryChannelRange_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

}
