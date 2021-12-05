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
		NodeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new NodeFeatures(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Protocol features the node announced support for
	 */
	public void set_features(NodeFeatures val) {
		bindings.NodeAnnouncementInfo_set_features(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
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
	public byte[] get_alias() {
		byte[] ret = bindings.NodeAnnouncementInfo_get_alias(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Moniker assigned to the node.
	 * May be invalid or malicious (eg control chars),
	 * should not be exposed to the user.
	 */
	public void set_alias(byte[] val) {
		bindings.NodeAnnouncementInfo_set_alias(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Internet-level addresses via which one can connect to the node
	 */
	public void set_addresses(NetAddress[] val) {
		bindings.NodeAnnouncementInfo_set_addresses(this.ptr, val != null ? Arrays.stream(val).mapToLong(val_conv_12 -> val_conv_12.ptr).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
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
		NodeAnnouncement ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new NodeAnnouncement(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
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
	public void set_announcement_message(@Nullable NodeAnnouncement val) {
		bindings.NodeAnnouncementInfo_set_announcement_message(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new NodeAnnouncementInfo given each field
	 */
	public static NodeAnnouncementInfo of(NodeFeatures features_arg, int last_update_arg, byte[] rgb_arg, byte[] alias_arg, NetAddress[] addresses_arg, NodeAnnouncement announcement_message_arg) {
		long ret = bindings.NodeAnnouncementInfo_new(features_arg == null ? 0 : features_arg.ptr & ~1, last_update_arg, InternalUtils.check_arr_len(rgb_arg, 3), InternalUtils.check_arr_len(alias_arg, 32), addresses_arg != null ? Arrays.stream(addresses_arg).mapToLong(addresses_arg_conv_12 -> addresses_arg_conv_12.ptr).toArray() : null, announcement_message_arg == null ? 0 : announcement_message_arg.ptr & ~1);
		Reference.reachabilityFence(features_arg);
		Reference.reachabilityFence(last_update_arg);
		Reference.reachabilityFence(rgb_arg);
		Reference.reachabilityFence(alias_arg);
		Reference.reachabilityFence(addresses_arg);
		Reference.reachabilityFence(announcement_message_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		NodeAnnouncementInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new NodeAnnouncementInfo(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
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
		NodeAnnouncementInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new NodeAnnouncementInfo(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
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
