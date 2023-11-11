using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * Update to the [`NetworkGraph`] based on payment failure information conveyed via the Onion
 * return packet by a node along the route. See [BOLT #4] for details.
 * 
 * [BOLT #4]: https://github.com/lightning/bolts/blob/master/04-onion-routing.md
 */
public class NetworkUpdate : CommonBase {
	protected NetworkUpdate(object _dummy, long ptr) : base(ptr) { }
	~NetworkUpdate() {
		if (ptr != 0) { bindings.NetworkUpdate_free(ptr); }
	}

	internal static NetworkUpdate constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKNetworkUpdate_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new NetworkUpdate_ChannelUpdateMessage(ptr);
			case 1: return new NetworkUpdate_ChannelFailure(ptr);
			case 2: return new NetworkUpdate_NodeFailure(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A NetworkUpdate of type ChannelUpdateMessage */
	public class NetworkUpdate_ChannelUpdateMessage : NetworkUpdate {
		/**
		 * The update to apply via [`NetworkGraph::update_channel`].
		 */
		public ChannelUpdate msg;
		internal NetworkUpdate_ChannelUpdateMessage(long ptr) : base(null, ptr) {
			long msg = bindings.LDKNetworkUpdate_ChannelUpdateMessage_get_msg(ptr);
			org.ldk.structs.ChannelUpdate msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.ChannelUpdate(null, msg); }
			if (msg_hu_conv != null) { msg_hu_conv.ptrs_to.AddLast(this); };
			this.msg = msg_hu_conv;
		}
	}
	/** A NetworkUpdate of type ChannelFailure */
	public class NetworkUpdate_ChannelFailure : NetworkUpdate {
		/**
		 * The short channel id of the closed channel.
		 */
		public long short_channel_id;
		/**
		 * Whether the channel should be permanently removed or temporarily disabled until a new
		 * `channel_update` message is received.
		 */
		public bool is_permanent;
		internal NetworkUpdate_ChannelFailure(long ptr) : base(null, ptr) {
			this.short_channel_id = bindings.LDKNetworkUpdate_ChannelFailure_get_short_channel_id(ptr);
			this.is_permanent = bindings.LDKNetworkUpdate_ChannelFailure_get_is_permanent(ptr);
		}
	}
	/** A NetworkUpdate of type NodeFailure */
	public class NetworkUpdate_NodeFailure : NetworkUpdate {
		/**
		 * The node id of the failed node.
		 */
		public byte[] node_id;
		/**
		 * Whether the node should be permanently removed from consideration or can be restored
		 * when a new `channel_update` message is received.
		 */
		public bool is_permanent;
		internal NetworkUpdate_NodeFailure(long ptr) : base(null, ptr) {
			long node_id = bindings.LDKNetworkUpdate_NodeFailure_get_node_id(ptr);
			byte[] node_id_conv = InternalUtils.decodeUint8Array(node_id);
			this.node_id = node_id_conv;
			this.is_permanent = bindings.LDKNetworkUpdate_NodeFailure_get_is_permanent(ptr);
		}
	}
	internal long clone_ptr() {
		long ret = bindings.NetworkUpdate_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the NetworkUpdate
	 */
	public NetworkUpdate clone() {
		long ret = bindings.NetworkUpdate_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NetworkUpdate ret_hu_conv = org.ldk.structs.NetworkUpdate.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelUpdateMessage-variant NetworkUpdate
	 */
	public static NetworkUpdate channel_update_message(org.ldk.structs.ChannelUpdate msg) {
		long ret = bindings.NetworkUpdate_channel_update_message(msg == null ? 0 : msg.ptr);
		GC.KeepAlive(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NetworkUpdate ret_hu_conv = org.ldk.structs.NetworkUpdate.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(msg); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelFailure-variant NetworkUpdate
	 */
	public static NetworkUpdate channel_failure(long short_channel_id, bool is_permanent) {
		long ret = bindings.NetworkUpdate_channel_failure(short_channel_id, is_permanent);
		GC.KeepAlive(short_channel_id);
		GC.KeepAlive(is_permanent);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NetworkUpdate ret_hu_conv = org.ldk.structs.NetworkUpdate.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new NodeFailure-variant NetworkUpdate
	 */
	public static NetworkUpdate node_failure(byte[] node_id, bool is_permanent) {
		long ret = bindings.NetworkUpdate_node_failure(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(node_id, 33)), is_permanent);
		GC.KeepAlive(node_id);
		GC.KeepAlive(is_permanent);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NetworkUpdate ret_hu_conv = org.ldk.structs.NetworkUpdate.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two NetworkUpdates contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.NetworkUpdate b) {
		bool ret = bindings.NetworkUpdate_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is NetworkUpdate)) return false;
		return this.eq((NetworkUpdate)o);
	}
	/**
	 * Serialize the NetworkUpdate object into a byte array which can be read by NetworkUpdate_read
	 */
	public byte[] write() {
		long ret = bindings.NetworkUpdate_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

}
} } }
