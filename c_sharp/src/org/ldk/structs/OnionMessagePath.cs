using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A path for sending an [`OnionMessage`].
 */
public class OnionMessagePath : CommonBase {
	internal OnionMessagePath(object _dummy, long ptr) : base(ptr) { }
	~OnionMessagePath() {
		if (ptr != 0) { bindings.OnionMessagePath_free(ptr); }
	}

	/**
	 * Nodes on the path between the sender and the destination.
	 * 
	 * Returns a copy of the field.
	 */
	public byte[][] get_intermediate_nodes() {
		long ret = bindings.OnionMessagePath_get_intermediate_nodes(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_8_len = InternalUtils.getArrayLength(ret);
		byte[][] ret_conv_8_arr = new byte[ret_conv_8_len][];
		for (int i = 0; i < ret_conv_8_len; i++) {
			long ret_conv_8 = InternalUtils.getU64ArrayElem(ret, i);
			byte[] ret_conv_8_conv = InternalUtils.decodeUint8Array(ret_conv_8);
			ret_conv_8_arr[i] = ret_conv_8_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_8_arr;
	}

	/**
	 * Nodes on the path between the sender and the destination.
	 */
	public void set_intermediate_nodes(byte[][] val) {
		bindings.OnionMessagePath_set_intermediate_nodes(this.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(val, val_conv_8 => InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val_conv_8, 33)))));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The recipient of the message.
	 */
	public Destination get_destination() {
		long ret = bindings.OnionMessagePath_get_destination(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Destination ret_hu_conv = org.ldk.structs.Destination.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The recipient of the message.
	 */
	public void set_destination(org.ldk.structs.Destination val) {
		bindings.OnionMessagePath_set_destination(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Addresses that may be used to connect to [`OnionMessagePath::first_node`].
	 * 
	 * Only needs to be set if a connection to the node is required. [`OnionMessenger`] may use
	 * this to initiate such a connection.
	 * 
	 * Returns a copy of the field.
	 */
	public Option_CVec_SocketAddressZZ get_first_node_addresses() {
		long ret = bindings.OnionMessagePath_get_first_node_addresses(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_SocketAddressZZ ret_hu_conv = org.ldk.structs.Option_CVec_SocketAddressZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Addresses that may be used to connect to [`OnionMessagePath::first_node`].
	 * 
	 * Only needs to be set if a connection to the node is required. [`OnionMessenger`] may use
	 * this to initiate such a connection.
	 */
	public void set_first_node_addresses(org.ldk.structs.Option_CVec_SocketAddressZZ val) {
		bindings.OnionMessagePath_set_first_node_addresses(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Constructs a new OnionMessagePath given each field
	 */
	public static OnionMessagePath of(byte[][] intermediate_nodes_arg, org.ldk.structs.Destination destination_arg, org.ldk.structs.Option_CVec_SocketAddressZZ first_node_addresses_arg) {
		long ret = bindings.OnionMessagePath_new(InternalUtils.encodeUint64Array(InternalUtils.mapArray(intermediate_nodes_arg, intermediate_nodes_arg_conv_8 => InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(intermediate_nodes_arg_conv_8, 33)))), destination_arg.ptr, first_node_addresses_arg.ptr);
		GC.KeepAlive(intermediate_nodes_arg);
		GC.KeepAlive(destination_arg);
		GC.KeepAlive(first_node_addresses_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessagePath ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionMessagePath(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(destination_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(first_node_addresses_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.OnionMessagePath_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the OnionMessagePath
	 */
	public OnionMessagePath clone() {
		long ret = bindings.OnionMessagePath_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessagePath ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionMessagePath(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns the first node in the path.
	 */
	public byte[] first_node() {
		long ret = bindings.OnionMessagePath_first_node(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

}
} } }
