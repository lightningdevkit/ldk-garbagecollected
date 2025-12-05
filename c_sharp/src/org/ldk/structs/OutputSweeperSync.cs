using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


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
public class OutputSweeperSync : CommonBase {
	internal OutputSweeperSync(object _dummy, long ptr) : base(ptr) { }
	~OutputSweeperSync() {
		if (ptr != 0) { bindings.OutputSweeperSync_free(ptr); }
	}

	/**
	 * Constructs a new [`OutputSweeperSync`] instance.
	 * 
	 * If chain data is provided via the [`Confirm`] interface or via filtered blocks, users also
	 * need to register their [`Filter`] implementation via the given `chain_data_source`.
	 */
	public static org.ldk.structs.OutputSweeperSync of(org.ldk.structs.BestBlock best_block, org.ldk.structs.BroadcasterInterface broadcaster, org.ldk.structs.FeeEstimator fee_estimator, org.ldk.structs.Option_FilterZ chain_data_source, org.ldk.structs.OutputSpender output_spender, org.ldk.structs.ChangeDestinationSourceSync change_destination_source, org.ldk.structs.KVStoreSync kv_store, org.ldk.structs.Logger logger) {
		long ret = bindings.OutputSweeperSync_new(best_block.ptr, broadcaster.ptr, fee_estimator.ptr, chain_data_source.ptr, output_spender.ptr, change_destination_source.ptr, kv_store.ptr, logger.ptr);
		GC.KeepAlive(best_block);
		GC.KeepAlive(broadcaster);
		GC.KeepAlive(fee_estimator);
		GC.KeepAlive(chain_data_source);
		GC.KeepAlive(output_spender);
		GC.KeepAlive(change_destination_source);
		GC.KeepAlive(kv_store);
		GC.KeepAlive(logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutputSweeperSync ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutputSweeperSync(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(broadcaster); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(fee_estimator); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(chain_data_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(output_spender); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(change_destination_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(kv_store); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(logger); };
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
	public org.ldk.structs.Result_NoneNoneZ track_spendable_outputs(SpendableOutputDescriptor[] output_descriptors, org.ldk.structs.ChannelId channel_id, bool exclude_static_outputs, org.ldk.structs.Option_u32Z delay_until_height) {
		long ret = bindings.OutputSweeperSync_track_spendable_outputs(this.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(output_descriptors, output_descriptors_conv_27 => output_descriptors_conv_27.ptr)), channel_id == null ? 0 : channel_id.ptr, exclude_static_outputs, delay_until_height.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(output_descriptors);
		GC.KeepAlive(channel_id);
		GC.KeepAlive(exclude_static_outputs);
		GC.KeepAlive(delay_until_height);
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
		long ret = bindings.OutputSweeperSync_tracked_spendable_outputs(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_24_len = InternalUtils.getArrayLength(ret);
		TrackedSpendableOutput[] ret_conv_24_arr = new TrackedSpendableOutput[ret_conv_24_len];
		for (int y = 0; y < ret_conv_24_len; y++) {
			long ret_conv_24 = InternalUtils.getU64ArrayElem(ret, y);
			org.ldk.structs.TrackedSpendableOutput ret_conv_24_hu_conv = null; if (ret_conv_24 < 0 || ret_conv_24 > 4096) { ret_conv_24_hu_conv = new org.ldk.structs.TrackedSpendableOutput(null, ret_conv_24); }
			if (ret_conv_24_hu_conv != null) { ret_conv_24_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_24_arr[y] = ret_conv_24_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_24_arr;
	}

	/**
	 * Gets the latest best block which was connected either via [`Listen`] or [`Confirm`]
	 * interfaces.
	 */
	public org.ldk.structs.BestBlock current_best_block() {
		long ret = bindings.OutputSweeperSync_current_best_block(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BestBlock ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BestBlock(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Regenerates and broadcasts the spending transaction for any outputs that are pending. This method will be a
	 * no-op if a sweep is already pending.
	 * 
	 * Wraps [`OutputSweeper::regenerate_and_broadcast_spend_if_necessary`].
	 */
	public org.ldk.structs.Result_NoneNoneZ regenerate_and_broadcast_spend_if_necessary() {
		long ret = bindings.OutputSweeperSync_regenerate_and_broadcast_spend_if_necessary(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Listen which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Listen must be freed before this_arg is
	 */
	public org.ldk.structs.Listen as_Listen() {
		long ret = bindings.OutputSweeperSync_as_Listen(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Listen ret_hu_conv = new Listen(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Confirm which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Confirm must be freed before this_arg is
	 */
	public org.ldk.structs.Confirm as_Confirm() {
		long ret = bindings.OutputSweeperSync_as_Confirm(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Confirm ret_hu_conv = new Confirm(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
