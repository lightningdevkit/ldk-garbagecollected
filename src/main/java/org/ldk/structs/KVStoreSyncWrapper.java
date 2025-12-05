package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A wrapper around a [`KVStoreSync`] that implements the [`KVStore`] trait. It is not necessary to use this type
 * directly.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class KVStoreSyncWrapper extends CommonBase {
	KVStoreSyncWrapper(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.KVStoreSyncWrapper_free(ptr); }
	}

	public KVStoreSync get_a() {
		long ret = bindings.KVStoreSyncWrapper_get_a(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		KVStoreSync ret_hu_conv = new KVStoreSync(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	public void set_a(org.ldk.structs.KVStoreSync val) {
		bindings.KVStoreSyncWrapper_set_a(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Constructs a new KVStoreSyncWrapper given each field
	 */
	public static KVStoreSyncWrapper of(org.ldk.structs.KVStoreSync a_arg) {
		long ret = bindings.KVStoreSyncWrapper_new(a_arg.ptr);
		Reference.reachabilityFence(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.KVStoreSyncWrapper ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.KVStoreSyncWrapper(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a_arg); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.KVStoreSyncWrapper_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the KVStoreSyncWrapper
	 */
	public KVStoreSyncWrapper clone() {
		long ret = bindings.KVStoreSyncWrapper_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.KVStoreSyncWrapper ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.KVStoreSyncWrapper(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
