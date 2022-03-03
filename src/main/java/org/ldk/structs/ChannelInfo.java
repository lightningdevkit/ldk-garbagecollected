package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Details about a channel (both directions).
 * Received within a channel announcement.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelInfo extends CommonBase {
	ChannelInfo(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelInfo_free(ptr); }
	}

	/**
	 * Protocol features of a channel communicated during its announcement
	 */
	public ChannelFeatures get_features() {
		long ret = bindings.ChannelInfo_get_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelFeatures(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Protocol features of a channel communicated during its announcement
	 */
	public void set_features(ChannelFeatures val) {
		bindings.ChannelInfo_set_features(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Source node of the first direction of a channel
	 */
	public NodeId get_node_one() {
		long ret = bindings.ChannelInfo_get_node_one(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new NodeId(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Source node of the first direction of a channel
	 */
	public void set_node_one(NodeId val) {
		bindings.ChannelInfo_set_node_one(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Details about the first direction of a channel
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public ChannelUpdateInfo get_one_to_two() {
		long ret = bindings.ChannelInfo_get_one_to_two(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelUpdateInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelUpdateInfo(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Details about the first direction of a channel
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_one_to_two(@Nullable ChannelUpdateInfo val) {
		bindings.ChannelInfo_set_one_to_two(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Source node of the second direction of a channel
	 */
	public NodeId get_node_two() {
		long ret = bindings.ChannelInfo_get_node_two(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new NodeId(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Source node of the second direction of a channel
	 */
	public void set_node_two(NodeId val) {
		bindings.ChannelInfo_set_node_two(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Details about the second direction of a channel
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public ChannelUpdateInfo get_two_to_one() {
		long ret = bindings.ChannelInfo_get_two_to_one(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelUpdateInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelUpdateInfo(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Details about the second direction of a channel
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_two_to_one(@Nullable ChannelUpdateInfo val) {
		bindings.ChannelInfo_set_two_to_one(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The channel capacity as seen on-chain, if chain lookup is available.
	 */
	public Option_u64Z get_capacity_sats() {
		long ret = bindings.ChannelInfo_get_capacity_sats(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The channel capacity as seen on-chain, if chain lookup is available.
	 */
	public void set_capacity_sats(Option_u64Z val) {
		bindings.ChannelInfo_set_capacity_sats(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * An initial announcement of the channel
	 * Mostly redundant with the data we store in fields explicitly.
	 * Everything else is useful only for sending out for initial routing sync.
	 * Not stored if contains excess data to prevent DoS.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public ChannelAnnouncement get_announcement_message() {
		long ret = bindings.ChannelInfo_get_announcement_message(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelAnnouncement ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelAnnouncement(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * An initial announcement of the channel
	 * Mostly redundant with the data we store in fields explicitly.
	 * Everything else is useful only for sending out for initial routing sync.
	 * Not stored if contains excess data to prevent DoS.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_announcement_message(@Nullable ChannelAnnouncement val) {
		bindings.ChannelInfo_set_announcement_message(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	long clone_ptr() {
		long ret = bindings.ChannelInfo_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelInfo
	 */
	public ChannelInfo clone() {
		long ret = bindings.ChannelInfo_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelInfo(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelInfo object into a byte array which can be read by ChannelInfo_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ChannelInfo_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a ChannelInfo from a byte array, created by ChannelInfo_write
	 */
	public static Result_ChannelInfoDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ChannelInfo_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelInfoDecodeErrorZ ret_hu_conv = Result_ChannelInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
