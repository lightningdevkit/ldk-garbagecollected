package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A data structure for tracking in-flight HTLCs. May be used during pathfinding to account for
 * in-use channel liquidity.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class InFlightHtlcs extends CommonBase {
	InFlightHtlcs(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.InFlightHtlcs_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.InFlightHtlcs_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the InFlightHtlcs
	 */
	public InFlightHtlcs clone() {
		long ret = bindings.InFlightHtlcs_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InFlightHtlcs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InFlightHtlcs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs an empty `InFlightHtlcs`.
	 */
	public static InFlightHtlcs of() {
		long ret = bindings.InFlightHtlcs_new();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InFlightHtlcs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InFlightHtlcs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns liquidity in msat given the public key of the HTLC source, target, and short channel
	 * id.
	 */
	public Option_u64Z used_liquidity_msat(org.ldk.structs.NodeId source, org.ldk.structs.NodeId target, long channel_scid) {
		long ret = bindings.InFlightHtlcs_used_liquidity_msat(this.ptr, source == null ? 0 : source.ptr, target == null ? 0 : target.ptr, channel_scid);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(source);
		Reference.reachabilityFence(target);
		Reference.reachabilityFence(channel_scid);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		if (this != null) { this.ptrs_to.add(source); };
		if (this != null) { this.ptrs_to.add(target); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the InFlightHtlcs object into a byte array which can be read by InFlightHtlcs_read
	 */
	public byte[] write() {
		byte[] ret = bindings.InFlightHtlcs_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a InFlightHtlcs from a byte array, created by InFlightHtlcs_write
	 */
	public static Result_InFlightHtlcsDecodeErrorZ read(byte[] ser) {
		long ret = bindings.InFlightHtlcs_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InFlightHtlcsDecodeErrorZ ret_hu_conv = Result_InFlightHtlcsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
