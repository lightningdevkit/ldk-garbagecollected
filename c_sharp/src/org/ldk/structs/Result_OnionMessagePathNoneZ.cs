using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_OnionMessagePathNoneZ : CommonBase {
	Result_OnionMessagePathNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_OnionMessagePathNoneZ() {
		if (ptr != 0) { bindings.CResult_OnionMessagePathNoneZ_free(ptr); }
	}

	internal static Result_OnionMessagePathNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_OnionMessagePathNoneZ_is_ok(ptr)) {
			return new Result_OnionMessagePathNoneZ_OK(null, ptr);
		} else {
			return new Result_OnionMessagePathNoneZ_Err(null, ptr);
		}
	}
	public class Result_OnionMessagePathNoneZ_OK : Result_OnionMessagePathNoneZ {
		public readonly OnionMessagePath res;
		internal Result_OnionMessagePathNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_OnionMessagePathNoneZ_get_ok(ptr);
			org.ldk.structs.OnionMessagePath res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.OnionMessagePath(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_OnionMessagePathNoneZ_Err : Result_OnionMessagePathNoneZ {
		internal Result_OnionMessagePathNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_OnionMessagePathNoneZ in the success state.
	 */
	public static Result_OnionMessagePathNoneZ ok(org.ldk.structs.OnionMessagePath o) {
		long ret = bindings.CResult_OnionMessagePathNoneZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OnionMessagePathNoneZ ret_hu_conv = Result_OnionMessagePathNoneZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_OnionMessagePathNoneZ in the error state.
	 */
	public static Result_OnionMessagePathNoneZ err() {
		long ret = bindings.CResult_OnionMessagePathNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OnionMessagePathNoneZ ret_hu_conv = Result_OnionMessagePathNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_OnionMessagePathNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_OnionMessagePathNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_OnionMessagePathNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_OnionMessagePathNoneZ clone() {
		long ret = bindings.CResult_OnionMessagePathNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OnionMessagePathNoneZ ret_hu_conv = Result_OnionMessagePathNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
