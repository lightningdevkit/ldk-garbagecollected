using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple_BlockHashChannelManagerZ : CommonBase {
	internal TwoTuple_BlockHashChannelManagerZ(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple_BlockHashChannelManagerZ() {
		if (ptr != 0) { bindings.C2Tuple_BlockHashChannelManagerZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		byte[] ret = bindings.C2Tuple_BlockHashChannelManagerZ_get_a(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * 
	 */
	public ChannelManager get_b() {
		long ret = bindings.C2Tuple_BlockHashChannelManagerZ_get_b(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelManager ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelManager(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_BlockHashChannelManagerZ from the contained elements.
	 */
	public static TwoTuple_BlockHashChannelManagerZ of(byte[] a, FeeEstimator b_fee_est, Watch b_chain_monitor, BroadcasterInterface b_tx_broadcaster, Logger b_logger, KeysInterface b_keys_manager, UserConfig b_config, ChainParameters b_params) {
		long ret = bindings.C2Tuple_BlockHashChannelManagerZ_new(InternalUtils.check_arr_len(a, 32), bindings.ChannelManager_new(b_fee_est == null ? 0 : b_fee_est.ptr, b_chain_monitor == null ? 0 : b_chain_monitor.ptr, b_tx_broadcaster == null ? 0 : b_tx_broadcaster.ptr, b_logger == null ? 0 : b_logger.ptr, b_keys_manager == null ? 0 : b_keys_manager.ptr, b_config == null ? 0 : b_config.ptr, b_params == null ? 0 : b_params.ptr));
		GC.KeepAlive(a);
		GC.KeepAlive(b_fee_est);
		GC.KeepAlive(b_chain_monitor);
		GC.KeepAlive(b_tx_broadcaster);
		GC.KeepAlive(b_logger);
		GC.KeepAlive(b_keys_manager);
		GC.KeepAlive(b_config);
		GC.KeepAlive(b_params);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_BlockHashChannelManagerZ ret_hu_conv = new TwoTuple_BlockHashChannelManagerZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_fee_est); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_chain_monitor); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_tx_broadcaster); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_logger); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_keys_manager); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_config); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_params); };
		return ret_hu_conv;
	}

}
} } }
