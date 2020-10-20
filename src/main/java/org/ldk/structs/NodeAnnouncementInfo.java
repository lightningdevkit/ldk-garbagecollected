package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class NodeAnnouncementInfo extends CommonBase {
	NodeAnnouncementInfo(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.NodeAnnouncementInfo_free(ptr);
	}

	public NodeFeatures get_features() {
		long ret = bindings.NodeAnnouncementInfo_get_features(this.ptr);
		NodeFeatures ret_hu_conv = new NodeFeatures(null, ret);
		return ret_hu_conv;
	}

	// Skipped NodeAnnouncementInfo_set_features
	public int get_last_update() {
		int ret = bindings.NodeAnnouncementInfo_get_last_update(this.ptr);
		return ret;
	}

	public void set_last_update(int val) {
		bindings.NodeAnnouncementInfo_set_last_update(this.ptr, val);
	}

	public byte[] get_rgb() {
		byte[] ret = bindings.NodeAnnouncementInfo_get_rgb(this.ptr);
		return ret;
	}

	public void set_rgb(byte[] val) {
		bindings.NodeAnnouncementInfo_set_rgb(this.ptr, val);
	}

	public byte[] get_alias() {
		byte[] ret = bindings.NodeAnnouncementInfo_get_alias(this.ptr);
		return ret;
	}

	public void set_alias(byte[] val) {
		bindings.NodeAnnouncementInfo_set_alias(this.ptr, val);
	}

	public void set_addresses(NetAddress[] val) {
		bindings.NodeAnnouncementInfo_set_addresses(this.ptr, Arrays.stream(val).mapToLong(arr_conv_12 -> arr_conv_12.conv_to_c()).toArray());
		/* TODO 2 NetAddress  */;
	}

	public NodeAnnouncement get_announcement_message() {
		long ret = bindings.NodeAnnouncementInfo_get_announcement_message(this.ptr);
		NodeAnnouncement ret_hu_conv = new NodeAnnouncement(null, ret);
		return ret_hu_conv;
	}

	public void set_announcement_message(NodeAnnouncement val) {
		bindings.NodeAnnouncementInfo_set_announcement_message(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	// Skipped NodeAnnouncementInfo_new
	public byte[] write(NodeAnnouncementInfo obj) {
		byte[] ret = bindings.NodeAnnouncementInfo_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static NodeAnnouncementInfo constructor_read(byte[] ser) {
		long ret = bindings.NodeAnnouncementInfo_read(ser);
		NodeAnnouncementInfo ret_hu_conv = new NodeAnnouncementInfo(null, ret);
		return ret_hu_conv;
	}

}
