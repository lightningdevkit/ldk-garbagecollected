using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_PartiallySignedTransactionNoneZ : CommonBase {
	Result_PartiallySignedTransactionNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_PartiallySignedTransactionNoneZ() {
		if (ptr != 0) { bindings.CResult_PartiallySignedTransactionNoneZ_free(ptr); }
	}

	internal static Result_PartiallySignedTransactionNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PartiallySignedTransactionNoneZ_is_ok(ptr)) {
			return new Result_PartiallySignedTransactionNoneZ_OK(null, ptr);
		} else {
			return new Result_PartiallySignedTransactionNoneZ_Err(null, ptr);
		}
	}
	public class Result_PartiallySignedTransactionNoneZ_OK : Result_PartiallySignedTransactionNoneZ {
		public readonly byte[] res;
		internal Result_PartiallySignedTransactionNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			this.res = bindings.CResult_PartiallySignedTransactionNoneZ_get_ok(ptr);
		}
	}

	public class Result_PartiallySignedTransactionNoneZ_Err : Result_PartiallySignedTransactionNoneZ {
		internal Result_PartiallySignedTransactionNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_PartiallySignedTransactionNoneZ in the success state.
	 */
	public static Result_PartiallySignedTransactionNoneZ ok(byte[] o) {
		long ret = bindings.CResult_PartiallySignedTransactionNoneZ_ok(o);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PartiallySignedTransactionNoneZ ret_hu_conv = Result_PartiallySignedTransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PartiallySignedTransactionNoneZ in the error state.
	 */
	public static Result_PartiallySignedTransactionNoneZ err() {
		long ret = bindings.CResult_PartiallySignedTransactionNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PartiallySignedTransactionNoneZ ret_hu_conv = Result_PartiallySignedTransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_PartiallySignedTransactionNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_PartiallySignedTransactionNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PartiallySignedTransactionNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PartiallySignedTransactionNoneZ clone() {
		long ret = bindings.CResult_PartiallySignedTransactionNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PartiallySignedTransactionNoneZ ret_hu_conv = Result_PartiallySignedTransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
