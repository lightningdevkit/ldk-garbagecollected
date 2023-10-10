package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

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
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class KVStore extends CommonBase {
	final bindings.LDKKVStore bindings_instance;
	KVStore(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private KVStore(bindings.LDKKVStore arg) {
		super(bindings.LDKKVStore_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.KVStore_free(ptr); } super.finalize();
	}
	/**
	 * Destroys the object, freeing associated resources. After this call, any access
	 * to this object may result in a SEGFAULT or worse.
	 *
	 * You should generally NEVER call this method. You should let the garbage collector
	 * do this for you when it finalizes objects. However, it may be useful for types
	 * which represent locks and should be closed immediately to avoid holding locks
	 * until the GC runs.
	 */
	public void destroy() {
		if (ptr != 0) { bindings.KVStore_free(ptr); }
		ptr = 0;
	}
	public static interface KVStoreInterface {
		/**
		 * Returns the data stored for the given `primary_namespace`, `secondary_namespace`, and
		 * `key`.
		 * 
		 * Returns an [`ErrorKind::NotFound`] if the given `key` could not be found in the given
		 * `primary_namespace` and `secondary_namespace`.
		 * 
		 * [`ErrorKind::NotFound`]: io::ErrorKind::NotFound
		 */
		Result_CVec_u8ZIOErrorZ read(String primary_namespace, String secondary_namespace, String key);
		/**
		 * Persists the given data under the given `key`.
		 * 
		 * Will create the given `primary_namespace` and `secondary_namespace` if not already present
		 * in the store.
		 */
		Result_NoneIOErrorZ write(String primary_namespace, String secondary_namespace, String key, byte[] buf);
		/**
		 * Removes any data that had previously been persisted under the given `key`.
		 * 
		 * If the `lazy` flag is set to `true`, the backend implementation might choose to lazily
		 * remove the given `key` at some point in time after the method returns, e.g., as part of an
		 * eventual batch deletion of multiple keys. As a consequence, subsequent calls to
		 * [`KVStore::list`] might include the removed key until the changes are actually persisted.
		 * 
		 * Note that while setting the `lazy` flag reduces the I/O burden of multiple subsequent
		 * `remove` calls, it also influences the atomicity guarantees as lazy `remove`s could
		 * potentially get lost on crash after the method returns. Therefore, this flag should only be
		 * set for `remove` operations that can be safely replayed at a later time.
		 * 
		 * Returns successfully if no data will be stored for the given `primary_namespace`,
		 * `secondary_namespace`, and `key`, independently of whether it was present before its
		 * invokation or not.
		 */
		Result_NoneIOErrorZ remove(String primary_namespace, String secondary_namespace, String key, boolean lazy);
		/**
		 * Returns a list of keys that are stored under the given `secondary_namespace` in
		 * `primary_namespace`.
		 * 
		 * Returns the keys in arbitrary order, so users requiring a particular order need to sort the
		 * returned keys. Returns an empty list if `primary_namespace` or `secondary_namespace` is unknown.
		 */
		Result_CVec_StrZIOErrorZ list(String primary_namespace, String secondary_namespace);
	}
	private static class LDKKVStoreHolder { KVStore held; }
	public static KVStore new_impl(KVStoreInterface arg) {
		final LDKKVStoreHolder impl_holder = new LDKKVStoreHolder();
		impl_holder.held = new KVStore(new bindings.LDKKVStore() {
			@Override public long read(String primary_namespace, String secondary_namespace, String key) {
				Result_CVec_u8ZIOErrorZ ret = arg.read(primary_namespace, secondary_namespace, key);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long write(String primary_namespace, String secondary_namespace, String key, byte[] buf) {
				Result_NoneIOErrorZ ret = arg.write(primary_namespace, secondary_namespace, key, buf);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long remove(String primary_namespace, String secondary_namespace, String key, boolean lazy) {
				Result_NoneIOErrorZ ret = arg.remove(primary_namespace, secondary_namespace, key, lazy);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long list(String primary_namespace, String secondary_namespace) {
				Result_CVec_StrZIOErrorZ ret = arg.list(primary_namespace, secondary_namespace);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
		});
		return impl_holder.held;
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
	public Result_CVec_u8ZIOErrorZ read(java.lang.String primary_namespace, java.lang.String secondary_namespace, java.lang.String key) {
		long ret = bindings.KVStore_read(this.ptr, primary_namespace, secondary_namespace, key);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(primary_namespace);
		Reference.reachabilityFence(secondary_namespace);
		Reference.reachabilityFence(key);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_u8ZIOErrorZ ret_hu_conv = Result_CVec_u8ZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Persists the given data under the given `key`.
	 * 
	 * Will create the given `primary_namespace` and `secondary_namespace` if not already present
	 * in the store.
	 */
	public Result_NoneIOErrorZ write(java.lang.String primary_namespace, java.lang.String secondary_namespace, java.lang.String key, byte[] buf) {
		long ret = bindings.KVStore_write(this.ptr, primary_namespace, secondary_namespace, key, buf);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(primary_namespace);
		Reference.reachabilityFence(secondary_namespace);
		Reference.reachabilityFence(key);
		Reference.reachabilityFence(buf);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneIOErrorZ ret_hu_conv = Result_NoneIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Removes any data that had previously been persisted under the given `key`.
	 * 
	 * If the `lazy` flag is set to `true`, the backend implementation might choose to lazily
	 * remove the given `key` at some point in time after the method returns, e.g., as part of an
	 * eventual batch deletion of multiple keys. As a consequence, subsequent calls to
	 * [`KVStore::list`] might include the removed key until the changes are actually persisted.
	 * 
	 * Note that while setting the `lazy` flag reduces the I/O burden of multiple subsequent
	 * `remove` calls, it also influences the atomicity guarantees as lazy `remove`s could
	 * potentially get lost on crash after the method returns. Therefore, this flag should only be
	 * set for `remove` operations that can be safely replayed at a later time.
	 * 
	 * Returns successfully if no data will be stored for the given `primary_namespace`,
	 * `secondary_namespace`, and `key`, independently of whether it was present before its
	 * invokation or not.
	 */
	public Result_NoneIOErrorZ remove(java.lang.String primary_namespace, java.lang.String secondary_namespace, java.lang.String key, boolean lazy) {
		long ret = bindings.KVStore_remove(this.ptr, primary_namespace, secondary_namespace, key, lazy);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(primary_namespace);
		Reference.reachabilityFence(secondary_namespace);
		Reference.reachabilityFence(key);
		Reference.reachabilityFence(lazy);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneIOErrorZ ret_hu_conv = Result_NoneIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns a list of keys that are stored under the given `secondary_namespace` in
	 * `primary_namespace`.
	 * 
	 * Returns the keys in arbitrary order, so users requiring a particular order need to sort the
	 * returned keys. Returns an empty list if `primary_namespace` or `secondary_namespace` is unknown.
	 */
	public Result_CVec_StrZIOErrorZ list(java.lang.String primary_namespace, java.lang.String secondary_namespace) {
		long ret = bindings.KVStore_list(this.ptr, primary_namespace, secondary_namespace);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(primary_namespace);
		Reference.reachabilityFence(secondary_namespace);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_StrZIOErrorZ ret_hu_conv = Result_CVec_StrZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
