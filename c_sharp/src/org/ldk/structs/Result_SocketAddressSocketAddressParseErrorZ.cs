using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_SocketAddressSocketAddressParseErrorZ : CommonBase {
	Result_SocketAddressSocketAddressParseErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_SocketAddressSocketAddressParseErrorZ() {
		if (ptr != 0) { bindings.CResult_SocketAddressSocketAddressParseErrorZ_free(ptr); }
	}

	internal static Result_SocketAddressSocketAddressParseErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_SocketAddressSocketAddressParseErrorZ_is_ok(ptr)) {
			return new Result_SocketAddressSocketAddressParseErrorZ_OK(null, ptr);
		} else {
			return new Result_SocketAddressSocketAddressParseErrorZ_Err(null, ptr);
		}
	}
	public class Result_SocketAddressSocketAddressParseErrorZ_OK : Result_SocketAddressSocketAddressParseErrorZ {
		public readonly SocketAddress res;
		internal Result_SocketAddressSocketAddressParseErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_SocketAddressSocketAddressParseErrorZ_get_ok(ptr);
			org.ldk.structs.SocketAddress res_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_SocketAddressSocketAddressParseErrorZ_Err : Result_SocketAddressSocketAddressParseErrorZ {
		public readonly SocketAddressParseError err;
		internal Result_SocketAddressSocketAddressParseErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			this.err = bindings.CResult_SocketAddressSocketAddressParseErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_SocketAddressSocketAddressParseErrorZ in the success state.
	 */
	public static Result_SocketAddressSocketAddressParseErrorZ ok(org.ldk.structs.SocketAddress o) {
		long ret = bindings.CResult_SocketAddressSocketAddressParseErrorZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SocketAddressSocketAddressParseErrorZ ret_hu_conv = Result_SocketAddressSocketAddressParseErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SocketAddressSocketAddressParseErrorZ in the error state.
	 */
	public static Result_SocketAddressSocketAddressParseErrorZ err(SocketAddressParseError e) {
		long ret = bindings.CResult_SocketAddressSocketAddressParseErrorZ_err(e);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SocketAddressSocketAddressParseErrorZ ret_hu_conv = Result_SocketAddressSocketAddressParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_SocketAddressSocketAddressParseErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_SocketAddressSocketAddressParseErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_SocketAddressSocketAddressParseErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_SocketAddressSocketAddressParseErrorZ clone() {
		long ret = bindings.CResult_SocketAddressSocketAddressParseErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SocketAddressSocketAddressParseErrorZ ret_hu_conv = Result_SocketAddressSocketAddressParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
