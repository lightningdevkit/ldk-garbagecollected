using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Features used within an invoice.
 */
public class Bolt11InvoiceFeatures : CommonBase {
	internal Bolt11InvoiceFeatures(object _dummy, long ptr) : base(ptr) { }
	~Bolt11InvoiceFeatures() {
		if (ptr != 0) { bindings.Bolt11InvoiceFeatures_free(ptr); }
	}

	/**
	 * Serialize the Bolt11InvoiceFeatures object into a byte array which can be read by Bolt11InvoiceFeatures_read
	 */
	public byte[] write() {
		long ret = bindings.Bolt11InvoiceFeatures_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Bolt11InvoiceFeatures from a byte array, created by Bolt11InvoiceFeatures_write
	 */
	public static org.ldk.structs.Result_Bolt11InvoiceFeaturesDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Bolt11InvoiceFeatures_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_Bolt11InvoiceFeaturesDecodeErrorZ ret_hu_conv = Result_Bolt11InvoiceFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.Bolt11InvoiceFeatures_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt11InvoiceFeatures
	 */
	public org.ldk.structs.Bolt11InvoiceFeatures clone() {
		long ret = bindings.Bolt11InvoiceFeatures_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11InvoiceFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt11InvoiceFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Bolt11InvoiceFeatures.
	 */
	public long hash() {
		long ret = bindings.Bolt11InvoiceFeatures_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Getting a route for a keysend payment to a private node requires providing the payee's
	 * features (since they were not announced in a node announcement). However, keysend payments
	 * don't have an invoice to pull the payee's features from, so this method is provided for use
	 * when a [`Bolt11InvoiceFeatures`] is required in a route.
	 * 
	 * MPP keysend is not widely supported yet, so we parameterize support to allow the user to
	 * choose whether their router should find multi-part routes.
	 */
	public static org.ldk.structs.Bolt11InvoiceFeatures for_keysend(bool allow_mpp) {
		long ret = bindings.Bolt11InvoiceFeatures_for_keysend(allow_mpp);
		GC.KeepAlive(allow_mpp);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11InvoiceFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt11InvoiceFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Create a blank Features with no features set
	 */
	public static org.ldk.structs.Bolt11InvoiceFeatures empty() {
		long ret = bindings.Bolt11InvoiceFeatures_empty();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11InvoiceFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt11InvoiceFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns the feature set as a list of bytes, in little-endian. This is in reverse byte order
	 * from most on-the-wire encodings.
	 */
	public byte[] le_flags() {
		long ret = bindings.Bolt11InvoiceFeatures_le_flags(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns true if this `Features` has any optional flags set
	 */
	public bool supports_any_optional_bits() {
		bool ret = bindings.Bolt11InvoiceFeatures_supports_any_optional_bits(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Returns true if this `Features` object contains required features unknown by `other`.
	 */
	public bool requires_unknown_bits_from(org.ldk.structs.Bolt11InvoiceFeatures other) {
		bool ret = bindings.Bolt11InvoiceFeatures_requires_unknown_bits_from(this.ptr, other.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(other);
		return ret;
	}

	/**
	 * Returns the set of required features unknown by `other`, as their bit position.
	 */
	public long[] required_unknown_bits_from(org.ldk.structs.Bolt11InvoiceFeatures other) {
		long ret = bindings.Bolt11InvoiceFeatures_required_unknown_bits_from(this.ptr, other.ptr);
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
		bool ret = bindings.Bolt11InvoiceFeatures_requires_unknown_bits(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Returns true if this `Features` supports any bits which we do not know of
	 */
	public bool supports_unknown_bits() {
		bool ret = bindings.Bolt11InvoiceFeatures_supports_unknown_bits(this.ptr);
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
		long ret = bindings.Bolt11InvoiceFeatures_set_required_feature_bit(this.ptr, bit);
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
		long ret = bindings.Bolt11InvoiceFeatures_set_optional_feature_bit(this.ptr, bit);
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
		long ret = bindings.Bolt11InvoiceFeatures_set_required_custom_bit(this.ptr, bit);
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
		long ret = bindings.Bolt11InvoiceFeatures_set_optional_custom_bit(this.ptr, bit);
		GC.KeepAlive(this);
		GC.KeepAlive(bit);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_variable_length_onion_optional() {
		bindings.Bolt11InvoiceFeatures_set_variable_length_onion_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_variable_length_onion_required() {
		bindings.Bolt11InvoiceFeatures_set_variable_length_onion_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_variable_length_onion() {
		bindings.Bolt11InvoiceFeatures_clear_variable_length_onion(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_variable_length_onion() {
		bool ret = bindings.Bolt11InvoiceFeatures_supports_variable_length_onion(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_variable_length_onion() {
		bool ret = bindings.Bolt11InvoiceFeatures_requires_variable_length_onion(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_payment_secret_optional() {
		bindings.Bolt11InvoiceFeatures_set_payment_secret_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_payment_secret_required() {
		bindings.Bolt11InvoiceFeatures_set_payment_secret_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_payment_secret() {
		bindings.Bolt11InvoiceFeatures_clear_payment_secret(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_payment_secret() {
		bool ret = bindings.Bolt11InvoiceFeatures_supports_payment_secret(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_payment_secret() {
		bool ret = bindings.Bolt11InvoiceFeatures_requires_payment_secret(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_basic_mpp_optional() {
		bindings.Bolt11InvoiceFeatures_set_basic_mpp_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_basic_mpp_required() {
		bindings.Bolt11InvoiceFeatures_set_basic_mpp_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_basic_mpp() {
		bindings.Bolt11InvoiceFeatures_clear_basic_mpp(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_basic_mpp() {
		bool ret = bindings.Bolt11InvoiceFeatures_supports_basic_mpp(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_basic_mpp() {
		bool ret = bindings.Bolt11InvoiceFeatures_requires_basic_mpp(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_payment_metadata_optional() {
		bindings.Bolt11InvoiceFeatures_set_payment_metadata_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_payment_metadata_required() {
		bindings.Bolt11InvoiceFeatures_set_payment_metadata_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_payment_metadata() {
		bindings.Bolt11InvoiceFeatures_clear_payment_metadata(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_payment_metadata() {
		bool ret = bindings.Bolt11InvoiceFeatures_supports_payment_metadata(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_payment_metadata() {
		bool ret = bindings.Bolt11InvoiceFeatures_requires_payment_metadata(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_trampoline_routing_optional() {
		bindings.Bolt11InvoiceFeatures_set_trampoline_routing_optional(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_trampoline_routing_required() {
		bindings.Bolt11InvoiceFeatures_set_trampoline_routing_required(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_trampoline_routing() {
		bindings.Bolt11InvoiceFeatures_clear_trampoline_routing(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public bool supports_trampoline_routing() {
		bool ret = bindings.Bolt11InvoiceFeatures_supports_trampoline_routing(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public bool requires_trampoline_routing() {
		bool ret = bindings.Bolt11InvoiceFeatures_requires_trampoline_routing(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
