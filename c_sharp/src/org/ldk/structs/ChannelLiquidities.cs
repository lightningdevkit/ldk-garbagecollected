using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Container for live and historical liquidity bounds for each channel.
 */
public class ChannelLiquidities : CommonBase {
	internal ChannelLiquidities(object _dummy, long ptr) : base(ptr) { }
	~ChannelLiquidities() {
		if (ptr != 0) { bindings.ChannelLiquidities_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.ChannelLiquidities_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelLiquidities
	 */
	public org.ldk.structs.ChannelLiquidities clone() {
		long ret = bindings.ChannelLiquidities_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelLiquidities ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelLiquidities(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Read a ChannelLiquidities from a byte array, created by ChannelLiquidities_write
	 */
	public static org.ldk.structs.Result_ChannelLiquiditiesDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ChannelLiquidities_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelLiquiditiesDecodeErrorZ ret_hu_conv = Result_ChannelLiquiditiesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelLiquidities object into a byte array which can be read by ChannelLiquidities_read
	 */
	public byte[] write() {
		long ret = bindings.ChannelLiquidities_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

}
} } }
