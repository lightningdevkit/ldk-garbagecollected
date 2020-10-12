package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class ChannelInfo extends CommonBase {
	ChannelInfo(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.ChannelInfo_free(ptr); super.finalize();
	}

	public ChannelFeatures get_features(ChannelInfo this_ptr) {
		ChannelFeatures ret = new ChannelFeatures(null, bindings.ChannelInfo_get_features(this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_features(ChannelInfo this_ptr, ChannelFeatures val) {
		bindings.ChannelInfo_set_features(this_ptr.ptr & ~1, val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	public byte[] get_node_one(ChannelInfo this_ptr) {
		byte[] ret = bindings.ChannelInfo_get_node_one(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_node_one(ChannelInfo this_ptr, byte[] val) {
		bindings.ChannelInfo_set_node_one(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public DirectionalChannelInfo get_one_to_two(ChannelInfo this_ptr) {
		DirectionalChannelInfo ret = new DirectionalChannelInfo(null, bindings.ChannelInfo_get_one_to_two(this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_one_to_two(ChannelInfo this_ptr, DirectionalChannelInfo val) {
		bindings.ChannelInfo_set_one_to_two(this_ptr.ptr & ~1, val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	public byte[] get_node_two(ChannelInfo this_ptr) {
		byte[] ret = bindings.ChannelInfo_get_node_two(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_node_two(ChannelInfo this_ptr, byte[] val) {
		bindings.ChannelInfo_set_node_two(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public DirectionalChannelInfo get_two_to_one(ChannelInfo this_ptr) {
		DirectionalChannelInfo ret = new DirectionalChannelInfo(null, bindings.ChannelInfo_get_two_to_one(this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_two_to_one(ChannelInfo this_ptr, DirectionalChannelInfo val) {
		bindings.ChannelInfo_set_two_to_one(this_ptr.ptr & ~1, val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	public ChannelAnnouncement get_announcement_message(ChannelInfo this_ptr) {
		ChannelAnnouncement ret = new ChannelAnnouncement(null, bindings.ChannelInfo_get_announcement_message(this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_announcement_message(ChannelInfo this_ptr, ChannelAnnouncement val) {
		bindings.ChannelInfo_set_announcement_message(this_ptr.ptr & ~1, val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	// Skipped ChannelInfo_write
	// Skipped ChannelInfo_read
}
