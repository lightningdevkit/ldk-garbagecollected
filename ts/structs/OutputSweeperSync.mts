
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


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
export class OutputSweeperSync extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.OutputSweeperSync_free);
	}

	/**
	 * Constructs a new [`OutputSweeperSync`] instance.
	 * 
	 * If chain data is provided via the [`Confirm`] interface or via filtered blocks, users also
	 * need to register their [`Filter`] implementation via the given `chain_data_source`.
	 */
	public static constructor_new(best_block: BestBlock, broadcaster: BroadcasterInterface, fee_estimator: FeeEstimator, chain_data_source: Option_FilterZ, output_spender: OutputSpender, change_destination_source: ChangeDestinationSourceSync, kv_store: KVStoreSync, logger: Logger): OutputSweeperSync {
		const ret: bigint = bindings.OutputSweeperSync_new(CommonBase.get_ptr_of(best_block), CommonBase.get_ptr_of(broadcaster), CommonBase.get_ptr_of(fee_estimator), CommonBase.get_ptr_of(chain_data_source), CommonBase.get_ptr_of(output_spender), CommonBase.get_ptr_of(change_destination_source), CommonBase.get_ptr_of(kv_store), CommonBase.get_ptr_of(logger));
		const ret_hu_conv: OutputSweeperSync = new OutputSweeperSync(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, broadcaster);
		CommonBase.add_ref_from(ret_hu_conv, fee_estimator);
		CommonBase.add_ref_from(ret_hu_conv, chain_data_source);
		CommonBase.add_ref_from(ret_hu_conv, output_spender);
		CommonBase.add_ref_from(ret_hu_conv, change_destination_source);
		CommonBase.add_ref_from(ret_hu_conv, kv_store);
		CommonBase.add_ref_from(ret_hu_conv, logger);
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
	public track_spendable_outputs(output_descriptors: SpendableOutputDescriptor[], channel_id: ChannelId|null, exclude_static_outputs: boolean, delay_until_height: Option_u32Z): Result_NoneNoneZ {
		const ret: bigint = bindings.OutputSweeperSync_track_spendable_outputs(this.ptr, bindings.encodeUint64Array(output_descriptors.map(output_descriptors_conv_27 => CommonBase.get_ptr_of(output_descriptors_conv_27))), channel_id == null ? 0n : CommonBase.get_ptr_of(channel_id), exclude_static_outputs, CommonBase.get_ptr_of(delay_until_height));
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns a list of the currently tracked spendable outputs.
	 * 
	 * Wraps [`OutputSweeper::tracked_spendable_outputs`].
	 */
	public tracked_spendable_outputs(): TrackedSpendableOutput[] {
		const ret: number = bindings.OutputSweeperSync_tracked_spendable_outputs(this.ptr);
		const ret_conv_24_len: number = bindings.getArrayLength(ret);
		const ret_conv_24_arr: TrackedSpendableOutput[] = new Array(ret_conv_24_len).fill(null);
		for (var y = 0; y < ret_conv_24_len; y++) {
			const ret_conv_24: bigint = bindings.getU64ArrayElem(ret, y);
			const ret_conv_24_hu_conv: TrackedSpendableOutput = new TrackedSpendableOutput(null, ret_conv_24);
			CommonBase.add_ref_from(ret_conv_24_hu_conv, this);
			ret_conv_24_arr[y] = ret_conv_24_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_24_arr;
	}

	/**
	 * Gets the latest best block which was connected either via [`Listen`] or [`Confirm`]
	 * interfaces.
	 */
	public current_best_block(): BestBlock {
		const ret: bigint = bindings.OutputSweeperSync_current_best_block(this.ptr);
		const ret_hu_conv: BestBlock = new BestBlock(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Regenerates and broadcasts the spending transaction for any outputs that are pending. This method will be a
	 * no-op if a sweep is already pending.
	 * 
	 * Wraps [`OutputSweeper::regenerate_and_broadcast_spend_if_necessary`].
	 */
	public regenerate_and_broadcast_spend_if_necessary(): Result_NoneNoneZ {
		const ret: bigint = bindings.OutputSweeperSync_regenerate_and_broadcast_spend_if_necessary(this.ptr);
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Listen which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Listen must be freed before this_arg is
	 */
	public as_Listen(): Listen {
		const ret: bigint = bindings.OutputSweeperSync_as_Listen(this.ptr);
		const ret_hu_conv: Listen = new Listen(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Confirm which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Confirm must be freed before this_arg is
	 */
	public as_Confirm(): Confirm {
		const ret: bigint = bindings.OutputSweeperSync_as_Confirm(this.ptr);
		const ret_hu_conv: Confirm = new Confirm(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
