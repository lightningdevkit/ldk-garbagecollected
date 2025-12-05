
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A wrapper around a [`KVStoreSync`] that implements the [`KVStore`] trait. It is not necessary to use this type
 * directly.
 */
export class KVStoreSyncWrapper extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.KVStoreSyncWrapper_free);
	}

	public get_a(): KVStoreSync {
		const ret: bigint = bindings.KVStoreSyncWrapper_get_a(this.ptr);
		const ret_hu_conv: KVStoreSync = new KVStoreSync(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public set_a(val: KVStoreSync): void {
		bindings.KVStoreSyncWrapper_set_a(this.ptr, CommonBase.get_ptr_of(val));
		CommonBase.add_ref_from(this, val);
	}

	/**
	 * Constructs a new KVStoreSyncWrapper given each field
	 */
	public static constructor_new(a_arg: KVStoreSync): KVStoreSyncWrapper {
		const ret: bigint = bindings.KVStoreSyncWrapper_new(CommonBase.get_ptr_of(a_arg));
		const ret_hu_conv: KVStoreSyncWrapper = new KVStoreSyncWrapper(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, a_arg);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.KVStoreSyncWrapper_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the KVStoreSyncWrapper
	 */
	public clone(): KVStoreSyncWrapper {
		const ret: bigint = bindings.KVStoreSyncWrapper_clone(this.ptr);
		const ret_hu_conv: KVStoreSyncWrapper = new KVStoreSyncWrapper(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
