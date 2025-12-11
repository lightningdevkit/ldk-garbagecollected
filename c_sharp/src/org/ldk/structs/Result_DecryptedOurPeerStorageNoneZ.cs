using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_DecryptedOurPeerStorageNoneZ : CommonBase {
	Result_DecryptedOurPeerStorageNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_DecryptedOurPeerStorageNoneZ() {
		if (ptr != 0) { bindings.CResult_DecryptedOurPeerStorageNoneZ_free(ptr); }
	}

	internal static Result_DecryptedOurPeerStorageNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_DecryptedOurPeerStorageNoneZ_is_ok(ptr)) {
			return new Result_DecryptedOurPeerStorageNoneZ_OK(null, ptr);
		} else {
			return new Result_DecryptedOurPeerStorageNoneZ_Err(null, ptr);
		}
	}
	public class Result_DecryptedOurPeerStorageNoneZ_OK : Result_DecryptedOurPeerStorageNoneZ {
		public readonly DecryptedOurPeerStorage res;
		internal Result_DecryptedOurPeerStorageNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_DecryptedOurPeerStorageNoneZ_get_ok(ptr);
			org.ldk.structs.DecryptedOurPeerStorage res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.DecryptedOurPeerStorage(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_DecryptedOurPeerStorageNoneZ_Err : Result_DecryptedOurPeerStorageNoneZ {
		internal Result_DecryptedOurPeerStorageNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_DecryptedOurPeerStorageNoneZ in the success state.
	 */
	public static org.ldk.structs.Result_DecryptedOurPeerStorageNoneZ ok(byte[] o_data) {
		long ret = bindings.CResult_DecryptedOurPeerStorageNoneZ_ok(bindings.DecryptedOurPeerStorage_new(InternalUtils.encodeUint8Array(o_data)));
		GC.KeepAlive(o_data);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_DecryptedOurPeerStorageNoneZ ret_hu_conv = Result_DecryptedOurPeerStorageNoneZ.constr_from_ptr(ret);
		;
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_DecryptedOurPeerStorageNoneZ in the error state.
	 */
	public static org.ldk.structs.Result_DecryptedOurPeerStorageNoneZ err() {
		long ret = bindings.CResult_DecryptedOurPeerStorageNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_DecryptedOurPeerStorageNoneZ ret_hu_conv = Result_DecryptedOurPeerStorageNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_DecryptedOurPeerStorageNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
