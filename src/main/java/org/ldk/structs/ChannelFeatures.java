package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


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
	 * Checks if two ChannelFeaturess contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(ChannelFeatures b) {
		boolean ret = bindings.ChannelFeatures_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelFeatures
	 */
	public ChannelFeatures clone() {
		long ret = bindings.ChannelFeatures_clone(this.ptr);
		if (ret < 1024) { return null; }
		ChannelFeatures ret_hu_conv = new ChannelFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Create a blank Features with no features set
	 */
	public static ChannelFeatures empty() {
		long ret = bindings.ChannelFeatures_empty();
		if (ret < 1024) { return null; }
		ChannelFeatures ret_hu_conv = new ChannelFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a Features with the bits set which are known by the implementation
	 */
	public static ChannelFeatures known() {
		long ret = bindings.ChannelFeatures_known();
		if (ret < 1024) { return null; }
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
	public static Result_ChannelFeaturesDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ChannelFeatures_read(ser);
		if (ret < 1024) { return null; }
		Result_ChannelFeaturesDecodeErrorZ ret_hu_conv = Result_ChannelFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
