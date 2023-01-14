using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_C2Tuple_SignatureCVec_SignatureZZNoneZ : CommonBase {
	Result_C2Tuple_SignatureCVec_SignatureZZNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_C2Tuple_SignatureCVec_SignatureZZNoneZ() {
		if (ptr != 0) { bindings.CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_free(ptr); }
	}

	internal static Result_C2Tuple_SignatureCVec_SignatureZZNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_is_ok(ptr)) {
			return new Result_C2Tuple_SignatureCVec_SignatureZZNoneZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_SignatureCVec_SignatureZZNoneZ_Err(null, ptr);
		}
	}
	public class Result_C2Tuple_SignatureCVec_SignatureZZNoneZ_OK : Result_C2Tuple_SignatureCVec_SignatureZZNoneZ {
		public readonly TwoTuple_SignatureCVec_SignatureZZ res;
		internal Result_C2Tuple_SignatureCVec_SignatureZZNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_get_ok(ptr);
			TwoTuple_SignatureCVec_SignatureZZ res_hu_conv = new TwoTuple_SignatureCVec_SignatureZZ(null, res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_C2Tuple_SignatureCVec_SignatureZZNoneZ_Err : Result_C2Tuple_SignatureCVec_SignatureZZNoneZ {
		internal Result_C2Tuple_SignatureCVec_SignatureZZNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ in the success state.
	 */
	public static Result_C2Tuple_SignatureCVec_SignatureZZNoneZ ok(org.ldk.structs.TwoTuple_SignatureCVec_SignatureZZ o) {
		long ret = bindings.CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_ok(o != null ? o.ptr : 0);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_SignatureCVec_SignatureZZNoneZ ret_hu_conv = Result_C2Tuple_SignatureCVec_SignatureZZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ in the error state.
	 */
	public static Result_C2Tuple_SignatureCVec_SignatureZZNoneZ err() {
		long ret = bindings.CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_SignatureCVec_SignatureZZNoneZ ret_hu_conv = Result_C2Tuple_SignatureCVec_SignatureZZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_C2Tuple_SignatureCVec_SignatureZZNoneZ clone() {
		long ret = bindings.CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_SignatureCVec_SignatureZZNoneZ ret_hu_conv = Result_C2Tuple_SignatureCVec_SignatureZZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
