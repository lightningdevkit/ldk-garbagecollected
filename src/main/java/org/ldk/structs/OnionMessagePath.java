package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A path for sending an [`OnionMessage`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OnionMessagePath extends CommonBase {
	OnionMessagePath(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.OnionMessagePath_free(ptr); }
	}

	/**
	 * Nodes on the path between the sender and the destination.
	 * 
	 * Returns a copy of the field.
	 */
	public byte[][] get_intermediate_nodes() {
		byte[][] ret = bindings.OnionMessagePath_get_intermediate_nodes(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Nodes on the path between the sender and the destination.
	 */
	public void set_intermediate_nodes(byte[][] val) {
		bindings.OnionMessagePath_set_intermediate_nodes(this.ptr, val != null ? Arrays.stream(val).map(val_conv_8 -> InternalUtils.check_arr_len(val_conv_8, 33)).toArray(byte[][]::new) : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The recipient of the message.
	 */
	public Destination get_destination() {
		long ret = bindings.OnionMessagePath_get_destination(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Destination ret_hu_conv = org.ldk.structs.Destination.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The recipient of the message.
	 */
	public void set_destination(org.ldk.structs.Destination val) {
		bindings.OnionMessagePath_set_destination(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Addresses that may be used to connect to [`OnionMessagePath::first_node`].
	 * 
	 * Only needs to be filled in if a connection to the node is required and it is not a known peer.
	 * [`OnionMessenger`] may use this to initiate such a connection.
	 * 
	 * Returns a copy of the field.
	 */
	public SocketAddress[] get_first_node_addresses() {
		long[] ret = bindings.OnionMessagePath_get_first_node_addresses(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_15_len = ret.length;
		SocketAddress[] ret_conv_15_arr = new SocketAddress[ret_conv_15_len];
		for (int p = 0; p < ret_conv_15_len; p++) {
			long ret_conv_15 = ret[p];
			org.ldk.structs.SocketAddress ret_conv_15_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(ret_conv_15);
			if (ret_conv_15_hu_conv != null) { ret_conv_15_hu_conv.ptrs_to.add(this); };
			ret_conv_15_arr[p] = ret_conv_15_hu_conv;
		}
		return ret_conv_15_arr;
	}

	/**
	 * Addresses that may be used to connect to [`OnionMessagePath::first_node`].
	 * 
	 * Only needs to be filled in if a connection to the node is required and it is not a known peer.
	 * [`OnionMessenger`] may use this to initiate such a connection.
	 */
	public void set_first_node_addresses(SocketAddress[] val) {
		bindings.OnionMessagePath_set_first_node_addresses(this.ptr, val != null ? Arrays.stream(val).mapToLong(val_conv_15 -> val_conv_15.ptr).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new OnionMessagePath given each field
	 */
	public static OnionMessagePath of(byte[][] intermediate_nodes_arg, org.ldk.structs.Destination destination_arg, SocketAddress[] first_node_addresses_arg) {
		long ret = bindings.OnionMessagePath_new(intermediate_nodes_arg != null ? Arrays.stream(intermediate_nodes_arg).map(intermediate_nodes_arg_conv_8 -> InternalUtils.check_arr_len(intermediate_nodes_arg_conv_8, 33)).toArray(byte[][]::new) : null, destination_arg.ptr, first_node_addresses_arg != null ? Arrays.stream(first_node_addresses_arg).mapToLong(first_node_addresses_arg_conv_15 -> first_node_addresses_arg_conv_15.ptr).toArray() : null);
		Reference.reachabilityFence(intermediate_nodes_arg);
		Reference.reachabilityFence(destination_arg);
		Reference.reachabilityFence(first_node_addresses_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessagePath ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionMessagePath(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.OnionMessagePath_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the OnionMessagePath
	 */
	public OnionMessagePath clone() {
		long ret = bindings.OnionMessagePath_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessagePath ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionMessagePath(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns the first node in the path.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public byte[] first_node() {
		byte[] ret = bindings.OnionMessagePath_first_node(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
