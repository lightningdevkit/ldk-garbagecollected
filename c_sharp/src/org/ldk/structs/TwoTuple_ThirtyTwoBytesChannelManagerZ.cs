using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple_ThirtyTwoBytesChannelManagerZ : CommonBase {
	internal TwoTuple_ThirtyTwoBytesChannelManagerZ(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple_ThirtyTwoBytesChannelManagerZ() {
		if (ptr != 0) { bindings.C2Tuple_ThirtyTwoBytesChannelManagerZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		long ret = bindings.C2Tuple_ThirtyTwoBytesChannelManagerZ_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * 
	 */
	public ChannelManager get_b() {
		long ret = bindings.C2Tuple_ThirtyTwoBytesChannelManagerZ_get_b(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelManager ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelManager(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_ThirtyTwoBytesChannelManagerZ from the contained elements.
	 */
	public static TwoTuple_ThirtyTwoBytesChannelManagerZ of(byte[] a, FeeEstimator b_fee_est, Watch b_chain_monitor, BroadcasterInterface b_tx_broadcaster, Router b_router, Logger b_logger, EntropySource b_entropy_source, NodeSigner b_node_signer, SignerProvider b_signer_provider, UserConfig b_config, ChainParameters b_params, int b_current_timestamp) {
		long ret = bindings.C2Tuple_ThirtyTwoBytesChannelManagerZ_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(a, 32)), bindings.ChannelManager_new(b_fee_est.ptr, b_chain_monitor.ptr, b_tx_broadcaster.ptr, b_router.ptr, b_logger.ptr, b_entropy_source.ptr, b_node_signer.ptr, b_signer_provider.ptr, b_config == null ? 0 : b_config.ptr, b_params == null ? 0 : b_params.ptr, b_current_timestamp));
		GC.KeepAlive(a);
		GC.KeepAlive(b_fee_est);
		GC.KeepAlive(b_chain_monitor);
		GC.KeepAlive(b_tx_broadcaster);
		GC.KeepAlive(b_router);
		GC.KeepAlive(b_logger);
		GC.KeepAlive(b_entropy_source);
		GC.KeepAlive(b_node_signer);
		GC.KeepAlive(b_signer_provider);
		GC.KeepAlive(b_config);
		GC.KeepAlive(b_params);
		GC.KeepAlive(b_current_timestamp);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_ThirtyTwoBytesChannelManagerZ ret_hu_conv = new TwoTuple_ThirtyTwoBytesChannelManagerZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_fee_est); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_chain_monitor); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_tx_broadcaster); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_router); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_logger); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_entropy_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_node_signer); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_signer_provider); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_config); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_params); };
		return ret_hu_conv;
	}

}
} } }
