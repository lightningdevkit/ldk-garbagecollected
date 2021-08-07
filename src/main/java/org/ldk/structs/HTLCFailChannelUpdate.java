package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * The information we received from a peer along the route of a payment we originated. This is
 * returned by ChannelMessageHandler::handle_update_fail_htlc to be passed into
 * RoutingMessageHandler::handle_htlc_fail_channel_update to update our network map.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class HTLCFailChannelUpdate extends CommonBase {
	private HTLCFailChannelUpdate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.HTLCFailChannelUpdate_free(ptr); }
	}
	static HTLCFailChannelUpdate constr_from_ptr(long ptr) {
		bindings.LDKHTLCFailChannelUpdate raw_val = bindings.LDKHTLCFailChannelUpdate_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKHTLCFailChannelUpdate.ChannelUpdateMessage.class) {
			return new ChannelUpdateMessage(ptr, (bindings.LDKHTLCFailChannelUpdate.ChannelUpdateMessage)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKHTLCFailChannelUpdate.ChannelClosed.class) {
			return new ChannelClosed(ptr, (bindings.LDKHTLCFailChannelUpdate.ChannelClosed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKHTLCFailChannelUpdate.NodeFailure.class) {
			return new NodeFailure(ptr, (bindings.LDKHTLCFailChannelUpdate.NodeFailure)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class ChannelUpdateMessage extends HTLCFailChannelUpdate {
		/**
		 * The unwrapped message we received
		*/
		public final ChannelUpdate msg;
		private ChannelUpdateMessage(long ptr, bindings.LDKHTLCFailChannelUpdate.ChannelUpdateMessage obj) {
			super(null, ptr);
			long msg = obj.msg;
			ChannelUpdate msg_hu_conv = new ChannelUpdate(null, msg);
			msg_hu_conv.ptrs_to.add(this);
			this.msg = msg_hu_conv;
		}
	}
	public final static class ChannelClosed extends HTLCFailChannelUpdate {
		/**
		 * The short_channel_id which has now closed.
		*/
		public final long short_channel_id;
		/**
		 * when this true, this channel should be permanently removed from the
		 * consideration. Otherwise, this channel can be restored as new channel_update is received
		*/
		public final boolean is_permanent;
		private ChannelClosed(long ptr, bindings.LDKHTLCFailChannelUpdate.ChannelClosed obj) {
			super(null, ptr);
			this.short_channel_id = obj.short_channel_id;
			this.is_permanent = obj.is_permanent;
		}
	}
	public final static class NodeFailure extends HTLCFailChannelUpdate {
		/**
		 * The node_id that has failed.
		*/
		public final byte[] node_id;
		/**
		 * when this true, node should be permanently removed from the
		 * consideration. Otherwise, the channels connected to this node can be
		 * restored as new channel_update is received
		*/
		public final boolean is_permanent;
		private NodeFailure(long ptr, bindings.LDKHTLCFailChannelUpdate.NodeFailure obj) {
			super(null, ptr);
			this.node_id = obj.node_id;
			this.is_permanent = obj.is_permanent;
		}
	}
	/**
	 * Creates a copy of the HTLCFailChannelUpdate
	 */
	public HTLCFailChannelUpdate clone() {
		long ret = bindings.HTLCFailChannelUpdate_clone(this.ptr);
		if (ret < 1024) { return null; }
		HTLCFailChannelUpdate ret_hu_conv = HTLCFailChannelUpdate.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelUpdateMessage-variant HTLCFailChannelUpdate
	 */
	public static HTLCFailChannelUpdate channel_update_message(ChannelUpdate msg) {
		long ret = bindings.HTLCFailChannelUpdate_channel_update_message(msg == null ? 0 : msg.ptr & ~1);
		if (ret < 1024) { return null; }
		HTLCFailChannelUpdate ret_hu_conv = HTLCFailChannelUpdate.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelClosed-variant HTLCFailChannelUpdate
	 */
	public static HTLCFailChannelUpdate channel_closed(long short_channel_id, boolean is_permanent) {
		long ret = bindings.HTLCFailChannelUpdate_channel_closed(short_channel_id, is_permanent);
		if (ret < 1024) { return null; }
		HTLCFailChannelUpdate ret_hu_conv = HTLCFailChannelUpdate.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new NodeFailure-variant HTLCFailChannelUpdate
	 */
	public static HTLCFailChannelUpdate node_failure(byte[] node_id, boolean is_permanent) {
		long ret = bindings.HTLCFailChannelUpdate_node_failure(node_id, is_permanent);
		if (ret < 1024) { return null; }
		HTLCFailChannelUpdate ret_hu_conv = HTLCFailChannelUpdate.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
