using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_StrNoneZ : CommonBase {
	Result_StrNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_StrNoneZ() {
		if (ptr != 0) { bindings.CResult_StrNoneZ_free(ptr); }
	}

	internal static Result_StrNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_StrNoneZ_is_ok(ptr)) {
			return new Result_StrNoneZ_OK(null, ptr);
		} else {
			return new Result_StrNoneZ_Err(null, ptr);
		}
	}
	public class Result_StrNoneZ_OK : Result_StrNoneZ {
		public readonly string res;
		internal Result_StrNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_StrNoneZ_get_ok(ptr);
			string res_conv = InternalUtils.decodeString(res);
			this.res = res_conv;
		}
	}

	public class Result_StrNoneZ_Err : Result_StrNoneZ {
		internal Result_StrNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_StrNoneZ in the success state.
	 */
	public static org.ldk.structs.Result_StrNoneZ ok(string o) {
		long ret = bindings.CResult_StrNoneZ_ok(InternalUtils.encodeString(o));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StrNoneZ ret_hu_conv = Result_StrNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_StrNoneZ in the error state.
	 */
	public static org.ldk.structs.Result_StrNoneZ err() {
		long ret = bindings.CResult_StrNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StrNoneZ ret_hu_conv = Result_StrNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_StrNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_StrNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_StrNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Result_StrNoneZ clone() {
		long ret = bindings.CResult_StrNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StrNoneZ ret_hu_conv = Result_StrNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
