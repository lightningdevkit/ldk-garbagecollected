package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Attribution data allows the sender of an HTLC to identify which hop failed an HTLC robustly,
 * preventing earlier hops from corrupting the HTLC failure information (or at least allowing the
 * sender to identify the earliest hop which corrupted HTLC failure information).
 * 
 * Additionally, it allows a sender to identify how long each hop along a path held an HTLC, with
 * 100ms granularity.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class AttributionData extends CommonBase {
	AttributionData(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.AttributionData_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.AttributionData_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the AttributionData
	 */
	public AttributionData clone() {
		long ret = bindings.AttributionData_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AttributionData ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.AttributionData(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the AttributionData.
	 */
	public long hash() {
		long ret = bindings.AttributionData_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two AttributionDatas contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.AttributionData b) {
		boolean ret = bindings.AttributionData_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof AttributionData)) return false;
		return this.eq((AttributionData)o);
	}
	/**
	 * Serialize the AttributionData object into a byte array which can be read by AttributionData_read
	 */
	public byte[] write() {
		byte[] ret = bindings.AttributionData_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a AttributionData from a byte array, created by AttributionData_write
	 */
	public static Result_AttributionDataDecodeErrorZ read(byte[] ser) {
		long ret = bindings.AttributionData_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_AttributionDataDecodeErrorZ ret_hu_conv = Result_AttributionDataDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
