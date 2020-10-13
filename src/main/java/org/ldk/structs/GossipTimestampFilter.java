package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class GossipTimestampFilter extends CommonBase {
	GossipTimestampFilter(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.GossipTimestampFilter_free(ptr); super.finalize();
	}

	public GossipTimestampFilter(GossipTimestampFilter orig) {
		super(bindings.GossipTimestampFilter_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_chain_hash(GossipTimestampFilter this_ptr) {
		byte[] ret = bindings.GossipTimestampFilter_get_chain_hash(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_chain_hash(GossipTimestampFilter this_ptr, byte[] val) {
		bindings.GossipTimestampFilter_set_chain_hash(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public int get_first_timestamp(GossipTimestampFilter this_ptr) {
		int ret = bindings.GossipTimestampFilter_get_first_timestamp(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_first_timestamp(GossipTimestampFilter this_ptr, int val) {
		bindings.GossipTimestampFilter_set_first_timestamp(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public int get_timestamp_range(GossipTimestampFilter this_ptr) {
		int ret = bindings.GossipTimestampFilter_get_timestamp_range(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_timestamp_range(GossipTimestampFilter this_ptr, int val) {
		bindings.GossipTimestampFilter_set_timestamp_range(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public GossipTimestampFilter(byte[] chain_hash_arg, int first_timestamp_arg, int timestamp_range_arg) {
		super(bindings.GossipTimestampFilter_new(chain_hash_arg, first_timestamp_arg, timestamp_range_arg));
	}

	public GossipTimestampFilter(byte[] ser) {
		super(bindings.GossipTimestampFilter_read(ser));
	}

	// Skipped GossipTimestampFilter_write
}
