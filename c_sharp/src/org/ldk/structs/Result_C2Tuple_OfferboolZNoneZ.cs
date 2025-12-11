using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_C2Tuple_OfferboolZNoneZ : CommonBase {
	Result_C2Tuple_OfferboolZNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_C2Tuple_OfferboolZNoneZ() {
		if (ptr != 0) { bindings.CResult_C2Tuple_OfferboolZNoneZ_free(ptr); }
	}

	internal static Result_C2Tuple_OfferboolZNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C2Tuple_OfferboolZNoneZ_is_ok(ptr)) {
			return new Result_C2Tuple_OfferboolZNoneZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_OfferboolZNoneZ_Err(null, ptr);
		}
	}
	public class Result_C2Tuple_OfferboolZNoneZ_OK : Result_C2Tuple_OfferboolZNoneZ {
		public readonly TwoTuple_OfferboolZ res;
		internal Result_C2Tuple_OfferboolZNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_C2Tuple_OfferboolZNoneZ_get_ok(ptr);
			TwoTuple_OfferboolZ res_hu_conv = new TwoTuple_OfferboolZ(null, res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_C2Tuple_OfferboolZNoneZ_Err : Result_C2Tuple_OfferboolZNoneZ {
		internal Result_C2Tuple_OfferboolZNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_C2Tuple_OfferboolZNoneZ in the success state.
	 */
	public static org.ldk.structs.Result_C2Tuple_OfferboolZNoneZ ok(org.ldk.structs.TwoTuple_OfferboolZ o) {
		long ret = bindings.CResult_C2Tuple_OfferboolZNoneZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_OfferboolZNoneZ ret_hu_conv = Result_C2Tuple_OfferboolZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C2Tuple_OfferboolZNoneZ in the error state.
	 */
	public static org.ldk.structs.Result_C2Tuple_OfferboolZNoneZ err() {
		long ret = bindings.CResult_C2Tuple_OfferboolZNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_OfferboolZNoneZ ret_hu_conv = Result_C2Tuple_OfferboolZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_C2Tuple_OfferboolZNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_C2Tuple_OfferboolZNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_C2Tuple_OfferboolZNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Result_C2Tuple_OfferboolZNoneZ clone() {
		long ret = bindings.CResult_C2Tuple_OfferboolZNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_OfferboolZNoneZ ret_hu_conv = Result_C2Tuple_OfferboolZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
