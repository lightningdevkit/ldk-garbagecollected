package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A [`KVStore`] implementation that writes to and reads from the file system.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class FilesystemStore extends CommonBase {
	FilesystemStore(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.FilesystemStore_free(ptr); }
	}

	/**
	 * Constructs a new [`FilesystemStore`].
	 */
	public static FilesystemStore of(java.lang.String data_dir) {
		long ret = bindings.FilesystemStore_new(data_dir);
		Reference.reachabilityFence(data_dir);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FilesystemStore ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.FilesystemStore(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns the data directory.
	 */
	public String get_data_dir() {
		String ret = bindings.FilesystemStore_get_data_dir(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Constructs a new KVStore which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned KVStore must be freed before this_arg is
	 */
	public KVStore as_KVStore() {
		long ret = bindings.FilesystemStore_as_KVStore(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		KVStore ret_hu_conv = new KVStore(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
