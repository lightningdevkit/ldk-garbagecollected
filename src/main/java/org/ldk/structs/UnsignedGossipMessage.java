package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Represents the set of gossip messages that require a signature from a node's identity key.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class UnsignedGossipMessage extends CommonBase {
	private UnsignedGossipMessage(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UnsignedGossipMessage_free(ptr); }
	}
	static UnsignedGossipMessage constr_from_ptr(long ptr) {
		bindings.LDKUnsignedGossipMessage raw_val = bindings.LDKUnsignedGossipMessage_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKUnsignedGossipMessage.ChannelAnnouncement.class) {
			return new ChannelAnnouncement(ptr, (bindings.LDKUnsignedGossipMessage.ChannelAnnouncement)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKUnsignedGossipMessage.ChannelUpdate.class) {
			return new ChannelUpdate(ptr, (bindings.LDKUnsignedGossipMessage.ChannelUpdate)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKUnsignedGossipMessage.NodeAnnouncement.class) {
			return new NodeAnnouncement(ptr, (bindings.LDKUnsignedGossipMessage.NodeAnnouncement)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * An unsigned channel announcement.
	 */
	public final static class ChannelAnnouncement extends UnsignedGossipMessage {
		public final org.ldk.structs.UnsignedChannelAnnouncement channel_announcement;
		private ChannelAnnouncement(long ptr, bindings.LDKUnsignedGossipMessage.ChannelAnnouncement obj) {
			super(null, ptr);
			long channel_announcement = obj.channel_announcement;
			org.ldk.structs.UnsignedChannelAnnouncement channel_announcement_hu_conv = null; if (channel_announcement < 0 || channel_announcement > 4096) { channel_announcement_hu_conv = new org.ldk.structs.UnsignedChannelAnnouncement(null, channel_announcement); }
			if (channel_announcement_hu_conv != null) { channel_announcement_hu_conv.ptrs_to.add(this); };
			this.channel_announcement = channel_announcement_hu_conv;
		}
	}
	/**
	 * An unsigned channel update.
	 */
	public final static class ChannelUpdate extends UnsignedGossipMessage {
		public final org.ldk.structs.UnsignedChannelUpdate channel_update;
		private ChannelUpdate(long ptr, bindings.LDKUnsignedGossipMessage.ChannelUpdate obj) {
			super(null, ptr);
			long channel_update = obj.channel_update;
			org.ldk.structs.UnsignedChannelUpdate channel_update_hu_conv = null; if (channel_update < 0 || channel_update > 4096) { channel_update_hu_conv = new org.ldk.structs.UnsignedChannelUpdate(null, channel_update); }
			if (channel_update_hu_conv != null) { channel_update_hu_conv.ptrs_to.add(this); };
			this.channel_update = channel_update_hu_conv;
		}
	}
	/**
	 * An unsigned node announcement.
	 */
	public final static class NodeAnnouncement extends UnsignedGossipMessage {
		public final org.ldk.structs.UnsignedNodeAnnouncement node_announcement;
		private NodeAnnouncement(long ptr, bindings.LDKUnsignedGossipMessage.NodeAnnouncement obj) {
			super(null, ptr);
			long node_announcement = obj.node_announcement;
			org.ldk.structs.UnsignedNodeAnnouncement node_announcement_hu_conv = null; if (node_announcement < 0 || node_announcement > 4096) { node_announcement_hu_conv = new org.ldk.structs.UnsignedNodeAnnouncement(null, node_announcement); }
			if (node_announcement_hu_conv != null) { node_announcement_hu_conv.ptrs_to.add(this); };
			this.node_announcement = node_announcement_hu_conv;
		}
	}
	long clone_ptr() {
		long ret = bindings.UnsignedGossipMessage_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the UnsignedGossipMessage
	 */
	public UnsignedGossipMessage clone() {
		long ret = bindings.UnsignedGossipMessage_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnsignedGossipMessage ret_hu_conv = org.ldk.structs.UnsignedGossipMessage.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelAnnouncement-variant UnsignedGossipMessage
	 */
	public static UnsignedGossipMessage channel_announcement(org.ldk.structs.UnsignedChannelAnnouncement a) {
		long ret = bindings.UnsignedGossipMessage_channel_announcement(a == null ? 0 : a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnsignedGossipMessage ret_hu_conv = org.ldk.structs.UnsignedGossipMessage.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelUpdate-variant UnsignedGossipMessage
	 */
	public static UnsignedGossipMessage channel_update(org.ldk.structs.UnsignedChannelUpdate a) {
		long ret = bindings.UnsignedGossipMessage_channel_update(a == null ? 0 : a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnsignedGossipMessage ret_hu_conv = org.ldk.structs.UnsignedGossipMessage.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new NodeAnnouncement-variant UnsignedGossipMessage
	 */
	public static UnsignedGossipMessage node_announcement(org.ldk.structs.UnsignedNodeAnnouncement a) {
		long ret = bindings.UnsignedGossipMessage_node_announcement(a == null ? 0 : a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnsignedGossipMessage ret_hu_conv = org.ldk.structs.UnsignedGossipMessage.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the UnsignedGossipMessage object into a byte array which can be read by UnsignedGossipMessage_read
	 */
	public byte[] write() {
		byte[] ret = bindings.UnsignedGossipMessage_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
