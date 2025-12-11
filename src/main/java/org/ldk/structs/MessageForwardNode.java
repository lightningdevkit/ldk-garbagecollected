package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An intermediate node, and possibly a short channel id leading to the next node.
 * 
 * Note:
 * [`MessageForwardNode`] must represent a node that supports [`supports_onion_messages`]
 * in order to be included in valid blinded paths for onion messaging.
 * 
 * [`supports_onion_messages`]: crate::types::features::Features::supports_onion_messages
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class MessageForwardNode extends CommonBase {
	MessageForwardNode(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.MessageForwardNode_free(ptr); }
	}

	/**
	 * This node's pubkey.
	 */
	public byte[] get_node_id() {
		byte[] ret = bindings.MessageForwardNode_get_node_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * This node's pubkey.
	 */
	public void set_node_id(byte[] val) {
		bindings.MessageForwardNode_set_node_id(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The channel between `node_id` and the next hop. If set, the constructed [`BlindedHop`]'s
	 * `encrypted_payload` will use this instead of the next [`MessageForwardNode::node_id`] for a
	 * more compact representation.
	 */
	public Option_u64Z get_short_channel_id() {
		long ret = bindings.MessageForwardNode_get_short_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The channel between `node_id` and the next hop. If set, the constructed [`BlindedHop`]'s
	 * `encrypted_payload` will use this instead of the next [`MessageForwardNode::node_id`] for a
	 * more compact representation.
	 */
	public void set_short_channel_id(org.ldk.structs.Option_u64Z val) {
		bindings.MessageForwardNode_set_short_channel_id(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new MessageForwardNode given each field
	 */
	public static MessageForwardNode of(byte[] node_id_arg, org.ldk.structs.Option_u64Z short_channel_id_arg) {
		long ret = bindings.MessageForwardNode_new(InternalUtils.check_arr_len(node_id_arg, 33), short_channel_id_arg.ptr);
		Reference.reachabilityFence(node_id_arg);
		Reference.reachabilityFence(short_channel_id_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MessageForwardNode ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.MessageForwardNode(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.MessageForwardNode_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the MessageForwardNode
	 */
	public MessageForwardNode clone() {
		long ret = bindings.MessageForwardNode_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MessageForwardNode ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.MessageForwardNode(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the MessageForwardNode.
	 */
	public long hash() {
		long ret = bindings.MessageForwardNode_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two MessageForwardNodes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.MessageForwardNode b) {
		boolean ret = bindings.MessageForwardNode_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof MessageForwardNode)) return false;
		return this.eq((MessageForwardNode)o);
	}
}
