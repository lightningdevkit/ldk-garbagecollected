using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Features used within an `offer`.
 */
public class OfferFeatures : CommonBase {
	internal OfferFeatures(object _dummy, long ptr) : base(ptr) { }
	~OfferFeatures() {
		if (ptr != 0) { bindings.OfferFeatures_free(ptr); }
	}

	/**
	 * Checks if two OfferFeaturess contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.OfferFeatures b) {
		bool ret = bindings.OfferFeatures_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is OfferFeatures)) return false;
		return this.eq((OfferFeatures)o);
	}
	internal long clone_ptr() {
		long ret = bindings.OfferFeatures_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the OfferFeatures
	 */
	public OfferFeatures clone() {
		long ret = bindings.OfferFeatures_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Create a blank Features with no features set
	 */
	public static OfferFeatures empty() {
		long ret = bindings.OfferFeatures_empty();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns true if this `Features` object contains unknown feature flags which are set as
	 * \"required\".
	 */
	public bool requires_unknown_bits() {
		bool ret = bindings.OfferFeatures_requires_unknown_bits(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Serialize the OfferFeatures object into a byte array which can be read by OfferFeatures_read
	 */
	public byte[] write() {
		byte[] ret = bindings.OfferFeatures_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a OfferFeatures from a byte array, created by OfferFeatures_write
	 */
	public static Result_OfferFeaturesDecodeErrorZ read(byte[] ser) {
		long ret = bindings.OfferFeatures_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OfferFeaturesDecodeErrorZ ret_hu_conv = Result_OfferFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
