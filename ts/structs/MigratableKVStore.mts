

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of MigratableKVStore */
export interface MigratableKVStoreInterface {
	/**Returns *all* known keys as a list of `primary_namespace`, `secondary_namespace`, `key` tuples.
	 * 
	 * This is useful for migrating data from [`KVStoreSync`] implementation to [`KVStoreSync`]
	 * implementation.
	 * 
	 * Must exhaustively return all entries known to the store to ensure no data is missed, but
	 * may return the items in arbitrary order.
	 */
	list_all_keys(): Result_CVec_C3Tuple_StrStrStrZZIOErrorZ;
}

class LDKMigratableKVStoreHolder {
	held: MigratableKVStore|null = null;
}

/**
 * Provides additional interface methods that are required for [`KVStore`]-to-[`KVStore`]
 * data migration.
 */
export class MigratableKVStore extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKMigratableKVStore|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.MigratableKVStore_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of MigratableKVStore from a given implementation */
	public static new_impl(arg: MigratableKVStoreInterface, kVStoreSync_impl: KVStoreSyncInterface): MigratableKVStore {
		const impl_holder: LDKMigratableKVStoreHolder = new LDKMigratableKVStoreHolder();
		let structImplementation = {
			list_all_keys (): bigint {
				const ret: Result_CVec_C3Tuple_StrStrStrZZIOErrorZ = arg.list_all_keys();
				const result: bigint = ret.clone_ptr();
				return result;
			},
		} as bindings.LDKMigratableKVStore;
		const kVStoreSync = KVStoreSync.new_impl(kVStoreSync_impl);
		const ptr_idx: [bigint, number] = bindings.LDKMigratableKVStore_new(structImplementation, kVStoreSync.instance_idx!);

		impl_holder.held = new MigratableKVStore(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		impl_holder.held.ptrs_to.push(kVStoreSync);
		return impl_holder.held!;
	}

	/**
	 * Returns *all* known keys as a list of `primary_namespace`, `secondary_namespace`, `key` tuples.
	 * 
	 * This is useful for migrating data from [`KVStoreSync`] implementation to [`KVStoreSync`]
	 * implementation.
	 * 
	 * Must exhaustively return all entries known to the store to ensure no data is missed, but
	 * may return the items in arbitrary order.
	 */
	public list_all_keys(): Result_CVec_C3Tuple_StrStrStrZZIOErrorZ {
		const ret: bigint = bindings.MigratableKVStore_list_all_keys(this.ptr);
		const ret_hu_conv: Result_CVec_C3Tuple_StrStrStrZZIOErrorZ = Result_CVec_C3Tuple_StrStrStrZZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.MigratableKVStore_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of a MigratableKVStore
	 */
	public clone(): MigratableKVStore {
		const ret: bigint = bindings.MigratableKVStore_clone(this.ptr);
		const ret_hu_conv: MigratableKVStore = new MigratableKVStore(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
