package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Features used within the channel_type field in an OpenChannel message.
 * 
 * A channel is always of some known \"type\", describing the transaction formats used and the exact
 * semantics of our interaction with our peer.
 * 
 * Note that because a channel is a specific type which is proposed by the opener and accepted by
 * the counterparty, only required features are allowed here.
 * 
 * This is serialized differently from other feature types - it is not prefixed by a length, and
 * thus must only appear inside a TLV where its length is known in advance.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelTypeFeatures extends CommonBase {
	ChannelTypeFeatures(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelTypeFeatures_free(ptr); }
	}

	/**
	 * Checks if two ChannelTypeFeaturess contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(ChannelTypeFeatures b) {
		boolean ret = bindings.ChannelTypeFeatures_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		this.ptrs_to.add(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof ChannelTypeFeatures)) return false;
		return this.eq((ChannelTypeFeatures)o);
	}
	long clone_ptr() {
		long ret = bindings.ChannelTypeFeatures_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelTypeFeatures
	 */
	public ChannelTypeFeatures clone() {
		long ret = bindings.ChannelTypeFeatures_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelTypeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelTypeFeatures(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Create a blank Features with no features set
	 */
	public static ChannelTypeFeatures empty() {
		long ret = bindings.ChannelTypeFeatures_empty();
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelTypeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelTypeFeatures(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a Features with the bits set which are known by the implementation
	 */
	public static ChannelTypeFeatures known() {
		long ret = bindings.ChannelTypeFeatures_known();
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelTypeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelTypeFeatures(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Returns true if this `Features` object contains unknown feature flags which are set as
	 * \"required\".
	 */
	public boolean requires_unknown_bits() {
		boolean ret = bindings.ChannelTypeFeatures_requires_unknown_bits(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Serialize the ChannelTypeFeatures object into a byte array which can be read by ChannelTypeFeatures_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ChannelTypeFeatures_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a ChannelTypeFeatures from a byte array, created by ChannelTypeFeatures_write
	 */
	public static Result_ChannelTypeFeaturesDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ChannelTypeFeatures_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelTypeFeaturesDecodeErrorZ ret_hu_conv = Result_ChannelTypeFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
