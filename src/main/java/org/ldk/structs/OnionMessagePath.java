package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A path for sending an [`msgs::OnionMessage`].
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
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Constructs a new OnionMessagePath given each field
	 */
	public static OnionMessagePath of(byte[][] intermediate_nodes_arg, org.ldk.structs.Destination destination_arg) {
		long ret = bindings.OnionMessagePath_new(intermediate_nodes_arg != null ? Arrays.stream(intermediate_nodes_arg).map(intermediate_nodes_arg_conv_8 -> InternalUtils.check_arr_len(intermediate_nodes_arg_conv_8, 33)).toArray(byte[][]::new) : null, destination_arg.ptr);
		Reference.reachabilityFence(intermediate_nodes_arg);
		Reference.reachabilityFence(destination_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessagePath ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionMessagePath(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(destination_arg); };
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

}
