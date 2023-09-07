using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_SiPrefixBolt11ParseErrorZ : CommonBase {
	Result_SiPrefixBolt11ParseErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_SiPrefixBolt11ParseErrorZ() {
		if (ptr != 0) { bindings.CResult_SiPrefixBolt11ParseErrorZ_free(ptr); }
	}

	internal static Result_SiPrefixBolt11ParseErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_SiPrefixBolt11ParseErrorZ_is_ok(ptr)) {
			return new Result_SiPrefixBolt11ParseErrorZ_OK(null, ptr);
		} else {
			return new Result_SiPrefixBolt11ParseErrorZ_Err(null, ptr);
		}
	}
	public class Result_SiPrefixBolt11ParseErrorZ_OK : Result_SiPrefixBolt11ParseErrorZ {
		public readonly SiPrefix res;
		internal Result_SiPrefixBolt11ParseErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			this.res = bindings.CResult_SiPrefixBolt11ParseErrorZ_get_ok(ptr);
		}
	}

	public class Result_SiPrefixBolt11ParseErrorZ_Err : Result_SiPrefixBolt11ParseErrorZ {
		public readonly Bolt11ParseError err;
		internal Result_SiPrefixBolt11ParseErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_SiPrefixBolt11ParseErrorZ_get_err(ptr);
			org.ldk.structs.Bolt11ParseError err_hu_conv = org.ldk.structs.Bolt11ParseError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_SiPrefixBolt11ParseErrorZ in the success state.
	 */
	public static Result_SiPrefixBolt11ParseErrorZ ok(SiPrefix o) {
		long ret = bindings.CResult_SiPrefixBolt11ParseErrorZ_ok(o);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SiPrefixBolt11ParseErrorZ ret_hu_conv = Result_SiPrefixBolt11ParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SiPrefixBolt11ParseErrorZ in the error state.
	 */
	public static Result_SiPrefixBolt11ParseErrorZ err(org.ldk.structs.Bolt11ParseError e) {
		long ret = bindings.CResult_SiPrefixBolt11ParseErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SiPrefixBolt11ParseErrorZ ret_hu_conv = Result_SiPrefixBolt11ParseErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_SiPrefixBolt11ParseErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_SiPrefixBolt11ParseErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_SiPrefixBolt11ParseErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_SiPrefixBolt11ParseErrorZ clone() {
		long ret = bindings.CResult_SiPrefixBolt11ParseErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SiPrefixBolt11ParseErrorZ ret_hu_conv = Result_SiPrefixBolt11ParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
