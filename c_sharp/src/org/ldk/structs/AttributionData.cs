using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Attribution data allows the sender of an HTLC to identify which hop failed an HTLC robustly,
 * preventing earlier hops from corrupting the HTLC failure information (or at least allowing the
 * sender to identify the earliest hop which corrupted HTLC failure information).
 * 
 * Additionally, it allows a sender to identify how long each hop along a path held an HTLC, with
 * 100ms granularity.
 */
public class AttributionData : CommonBase {
	internal AttributionData(object _dummy, long ptr) : base(ptr) { }
	~AttributionData() {
		if (ptr != 0) { bindings.AttributionData_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.AttributionData_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the AttributionData
	 */
	public org.ldk.structs.AttributionData clone() {
		long ret = bindings.AttributionData_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AttributionData ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.AttributionData(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the AttributionData.
	 */
	public long hash() {
		long ret = bindings.AttributionData_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two AttributionDatas contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.AttributionData b) {
		bool ret = bindings.AttributionData_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is AttributionData)) return false;
		return this.eq((AttributionData)o);
	}
	/**
	 * Serialize the AttributionData object into a byte array which can be read by AttributionData_read
	 */
	public byte[] write() {
		long ret = bindings.AttributionData_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a AttributionData from a byte array, created by AttributionData_write
	 */
	public static org.ldk.structs.Result_AttributionDataDecodeErrorZ read(byte[] ser) {
		long ret = bindings.AttributionData_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_AttributionDataDecodeErrorZ ret_hu_conv = Result_AttributionDataDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
