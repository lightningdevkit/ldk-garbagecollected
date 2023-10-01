using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Features used within BOLT 4 encrypted_data_tlv and BOLT 12 blinded_payinfo
 */
public class BlindedHopFeatures : CommonBase {
	internal BlindedHopFeatures(object _dummy, long ptr) : base(ptr) { }
	~BlindedHopFeatures() {
		if (ptr != 0) { bindings.BlindedHopFeatures_free(ptr); }
	}

	/**
	 * Checks if two BlindedHopFeaturess contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.BlindedHopFeatures b) {
		bool ret = bindings.BlindedHopFeatures_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is BlindedHopFeatures)) return false;
		return this.eq((BlindedHopFeatures)o);
	}
	internal long clone_ptr() {
		long ret = bindings.BlindedHopFeatures_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the BlindedHopFeatures
	 */
	public BlindedHopFeatures clone() {
		long ret = bindings.BlindedHopFeatures_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedHopFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedHopFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Create a blank Features with no features set
	 */
	public static BlindedHopFeatures empty() {
		long ret = bindings.BlindedHopFeatures_empty();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedHopFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedHopFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns true if this `Features` object contains required features unknown by `other`.
	 */
	public bool requires_unknown_bits_from(org.ldk.structs.BlindedHopFeatures other) {
		bool ret = bindings.BlindedHopFeatures_requires_unknown_bits_from(this.ptr, other == null ? 0 : other.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(other);
		if (this != null) { this.ptrs_to.AddLast(other); };
		return ret;
	}

	/**
	 * Returns true if this `Features` object contains unknown feature flags which are set as
	 * \"required\".
	 */
	public bool requires_unknown_bits() {
		bool ret = bindings.BlindedHopFeatures_requires_unknown_bits(this.ptr);
		GC.KeepAlive(this);
		return ret;
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
	public Result_NoneNoneZ set_required_custom_bit(long bit) {
		long ret = bindings.BlindedHopFeatures_set_required_custom_bit(this.ptr, bit);
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
	public Result_NoneNoneZ set_optional_custom_bit(long bit) {
		long ret = bindings.BlindedHopFeatures_set_optional_custom_bit(this.ptr, bit);
		GC.KeepAlive(this);
		GC.KeepAlive(bit);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Serialize the BlindedHopFeatures object into a byte array which can be read by BlindedHopFeatures_read
	 */
	public byte[] write() {
		byte[] ret = bindings.BlindedHopFeatures_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a BlindedHopFeatures from a byte array, created by BlindedHopFeatures_write
	 */
	public static Result_BlindedHopFeaturesDecodeErrorZ read(byte[] ser) {
		long ret = bindings.BlindedHopFeatures_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedHopFeaturesDecodeErrorZ ret_hu_conv = Result_BlindedHopFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }