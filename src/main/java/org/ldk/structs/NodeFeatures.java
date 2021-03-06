package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class NodeFeatures extends CommonBase {
	NodeFeatures(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.NodeFeatures_free(ptr); }
	}

	public NodeFeatures clone() {
		long ret = bindings.NodeFeatures_clone(this.ptr);
		NodeFeatures ret_hu_conv = new NodeFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static NodeFeatures constructor_empty() {
		long ret = bindings.NodeFeatures_empty();
		NodeFeatures ret_hu_conv = new NodeFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static NodeFeatures constructor_known() {
		long ret = bindings.NodeFeatures_known();
		NodeFeatures ret_hu_conv = new NodeFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.NodeFeatures_write(this.ptr);
		return ret;
	}

	public static Result_NodeFeaturesDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.NodeFeatures_read(ser);
		Result_NodeFeaturesDecodeErrorZ ret_hu_conv = Result_NodeFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
