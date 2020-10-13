package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class NodeAnnouncementInfo extends CommonBase {
	NodeAnnouncementInfo(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.NodeAnnouncementInfo_free(ptr); super.finalize();
	}

	public NodeFeatures get_features(NodeAnnouncementInfo this_ptr) {
		NodeFeatures ret = new NodeFeatures(null, bindings.NodeAnnouncementInfo_get_features(this_ptr == null ? 0 : this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_features(NodeAnnouncementInfo this_ptr, NodeFeatures val) {
		bindings.NodeAnnouncementInfo_set_features(this_ptr == null ? 0 : this_ptr.ptr & ~1, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	public int get_last_update(NodeAnnouncementInfo this_ptr) {
		int ret = bindings.NodeAnnouncementInfo_get_last_update(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_last_update(NodeAnnouncementInfo this_ptr, int val) {
		bindings.NodeAnnouncementInfo_set_last_update(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_rgb(NodeAnnouncementInfo this_ptr) {
		byte[] ret = bindings.NodeAnnouncementInfo_get_rgb(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_rgb(NodeAnnouncementInfo this_ptr, byte[] val) {
		bindings.NodeAnnouncementInfo_set_rgb(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_alias(NodeAnnouncementInfo this_ptr) {
		byte[] ret = bindings.NodeAnnouncementInfo_get_alias(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_alias(NodeAnnouncementInfo this_ptr, byte[] val) {
		bindings.NodeAnnouncementInfo_set_alias(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	// Skipped NodeAnnouncementInfo_set_addresses
	public NodeAnnouncement get_announcement_message(NodeAnnouncementInfo this_ptr) {
		NodeAnnouncement ret = new NodeAnnouncement(null, bindings.NodeAnnouncementInfo_get_announcement_message(this_ptr == null ? 0 : this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_announcement_message(NodeAnnouncementInfo this_ptr, NodeAnnouncement val) {
		bindings.NodeAnnouncementInfo_set_announcement_message(this_ptr == null ? 0 : this_ptr.ptr & ~1, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	// Skipped NodeAnnouncementInfo_new
	// Skipped NodeAnnouncementInfo_write
	public NodeAnnouncementInfo(byte[] ser) {
		super(bindings.NodeAnnouncementInfo_read(ser));
	}

}
