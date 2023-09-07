using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_COption_KeyPairZNoneZ : CommonBase {
	Result_COption_KeyPairZNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_COption_KeyPairZNoneZ() {
		if (ptr != 0) { bindings.CResult_COption_KeyPairZNoneZ_free(ptr); }
	}

	internal static Result_COption_KeyPairZNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_COption_KeyPairZNoneZ_is_ok(ptr)) {
			return new Result_COption_KeyPairZNoneZ_OK(null, ptr);
		} else {
			return new Result_COption_KeyPairZNoneZ_Err(null, ptr);
		}
	}
	public class Result_COption_KeyPairZNoneZ_OK : Result_COption_KeyPairZNoneZ {
		public readonly Option_KeyPairZ res;
		internal Result_COption_KeyPairZNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_COption_KeyPairZNoneZ_get_ok(ptr);
			org.ldk.structs.Option_KeyPairZ res_hu_conv = org.ldk.structs.Option_KeyPairZ.constr_from_ptr(res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_COption_KeyPairZNoneZ_Err : Result_COption_KeyPairZNoneZ {
		internal Result_COption_KeyPairZNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_COption_KeyPairZNoneZ in the success state.
	 */
	public static Result_COption_KeyPairZNoneZ ok(org.ldk.structs.Option_KeyPairZ o) {
		long ret = bindings.CResult_COption_KeyPairZNoneZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_KeyPairZNoneZ ret_hu_conv = Result_COption_KeyPairZNoneZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_COption_KeyPairZNoneZ in the error state.
	 */
	public static Result_COption_KeyPairZNoneZ err() {
		long ret = bindings.CResult_COption_KeyPairZNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_KeyPairZNoneZ ret_hu_conv = Result_COption_KeyPairZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_COption_KeyPairZNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_COption_KeyPairZNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_COption_KeyPairZNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_COption_KeyPairZNoneZ clone() {
		long ret = bindings.CResult_COption_KeyPairZNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_KeyPairZNoneZ ret_hu_conv = Result_COption_KeyPairZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
