package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Features used within an `invoice`.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Bolt12InvoiceFeatures extends CommonBase {
	Bolt12InvoiceFeatures(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Bolt12InvoiceFeatures_free(ptr); }
	}

	/**
	 * Serialize the Bolt12InvoiceFeatures object into a byte array which can be read by Bolt12InvoiceFeatures_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Bolt12InvoiceFeatures_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a Bolt12InvoiceFeatures from a byte array, created by Bolt12InvoiceFeatures_write
	 */
	public static Result_Bolt12InvoiceFeaturesDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Bolt12InvoiceFeatures_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_Bolt12InvoiceFeaturesDecodeErrorZ ret_hu_conv = Result_Bolt12InvoiceFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.Bolt12InvoiceFeatures_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt12InvoiceFeatures
	 */
	public Bolt12InvoiceFeatures clone() {
		long ret = bindings.Bolt12InvoiceFeatures_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12InvoiceFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt12InvoiceFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Bolt12InvoiceFeatures.
	 */
	public long hash() {
		long ret = bindings.Bolt12InvoiceFeatures_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Create a blank Features with no features set
	 */
	public static Bolt12InvoiceFeatures empty() {
		long ret = bindings.Bolt12InvoiceFeatures_empty();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12InvoiceFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt12InvoiceFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns the feature set as a list of bytes, in little-endian. This is in reverse byte order
	 * from most on-the-wire encodings.
	 */
	public byte[] le_flags() {
		byte[] ret = bindings.Bolt12InvoiceFeatures_le_flags(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns true if this `Features` has any optional flags set
	 */
	public boolean supports_any_optional_bits() {
		boolean ret = bindings.Bolt12InvoiceFeatures_supports_any_optional_bits(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns true if this `Features` object contains required features unknown by `other`.
	 */
	public boolean requires_unknown_bits_from(org.ldk.structs.Bolt12InvoiceFeatures other) {
		boolean ret = bindings.Bolt12InvoiceFeatures_requires_unknown_bits_from(this.ptr, other.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(other);
		return ret;
	}

	/**
	 * Returns the set of required features unknown by `other`, as their bit position.
	 */
	public long[] required_unknown_bits_from(org.ldk.structs.Bolt12InvoiceFeatures other) {
		long[] ret = bindings.Bolt12InvoiceFeatures_required_unknown_bits_from(this.ptr, other.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(other);
		return ret;
	}

	/**
	 * Returns true if this `Features` object contains unknown feature flags which are set as
	 * \"required\".
	 */
	public boolean requires_unknown_bits() {
		boolean ret = bindings.Bolt12InvoiceFeatures_requires_unknown_bits(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns true if this `Features` supports any bits which we do not know of
	 */
	public boolean supports_unknown_bits() {
		boolean ret = bindings.Bolt12InvoiceFeatures_supports_unknown_bits(this.ptr);
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
		long ret = bindings.Bolt12InvoiceFeatures_set_required_feature_bit(this.ptr, bit);
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
		long ret = bindings.Bolt12InvoiceFeatures_set_optional_feature_bit(this.ptr, bit);
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
		long ret = bindings.Bolt12InvoiceFeatures_set_required_custom_bit(this.ptr, bit);
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
		long ret = bindings.Bolt12InvoiceFeatures_set_optional_custom_bit(this.ptr, bit);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(bit);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_basic_mpp_optional() {
		bindings.Bolt12InvoiceFeatures_set_basic_mpp_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_basic_mpp_required() {
		bindings.Bolt12InvoiceFeatures_set_basic_mpp_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_basic_mpp() {
		bindings.Bolt12InvoiceFeatures_clear_basic_mpp(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_basic_mpp() {
		boolean ret = bindings.Bolt12InvoiceFeatures_supports_basic_mpp(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_basic_mpp() {
		boolean ret = bindings.Bolt12InvoiceFeatures_requires_basic_mpp(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public void set_trampoline_routing_optional() {
		bindings.Bolt12InvoiceFeatures_set_trampoline_routing_optional(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Set this feature as required.
	 */
	public void set_trampoline_routing_required() {
		bindings.Bolt12InvoiceFeatures_set_trampoline_routing_required(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Unsets this feature.
	 */
	public void clear_trampoline_routing() {
		bindings.Bolt12InvoiceFeatures_clear_trampoline_routing(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public boolean supports_trampoline_routing() {
		boolean ret = bindings.Bolt12InvoiceFeatures_supports_trampoline_routing(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public boolean requires_trampoline_routing() {
		boolean ret = bindings.Bolt12InvoiceFeatures_requires_trampoline_routing(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
