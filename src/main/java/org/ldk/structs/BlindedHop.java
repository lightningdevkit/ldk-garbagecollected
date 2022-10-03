package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Used to construct the blinded hops portion of a blinded route. These hops cannot be identified
 * by outside observers and thus can be used to hide the identity of the recipient.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class BlindedHop extends CommonBase {
	BlindedHop(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.BlindedHop_free(ptr); }
	}

	/**
	 * Serialize the BlindedHop object into a byte array which can be read by BlindedHop_read
	 */
	public byte[] write() {
		byte[] ret = bindings.BlindedHop_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a BlindedHop from a byte array, created by BlindedHop_write
	 */
	public static Result_BlindedHopDecodeErrorZ read(byte[] ser) {
		long ret = bindings.BlindedHop_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedHopDecodeErrorZ ret_hu_conv = Result_BlindedHopDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
