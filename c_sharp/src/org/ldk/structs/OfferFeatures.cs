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

	internal long clone_ptr() {
		long ret = bindings.OfferFeatures_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the OfferFeatures
	 */
	public org.ldk.structs.OfferFeatures clone() {
		long ret = bindings.OfferFeatures_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the OfferFeatures.
	 */
	public long hash() {
		long ret = bindings.OfferFeatures_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Create a blank Features with no features set
	 */
	public static org.ldk.structs.OfferFeatures empty() {
		long ret = bindings.OfferFeatures_empty();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns the feature set as a list of bytes, in little-endian. This is in reverse byte order
	 * from most on-the-wire encodings.
	 */
	public byte[] le_flags() {
		long ret = bindings.OfferFeatures_le_flags(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns true if this `Features` has any optional flags set
	 */
	public bool supports_any_optional_bits() {
		bool ret = bindings.OfferFeatures_supports_any_optional_bits(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Returns true if this `Features` object contains required features unknown by `other`.
	 */
	public bool requires_unknown_bits_from(org.ldk.structs.OfferFeatures other) {
		bool ret = bindings.OfferFeatures_requires_unknown_bits_from(this.ptr, other.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(other);
		return ret;
	}

	/**
	 * Returns the set of required features unknown by `other`, as their bit position.
	 */
	public long[] required_unknown_bits_from(org.ldk.structs.OfferFeatures other) {
		long ret = bindings.OfferFeatures_required_unknown_bits_from(this.ptr, other.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(other);
		if (ret >= 0 && ret <= 4096) { return null; }
		long[] ret_conv = InternalUtils.decodeUint64Array(ret);
		return ret_conv;
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
	 * Returns true if this `Features` supports any bits which we do not know of
	 */
	public bool supports_unknown_bits() {
		bool ret = bindings.OfferFeatures_supports_unknown_bits(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Sets a required feature bit. Errors if `bit` is outside the feature range as defined
	 * by [BOLT 9].
	 * 
	 * Note: Required bits are even. If an odd bit is given, then the corresponding even bit will
	 * be set instead (i.e., `bit - 1`).
	 * 
	 * [BOLT 9]: https://github.com/lightning/bolts/blob/master/09-features.md
	 */
	public org.ldk.structs.Result_NoneNoneZ set_required_feature_bit(long bit) {
		long ret = bindings.OfferFeatures_set_required_feature_bit(this.ptr, bit);
		GC.KeepAlive(this);
		GC.KeepAlive(bit);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sets an optional feature bit. Errors if `bit` is outside the feature range as defined
	 * by [BOLT 9].
	 * 
	 * Note: Optional bits are odd. If an even bit is given, then the corresponding odd bit will be
	 * set instead (i.e., `bit + 1`).
	 * 
	 * [BOLT 9]: https://github.com/lightning/bolts/blob/master/09-features.md
	 */
	public org.ldk.structs.Result_NoneNoneZ set_optional_feature_bit(long bit) {
		long ret = bindings.OfferFeatures_set_optional_feature_bit(this.ptr, bit);
		GC.KeepAlive(this);
		GC.KeepAlive(bit);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sets a required custom feature bit. Errors if `bit` is outside the custom range as defined
	 * by [bLIP 2] or if it is a known `T` feature.
	 * 
	 * Note: Required bits are even. If an odd bit is given, then the corresponding even bit will
	 * be set instead (i.e., `bit - 1`).
	 * 
	 * [bLIP 2]: https://github.com/lightning/blips/blob/master/blip-0002.md#feature-bits
	 */
	public org.ldk.structs.Result_NoneNoneZ set_required_custom_bit(long bit) {
		long ret = bindings.OfferFeatures_set_required_custom_bit(this.ptr, bit);
		GC.KeepAlive(this);
		GC.KeepAlive(bit);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sets an optional custom feature bit. Errors if `bit` is outside the custom range as defined
	 * by [bLIP 2] or if it is a known `T` feature.
	 * 
	 * Note: Optional bits are odd. If an even bit is given, then the corresponding odd bit will be
	 * set instead (i.e., `bit + 1`).
	 * 
	 * [bLIP 2]: https://github.com/lightning/blips/blob/master/blip-0002.md#feature-bits
	 */
	public org.ldk.structs.Result_NoneNoneZ set_optional_custom_bit(long bit) {
		long ret = bindings.OfferFeatures_set_optional_custom_bit(this.ptr, bit);
		GC.KeepAlive(this);
		GC.KeepAlive(bit);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
