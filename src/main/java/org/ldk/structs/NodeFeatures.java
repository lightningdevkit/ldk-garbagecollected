package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * Features used within a `node_announcement` message.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class NodeFeatures extends CommonBase {
	NodeFeatures(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.NodeFeatures_free(ptr); }
	}

	/**
	 * Creates a copy of the NodeFeatures
	 */
	public NodeFeatures clone() {
		long ret = bindings.NodeFeatures_clone(this.ptr);
		NodeFeatures ret_hu_conv = new NodeFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Create a blank Features with no features set
	 */
	public static NodeFeatures constructor_empty() {
		long ret = bindings.NodeFeatures_empty();
		NodeFeatures ret_hu_conv = new NodeFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a Features with the bits set which are known by the implementation
	 */
	public static NodeFeatures constructor_known() {
		long ret = bindings.NodeFeatures_known();
		NodeFeatures ret_hu_conv = new NodeFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Serialize the NodeFeatures object into a byte array which can be read by NodeFeatures_read
	 */
	public byte[] write() {
		byte[] ret = bindings.NodeFeatures_write(this.ptr);
		return ret;
	}

	/**
	 * Read a NodeFeatures from a byte array, created by NodeFeatures_write
	 */
	public static Result_NodeFeaturesDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.NodeFeatures_read(ser);
		Result_NodeFeaturesDecodeErrorZ ret_hu_conv = Result_NodeFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
