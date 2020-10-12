package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class ReplyChannelRange extends CommonBase {
	ReplyChannelRange(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.ReplyChannelRange_free(ptr); super.finalize();
	}

	public ReplyChannelRange(ReplyChannelRange orig) {
		super(bindings.ReplyChannelRange_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_chain_hash(ReplyChannelRange this_ptr) {
		byte[] ret = bindings.ReplyChannelRange_get_chain_hash(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_chain_hash(ReplyChannelRange this_ptr, byte[] val) {
		bindings.ReplyChannelRange_set_chain_hash(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public int get_first_blocknum(ReplyChannelRange this_ptr) {
		int ret = bindings.ReplyChannelRange_get_first_blocknum(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_first_blocknum(ReplyChannelRange this_ptr, int val) {
		bindings.ReplyChannelRange_set_first_blocknum(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public int get_number_of_blocks(ReplyChannelRange this_ptr) {
		int ret = bindings.ReplyChannelRange_get_number_of_blocks(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_number_of_blocks(ReplyChannelRange this_ptr, int val) {
		bindings.ReplyChannelRange_set_number_of_blocks(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public boolean get_full_information(ReplyChannelRange this_ptr) {
		boolean ret = bindings.ReplyChannelRange_get_full_information(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_full_information(ReplyChannelRange this_ptr, boolean val) {
		bindings.ReplyChannelRange_set_full_information(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	// Skipped ReplyChannelRange_set_short_channel_ids
	// Skipped ReplyChannelRange_new
	// Skipped ReplyChannelRange_read
	// Skipped ReplyChannelRange_write
}
