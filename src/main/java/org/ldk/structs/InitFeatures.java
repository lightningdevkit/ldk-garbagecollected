package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * Features used within an `init` message.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class InitFeatures extends CommonBase {
	InitFeatures(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.InitFeatures_free(ptr); }
	}

	/**
	 * Creates a copy of the InitFeatures
	 */
	public InitFeatures clone() {
		long ret = bindings.InitFeatures_clone(this.ptr);
		InitFeatures ret_hu_conv = new InitFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Create a blank Features with no features set
	 */
	public static InitFeatures constructor_empty() {
		long ret = bindings.InitFeatures_empty();
		InitFeatures ret_hu_conv = new InitFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a Features with the bits set which are known by the implementation
	 */
	public static InitFeatures constructor_known() {
		long ret = bindings.InitFeatures_known();
		InitFeatures ret_hu_conv = new InitFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Serialize the InitFeatures object into a byte array which can be read by InitFeatures_read
	 */
	public byte[] write() {
		byte[] ret = bindings.InitFeatures_write(this.ptr);
		return ret;
	}

	/**
	 * Read a InitFeatures from a byte array, created by InitFeatures_write
	 */
	public static Result_InitFeaturesDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.InitFeatures_read(ser);
		Result_InitFeaturesDecodeErrorZ ret_hu_conv = Result_InitFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
