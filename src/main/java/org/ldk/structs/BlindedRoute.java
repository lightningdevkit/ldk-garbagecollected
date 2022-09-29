package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Onion messages can be sent and received to blinded routes, which serve to hide the identity of
 * the recipient.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class BlindedRoute extends CommonBase {
	BlindedRoute(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.BlindedRoute_free(ptr); }
	}

	/**
	 * Create a blinded route to be forwarded along `node_pks`. The last node pubkey in `node_pks`
	 * will be the destination node.
	 * 
	 * Errors if less than two hops are provided or if `node_pk`(s) are invalid.
	 */
	public static Result_BlindedRouteNoneZ of(byte[][] node_pks, KeysInterface keys_manager) {
		long ret = bindings.BlindedRoute_new(node_pks != null ? Arrays.stream(node_pks).map(node_pks_conv_8 -> InternalUtils.check_arr_len(node_pks_conv_8, 33)).toArray(byte[][]::new) : null, keys_manager == null ? 0 : keys_manager.ptr);
		Reference.reachabilityFence(node_pks);
		Reference.reachabilityFence(keys_manager);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedRouteNoneZ ret_hu_conv = Result_BlindedRouteNoneZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(keys_manager); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the BlindedRoute object into a byte array which can be read by BlindedRoute_read
	 */
	public byte[] write() {
		byte[] ret = bindings.BlindedRoute_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a BlindedRoute from a byte array, created by BlindedRoute_write
	 */
	public static Result_BlindedRouteDecodeErrorZ read(byte[] ser) {
		long ret = bindings.BlindedRoute_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedRouteDecodeErrorZ ret_hu_conv = Result_BlindedRouteDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
