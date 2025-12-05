package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A Tuple
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class TwoTuple_BestBlockOutputSweeperSyncZ extends CommonBase {
	TwoTuple_BestBlockOutputSweeperSyncZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C2Tuple_BestBlockOutputSweeperSyncZ_free(ptr); }
	}

	/**
	 * 
	 */
	public BestBlock get_a() {
		long ret = bindings.C2Tuple_BestBlockOutputSweeperSyncZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BestBlock ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BestBlock(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public OutputSweeperSync get_b() {
		long ret = bindings.C2Tuple_BestBlockOutputSweeperSyncZ_get_b(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutputSweeperSync ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutputSweeperSync(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_BestBlockOutputSweeperSyncZ from the contained elements.
	 */
	public static TwoTuple_BestBlockOutputSweeperSyncZ of(org.ldk.structs.BestBlock a, BestBlock b_best_block, BroadcasterInterface b_broadcaster, FeeEstimator b_fee_estimator, Option_FilterZ b_chain_data_source, OutputSpender b_output_spender, ChangeDestinationSourceSync b_change_destination_source, KVStoreSync b_kv_store, Logger b_logger) {
		long ret = bindings.C2Tuple_BestBlockOutputSweeperSyncZ_new(a.ptr, bindings.OutputSweeperSync_new(b_best_block.ptr, b_broadcaster.ptr, b_fee_estimator.ptr, b_chain_data_source.ptr, b_output_spender.ptr, b_change_destination_source.ptr, b_kv_store.ptr, b_logger.ptr));
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b_best_block);
		Reference.reachabilityFence(b_broadcaster);
		Reference.reachabilityFence(b_fee_estimator);
		Reference.reachabilityFence(b_chain_data_source);
		Reference.reachabilityFence(b_output_spender);
		Reference.reachabilityFence(b_change_destination_source);
		Reference.reachabilityFence(b_kv_store);
		Reference.reachabilityFence(b_logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_BestBlockOutputSweeperSyncZ ret_hu_conv = new TwoTuple_BestBlockOutputSweeperSyncZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		;
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(b_broadcaster); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(b_fee_estimator); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(b_chain_data_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(b_output_spender); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(b_change_destination_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(b_kv_store); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(b_logger); };
		return ret_hu_conv;
	}

}
