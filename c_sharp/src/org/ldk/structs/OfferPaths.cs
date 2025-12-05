using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * [`BlindedMessagePath`]s to be included in an async recipient's [`Offer::paths`], sent by a
 * static invoice server in response to an [`OfferPathsRequest`].
 * 
 * [`Offer::paths`]: crate::offers::offer::Offer::paths
 */
public class OfferPaths : CommonBase {
	internal OfferPaths(object _dummy, long ptr) : base(ptr) { }
	~OfferPaths() {
		if (ptr != 0) { bindings.OfferPaths_free(ptr); }
	}

	/**
	 * The paths that should be included in the async recipient's [`Offer::paths`].
	 * 
	 * [`Offer::paths`]: crate::offers::offer::Offer::paths
	 */
	public BlindedMessagePath[] get_paths() {
		long ret = bindings.OfferPaths_get_paths(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_20_len = InternalUtils.getArrayLength(ret);
		BlindedMessagePath[] ret_conv_20_arr = new BlindedMessagePath[ret_conv_20_len];
		for (int u = 0; u < ret_conv_20_len; u++) {
			long ret_conv_20 = InternalUtils.getU64ArrayElem(ret, u);
			org.ldk.structs.BlindedMessagePath ret_conv_20_hu_conv = null; if (ret_conv_20 < 0 || ret_conv_20 > 4096) { ret_conv_20_hu_conv = new org.ldk.structs.BlindedMessagePath(null, ret_conv_20); }
			if (ret_conv_20_hu_conv != null) { ret_conv_20_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_20_arr[u] = ret_conv_20_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_20_arr;
	}

	/**
	 * The paths that should be included in the async recipient's [`Offer::paths`].
	 * 
	 * [`Offer::paths`]: crate::offers::offer::Offer::paths
	 */
	public void set_paths(BlindedMessagePath[] val) {
		bindings.OfferPaths_set_paths(this.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(val, val_conv_20 => val_conv_20.ptr)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The time as seconds since the Unix epoch at which the [`Self::paths`] expire.
	 */
	public org.ldk.structs.Option_u64Z get_paths_absolute_expiry() {
		long ret = bindings.OfferPaths_get_paths_absolute_expiry(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The time as seconds since the Unix epoch at which the [`Self::paths`] expire.
	 */
	public void set_paths_absolute_expiry(org.ldk.structs.Option_u64Z val) {
		bindings.OfferPaths_set_paths_absolute_expiry(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new OfferPaths given each field
	 */
	public static org.ldk.structs.OfferPaths of(BlindedMessagePath[] paths_arg, org.ldk.structs.Option_u64Z paths_absolute_expiry_arg) {
		long ret = bindings.OfferPaths_new(InternalUtils.encodeUint64Array(InternalUtils.mapArray(paths_arg, paths_arg_conv_20 => paths_arg_conv_20.ptr)), paths_absolute_expiry_arg.ptr);
		GC.KeepAlive(paths_arg);
		GC.KeepAlive(paths_absolute_expiry_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferPaths ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferPaths(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.OfferPaths_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the OfferPaths
	 */
	public org.ldk.structs.OfferPaths clone() {
		long ret = bindings.OfferPaths_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferPaths ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferPaths(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OnionMessageContents which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OnionMessageContents must be freed before this_arg is
	 */
	public org.ldk.structs.OnionMessageContents as_OnionMessageContents() {
		long ret = bindings.OfferPaths_as_OnionMessageContents(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OnionMessageContents ret_hu_conv = new OnionMessageContents(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the OfferPaths object into a byte array which can be read by OfferPaths_read
	 */
	public byte[] write() {
		long ret = bindings.OfferPaths_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a OfferPaths from a byte array, created by OfferPaths_write
	 */
	public static org.ldk.structs.Result_OfferPathsDecodeErrorZ read(byte[] ser) {
		long ret = bindings.OfferPaths_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OfferPathsDecodeErrorZ ret_hu_conv = Result_OfferPathsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
