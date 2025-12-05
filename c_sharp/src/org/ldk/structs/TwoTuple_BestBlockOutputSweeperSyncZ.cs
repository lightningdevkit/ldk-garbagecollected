using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple_BestBlockOutputSweeperSyncZ : CommonBase {
	internal TwoTuple_BestBlockOutputSweeperSyncZ(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple_BestBlockOutputSweeperSyncZ() {
		if (ptr != 0) { bindings.C2Tuple_BestBlockOutputSweeperSyncZ_free(ptr); }
	}

	/**
	 * 
	 */
	public org.ldk.structs.BestBlock get_a() {
		long ret = bindings.C2Tuple_BestBlockOutputSweeperSyncZ_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BestBlock ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BestBlock(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public org.ldk.structs.OutputSweeperSync get_b() {
		long ret = bindings.C2Tuple_BestBlockOutputSweeperSyncZ_get_b(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutputSweeperSync ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutputSweeperSync(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_BestBlockOutputSweeperSyncZ from the contained elements.
	 */
	public static org.ldk.structs.TwoTuple_BestBlockOutputSweeperSyncZ of(org.ldk.structs.BestBlock a, BestBlock b_best_block, BroadcasterInterface b_broadcaster, FeeEstimator b_fee_estimator, Option_FilterZ b_chain_data_source, OutputSpender b_output_spender, ChangeDestinationSourceSync b_change_destination_source, KVStoreSync b_kv_store, Logger b_logger) {
		long ret = bindings.C2Tuple_BestBlockOutputSweeperSyncZ_new(a.ptr, bindings.OutputSweeperSync_new(b_best_block.ptr, b_broadcaster.ptr, b_fee_estimator.ptr, b_chain_data_source.ptr, b_output_spender.ptr, b_change_destination_source.ptr, b_kv_store.ptr, b_logger.ptr));
		GC.KeepAlive(a);
		GC.KeepAlive(b_best_block);
		GC.KeepAlive(b_broadcaster);
		GC.KeepAlive(b_fee_estimator);
		GC.KeepAlive(b_chain_data_source);
		GC.KeepAlive(b_output_spender);
		GC.KeepAlive(b_change_destination_source);
		GC.KeepAlive(b_kv_store);
		GC.KeepAlive(b_logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_BestBlockOutputSweeperSyncZ ret_hu_conv = new TwoTuple_BestBlockOutputSweeperSyncZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		;
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_broadcaster); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_fee_estimator); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_chain_data_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_output_spender); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_change_destination_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_kv_store); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b_logger); };
		return ret_hu_conv;
	}

}
} } }
