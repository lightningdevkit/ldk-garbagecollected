package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A map with liquidity value (in msat) keyed by a short channel id and the direction the HTLC
 * is traveling in. The direction boolean is determined by checking if the HTLC source's public
 * key is less than its destination. See [`InFlightHtlcs::used_liquidity_msat`] for more
 * details.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class InFlightHtlcs extends CommonBase {
	InFlightHtlcs(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.InFlightHtlcs_free(ptr); }
	}

	/**
	 * Returns liquidity in msat given the public key of the HTLC source, target, and short channel
	 * id.
	 */
	public Option_u64Z used_liquidity_msat(NodeId source, NodeId target, long channel_scid) {
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
