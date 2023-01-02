using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_BlindedPathNoneZ : CommonBase {
	Result_BlindedPathNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_BlindedPathNoneZ() {
		if (ptr != 0) { bindings.CResult_BlindedPathNoneZ_free(ptr); }
	}

	internal static Result_BlindedPathNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_BlindedPathNoneZ_is_ok(ptr)) {
			return new Result_BlindedPathNoneZ_OK(null, ptr);
		} else {
			return new Result_BlindedPathNoneZ_Err(null, ptr);
		}
	}
	public class Result_BlindedPathNoneZ_OK : Result_BlindedPathNoneZ {
		public readonly BlindedPath res;
		internal Result_BlindedPathNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_BlindedPathNoneZ_get_ok(ptr);
			org.ldk.structs.BlindedPath res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.BlindedPath(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_BlindedPathNoneZ_Err : Result_BlindedPathNoneZ {
		internal Result_BlindedPathNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_BlindedPathNoneZ in the success state.
	 */
	public static Result_BlindedPathNoneZ ok(org.ldk.structs.BlindedPath o) {
		long ret = bindings.CResult_BlindedPathNoneZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedPathNoneZ ret_hu_conv = Result_BlindedPathNoneZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_BlindedPathNoneZ in the error state.
	 */
	public static Result_BlindedPathNoneZ err() {
		long ret = bindings.CResult_BlindedPathNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedPathNoneZ ret_hu_conv = Result_BlindedPathNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_BlindedPathNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_BlindedPathNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_BlindedPathNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_BlindedPathNoneZ clone() {
		long ret = bindings.CResult_BlindedPathNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedPathNoneZ ret_hu_conv = Result_BlindedPathNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
