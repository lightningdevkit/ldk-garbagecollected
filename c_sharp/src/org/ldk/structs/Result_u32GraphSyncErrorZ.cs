using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_u32GraphSyncErrorZ : CommonBase {
	Result_u32GraphSyncErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_u32GraphSyncErrorZ() {
		if (ptr != 0) { bindings.CResult_u32GraphSyncErrorZ_free(ptr); }
	}

	internal static Result_u32GraphSyncErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_u32GraphSyncErrorZ_is_ok(ptr)) {
			return new Result_u32GraphSyncErrorZ_OK(null, ptr);
		} else {
			return new Result_u32GraphSyncErrorZ_Err(null, ptr);
		}
	}
	public class Result_u32GraphSyncErrorZ_OK : Result_u32GraphSyncErrorZ {
		public readonly int res;
		internal Result_u32GraphSyncErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			this.res = bindings.CResult_u32GraphSyncErrorZ_get_ok(ptr);
		}
	}

	public class Result_u32GraphSyncErrorZ_Err : Result_u32GraphSyncErrorZ {
		public readonly GraphSyncError err;
		internal Result_u32GraphSyncErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_u32GraphSyncErrorZ_get_err(ptr);
			org.ldk.structs.GraphSyncError err_hu_conv = org.ldk.structs.GraphSyncError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_u32GraphSyncErrorZ in the success state.
	 */
	public static Result_u32GraphSyncErrorZ ok(int o) {
		long ret = bindings.CResult_u32GraphSyncErrorZ_ok(o);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_u32GraphSyncErrorZ ret_hu_conv = Result_u32GraphSyncErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_u32GraphSyncErrorZ in the error state.
	 */
	public static Result_u32GraphSyncErrorZ err(org.ldk.structs.GraphSyncError e) {
		long ret = bindings.CResult_u32GraphSyncErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_u32GraphSyncErrorZ ret_hu_conv = Result_u32GraphSyncErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_u32GraphSyncErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
