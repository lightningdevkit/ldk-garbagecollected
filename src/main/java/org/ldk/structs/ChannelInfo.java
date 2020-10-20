package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelInfo extends CommonBase {
	ChannelInfo(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.ChannelInfo_free(ptr);
	}

	public ChannelFeatures get_features() {
		long ret = bindings.ChannelInfo_get_features(this.ptr);
		ChannelFeatures ret_hu_conv = new ChannelFeatures(null, ret);
		return ret_hu_conv;
	}

	// Skipped ChannelInfo_set_features
	public byte[] get_node_one() {
		byte[] ret = bindings.ChannelInfo_get_node_one(this.ptr);
		return ret;
	}

	public void set_node_one(byte[] val) {
		bindings.ChannelInfo_set_node_one(this.ptr, val);
	}

	public DirectionalChannelInfo get_one_to_two() {
		long ret = bindings.ChannelInfo_get_one_to_two(this.ptr);
		DirectionalChannelInfo ret_hu_conv = new DirectionalChannelInfo(null, ret);
		return ret_hu_conv;
	}

	// Skipped ChannelInfo_set_one_to_two
	public byte[] get_node_two() {
		byte[] ret = bindings.ChannelInfo_get_node_two(this.ptr);
		return ret;
	}

	public void set_node_two(byte[] val) {
		bindings.ChannelInfo_set_node_two(this.ptr, val);
	}

	public DirectionalChannelInfo get_two_to_one() {
		long ret = bindings.ChannelInfo_get_two_to_one(this.ptr);
		DirectionalChannelInfo ret_hu_conv = new DirectionalChannelInfo(null, ret);
		return ret_hu_conv;
	}

	// Skipped ChannelInfo_set_two_to_one
	public ChannelAnnouncement get_announcement_message() {
		long ret = bindings.ChannelInfo_get_announcement_message(this.ptr);
		ChannelAnnouncement ret_hu_conv = new ChannelAnnouncement(null, ret);
		return ret_hu_conv;
	}

	public void set_announcement_message(ChannelAnnouncement val) {
		bindings.ChannelInfo_set_announcement_message(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public byte[] write(ChannelInfo obj) {
		byte[] ret = bindings.ChannelInfo_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static ChannelInfo constructor_read(byte[] ser) {
		long ret = bindings.ChannelInfo_read(ser);
		ChannelInfo ret_hu_conv = new ChannelInfo(null, ret);
		return ret_hu_conv;
	}

}
