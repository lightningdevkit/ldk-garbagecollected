package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A trait defining behavior for routing an [`OnionMessage`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class MessageRouter extends CommonBase {
	final bindings.LDKMessageRouter bindings_instance;
	MessageRouter(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private MessageRouter(bindings.LDKMessageRouter arg) {
		super(bindings.LDKMessageRouter_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.MessageRouter_free(ptr); } super.finalize();
	}
	/**
	 * Destroys the object, freeing associated resources. After this call, any access
	 * to this object may result in a SEGFAULT or worse.
	 *
	 * You should generally NEVER call this method. You should let the garbage collector
	 * do this for you when it finalizes objects. However, it may be useful for types
	 * which represent locks and should be closed immediately to avoid holding locks
	 * until the GC runs.
	 */
	public void destroy() {
		if (ptr != 0) { bindings.MessageRouter_free(ptr); }
		ptr = 0;
	}
	public static interface MessageRouterInterface {
		/**
		 * Returns a route for sending an [`OnionMessage`] to the given [`Destination`].
		 */
		Result_OnionMessagePathNoneZ find_path(byte[] sender, byte[][] peers, Destination destination);
		/**
		 * Creates [`BlindedMessagePath`]s to the `recipient` node. The nodes in `peers` are assumed to
		 * be direct peers with the `recipient`.
		 */
		Result_CVec_BlindedMessagePathZNoneZ create_blinded_paths(byte[] recipient, ReceiveAuthKey local_node_receive_key, MessageContext context, MessageForwardNode[] peers);
	}
	private static class LDKMessageRouterHolder { MessageRouter held; }
	public static MessageRouter new_impl(MessageRouterInterface arg) {
		final LDKMessageRouterHolder impl_holder = new LDKMessageRouterHolder();
		impl_holder.held = new MessageRouter(new bindings.LDKMessageRouter() {
			@Override public long find_path(byte[] sender, byte[][] peers, long destination) {
				org.ldk.structs.Destination destination_hu_conv = org.ldk.structs.Destination.constr_from_ptr(destination);
				if (destination_hu_conv != null) { destination_hu_conv.ptrs_to.add(this); };
				Result_OnionMessagePathNoneZ ret = arg.find_path(sender, peers, destination_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
			@Override public long create_blinded_paths(byte[] recipient, long local_node_receive_key, long context, long[] peers) {
				org.ldk.structs.ReceiveAuthKey local_node_receive_key_hu_conv = null; if (local_node_receive_key < 0 || local_node_receive_key > 4096) { local_node_receive_key_hu_conv = new org.ldk.structs.ReceiveAuthKey(null, local_node_receive_key); }
				if (local_node_receive_key_hu_conv != null) { local_node_receive_key_hu_conv.ptrs_to.add(this); };
				org.ldk.structs.MessageContext context_hu_conv = org.ldk.structs.MessageContext.constr_from_ptr(context);
				if (context_hu_conv != null) { context_hu_conv.ptrs_to.add(this); };
				int peers_conv_20_len = peers.length;
				MessageForwardNode[] peers_conv_20_arr = new MessageForwardNode[peers_conv_20_len];
				for (int u = 0; u < peers_conv_20_len; u++) {
					long peers_conv_20 = peers[u];
					org.ldk.structs.MessageForwardNode peers_conv_20_hu_conv = null; if (peers_conv_20 < 0 || peers_conv_20 > 4096) { peers_conv_20_hu_conv = new org.ldk.structs.MessageForwardNode(null, peers_conv_20); }
					if (peers_conv_20_hu_conv != null) { peers_conv_20_hu_conv.ptrs_to.add(this); };
					peers_conv_20_arr[u] = peers_conv_20_hu_conv;
				}
				Result_CVec_BlindedMessagePathZNoneZ ret = arg.create_blinded_paths(recipient, local_node_receive_key_hu_conv, context_hu_conv, peers_conv_20_arr);
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Returns a route for sending an [`OnionMessage`] to the given [`Destination`].
	 */
	public Result_OnionMessagePathNoneZ find_path(byte[] sender, byte[][] peers, org.ldk.structs.Destination destination) {
		long ret = bindings.MessageRouter_find_path(this.ptr, InternalUtils.check_arr_len(sender, 33), peers != null ? Arrays.stream(peers).map(peers_conv_8 -> InternalUtils.check_arr_len(peers_conv_8, 33)).toArray(byte[][]::new) : null, destination.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(sender);
		Reference.reachabilityFence(peers);
		Reference.reachabilityFence(destination);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OnionMessagePathNoneZ ret_hu_conv = Result_OnionMessagePathNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates [`BlindedMessagePath`]s to the `recipient` node. The nodes in `peers` are assumed to
	 * be direct peers with the `recipient`.
	 */
	public Result_CVec_BlindedMessagePathZNoneZ create_blinded_paths(byte[] recipient, org.ldk.structs.ReceiveAuthKey local_node_receive_key, org.ldk.structs.MessageContext context, MessageForwardNode[] peers) {
		long ret = bindings.MessageRouter_create_blinded_paths(this.ptr, InternalUtils.check_arr_len(recipient, 33), local_node_receive_key.ptr, context.ptr, peers != null ? Arrays.stream(peers).mapToLong(peers_conv_20 -> peers_conv_20.ptr).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(recipient);
		Reference.reachabilityFence(local_node_receive_key);
		Reference.reachabilityFence(context);
		Reference.reachabilityFence(peers);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_BlindedMessagePathZNoneZ ret_hu_conv = Result_CVec_BlindedMessagePathZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
