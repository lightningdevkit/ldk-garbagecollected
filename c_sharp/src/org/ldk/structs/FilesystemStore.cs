using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`KVStore`] implementation that writes to and reads from the file system.
 */
public class FilesystemStore : CommonBase {
	internal FilesystemStore(object _dummy, long ptr) : base(ptr) { }
	~FilesystemStore() {
		if (ptr != 0) { bindings.FilesystemStore_free(ptr); }
	}

	/**
	 * Constructs a new [`FilesystemStore`].
	 */
	public static FilesystemStore of(string data_dir) {
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
	 * Constructs a new KVStore which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned KVStore must be freed before this_arg is
	 */
	public KVStore as_KVStore() {
		long ret = bindings.FilesystemStore_as_KVStore(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		KVStore ret_hu_conv = new KVStore(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
