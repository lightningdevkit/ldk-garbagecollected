using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_SiPrefixParseErrorZ : CommonBase {
	Result_SiPrefixParseErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_SiPrefixParseErrorZ() {
		if (ptr != 0) { bindings.CResult_SiPrefixParseErrorZ_free(ptr); }
	}

	internal static Result_SiPrefixParseErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_SiPrefixParseErrorZ_is_ok(ptr)) {
			return new Result_SiPrefixParseErrorZ_OK(null, ptr);
		} else {
			return new Result_SiPrefixParseErrorZ_Err(null, ptr);
		}
	}
	public class Result_SiPrefixParseErrorZ_OK : Result_SiPrefixParseErrorZ {
		public readonly SiPrefix res;
		internal Result_SiPrefixParseErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			this.res = bindings.CResult_SiPrefixParseErrorZ_get_ok(ptr);
		}
	}

	public class Result_SiPrefixParseErrorZ_Err : Result_SiPrefixParseErrorZ {
		public readonly ParseError err;
		internal Result_SiPrefixParseErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_SiPrefixParseErrorZ_get_err(ptr);
			org.ldk.structs.ParseError err_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_SiPrefixParseErrorZ in the success state.
	 */
	public static Result_SiPrefixParseErrorZ ok(SiPrefix o) {
		long ret = bindings.CResult_SiPrefixParseErrorZ_ok(o);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SiPrefixParseErrorZ ret_hu_conv = Result_SiPrefixParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SiPrefixParseErrorZ in the error state.
	 */
	public static Result_SiPrefixParseErrorZ err(org.ldk.structs.ParseError e) {
		long ret = bindings.CResult_SiPrefixParseErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SiPrefixParseErrorZ ret_hu_conv = Result_SiPrefixParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_SiPrefixParseErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_SiPrefixParseErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_SiPrefixParseErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_SiPrefixParseErrorZ clone() {
		long ret = bindings.CResult_SiPrefixParseErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SiPrefixParseErrorZ ret_hu_conv = Result_SiPrefixParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
