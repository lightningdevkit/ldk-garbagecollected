

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of KVStoreSync */
export interface KVStoreSyncInterface {
	/**Returns the data stored for the given `primary_namespace`, `secondary_namespace`, and
	 * `key`.
	 * 
	 * Returns an [`ErrorKind::NotFound`] if the given `key` could not be found in the given
	 * `primary_namespace` and `secondary_namespace`.
	 * 
	 * [`ErrorKind::NotFound`]: io::ErrorKind::NotFound
	 */
	read(primary_namespace: string, secondary_namespace: string, key: string): Result_CVec_u8ZIOErrorZ;
	/**Persists the given data under the given `key`.
	 * 
	 * Will create the given `primary_namespace` and `secondary_namespace` if not already present in the store.
	 */
	write(primary_namespace: string, secondary_namespace: string, key: string, buf: Uint8Array): Result_NoneIOErrorZ;
	/**Removes any data that had previously been persisted under the given `key`.
	 * 
	 * If the `lazy` flag is set to `true`, the backend implementation might choose to lazily
	 * remove the given `key` at some point in time after the method returns, e.g., as part of an
	 * eventual batch deletion of multiple keys. As a consequence, subsequent calls to
	 * [`KVStoreSync::list`] might include the removed key until the changes are actually persisted.
	 * 
	 * Note that while setting the `lazy` flag reduces the I/O burden of multiple subsequent
	 * `remove` calls, it also influences the atomicity guarantees as lazy `remove`s could
	 * potentially get lost on crash after the method returns. Therefore, this flag should only be
	 * set for `remove` operations that can be safely replayed at a later time.
	 * 
	 * All removal operations must complete in a consistent total order with [`Self::write`]s
	 * to the same key. Whether a removal operation is `lazy` or not, [`Self::write`] operations
	 * to the same key which occur before a removal completes must cancel/overwrite the pending
	 * removal.
	 * 
	 * Returns successfully if no data will be stored for the given `primary_namespace`,
	 * `secondary_namespace`, and `key`, independently of whether it was present before its
	 * invokation or not.
	 */
	remove(primary_namespace: string, secondary_namespace: string, key: string, lazy: boolean): Result_NoneIOErrorZ;
	/**Returns a list of keys that are stored under the given `secondary_namespace` in
	 * `primary_namespace`.
	 * 
	 * Returns the keys in arbitrary order, so users requiring a particular order need to sort the
	 * returned keys. Returns an empty list if `primary_namespace` or `secondary_namespace` is unknown.
	 */
	list(primary_namespace: string, secondary_namespace: string): Result_CVec_StrZIOErrorZ;
}

class LDKKVStoreSyncHolder {
	held: KVStoreSync|null = null;
}

/**
 * Provides an interface that allows storage and retrieval of persisted values that are associated
 * with given keys.
 * 
 * In order to avoid collisions the key space is segmented based on the given `primary_namespace`s
 * and `secondary_namespace`s. Implementations of this trait are free to handle them in different
 * ways, as long as per-namespace key uniqueness is asserted.
 * 
 * Keys and namespaces are required to be valid ASCII strings in the range of
 * [`KVSTORE_NAMESPACE_KEY_ALPHABET`] and no longer than [`KVSTORE_NAMESPACE_KEY_MAX_LEN`]. Empty
 * primary namespaces and secondary namespaces (`\"\"`) are assumed to be a valid, however, if
 * `primary_namespace` is empty, `secondary_namespace` is required to be empty, too. This means
 * that concerns should always be separated by primary namespace first, before secondary
 * namespaces are used. While the number of primary namespaces will be relatively small and is
 * determined at compile time, there may be many secondary namespaces per primary namespace. Note
 * that per-namespace uniqueness needs to also hold for keys *and* namespaces in any given
 * namespace, i.e., conflicts between keys and equally named
 * primary namespaces/secondary namespaces must be avoided.
 * 
 * Note:** Users migrating custom persistence backends from the pre-v0.0.117 `KVStorePersister`
 * interface can use a concatenation of `[{primary_namespace}/[{secondary_namespace}/]]{key}` to
 * recover a `key` compatible with the data model previously assumed by `KVStorePersister::persist`.
 * 
 * For an asynchronous version of this trait, see [`KVStore`].
 */
