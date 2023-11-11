using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_PeeledOnionNoneZ : CommonBase {
	Result_PeeledOnionNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_PeeledOnionNoneZ() {
		if (ptr != 0) { bindings.CResult_PeeledOnionNoneZ_free(ptr); }
	}

	internal static Result_PeeledOnionNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PeeledOnionNoneZ_is_ok(ptr)) {
			return new Result_PeeledOnionNoneZ_OK(null, ptr);
		} else {
			return new Result_PeeledOnionNoneZ_Err(null, ptr);
		}
	}
	public class Result_PeeledOnionNoneZ_OK : Result_PeeledOnionNoneZ {
		public readonly PeeledOnion res;
		internal Result_PeeledOnionNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_PeeledOnionNoneZ_get_ok(ptr);
			org.ldk.structs.PeeledOnion res_hu_conv = org.ldk.structs.PeeledOnion.constr_from_ptr(res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_PeeledOnionNoneZ_Err : Result_PeeledOnionNoneZ {
		internal Result_PeeledOnionNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_PeeledOnionNoneZ in the success state.
	 */
	public static Result_PeeledOnionNoneZ ok(org.ldk.structs.PeeledOnion o) {
		long ret = bindings.CResult_PeeledOnionNoneZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PeeledOnionNoneZ ret_hu_conv = Result_PeeledOnionNoneZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PeeledOnionNoneZ in the error state.
	 */
	public static Result_PeeledOnionNoneZ err() {
		long ret = bindings.CResult_PeeledOnionNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PeeledOnionNoneZ ret_hu_conv = Result_PeeledOnionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_PeeledOnionNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
