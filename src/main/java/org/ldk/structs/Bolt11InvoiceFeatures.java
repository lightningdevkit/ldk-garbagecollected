package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Features used within an invoice.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Bolt11InvoiceFeatures extends CommonBase {
	Bolt11InvoiceFeatures(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Bolt11InvoiceFeatures_free(ptr); }
	}

	/**
	 * Serialize the Bolt11InvoiceFeatures object into a byte array which can be read by Bolt11InvoiceFeatures_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Bolt11InvoiceFeatures_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a Bolt11InvoiceFeatures from a byte array, created by Bolt11InvoiceFeatures_write
	 */
	public static Result_Bolt11InvoiceFeaturesDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Bolt11InvoiceFeatures_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_Bolt11InvoiceFeaturesDecodeErrorZ ret_hu_conv = Result_Bolt11InvoiceFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.Bolt11InvoiceFeatures_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt11InvoiceFeatures
	 */
	public Bolt11InvoiceFeatures clone() {
		long ret = bindings.Bolt11InvoiceFeatures_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11InvoiceFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt11InvoiceFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Bolt11InvoiceFeatures.
	 */
	public long hash() {
		long ret = bindings.Bolt11InvoiceFeatures_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
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
	public static Bolt11InvoiceFeatures for_keysend(boolean allow_mpp) {
		long ret = bindings.Bolt11InvoiceFeatures_for_keysend(allow_mpp);
		Reference.reachabilityFence(allow_mpp);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11InvoiceFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt11InvoiceFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Create a blank Features with no features set
	 */
	public static Bolt11InvoiceFeatures empty() {
		long ret = bindings.Bolt11InvoiceFeatures_empty();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11InvoiceFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt11InvoiceFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns the feature set as a list of bytes, in little-endian. This is in reverse byte order
	 * from most on-the-wire encodings.
	 */
	public byte[] le_flags() {
		byte[] ret = bindings.Bolt11InvoiceFeatures_le_flags(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns true if this `Features` has any optional flags set
	 */
	public boolean supports_any_optional_bits() {
		boolean ret = bindings.Bolt11InvoiceFeatures_supports_any_optional_bits(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns true if this `Features` object contains required features unknown by `other`.
	 */
	public boolean requires_unknown_bits_from(org.ldk.structs.Bolt11InvoiceFeatures other) {
		boolean ret = bindings.Bolt11InvoiceFeatures_requires_unknown_bits_from(this.ptr, other.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(other);
		return ret;
	}

	/**
	 * Returns the set of required features unknown by `other`, as their bit position.
	 */
	public long[] required_unknown_bits_from(org.ldk.structs.Bolt11InvoiceFeatures other) {
		long[] ret = bindings.Bolt11InvoiceFeatures_required_unknown_bits_from(this.ptr, other.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(other);
		return ret;
	}

	/**
	 * Returns true if this `Features` object contains unknown feature flags which are set as
	 * \"required\".
	 */
	public boolean requires_unknown_bits() {
		boolean ret = bindings.Bolt11InvoiceFeatures_requires_unknown_bits(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns true if this `Features` supports any bits which we do not know of
	 */
	public boolean supports_unknown_bits() {
		boolean ret = bindings.Bolt11InvoiceFeatures_supports_unknown_bits(this.ptr);
		Reference.reachabilityFence(this);
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
	public Result_NoneNoneZ set_required_feature_bit(long bit) {
		long ret = bindings.Bolt11InvoiceFeatures_set_required_feature_bit(this.ptr, bit);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(bit);
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
	public Result_NoneNoneZ set_optional_feature_bit(long bit) {
		long ret = bindings.Bolt11InvoiceFeatures_set_optional_feature_bit(this.ptr, bit);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(bit);
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
	public Result_NoneNoneZ set_required_custom_bit(long bit) {
		long ret = bindings.Bolt11InvoiceFeatures_set_required_custom_bit(this.ptr, bit);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(bit);
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
		long ret = bindings.Bolt11InvoiceFeatures_set_optional_custom_bit(this.ptr, bit);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(bit);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_variable_length_onion_optional() {
		bindings.Bolt11InvoiceFeatures_set_variable_length_onion_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_variable_length_onion_required() {
		bindings.Bolt11InvoiceFeatures_set_variable_length_onion_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_variable_length_onion() {
		bindings.Bolt11InvoiceFeatures_clear_variable_length_onion(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_variable_length_onion() {
		boolean ret = bindings.Bolt11InvoiceFeatures_supports_variable_length_onion(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_variable_length_onion() {
		boolean ret = bindings.Bolt11InvoiceFeatures_requires_variable_length_onion(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_payment_secret_optional() {
		bindings.Bolt11InvoiceFeatures_set_payment_secret_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_payment_secret_required() {
		bindings.Bolt11InvoiceFeatures_set_payment_secret_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_payment_secret() {
		bindings.Bolt11InvoiceFeatures_clear_payment_secret(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_payment_secret() {
		boolean ret = bindings.Bolt11InvoiceFeatures_supports_payment_secret(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_payment_secret() {
		boolean ret = bindings.Bolt11InvoiceFeatures_requires_payment_secret(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_basic_mpp_optional() {
		bindings.Bolt11InvoiceFeatures_set_basic_mpp_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_basic_mpp_required() {
		bindings.Bolt11InvoiceFeatures_set_basic_mpp_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_basic_mpp() {
		bindings.Bolt11InvoiceFeatures_clear_basic_mpp(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_basic_mpp() {
		boolean ret = bindings.Bolt11InvoiceFeatures_supports_basic_mpp(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_basic_mpp() {
		boolean ret = bindings.Bolt11InvoiceFeatures_requires_basic_mpp(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_payment_metadata_optional() {
		bindings.Bolt11InvoiceFeatures_set_payment_metadata_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_payment_metadata_required() {
		bindings.Bolt11InvoiceFeatures_set_payment_metadata_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_payment_metadata() {
		bindings.Bolt11InvoiceFeatures_clear_payment_metadata(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_payment_metadata() {
		boolean ret = bindings.Bolt11InvoiceFeatures_supports_payment_metadata(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_payment_metadata() {
		boolean ret = bindings.Bolt11InvoiceFeatures_requires_payment_metadata(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_trampoline_routing_optional() {
		bindings.Bolt11InvoiceFeatures_set_trampoline_routing_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_trampoline_routing_required() {
		bindings.Bolt11InvoiceFeatures_set_trampoline_routing_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_trampoline_routing() {
		bindings.Bolt11InvoiceFeatures_clear_trampoline_routing(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_trampoline_routing() {
		boolean ret = bindings.Bolt11InvoiceFeatures_supports_trampoline_routing(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_trampoline_routing() {
		boolean ret = bindings.Bolt11InvoiceFeatures_requires_trampoline_routing(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
