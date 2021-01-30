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
		if (ptr != 0) { bindings.NodeAnnouncementInfo_free(ptr); }
	}

	public NodeAnnouncementInfo clone() {
		long ret = bindings.NodeAnnouncementInfo_clone(this.ptr);
		NodeAnnouncementInfo ret_hu_conv = new NodeAnnouncementInfo(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public NodeFeatures get_features() {
		long ret = bindings.NodeAnnouncementInfo_get_features(this.ptr);
		NodeFeatures ret_hu_conv = new NodeFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_features(NodeFeatures val) {
		bindings.NodeAnnouncementInfo_set_features(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid this being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after this call, val is reset to null and is now a dummy object.
		val.ptr = 0;
	}

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
		bindings.NodeAnnouncementInfo_set_addresses(this.ptr, Arrays.stream(val).mapToLong(arr_conv_12 -> arr_conv_12.ptr).toArray());
		/* TODO 2 NetAddress  */;
	}

	public NodeAnnouncement get_announcement_message() {
		long ret = bindings.NodeAnnouncementInfo_get_announcement_message(this.ptr);
		NodeAnnouncement ret_hu_conv = new NodeAnnouncement(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_announcement_message(NodeAnnouncement val) {
		bindings.NodeAnnouncementInfo_set_announcement_message(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public static NodeAnnouncementInfo constructor_new(NodeFeatures features_arg, int last_update_arg, byte[] rgb_arg, byte[] alias_arg, NetAddress[] addresses_arg, NodeAnnouncement announcement_message_arg) {
		long ret = bindings.NodeAnnouncementInfo_new(features_arg == null ? 0 : features_arg.ptr & ~1, last_update_arg, rgb_arg, alias_arg, Arrays.stream(addresses_arg).mapToLong(arr_conv_12 -> arr_conv_12.ptr).toArray(), announcement_message_arg == null ? 0 : announcement_message_arg.ptr & ~1);
		NodeAnnouncementInfo ret_hu_conv = new NodeAnnouncementInfo(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(features_arg);
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid ret_hu_conv being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after ret_hu_conv call, features_arg is reset to null and is now a dummy object.
		features_arg.ptr = 0;
		/* TODO 2 NetAddress  */;
		ret_hu_conv.ptrs_to.add(announcement_message_arg);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.NodeAnnouncementInfo_write(this.ptr);
		return ret;
	}

	public static Result_NodeAnnouncementInfoDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.NodeAnnouncementInfo_read(ser);
		Result_NodeAnnouncementInfoDecodeErrorZ ret_hu_conv = Result_NodeAnnouncementInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
