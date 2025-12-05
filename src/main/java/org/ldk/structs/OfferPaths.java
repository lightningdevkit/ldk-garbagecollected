package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * [`BlindedMessagePath`]s to be included in an async recipient's [`Offer::paths`], sent by a
 * static invoice server in response to an [`OfferPathsRequest`].
 * 
 * [`Offer::paths`]: crate::offers::offer::Offer::paths
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OfferPaths extends CommonBase {
	OfferPaths(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.OfferPaths_free(ptr); }
	}

	/**
	 * The paths that should be included in the async recipient's [`Offer::paths`].
	 * 
	 * [`Offer::paths`]: crate::offers::offer::Offer::paths
	 */
	public BlindedMessagePath[] get_paths() {
		long[] ret = bindings.OfferPaths_get_paths(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_20_len = ret.length;
		BlindedMessagePath[] ret_conv_20_arr = new BlindedMessagePath[ret_conv_20_len];
		for (int u = 0; u < ret_conv_20_len; u++) {
			long ret_conv_20 = ret[u];
			org.ldk.structs.BlindedMessagePath ret_conv_20_hu_conv = null; if (ret_conv_20 < 0 || ret_conv_20 > 4096) { ret_conv_20_hu_conv = new org.ldk.structs.BlindedMessagePath(null, ret_conv_20); }
			if (ret_conv_20_hu_conv != null) { ret_conv_20_hu_conv.ptrs_to.add(this); };
			ret_conv_20_arr[u] = ret_conv_20_hu_conv;
		}
		return ret_conv_20_arr;
	}

	/**
	 * The paths that should be included in the async recipient's [`Offer::paths`].
	 * 
	 * [`Offer::paths`]: crate::offers::offer::Offer::paths
	 */
	public void set_paths(BlindedMessagePath[] val) {
		bindings.OfferPaths_set_paths(this.ptr, val != null ? Arrays.stream(val).mapToLong(val_conv_20 -> val_conv_20.ptr).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The time as seconds since the Unix epoch at which the [`Self::paths`] expire.
	 */
	public Option_u64Z get_paths_absolute_expiry() {
		long ret = bindings.OfferPaths_get_paths_absolute_expiry(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The time as seconds since the Unix epoch at which the [`Self::paths`] expire.
	 */
	public void set_paths_absolute_expiry(org.ldk.structs.Option_u64Z val) {
		bindings.OfferPaths_set_paths_absolute_expiry(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new OfferPaths given each field
	 */
	public static OfferPaths of(BlindedMessagePath[] paths_arg, org.ldk.structs.Option_u64Z paths_absolute_expiry_arg) {
		long ret = bindings.OfferPaths_new(paths_arg != null ? Arrays.stream(paths_arg).mapToLong(paths_arg_conv_20 -> paths_arg_conv_20.ptr).toArray() : null, paths_absolute_expiry_arg.ptr);
		Reference.reachabilityFence(paths_arg);
		Reference.reachabilityFence(paths_absolute_expiry_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferPaths ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferPaths(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.OfferPaths_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the OfferPaths
	 */
	public OfferPaths clone() {
		long ret = bindings.OfferPaths_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferPaths ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferPaths(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OnionMessageContents which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OnionMessageContents must be freed before this_arg is
	 */
	public OnionMessageContents as_OnionMessageContents() {
		long ret = bindings.OfferPaths_as_OnionMessageContents(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OnionMessageContents ret_hu_conv = new OnionMessageContents(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the OfferPaths object into a byte array which can be read by OfferPaths_read
	 */
	public byte[] write() {
		byte[] ret = bindings.OfferPaths_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a OfferPaths from a byte array, created by OfferPaths_write
	 */
	public static Result_OfferPathsDecodeErrorZ read(byte[] ser) {
		long ret = bindings.OfferPaths_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OfferPathsDecodeErrorZ ret_hu_conv = Result_OfferPathsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
