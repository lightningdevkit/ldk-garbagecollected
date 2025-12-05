using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A wrapper around a [`KVStoreSync`] that implements the [`KVStore`] trait. It is not necessary to use this type
 * directly.
 */
public class KVStoreSyncWrapper : CommonBase {
	internal KVStoreSyncWrapper(object _dummy, long ptr) : base(ptr) { }
	~KVStoreSyncWrapper() {
		if (ptr != 0) { bindings.KVStoreSyncWrapper_free(ptr); }
	}

	public org.ldk.structs.KVStoreSync get_a() {
		long ret = bindings.KVStoreSyncWrapper_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		KVStoreSync ret_hu_conv = new KVStoreSync(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	public void set_a(org.ldk.structs.KVStoreSync val) {
		bindings.KVStoreSyncWrapper_set_a(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Constructs a new KVStoreSyncWrapper given each field
	 */
	public static org.ldk.structs.KVStoreSyncWrapper of(org.ldk.structs.KVStoreSync a_arg) {
		long ret = bindings.KVStoreSyncWrapper_new(a_arg.ptr);
		GC.KeepAlive(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.KVStoreSyncWrapper ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.KVStoreSyncWrapper(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.KVStoreSyncWrapper_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the KVStoreSyncWrapper
	 */
	public org.ldk.structs.KVStoreSyncWrapper clone() {
		long ret = bindings.KVStoreSyncWrapper_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.KVStoreSyncWrapper ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.KVStoreSyncWrapper(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
