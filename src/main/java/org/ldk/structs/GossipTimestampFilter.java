package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class GossipTimestampFilter extends CommonBase {
	GossipTimestampFilter(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.GossipTimestampFilter_free(ptr); }
	}

	public static GossipTimestampFilter constructor_clone(GossipTimestampFilter orig) {
		long ret = bindings.GossipTimestampFilter_clone(orig == null ? 0 : orig.ptr & ~1);
		GossipTimestampFilter ret_hu_conv = new GossipTimestampFilter(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public byte[] get_chain_hash() {
		byte[] ret = bindings.GossipTimestampFilter_get_chain_hash(this.ptr);
		return ret;
	}

	public void set_chain_hash(byte[] val) {
		bindings.GossipTimestampFilter_set_chain_hash(this.ptr, val);
	}

	public int get_first_timestamp() {
		int ret = bindings.GossipTimestampFilter_get_first_timestamp(this.ptr);
		return ret;
	}

	public void set_first_timestamp(int val) {
		bindings.GossipTimestampFilter_set_first_timestamp(this.ptr, val);
	}

	public int get_timestamp_range() {
		int ret = bindings.GossipTimestampFilter_get_timestamp_range(this.ptr);
		return ret;
	}

	public void set_timestamp_range(int val) {
		bindings.GossipTimestampFilter_set_timestamp_range(this.ptr, val);
	}

	public static GossipTimestampFilter constructor_new(byte[] chain_hash_arg, int first_timestamp_arg, int timestamp_range_arg) {
		long ret = bindings.GossipTimestampFilter_new(chain_hash_arg, first_timestamp_arg, timestamp_range_arg);
		GossipTimestampFilter ret_hu_conv = new GossipTimestampFilter(null, ret);
		return ret_hu_conv;
	}

	public static GossipTimestampFilter constructor_read(byte[] ser) {
		long ret = bindings.GossipTimestampFilter_read(ser);
		GossipTimestampFilter ret_hu_conv = new GossipTimestampFilter(null, ret);
		return ret_hu_conv;
	}

	public byte[] write(GossipTimestampFilter obj) {
		byte[] ret = bindings.GossipTimestampFilter_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

}
