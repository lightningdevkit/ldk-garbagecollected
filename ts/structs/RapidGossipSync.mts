
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * The main Rapid Gossip Sync object.
 * 
 * See [crate-level documentation] for usage.
 * 
 * [crate-level documentation]: crate
 */
export class RapidGossipSync extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.RapidGossipSync_free);
	}

	/**
	 * Instantiate a new [`RapidGossipSync`] instance.
	 */
	public static constructor_new(network_graph: NetworkGraph, logger: Logger): RapidGossipSync {
		const ret: bigint = bindings.RapidGossipSync_new(CommonBase.get_ptr_of(network_graph), CommonBase.get_ptr_of(logger));
		const ret_hu_conv: RapidGossipSync = new RapidGossipSync(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, network_graph);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		return ret_hu_conv;
	}

	/**
	 * Update network graph from binary data.
	 * Returns the last sync timestamp to be used the next time rapid sync data is queried.
	 * 
	 * `update_data`: `&[u8]` binary stream that comprises the update data
	 * `current_time_unix`: `Option<u64>` optional current timestamp to verify data age
	 */
	public update_network_graph_no_std(update_data: Uint8Array, current_time_unix: Option_u64Z): Result_u32GraphSyncErrorZ {
		const ret: bigint = bindings.RapidGossipSync_update_network_graph_no_std(this.ptr, bindings.encodeUint8Array(update_data), CommonBase.get_ptr_of(current_time_unix));
		const ret_hu_conv: Result_u32GraphSyncErrorZ = Result_u32GraphSyncErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns whether a rapid gossip sync has completed at least once.
	 */
	public is_initial_sync_complete(): boolean {
		const ret: boolean = bindings.RapidGossipSync_is_initial_sync_complete(this.ptr);
		return ret;
	}

}
