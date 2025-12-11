package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Container for live and historical liquidity bounds for each channel.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelLiquidities extends CommonBase {
	ChannelLiquidities(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelLiquidities_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.ChannelLiquidities_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelLiquidities
	 */
	public ChannelLiquidities clone() {
		long ret = bindings.ChannelLiquidities_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelLiquidities ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelLiquidities(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Read a ChannelLiquidities from a byte array, created by ChannelLiquidities_write
	 */
	public static Result_ChannelLiquiditiesDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ChannelLiquidities_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelLiquiditiesDecodeErrorZ ret_hu_conv = Result_ChannelLiquiditiesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelLiquidities object into a byte array which can be read by ChannelLiquidities_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ChannelLiquidities_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
