using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * An intermediate node, and possibly a short channel id leading to the next node.
 * 
 * Note:
 * [`MessageForwardNode`] must represent a node that supports [`supports_onion_messages`]
 * in order to be included in valid blinded paths for onion messaging.
 * 
 * [`supports_onion_messages`]: crate::types::features::Features::supports_onion_messages
 */
public class MessageForwardNode : CommonBase {
	internal MessageForwardNode(object _dummy, long ptr) : base(ptr) { }
	~MessageForwardNode() {
		if (ptr != 0) { bindings.MessageForwardNode_free(ptr); }
	}

	/**
	 * This node's pubkey.
	 */
	public byte[] get_node_id() {
		long ret = bindings.MessageForwardNode_get_node_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * This node's pubkey.
	 */
	public void set_node_id(byte[] val) {
		bindings.MessageForwardNode_set_node_id(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The channel between `node_id` and the next hop. If set, the constructed [`BlindedHop`]'s
	 * `encrypted_payload` will use this instead of the next [`MessageForwardNode::node_id`] for a
	 * more compact representation.
	 */
	public org.ldk.structs.Option_u64Z get_short_channel_id() {
		long ret = bindings.MessageForwardNode_get_short_channel_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The channel between `node_id` and the next hop. If set, the constructed [`BlindedHop`]'s
	 * `encrypted_payload` will use this instead of the next [`MessageForwardNode::node_id`] for a
	 * more compact representation.
	 */
	public void set_short_channel_id(org.ldk.structs.Option_u64Z val) {
		bindings.MessageForwardNode_set_short_channel_id(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new MessageForwardNode given each field
	 */
	public static org.ldk.structs.MessageForwardNode of(byte[] node_id_arg, org.ldk.structs.Option_u64Z short_channel_id_arg) {
		long ret = bindings.MessageForwardNode_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(node_id_arg, 33)), short_channel_id_arg.ptr);
		GC.KeepAlive(node_id_arg);
		GC.KeepAlive(short_channel_id_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MessageForwardNode ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.MessageForwardNode(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.MessageForwardNode_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the MessageForwardNode
	 */
	public org.ldk.structs.MessageForwardNode clone() {
		long ret = bindings.MessageForwardNode_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MessageForwardNode ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.MessageForwardNode(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the MessageForwardNode.
	 */
	public long hash() {
		long ret = bindings.MessageForwardNode_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two MessageForwardNodes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.MessageForwardNode b) {
		bool ret = bindings.MessageForwardNode_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is MessageForwardNode)) return false;
		return this.eq((MessageForwardNode)o);
	}
}
} } }
