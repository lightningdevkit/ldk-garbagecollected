package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
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
	}

	/**
	 * Source node of the first direction of a channel
	 */
	public NodeId get_node_one() {
		long ret = bindings.ChannelInfo_get_node_one(this.ptr);
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
	}

	/**
	 * Details about the first direction of a channel
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public DirectionalChannelInfo get_one_to_two() {
		long ret = bindings.ChannelInfo_get_one_to_two(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		DirectionalChannelInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new DirectionalChannelInfo(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Details about the first direction of a channel
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_one_to_two(@Nullable DirectionalChannelInfo val) {
		bindings.ChannelInfo_set_one_to_two(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	/**
	 * Source node of the second direction of a channel
	 */
	public NodeId get_node_two() {
		long ret = bindings.ChannelInfo_get_node_two(this.ptr);
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
	}

	/**
	 * Details about the second direction of a channel
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public DirectionalChannelInfo get_two_to_one() {
		long ret = bindings.ChannelInfo_get_two_to_one(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		DirectionalChannelInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new DirectionalChannelInfo(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Details about the second direction of a channel
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_two_to_one(@Nullable DirectionalChannelInfo val) {
		bindings.ChannelInfo_set_two_to_one(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	/**
	 * The channel capacity as seen on-chain, if chain lookup is available.
	 */
	public Option_u64Z get_capacity_sats() {
		long ret = bindings.ChannelInfo_get_capacity_sats(this.ptr);
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
	}

	/**
	 * Constructs a new ChannelInfo given each field
	 */
	public static ChannelInfo of(ChannelFeatures features_arg, NodeId node_one_arg, DirectionalChannelInfo one_to_two_arg, NodeId node_two_arg, DirectionalChannelInfo two_to_one_arg, Option_u64Z capacity_sats_arg, ChannelAnnouncement announcement_message_arg) {
		long ret = bindings.ChannelInfo_new(features_arg == null ? 0 : features_arg.ptr & ~1, node_one_arg == null ? 0 : node_one_arg.ptr & ~1, one_to_two_arg == null ? 0 : one_to_two_arg.ptr & ~1, node_two_arg == null ? 0 : node_two_arg.ptr & ~1, two_to_one_arg == null ? 0 : two_to_one_arg.ptr & ~1, capacity_sats_arg.ptr, announcement_message_arg == null ? 0 : announcement_message_arg.ptr & ~1);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelInfo(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a copy of the ChannelInfo
	 */
	public ChannelInfo clone() {
		long ret = bindings.ChannelInfo_clone(this.ptr);
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
		return ret;
	}

	/**
	 * Read a ChannelInfo from a byte array, created by ChannelInfo_write
	 */
	public static Result_ChannelInfoDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ChannelInfo_read(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelInfoDecodeErrorZ ret_hu_conv = Result_ChannelInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
