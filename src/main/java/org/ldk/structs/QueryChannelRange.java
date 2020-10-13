package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class QueryChannelRange extends CommonBase {
	QueryChannelRange(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.QueryChannelRange_free(ptr); super.finalize();
	}

	public QueryChannelRange(QueryChannelRange orig) {
		super(bindings.QueryChannelRange_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_chain_hash(QueryChannelRange this_ptr) {
		byte[] ret = bindings.QueryChannelRange_get_chain_hash(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_chain_hash(QueryChannelRange this_ptr, byte[] val) {
		bindings.QueryChannelRange_set_chain_hash(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public int get_first_blocknum(QueryChannelRange this_ptr) {
		int ret = bindings.QueryChannelRange_get_first_blocknum(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_first_blocknum(QueryChannelRange this_ptr, int val) {
		bindings.QueryChannelRange_set_first_blocknum(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public int get_number_of_blocks(QueryChannelRange this_ptr) {
		int ret = bindings.QueryChannelRange_get_number_of_blocks(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_number_of_blocks(QueryChannelRange this_ptr, int val) {
		bindings.QueryChannelRange_set_number_of_blocks(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public QueryChannelRange(byte[] chain_hash_arg, int first_blocknum_arg, int number_of_blocks_arg) {
		super(bindings.QueryChannelRange_new(chain_hash_arg, first_blocknum_arg, number_of_blocks_arg));
	}

	public QueryChannelRange(byte[] ser) {
		super(bindings.QueryChannelRange_read(ser));
	}

	// Skipped QueryChannelRange_write
}
