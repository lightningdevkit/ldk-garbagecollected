package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class ReplyShortChannelIdsEnd extends CommonBase {
	ReplyShortChannelIdsEnd(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.ReplyShortChannelIdsEnd_free(ptr); super.finalize();
	}

	public ReplyShortChannelIdsEnd(ReplyShortChannelIdsEnd orig) {
		super(bindings.ReplyShortChannelIdsEnd_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_chain_hash(ReplyShortChannelIdsEnd this_ptr) {
		byte[] ret = bindings.ReplyShortChannelIdsEnd_get_chain_hash(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_chain_hash(ReplyShortChannelIdsEnd this_ptr, byte[] val) {
		bindings.ReplyShortChannelIdsEnd_set_chain_hash(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public boolean get_full_information(ReplyShortChannelIdsEnd this_ptr) {
		boolean ret = bindings.ReplyShortChannelIdsEnd_get_full_information(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_full_information(ReplyShortChannelIdsEnd this_ptr, boolean val) {
		bindings.ReplyShortChannelIdsEnd_set_full_information(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public ReplyShortChannelIdsEnd(byte[] chain_hash_arg, boolean full_information_arg) {
		super(bindings.ReplyShortChannelIdsEnd_new(chain_hash_arg, full_information_arg));
	}

	public ReplyShortChannelIdsEnd(byte[] ser) {
		super(bindings.ReplyShortChannelIdsEnd_read(ser));
	}

	// Skipped ReplyShortChannelIdsEnd_write
}
