using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_EncryptedOurPeerStorageNoneZ : CommonBase {
	Result_EncryptedOurPeerStorageNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_EncryptedOurPeerStorageNoneZ() {
		if (ptr != 0) { bindings.CResult_EncryptedOurPeerStorageNoneZ_free(ptr); }
	}

	internal static Result_EncryptedOurPeerStorageNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_EncryptedOurPeerStorageNoneZ_is_ok(ptr)) {
			return new Result_EncryptedOurPeerStorageNoneZ_OK(null, ptr);
		} else {
			return new Result_EncryptedOurPeerStorageNoneZ_Err(null, ptr);
		}
	}
	public class Result_EncryptedOurPeerStorageNoneZ_OK : Result_EncryptedOurPeerStorageNoneZ {
		public readonly EncryptedOurPeerStorage res;
		internal Result_EncryptedOurPeerStorageNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_EncryptedOurPeerStorageNoneZ_get_ok(ptr);
			org.ldk.structs.EncryptedOurPeerStorage res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.EncryptedOurPeerStorage(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_EncryptedOurPeerStorageNoneZ_Err : Result_EncryptedOurPeerStorageNoneZ {
		internal Result_EncryptedOurPeerStorageNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_EncryptedOurPeerStorageNoneZ in the success state.
	 */
	public static org.ldk.structs.Result_EncryptedOurPeerStorageNoneZ ok(org.ldk.structs.EncryptedOurPeerStorage o) {
		long ret = bindings.CResult_EncryptedOurPeerStorageNoneZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_EncryptedOurPeerStorageNoneZ ret_hu_conv = Result_EncryptedOurPeerStorageNoneZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid ret_hu_conv being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after ret_hu_conv call, o is reset to null and is now a dummy object.
		o.ptr = 0;;
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_EncryptedOurPeerStorageNoneZ in the error state.
	 */
	public static org.ldk.structs.Result_EncryptedOurPeerStorageNoneZ err() {
		long ret = bindings.CResult_EncryptedOurPeerStorageNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_EncryptedOurPeerStorageNoneZ ret_hu_conv = Result_EncryptedOurPeerStorageNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_EncryptedOurPeerStorageNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
