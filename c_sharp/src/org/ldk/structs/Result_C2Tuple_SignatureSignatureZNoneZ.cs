using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_C2Tuple_SignatureSignatureZNoneZ : CommonBase {
	Result_C2Tuple_SignatureSignatureZNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_C2Tuple_SignatureSignatureZNoneZ() {
		if (ptr != 0) { bindings.CResult_C2Tuple_SignatureSignatureZNoneZ_free(ptr); }
	}

	internal static Result_C2Tuple_SignatureSignatureZNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C2Tuple_SignatureSignatureZNoneZ_is_ok(ptr)) {
			return new Result_C2Tuple_SignatureSignatureZNoneZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_SignatureSignatureZNoneZ_Err(null, ptr);
		}
	}
	public class Result_C2Tuple_SignatureSignatureZNoneZ_OK : Result_C2Tuple_SignatureSignatureZNoneZ {
		public readonly TwoTuple_SignatureSignatureZ res;
		internal Result_C2Tuple_SignatureSignatureZNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_C2Tuple_SignatureSignatureZNoneZ_get_ok(ptr);
			TwoTuple_SignatureSignatureZ res_hu_conv = new TwoTuple_SignatureSignatureZ(null, res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_C2Tuple_SignatureSignatureZNoneZ_Err : Result_C2Tuple_SignatureSignatureZNoneZ {
		internal Result_C2Tuple_SignatureSignatureZNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_C2Tuple_SignatureSignatureZNoneZ in the success state.
	 */
	public static Result_C2Tuple_SignatureSignatureZNoneZ ok(org.ldk.structs.TwoTuple_SignatureSignatureZ o) {
		long ret = bindings.CResult_C2Tuple_SignatureSignatureZNoneZ_ok(o != null ? o.ptr : 0);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_SignatureSignatureZNoneZ ret_hu_conv = Result_C2Tuple_SignatureSignatureZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C2Tuple_SignatureSignatureZNoneZ in the error state.
	 */
	public static Result_C2Tuple_SignatureSignatureZNoneZ err() {
		long ret = bindings.CResult_C2Tuple_SignatureSignatureZNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_SignatureSignatureZNoneZ ret_hu_conv = Result_C2Tuple_SignatureSignatureZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_C2Tuple_SignatureSignatureZNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_C2Tuple_SignatureSignatureZNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_C2Tuple_SignatureSignatureZNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_C2Tuple_SignatureSignatureZNoneZ clone() {
		long ret = bindings.CResult_C2Tuple_SignatureSignatureZNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_SignatureSignatureZNoneZ ret_hu_conv = Result_C2Tuple_SignatureSignatureZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
