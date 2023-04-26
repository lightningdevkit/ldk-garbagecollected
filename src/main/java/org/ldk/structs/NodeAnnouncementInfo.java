package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Information received in the latest node_announcement from this node.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class NodeAnnouncementInfo extends CommonBase {
	NodeAnnouncementInfo(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.NodeAnnouncementInfo_free(ptr); }
	}

	/**
	 * Protocol features the node announced support for
	 */
	public NodeFeatures get_features() {
		long ret = bindings.NodeAnnouncementInfo_get_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Protocol features the node announced support for
	 */
	public void set_features(org.ldk.structs.NodeFeatures val) {
		bindings.NodeAnnouncementInfo_set_features(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * When the last known update to the node state was issued.
	 * Value is opaque, as set in the announcement.
	 */
	public int get_last_update() {
		int ret = bindings.NodeAnnouncementInfo_get_last_update(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * When the last known update to the node state was issued.
	 * Value is opaque, as set in the announcement.
	 */
	public void set_last_update(int val) {
		bindings.NodeAnnouncementInfo_set_last_update(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Color assigned to the node
	 */
	public byte[] get_rgb() {
		byte[] ret = bindings.NodeAnnouncementInfo_get_rgb(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Color assigned to the node
	 */
	public void set_rgb(byte[] val) {
		bindings.NodeAnnouncementInfo_set_rgb(this.ptr, InternalUtils.check_arr_len(val, 3));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Moniker assigned to the node.
	 * May be invalid or malicious (eg control chars),
	 * should not be exposed to the user.
	 */
	public NodeAlias get_alias() {
		long ret = bindings.NodeAnnouncementInfo_get_alias(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeAlias ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeAlias(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Moniker assigned to the node.
	 * May be invalid or malicious (eg control chars),
	 * should not be exposed to the user.
	 */
	public void set_alias(org.ldk.structs.NodeAlias val) {
		bindings.NodeAnnouncementInfo_set_alias(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * An initial announcement of the node
	 * Mostly redundant with the data we store in fields explicitly.
	 * Everything else is useful only for sending out for initial routing sync.
	 * Not stored if contains excess data to prevent DoS.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public NodeAnnouncement get_announcement_message() {
		long ret = bindings.NodeAnnouncementInfo_get_announcement_message(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeAnnouncement ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeAnnouncement(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * An initial announcement of the node
	 * Mostly redundant with the data we store in fields explicitly.
	 * Everything else is useful only for sending out for initial routing sync.
	 * Not stored if contains excess data to prevent DoS.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_announcement_message(@Nullable org.ldk.structs.NodeAnnouncement val) {
		bindings.NodeAnnouncementInfo_set_announcement_message(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Constructs a new NodeAnnouncementInfo given each field
	 */
	public static NodeAnnouncementInfo of(org.ldk.structs.NodeFeatures features_arg, int last_update_arg, byte[] rgb_arg, org.ldk.structs.NodeAlias alias_arg, org.ldk.structs.NodeAnnouncement announcement_message_arg) {
		long ret = bindings.NodeAnnouncementInfo_new(features_arg == null ? 0 : features_arg.ptr, last_update_arg, InternalUtils.check_arr_len(rgb_arg, 3), alias_arg == null ? 0 : alias_arg.ptr, announcement_message_arg == null ? 0 : announcement_message_arg.ptr);
		Reference.reachabilityFence(features_arg);
		Reference.reachabilityFence(last_update_arg);
		Reference.reachabilityFence(rgb_arg);
		Reference.reachabilityFence(alias_arg);
		Reference.reachabilityFence(announcement_message_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeAnnouncementInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeAnnouncementInfo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(features_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(alias_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(announcement_message_arg); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.NodeAnnouncementInfo_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the NodeAnnouncementInfo
	 */
	public NodeAnnouncementInfo clone() {
		long ret = bindings.NodeAnnouncementInfo_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeAnnouncementInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeAnnouncementInfo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two NodeAnnouncementInfos contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.NodeAnnouncementInfo b) {
		boolean ret = bindings.NodeAnnouncementInfo_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof NodeAnnouncementInfo)) return false;
		return this.eq((NodeAnnouncementInfo)o);
	}
	/**
	 * Internet-level addresses via which one can connect to the node
	 */
	public NetAddress[] addresses() {
		long[] ret = bindings.NodeAnnouncementInfo_addresses(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_12_len = ret.length;
		NetAddress[] ret_conv_12_arr = new NetAddress[ret_conv_12_len];
		for (int m = 0; m < ret_conv_12_len; m++) {
			long ret_conv_12 = ret[m];
			org.ldk.structs.NetAddress ret_conv_12_hu_conv = org.ldk.structs.NetAddress.constr_from_ptr(ret_conv_12);
			if (ret_conv_12_hu_conv != null) { ret_conv_12_hu_conv.ptrs_to.add(this); };
			ret_conv_12_arr[m] = ret_conv_12_hu_conv;
		}
		return ret_conv_12_arr;
	}

	/**
	 * Serialize the NodeAnnouncementInfo object into a byte array which can be read by NodeAnnouncementInfo_read
	 */
	public byte[] write() {
		byte[] ret = bindings.NodeAnnouncementInfo_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a NodeAnnouncementInfo from a byte array, created by NodeAnnouncementInfo_write
	 */
	public static Result_NodeAnnouncementInfoDecodeErrorZ read(byte[] ser) {
		long ret = bindings.NodeAnnouncementInfo_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NodeAnnouncementInfoDecodeErrorZ ret_hu_conv = Result_NodeAnnouncementInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
