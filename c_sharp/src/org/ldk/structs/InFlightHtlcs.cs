using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A data structure for tracking in-flight HTLCs. May be used during pathfinding to account for
 * in-use channel liquidity.
 */
public class InFlightHtlcs : CommonBase {
	internal InFlightHtlcs(object _dummy, long ptr) : base(ptr) { }
	~InFlightHtlcs() {
		if (ptr != 0) { bindings.InFlightHtlcs_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.InFlightHtlcs_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the InFlightHtlcs
	 */
	public InFlightHtlcs clone() {
		long ret = bindings.InFlightHtlcs_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InFlightHtlcs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InFlightHtlcs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs an empty `InFlightHtlcs`.
	 */
	public static InFlightHtlcs of() {
		long ret = bindings.InFlightHtlcs_new();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InFlightHtlcs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InFlightHtlcs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns liquidity in msat given the public key of the HTLC source, target, and short channel
	 * id.
	 */
	public Option_u64Z used_liquidity_msat(org.ldk.structs.NodeId source, org.ldk.structs.NodeId target, long channel_scid) {
		long ret = bindings.InFlightHtlcs_used_liquidity_msat(this.ptr, source == null ? 0 : source.ptr, target == null ? 0 : target.ptr, channel_scid);
		GC.KeepAlive(this);
		GC.KeepAlive(source);
		GC.KeepAlive(target);
		GC.KeepAlive(channel_scid);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		if (this != null) { this.ptrs_to.AddLast(source); };
		if (this != null) { this.ptrs_to.AddLast(target); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the InFlightHtlcs object into a byte array which can be read by InFlightHtlcs_read
	 */
	public byte[] write() {
		byte[] ret = bindings.InFlightHtlcs_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a InFlightHtlcs from a byte array, created by InFlightHtlcs_write
	 */
	public static Result_InFlightHtlcsDecodeErrorZ read(byte[] ser) {
		long ret = bindings.InFlightHtlcs_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InFlightHtlcsDecodeErrorZ ret_hu_conv = Result_InFlightHtlcsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
