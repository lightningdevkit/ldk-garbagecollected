using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result__u832APIErrorZ : CommonBase {
	Result__u832APIErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result__u832APIErrorZ() {
		if (ptr != 0) { bindings.CResult__u832APIErrorZ_free(ptr); }
	}

	internal static Result__u832APIErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult__u832APIErrorZ_is_ok(ptr)) {
			return new Result__u832APIErrorZ_OK(null, ptr);
		} else {
			return new Result__u832APIErrorZ_Err(null, ptr);
		}
	}
	public class Result__u832APIErrorZ_OK : Result__u832APIErrorZ {
		public readonly byte[] res;
		internal Result__u832APIErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			this.res = bindings.CResult__u832APIErrorZ_get_ok(ptr);
		}
	}

	public class Result__u832APIErrorZ_Err : Result__u832APIErrorZ {
		public readonly APIError err;
		internal Result__u832APIErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult__u832APIErrorZ_get_err(ptr);
			org.ldk.structs.APIError err_hu_conv = org.ldk.structs.APIError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult__u832APIErrorZ in the success state.
	 */
	public static Result__u832APIErrorZ ok(byte[] o) {
		long ret = bindings.CResult__u832APIErrorZ_ok(InternalUtils.check_arr_len(o, 32));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result__u832APIErrorZ ret_hu_conv = Result__u832APIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult__u832APIErrorZ in the error state.
	 */
	public static Result__u832APIErrorZ err(org.ldk.structs.APIError e) {
		long ret = bindings.CResult__u832APIErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result__u832APIErrorZ ret_hu_conv = Result__u832APIErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult__u832APIErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult__u832APIErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult__u832APIErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result__u832APIErrorZ clone() {
		long ret = bindings.CResult__u832APIErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result__u832APIErrorZ ret_hu_conv = Result__u832APIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
