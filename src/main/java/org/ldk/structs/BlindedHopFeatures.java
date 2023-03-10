package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Features used within BOLT 4 encrypted_data_tlv and BOLT 12 blinded_payinfo
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class BlindedHopFeatures extends CommonBase {
	BlindedHopFeatures(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.BlindedHopFeatures_free(ptr); }
	}

	/**
	 * Checks if two BlindedHopFeaturess contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.BlindedHopFeatures b) {
		boolean ret = bindings.BlindedHopFeatures_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof BlindedHopFeatures)) return false;
		return this.eq((BlindedHopFeatures)o);
	}
	long clone_ptr() {
		long ret = bindings.BlindedHopFeatures_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the BlindedHopFeatures
	 */
	public BlindedHopFeatures clone() {
		long ret = bindings.BlindedHopFeatures_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedHopFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedHopFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Create a blank Features with no features set
	 */
	public static BlindedHopFeatures empty() {
		long ret = bindings.BlindedHopFeatures_empty();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedHopFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedHopFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns true if this `Features` object contains unknown feature flags which are set as
	 * \"required\".
	 */
	public boolean requires_unknown_bits() {
		boolean ret = bindings.BlindedHopFeatures_requires_unknown_bits(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Serialize the BlindedHopFeatures object into a byte array which can be read by BlindedHopFeatures_read
	 */
	public byte[] write() {
		byte[] ret = bindings.BlindedHopFeatures_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a BlindedHopFeatures from a byte array, created by BlindedHopFeatures_write
	 */
	public static Result_BlindedHopFeaturesDecodeErrorZ read(byte[] ser) {
		long ret = bindings.BlindedHopFeatures_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedHopFeaturesDecodeErrorZ ret_hu_conv = Result_BlindedHopFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
