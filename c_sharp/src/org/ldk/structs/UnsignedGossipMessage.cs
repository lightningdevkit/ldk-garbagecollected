using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * Represents the set of gossip messages that require a signature from a node's identity key.
 */
public class UnsignedGossipMessage : CommonBase {
	protected UnsignedGossipMessage(object _dummy, long ptr) : base(ptr) { }
	~UnsignedGossipMessage() {
		if (ptr != 0) { bindings.UnsignedGossipMessage_free(ptr); }
	}

	internal static UnsignedGossipMessage constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKUnsignedGossipMessage_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new UnsignedGossipMessage_ChannelAnnouncement(ptr);
			case 1: return new UnsignedGossipMessage_ChannelUpdate(ptr);
			case 2: return new UnsignedGossipMessage_NodeAnnouncement(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A UnsignedGossipMessage of type ChannelAnnouncement */
	public class UnsignedGossipMessage_ChannelAnnouncement : UnsignedGossipMessage {
		public UnsignedChannelAnnouncement channel_announcement;
		internal UnsignedGossipMessage_ChannelAnnouncement(long ptr) : base(null, ptr) {
			long channel_announcement = bindings.LDKUnsignedGossipMessage_ChannelAnnouncement_get_channel_announcement(ptr);
			org.ldk.structs.UnsignedChannelAnnouncement channel_announcement_hu_conv = null; if (channel_announcement < 0 || channel_announcement > 4096) { channel_announcement_hu_conv = new org.ldk.structs.UnsignedChannelAnnouncement(null, channel_announcement); }
			if (channel_announcement_hu_conv != null) { channel_announcement_hu_conv.ptrs_to.AddLast(this); };
			this.channel_announcement = channel_announcement_hu_conv;
		}
	}
	/** A UnsignedGossipMessage of type ChannelUpdate */
	public class UnsignedGossipMessage_ChannelUpdate : UnsignedGossipMessage {
		public UnsignedChannelUpdate channel_update;
		internal UnsignedGossipMessage_ChannelUpdate(long ptr) : base(null, ptr) {
			long channel_update = bindings.LDKUnsignedGossipMessage_ChannelUpdate_get_channel_update(ptr);
			org.ldk.structs.UnsignedChannelUpdate channel_update_hu_conv = null; if (channel_update < 0 || channel_update > 4096) { channel_update_hu_conv = new org.ldk.structs.UnsignedChannelUpdate(null, channel_update); }
			if (channel_update_hu_conv != null) { channel_update_hu_conv.ptrs_to.AddLast(this); };
			this.channel_update = channel_update_hu_conv;
		}
	}
	/** A UnsignedGossipMessage of type NodeAnnouncement */
	public class UnsignedGossipMessage_NodeAnnouncement : UnsignedGossipMessage {
		public UnsignedNodeAnnouncement node_announcement;
		internal UnsignedGossipMessage_NodeAnnouncement(long ptr) : base(null, ptr) {
			long node_announcement = bindings.LDKUnsignedGossipMessage_NodeAnnouncement_get_node_announcement(ptr);
			org.ldk.structs.UnsignedNodeAnnouncement node_announcement_hu_conv = null; if (node_announcement < 0 || node_announcement > 4096) { node_announcement_hu_conv = new org.ldk.structs.UnsignedNodeAnnouncement(null, node_announcement); }
			if (node_announcement_hu_conv != null) { node_announcement_hu_conv.ptrs_to.AddLast(this); };
			this.node_announcement = node_announcement_hu_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.UnsignedGossipMessage_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the UnsignedGossipMessage
	 */
	public UnsignedGossipMessage clone() {
		long ret = bindings.UnsignedGossipMessage_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnsignedGossipMessage ret_hu_conv = org.ldk.structs.UnsignedGossipMessage.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelAnnouncement-variant UnsignedGossipMessage
	 */
	public static UnsignedGossipMessage channel_announcement(org.ldk.structs.UnsignedChannelAnnouncement a) {
		long ret = bindings.UnsignedGossipMessage_channel_announcement(a == null ? 0 : a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnsignedGossipMessage ret_hu_conv = org.ldk.structs.UnsignedGossipMessage.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelUpdate-variant UnsignedGossipMessage
	 */
	public static UnsignedGossipMessage channel_update(org.ldk.structs.UnsignedChannelUpdate a) {
		long ret = bindings.UnsignedGossipMessage_channel_update(a == null ? 0 : a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnsignedGossipMessage ret_hu_conv = org.ldk.structs.UnsignedGossipMessage.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new NodeAnnouncement-variant UnsignedGossipMessage
	 */
	public static UnsignedGossipMessage node_announcement(org.ldk.structs.UnsignedNodeAnnouncement a) {
		long ret = bindings.UnsignedGossipMessage_node_announcement(a == null ? 0 : a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnsignedGossipMessage ret_hu_conv = org.ldk.structs.UnsignedGossipMessage.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the UnsignedGossipMessage object into a byte array which can be read by UnsignedGossipMessage_read
	 */
	public byte[] write() {
		byte[] ret = bindings.UnsignedGossipMessage_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
