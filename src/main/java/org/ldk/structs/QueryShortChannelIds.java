package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class QueryShortChannelIds extends CommonBase {
	QueryShortChannelIds(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.QueryShortChannelIds_free(ptr);
	}

	public QueryShortChannelIds(QueryShortChannelIds orig) {
		super(bindings.QueryShortChannelIds_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_chain_hash(QueryShortChannelIds this_ptr) {
		byte[] ret = bindings.QueryShortChannelIds_get_chain_hash(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_chain_hash(QueryShortChannelIds this_ptr, byte[] val) {
		bindings.QueryShortChannelIds_set_chain_hash(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	// Skipped QueryShortChannelIds_set_short_channel_ids
	// Skipped QueryShortChannelIds_new
	public QueryShortChannelIds(byte[] ser) {
		super(bindings.QueryShortChannelIds_read(ser));
	}

	public byte[] write(QueryShortChannelIds obj) {
		byte[] ret = bindings.QueryShortChannelIds_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

}