export class KVStoreSync extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKKVStoreSync|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.KVStoreSync_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of KVStoreSync from a given implementation */
	public static new_impl(arg: KVStoreSyncInterface): KVStoreSync {
		const impl_holder: LDKKVStoreSyncHolder = new LDKKVStoreSyncHolder();
		let structImplementation = {
			read (primary_namespace: number, secondary_namespace: number, key: number): bigint {
				const primary_namespace_conv: string = bindings.decodeString(primary_namespace);
				const secondary_namespace_conv: string = bindings.decodeString(secondary_namespace);
				const key_conv: string = bindings.decodeString(key);
				const ret: Result_CVec_u8ZIOErrorZ = arg.read(primary_namespace_conv, secondary_namespace_conv, key_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			write (primary_namespace: number, secondary_namespace: number, key: number, buf: number): bigint {
				const primary_namespace_conv: string = bindings.decodeString(primary_namespace);
				const secondary_namespace_conv: string = bindings.decodeString(secondary_namespace);
				const key_conv: string = bindings.decodeString(key);
				const buf_conv: Uint8Array = bindings.decodeUint8Array(buf);
				const ret: Result_NoneIOErrorZ = arg.write(primary_namespace_conv, secondary_namespace_conv, key_conv, buf_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			remove (primary_namespace: number, secondary_namespace: number, key: number, lazy: boolean): bigint {
				const primary_namespace_conv: string = bindings.decodeString(primary_namespace);
				const secondary_namespace_conv: string = bindings.decodeString(secondary_namespace);
				const key_conv: string = bindings.decodeString(key);
				const ret: Result_NoneIOErrorZ = arg.remove(primary_namespace_conv, secondary_namespace_conv, key_conv, lazy);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			list (primary_namespace: number, secondary_namespace: number): bigint {
				const primary_namespace_conv: string = bindings.decodeString(primary_namespace);
				const secondary_namespace_conv: string = bindings.decodeString(secondary_namespace);
				const ret: Result_CVec_StrZIOErrorZ = arg.list(primary_namespace_conv, secondary_namespace_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
		} as bindings.LDKKVStoreSync;
		const ptr_idx: [bigint, number] = bindings.LDKKVStoreSync_new(structImplementation);

		impl_holder.held = new KVStoreSync(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Returns the data stored for the given `primary_namespace`, `secondary_namespace`, and
	 * `key`.
	 * 
	 * Returns an [`ErrorKind::NotFound`] if the given `key` could not be found in the given
	 * `primary_namespace` and `secondary_namespace`.
	 * 
	 * [`ErrorKind::NotFound`]: io::ErrorKind::NotFound
	 */
	public read(primary_namespace: string, secondary_namespace: string, key: string): Result_CVec_u8ZIOErrorZ {
		const ret: bigint = bindings.KVStoreSync_read(this.ptr, bindings.encodeString(primary_namespace), bindings.encodeString(secondary_namespace), bindings.encodeString(key));
		const ret_hu_conv: Result_CVec_u8ZIOErrorZ = Result_CVec_u8ZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Persists the given data under the given `key`.
	 * 
	 * Will create the given `primary_namespace` and `secondary_namespace` if not already present in the store.
	 */
	public write(primary_namespace: string, secondary_namespace: string, key: string, buf: Uint8Array): Result_NoneIOErrorZ {
		const ret: bigint = bindings.KVStoreSync_write(this.ptr, bindings.encodeString(primary_namespace), bindings.encodeString(secondary_namespace), bindings.encodeString(key), bindings.encodeUint8Array(buf));
		const ret_hu_conv: Result_NoneIOErrorZ = Result_NoneIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Removes any data that had previously been persisted under the given `key`.
	 * 
	 * If the `lazy` flag is set to `true`, the backend implementation might choose to lazily
	 * remove the given `key` at some point in time after the method returns, e.g., as part of an
	 * eventual batch deletion of multiple keys. As a consequence, subsequent calls to
	 * [`KVStoreSync::list`] might include the removed key until the changes are actually persisted.
	 * 
	 * Note that while setting the `lazy` flag reduces the I/O burden of multiple subsequent
	 * `remove` calls, it also influences the atomicity guarantees as lazy `remove`s could
	 * potentially get lost on crash after the method returns. Therefore, this flag should only be
	 * set for `remove` operations that can be safely replayed at a later time.
	 * 
	 * All removal operations must complete in a consistent total order with [`Self::write`]s
	 * to the same key. Whether a removal operation is `lazy` or not, [`Self::write`] operations
	 * to the same key which occur before a removal completes must cancel/overwrite the pending
	 * removal.
	 * 
	 * Returns successfully if no data will be stored for the given `primary_namespace`,
	 * `secondary_namespace`, and `key`, independently of whether it was present before its
	 * invokation or not.
	 */
	public remove(primary_namespace: string, secondary_namespace: string, key: string, lazy: boolean): Result_NoneIOErrorZ {
		const ret: bigint = bindings.KVStoreSync_remove(this.ptr, bindings.encodeString(primary_namespace), bindings.encodeString(secondary_namespace), bindings.encodeString(key), lazy);
		const ret_hu_conv: Result_NoneIOErrorZ = Result_NoneIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns a list of keys that are stored under the given `secondary_namespace` in
	 * `primary_namespace`.
	 * 
	 * Returns the keys in arbitrary order, so users requiring a particular order need to sort the
	 * returned keys. Returns an empty list if `primary_namespace` or `secondary_namespace` is unknown.
	 */
	public list(primary_namespace: string, secondary_namespace: string): Result_CVec_StrZIOErrorZ {
		const ret: bigint = bindings.KVStoreSync_list(this.ptr, bindings.encodeString(primary_namespace), bindings.encodeString(secondary_namespace));
		const ret_hu_conv: Result_CVec_StrZIOErrorZ = Result_CVec_StrZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.KVStoreSync_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of a KVStoreSync
	 */
	public clone(): KVStoreSync {
		const ret: bigint = bindings.KVStoreSync_clone(this.ptr);
		const ret_hu_conv: KVStoreSync = new KVStoreSync(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
