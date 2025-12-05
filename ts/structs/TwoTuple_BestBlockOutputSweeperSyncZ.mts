
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_BestBlockOutputSweeperSyncZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_BestBlockOutputSweeperSyncZ_free);
	}

	/**
	 * 
	 */
	public get_a(): BestBlock {
		const ret: bigint = bindings.C2Tuple_BestBlockOutputSweeperSyncZ_get_a(this.ptr);
		const ret_hu_conv: BestBlock = new BestBlock(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public get_b(): OutputSweeperSync {
		const ret: bigint = bindings.C2Tuple_BestBlockOutputSweeperSyncZ_get_b(this.ptr);
		const ret_hu_conv: OutputSweeperSync = new OutputSweeperSync(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_BestBlockOutputSweeperSyncZ from the contained elements.
	 */
	public static constructor_new(a: BestBlock, b_best_block: BestBlock, b_broadcaster: BroadcasterInterface, b_fee_estimator: FeeEstimator, b_chain_data_source: Option_FilterZ, b_output_spender: OutputSpender, b_change_destination_source: ChangeDestinationSourceSync, b_kv_store: KVStoreSync, b_logger: Logger): TwoTuple_BestBlockOutputSweeperSyncZ {
		const ret: bigint = bindings.C2Tuple_BestBlockOutputSweeperSyncZ_new(CommonBase.get_ptr_of(a), bindings.OutputSweeperSync_new(CommonBase.get_ptr_of(b_best_block), CommonBase.get_ptr_of(b_broadcaster), CommonBase.get_ptr_of(b_fee_estimator), CommonBase.get_ptr_of(b_chain_data_source), CommonBase.get_ptr_of(b_output_spender), CommonBase.get_ptr_of(b_change_destination_source), CommonBase.get_ptr_of(b_kv_store), CommonBase.get_ptr_of(b_logger)));
		const ret_hu_conv: TwoTuple_BestBlockOutputSweeperSyncZ = new TwoTuple_BestBlockOutputSweeperSyncZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		;
		CommonBase.add_ref_from(ret_hu_conv, b_broadcaster);
		CommonBase.add_ref_from(ret_hu_conv, b_fee_estimator);
		CommonBase.add_ref_from(ret_hu_conv, b_chain_data_source);
		CommonBase.add_ref_from(ret_hu_conv, b_output_spender);
		CommonBase.add_ref_from(ret_hu_conv, b_change_destination_source);
		CommonBase.add_ref_from(ret_hu_conv, b_kv_store);
		CommonBase.add_ref_from(ret_hu_conv, b_logger);
		return ret_hu_conv;
	}

}
