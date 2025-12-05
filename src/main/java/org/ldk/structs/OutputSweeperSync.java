package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A utility that keeps track of [`SpendableOutputDescriptor`]s, persists them in a given
 * [`KVStoreSync`] and regularly retries sweeping them based on a callback given to the constructor
 * methods.
 * 
 * Users should call [`Self::track_spendable_outputs`] for any [`SpendableOutputDescriptor`]s
 * received via [`Event::SpendableOutputs`].
 * 
 * This needs to be notified of chain state changes either via its [`Listen`] or [`Confirm`]
 * implementation and hence has to be connected with the utilized chain data sources.
 * 
 * If chain data is provided via the [`Confirm`] interface or via filtered blocks, users are
 * required to give their chain data sources (i.e., [`Filter`] implementation) to the respective
 * constructor.
 * 
 * For an asynchronous version of this struct, see [`OutputSweeper`].
 * 
 * [`Event::SpendableOutputs`]: crate::events::Event::SpendableOutputs
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OutputSweeperSync extends CommonBase {
	OutputSweeperSync(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.OutputSweeperSync_free(ptr); }
	}

	/**
	 * Constructs a new [`OutputSweeperSync`] instance.
	 * 
	 * If chain data is provided via the [`Confirm`] interface or via filtered blocks, users also
	 * need to register their [`Filter`] implementation via the given `chain_data_source`.
	 */
	public static OutputSweeperSync of(org.ldk.structs.BestBlock best_block, org.ldk.structs.BroadcasterInterface broadcaster, org.ldk.structs.FeeEstimator fee_estimator, org.ldk.structs.Option_FilterZ chain_data_source, org.ldk.structs.OutputSpender output_spender, org.ldk.structs.ChangeDestinationSourceSync change_destination_source, org.ldk.structs.KVStoreSync kv_store, org.ldk.structs.Logger logger) {
		long ret = bindings.OutputSweeperSync_new(best_block.ptr, broadcaster.ptr, fee_estimator.ptr, chain_data_source.ptr, output_spender.ptr, change_destination_source.ptr, kv_store.ptr, logger.ptr);
		Reference.reachabilityFence(best_block);
		Reference.reachabilityFence(broadcaster);
		Reference.reachabilityFence(fee_estimator);
		Reference.reachabilityFence(chain_data_source);
		Reference.reachabilityFence(output_spender);
		Reference.reachabilityFence(change_destination_source);
		Reference.reachabilityFence(kv_store);
		Reference.reachabilityFence(logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutputSweeperSync ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutputSweeperSync(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(broadcaster); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(fee_estimator); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(chain_data_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(output_spender); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(change_destination_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(kv_store); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(logger); };
		return ret_hu_conv;
	}

	/**
	 * Tells the sweeper to track the given outputs descriptors.
	 * 
	 * Usually, this should be called based on the values emitted by the
	 * [`Event::SpendableOutputs`].
	 * 
	 * The given `exclude_static_outputs` flag controls whether the sweeper will filter out
	 * [`SpendableOutputDescriptor::StaticOutput`]s, which may be handled directly by the on-chain
	 * wallet implementation.
	 * 
	 * If `delay_until_height` is set, we will delay the spending until the respective block
	 * height is reached. This can be used to batch spends, e.g., to reduce on-chain fees.
	 * 
	 * Returns `Err` on persistence failure, in which case the call may be safely retried.
	 * 
	 * [`Event::SpendableOutputs`]: crate::events::Event::SpendableOutputs
	 * 
	 * Note that channel_id (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public Result_NoneNoneZ track_spendable_outputs(SpendableOutputDescriptor[] output_descriptors, @Nullable org.ldk.structs.ChannelId channel_id, boolean exclude_static_outputs, org.ldk.structs.Option_u32Z delay_until_height) {
		long ret = bindings.OutputSweeperSync_track_spendable_outputs(this.ptr, output_descriptors != null ? Arrays.stream(output_descriptors).mapToLong(output_descriptors_conv_27 -> output_descriptors_conv_27.ptr).toArray() : null, channel_id == null ? 0 : channel_id.ptr, exclude_static_outputs, delay_until_height.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(output_descriptors);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(exclude_static_outputs);
		Reference.reachabilityFence(delay_until_height);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns a list of the currently tracked spendable outputs.
	 * 
	 * Wraps [`OutputSweeper::tracked_spendable_outputs`].
	 */
	public TrackedSpendableOutput[] tracked_spendable_outputs() {
		long[] ret = bindings.OutputSweeperSync_tracked_spendable_outputs(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_24_len = ret.length;
		TrackedSpendableOutput[] ret_conv_24_arr = new TrackedSpendableOutput[ret_conv_24_len];
		for (int y = 0; y < ret_conv_24_len; y++) {
			long ret_conv_24 = ret[y];
			org.ldk.structs.TrackedSpendableOutput ret_conv_24_hu_conv = null; if (ret_conv_24 < 0 || ret_conv_24 > 4096) { ret_conv_24_hu_conv = new org.ldk.structs.TrackedSpendableOutput(null, ret_conv_24); }
			if (ret_conv_24_hu_conv != null) { ret_conv_24_hu_conv.ptrs_to.add(this); };
			ret_conv_24_arr[y] = ret_conv_24_hu_conv;
		}
		return ret_conv_24_arr;
	}

	/**
	 * Gets the latest best block which was connected either via [`Listen`] or [`Confirm`]
	 * interfaces.
	 */
	public BestBlock current_best_block() {
		long ret = bindings.OutputSweeperSync_current_best_block(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BestBlock ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BestBlock(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Regenerates and broadcasts the spending transaction for any outputs that are pending. This method will be a
	 * no-op if a sweep is already pending.
	 * 
	 * Wraps [`OutputSweeper::regenerate_and_broadcast_spend_if_necessary`].
	 */
	public Result_NoneNoneZ regenerate_and_broadcast_spend_if_necessary() {
		long ret = bindings.OutputSweeperSync_regenerate_and_broadcast_spend_if_necessary(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Listen which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Listen must be freed before this_arg is
	 */
	public Listen as_Listen() {
		long ret = bindings.OutputSweeperSync_as_Listen(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Listen ret_hu_conv = new Listen(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Confirm which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Confirm must be freed before this_arg is
	 */
	public Confirm as_Confirm() {
		long ret = bindings.OutputSweeperSync_as_Confirm(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Confirm ret_hu_conv = new Confirm(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
