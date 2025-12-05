using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`KVStore`] and [`KVStoreSync`] implementation that writes to and reads from the file system.
 * 
 * [`KVStore`]: lightning::util::persist::KVStore
 */
public class FilesystemStore : CommonBase {
	internal FilesystemStore(object _dummy, long ptr) : base(ptr) { }
	~FilesystemStore() {
		if (ptr != 0) { bindings.FilesystemStore_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.FilesystemStore_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the FilesystemStore
	 */
	public org.ldk.structs.FilesystemStore clone() {
		long ret = bindings.FilesystemStore_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FilesystemStore ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.FilesystemStore(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new [`FilesystemStore`].
	 */
	public static org.ldk.structs.FilesystemStore of(string data_dir) {
		long ret = bindings.FilesystemStore_new(InternalUtils.encodeString(data_dir));
		GC.KeepAlive(data_dir);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FilesystemStore ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.FilesystemStore(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns the data directory.
	 */
	public string get_data_dir() {
		long ret = bindings.FilesystemStore_get_data_dir(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		string ret_conv = InternalUtils.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Constructs a new KVStoreSync which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned KVStoreSync must be freed before this_arg is
	 */
	public org.ldk.structs.KVStoreSync as_KVStoreSync() {
		long ret = bindings.FilesystemStore_as_KVStoreSync(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		KVStoreSync ret_hu_conv = new KVStoreSync(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new MigratableKVStore which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned MigratableKVStore must be freed before this_arg is
	 */
	public org.ldk.structs.MigratableKVStore as_MigratableKVStore() {
		long ret = bindings.FilesystemStore_as_MigratableKVStore(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		MigratableKVStore ret_hu_conv = new MigratableKVStore(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
