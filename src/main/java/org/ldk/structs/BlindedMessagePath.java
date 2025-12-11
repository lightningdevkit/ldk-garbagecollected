package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A blinded path to be used for sending or receiving a message, hiding the identity of the
 * recipient.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class BlindedMessagePath extends CommonBase {
	BlindedMessagePath(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.BlindedMessagePath_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.BlindedMessagePath_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the BlindedMessagePath
	 */
	public BlindedMessagePath clone() {
		long ret = bindings.BlindedMessagePath_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedMessagePath ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedMessagePath(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the BlindedMessagePath.
	 */
	public long hash() {
		long ret = bindings.BlindedMessagePath_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two BlindedMessagePaths contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.BlindedMessagePath b) {
		boolean ret = bindings.BlindedMessagePath_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof BlindedMessagePath)) return false;
		return this.eq((BlindedMessagePath)o);
	}
	/**
	 * Serialize the BlindedMessagePath object into a byte array which can be read by BlindedMessagePath_read
	 */
	public byte[] write() {
		byte[] ret = bindings.BlindedMessagePath_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a BlindedMessagePath from a byte array, created by BlindedMessagePath_write
	 */
	public static Result_BlindedMessagePathDecodeErrorZ read(byte[] ser) {
		long ret = bindings.BlindedMessagePath_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedMessagePathDecodeErrorZ ret_hu_conv = Result_BlindedMessagePathDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Create a one-hop blinded path for a message.
	 */
	public static BlindedMessagePath one_hop(byte[] recipient_node_id, org.ldk.structs.ReceiveAuthKey local_node_receive_key, org.ldk.structs.MessageContext context, org.ldk.structs.EntropySource entropy_source) {
		long ret = bindings.BlindedMessagePath_one_hop(InternalUtils.check_arr_len(recipient_node_id, 33), local_node_receive_key.ptr, context.ptr, entropy_source.ptr);
		Reference.reachabilityFence(recipient_node_id);
		Reference.reachabilityFence(local_node_receive_key);
		Reference.reachabilityFence(context);
		Reference.reachabilityFence(entropy_source);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedMessagePath ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedMessagePath(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(entropy_source); };
		return ret_hu_conv;
	}

	/**
	 * Create a path for an onion message, to be forwarded along `node_pks`.
	 */
	public static BlindedMessagePath of(MessageForwardNode[] intermediate_nodes, byte[] recipient_node_id, org.ldk.structs.ReceiveAuthKey local_node_receive_key, org.ldk.structs.MessageContext context, org.ldk.structs.EntropySource entropy_source) {
		long ret = bindings.BlindedMessagePath_new(intermediate_nodes != null ? Arrays.stream(intermediate_nodes).mapToLong(intermediate_nodes_conv_20 -> intermediate_nodes_conv_20.ptr).toArray() : null, InternalUtils.check_arr_len(recipient_node_id, 33), local_node_receive_key.ptr, context.ptr, entropy_source.ptr);
		Reference.reachabilityFence(intermediate_nodes);
		Reference.reachabilityFence(recipient_node_id);
		Reference.reachabilityFence(local_node_receive_key);
		Reference.reachabilityFence(context);
		Reference.reachabilityFence(entropy_source);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedMessagePath ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedMessagePath(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(entropy_source); };
		return ret_hu_conv;
	}

	/**
	 * Same as [`BlindedMessagePath::new`], but allows specifying a number of dummy hops.
	 * 
	 * Note:
	 * At most [`MAX_DUMMY_HOPS_COUNT`] dummy hops can be added to the blinded path.
	 */
	public static BlindedMessagePath new_with_dummy_hops(MessageForwardNode[] intermediate_nodes, byte[] recipient_node_id, long dummy_hop_count, org.ldk.structs.ReceiveAuthKey local_node_receive_key, org.ldk.structs.MessageContext context, org.ldk.structs.EntropySource entropy_source) {
		long ret = bindings.BlindedMessagePath_new_with_dummy_hops(intermediate_nodes != null ? Arrays.stream(intermediate_nodes).mapToLong(intermediate_nodes_conv_20 -> intermediate_nodes_conv_20.ptr).toArray() : null, InternalUtils.check_arr_len(recipient_node_id, 33), dummy_hop_count, local_node_receive_key.ptr, context.ptr, entropy_source.ptr);
		Reference.reachabilityFence(intermediate_nodes);
		Reference.reachabilityFence(recipient_node_id);
		Reference.reachabilityFence(dummy_hop_count);
		Reference.reachabilityFence(local_node_receive_key);
		Reference.reachabilityFence(context);
		Reference.reachabilityFence(entropy_source);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedMessagePath ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedMessagePath(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(entropy_source); };
		return ret_hu_conv;
	}

	/**
	 * Attempts to a use a compact representation for the [`IntroductionNode`] by using a directed
	 * short channel id from a channel in `network_graph` leading to the introduction node.
	 * 
	 * While this may result in a smaller encoding, there is a trade off in that the path may
	 * become invalid if the channel is closed or hasn't been propagated via gossip. Therefore,
	 * calling this may not be suitable for long-lived blinded paths.
	 */
	public void use_compact_introduction_node(org.ldk.structs.ReadOnlyNetworkGraph network_graph) {
		bindings.BlindedMessagePath_use_compact_introduction_node(this.ptr, network_graph.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(network_graph);
		if (this != null) { this.ptrs_to.add(network_graph); };
	}

	/**
	 * Returns the introduction [`NodeId`] of the blinded path, if it is publicly reachable (i.e.,
	 * it is found in the network graph).
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public NodeId public_introduction_node_id(org.ldk.structs.ReadOnlyNetworkGraph network_graph) {
		long ret = bindings.BlindedMessagePath_public_introduction_node_id(this.ptr, network_graph.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(network_graph);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		if (this != null) { this.ptrs_to.add(network_graph); };
		return ret_hu_conv;
	}

	/**
	 * The [`IntroductionNode`] of the blinded path.
	 */
	public IntroductionNode introduction_node() {
		long ret = bindings.BlindedMessagePath_introduction_node(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.IntroductionNode ret_hu_conv = org.ldk.structs.IntroductionNode.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Used by the [`IntroductionNode`] to decrypt its [`encrypted_payload`] to forward the message.
	 * 
	 * [`encrypted_payload`]: BlindedHop::encrypted_payload
	 */
	public byte[] blinding_point() {
		byte[] ret = bindings.BlindedMessagePath_blinding_point(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The [`BlindedHop`]s within the blinded path.
	 */
	public BlindedHop[] blinded_hops() {
		long[] ret = bindings.BlindedMessagePath_blinded_hops(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_12_len = ret.length;
		BlindedHop[] ret_conv_12_arr = new BlindedHop[ret_conv_12_len];
		for (int m = 0; m < ret_conv_12_len; m++) {
			long ret_conv_12 = ret[m];
			org.ldk.structs.BlindedHop ret_conv_12_hu_conv = null; if (ret_conv_12 < 0 || ret_conv_12 > 4096) { ret_conv_12_hu_conv = new org.ldk.structs.BlindedHop(null, ret_conv_12); }
			if (ret_conv_12_hu_conv != null) { ret_conv_12_hu_conv.ptrs_to.add(this); };
			ret_conv_12_arr[m] = ret_conv_12_hu_conv;
		}
		return ret_conv_12_arr;
	}

	/**
	 * Advance the blinded onion message path by one hop, making the second hop into the new
	 * introduction node.
	 * 
	 * Will only modify `self` when returning `Ok`.
	 */
	public Result_NoneNoneZ advance_path_by_one(org.ldk.structs.NodeSigner node_signer, org.ldk.structs.NodeIdLookUp node_id_lookup) {
		long ret = bindings.BlindedMessagePath_advance_path_by_one(this.ptr, node_signer.ptr, node_id_lookup.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(node_signer);
		Reference.reachabilityFence(node_id_lookup);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(node_signer); };
		if (this != null) { this.ptrs_to.add(node_id_lookup); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new [`BlindedMessagePath`] from its constituent parts.
	 * 
	 * Useful when you need to reconstruct a blinded path from previously serialized components.
	 * 
	 * Parameters:
	 * `introduction_node_id`: The public key of the introduction node in the path
	 * `blinding_point`: The public key used for blinding the path
	 * `blinded_hops`: The encrypted routing information for each hop in the path
	 */
	public static BlindedMessagePath from_blinded_path(byte[] introduction_node_id, byte[] blinding_point, BlindedHop[] blinded_hops) {
		long ret = bindings.BlindedMessagePath_from_blinded_path(InternalUtils.check_arr_len(introduction_node_id, 33), InternalUtils.check_arr_len(blinding_point, 33), blinded_hops != null ? Arrays.stream(blinded_hops).mapToLong(blinded_hops_conv_12 -> blinded_hops_conv_12.ptr).toArray() : null);
		Reference.reachabilityFence(introduction_node_id);
		Reference.reachabilityFence(blinding_point);
		Reference.reachabilityFence(blinded_hops);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedMessagePath ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedMessagePath(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}
