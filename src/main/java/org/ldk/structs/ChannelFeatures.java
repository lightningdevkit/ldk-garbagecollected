package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * Features used within a `channel_announcement` message.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelFeatures extends CommonBase {
	ChannelFeatures(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelFeatures_free(ptr); }
	}

	/**
	 * Creates a copy of the ChannelFeatures
	 */
	public ChannelFeatures clone() {
		long ret = bindings.ChannelFeatures_clone(this.ptr);
		ChannelFeatures ret_hu_conv = new ChannelFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Create a blank Features with no features set
	 */
	public static ChannelFeatures constructor_empty() {
		long ret = bindings.ChannelFeatures_empty();
		ChannelFeatures ret_hu_conv = new ChannelFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates features known by the implementation as defined by [`T::KNOWN_FEATURE_FLAGS`].
	 * 
	 * [`T::KNOWN_FEATURE_FLAGS`]: sealed/trait.Context.html#associatedconstant.KNOWN_FEATURE_FLAGS
	 */
	public static ChannelFeatures constructor_known() {
		long ret = bindings.ChannelFeatures_known();
		ChannelFeatures ret_hu_conv = new ChannelFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelFeatures object into a byte array which can be read by ChannelFeatures_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ChannelFeatures_write(this.ptr);
		return ret;
	}

	/**
	 * Read a ChannelFeatures from a byte array, created by ChannelFeatures_write
	 */
	public static Result_ChannelFeaturesDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.ChannelFeatures_read(ser);
		Result_ChannelFeaturesDecodeErrorZ ret_hu_conv = Result_ChannelFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
