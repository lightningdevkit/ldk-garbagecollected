package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Update to the [`NetworkGraph`] based on payment failure information conveyed via the Onion
 * return packet by a node along the route. See [BOLT #4] for details.
 * 
 * [BOLT #4]: https://github.com/lightning/bolts/blob/master/04-onion-routing.md
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class NetworkUpdate extends CommonBase {
	private NetworkUpdate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.NetworkUpdate_free(ptr); }
	}
	static NetworkUpdate constr_from_ptr(long ptr) {
		bindings.LDKNetworkUpdate raw_val = bindings.LDKNetworkUpdate_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKNetworkUpdate.ChannelUpdateMessage.class) {
			return new ChannelUpdateMessage(ptr, (bindings.LDKNetworkUpdate.ChannelUpdateMessage)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKNetworkUpdate.ChannelFailure.class) {
			return new ChannelFailure(ptr, (bindings.LDKNetworkUpdate.ChannelFailure)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKNetworkUpdate.NodeFailure.class) {
			return new NodeFailure(ptr, (bindings.LDKNetworkUpdate.NodeFailure)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * An error indicating a `channel_update` messages should be applied via
	 * [`NetworkGraph::update_channel`].
	 */
	public final static class ChannelUpdateMessage extends NetworkUpdate {
		/**
		 * The update to apply via [`NetworkGraph::update_channel`].
		*/
		public final org.ldk.structs.ChannelUpdate msg;
		private ChannelUpdateMessage(long ptr, bindings.LDKNetworkUpdate.ChannelUpdateMessage obj) {
			super(null, ptr);
			long msg = obj.msg;
			org.ldk.structs.ChannelUpdate msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.ChannelUpdate(null, msg); }
			if (msg_hu_conv != null) { msg_hu_conv.ptrs_to.add(this); };
			this.msg = msg_hu_conv;
		}
	}
	/**
	 * An error indicating that a channel failed to route a payment, which should be applied via
	 * [`NetworkGraph::channel_failed`].
	 */
	public final static class ChannelFailure extends NetworkUpdate {
		/**
		 * The short channel id of the closed channel.
		*/
		public final long short_channel_id;
		/**
		 * Whether the channel should be permanently removed or temporarily disabled until a new
		 * `channel_update` message is received.
		*/
		public final boolean is_permanent;
		private ChannelFailure(long ptr, bindings.LDKNetworkUpdate.ChannelFailure obj) {
			super(null, ptr);
			this.short_channel_id = obj.short_channel_id;
			this.is_permanent = obj.is_permanent;
		}
	}
	/**
	 * An error indicating that a node failed to route a payment, which should be applied via
	 * [`NetworkGraph::node_failed_permanent`] if permanent.
	 */
	public final static class NodeFailure extends NetworkUpdate {
		/**
		 * The node id of the failed node.
		*/
		public final byte[] node_id;
		/**
		 * Whether the node should be permanently removed from consideration or can be restored
		 * when a new `channel_update` message is received.
		*/
		public final boolean is_permanent;
		private NodeFailure(long ptr, bindings.LDKNetworkUpdate.NodeFailure obj) {
			super(null, ptr);
			this.node_id = obj.node_id;
			this.is_permanent = obj.is_permanent;
		}
	}
	long clone_ptr() {
		long ret = bindings.NetworkUpdate_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the NetworkUpdate
	 */
	public NetworkUpdate clone() {
		long ret = bindings.NetworkUpdate_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NetworkUpdate ret_hu_conv = org.ldk.structs.NetworkUpdate.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelUpdateMessage-variant NetworkUpdate
	 */
	public static NetworkUpdate channel_update_message(ChannelUpdate msg) {
		long ret = bindings.NetworkUpdate_channel_update_message(msg == null ? 0 : msg.ptr);
		Reference.reachabilityFence(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NetworkUpdate ret_hu_conv = org.ldk.structs.NetworkUpdate.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(msg); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelFailure-variant NetworkUpdate
	 */
	public static NetworkUpdate channel_failure(long short_channel_id, boolean is_permanent) {
		long ret = bindings.NetworkUpdate_channel_failure(short_channel_id, is_permanent);
		Reference.reachabilityFence(short_channel_id);
		Reference.reachabilityFence(is_permanent);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NetworkUpdate ret_hu_conv = org.ldk.structs.NetworkUpdate.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new NodeFailure-variant NetworkUpdate
	 */
	public static NetworkUpdate node_failure(byte[] node_id, boolean is_permanent) {
		long ret = bindings.NetworkUpdate_node_failure(InternalUtils.check_arr_len(node_id, 33), is_permanent);
		Reference.reachabilityFence(node_id);
		Reference.reachabilityFence(is_permanent);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NetworkUpdate ret_hu_conv = org.ldk.structs.NetworkUpdate.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two NetworkUpdates contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(NetworkUpdate b) {
		boolean ret = bindings.NetworkUpdate_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof NetworkUpdate)) return false;
		return this.eq((NetworkUpdate)o);
	}
	/**
	 * Serialize the NetworkUpdate object into a byte array which can be read by NetworkUpdate_read
	 */
	public byte[] write() {
		byte[] ret = bindings.NetworkUpdate_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
