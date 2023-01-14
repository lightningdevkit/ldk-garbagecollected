using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_NetAddressDecodeErrorZ : CommonBase {
	Result_NetAddressDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_NetAddressDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_NetAddressDecodeErrorZ_free(ptr); }
	}

	internal static Result_NetAddressDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NetAddressDecodeErrorZ_is_ok(ptr)) {
			return new Result_NetAddressDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_NetAddressDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_NetAddressDecodeErrorZ_OK : Result_NetAddressDecodeErrorZ {
		public readonly NetAddress res;
		internal Result_NetAddressDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_NetAddressDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.NetAddress res_hu_conv = org.ldk.structs.NetAddress.constr_from_ptr(res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_NetAddressDecodeErrorZ_Err : Result_NetAddressDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_NetAddressDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_NetAddressDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_NetAddressDecodeErrorZ in the success state.
	 */
	public static Result_NetAddressDecodeErrorZ ok(org.ldk.structs.NetAddress o) {
		long ret = bindings.CResult_NetAddressDecodeErrorZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NetAddressDecodeErrorZ ret_hu_conv = Result_NetAddressDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NetAddressDecodeErrorZ in the error state.
	 */
	public static Result_NetAddressDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_NetAddressDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NetAddressDecodeErrorZ ret_hu_conv = Result_NetAddressDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_NetAddressDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_NetAddressDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_NetAddressDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_NetAddressDecodeErrorZ clone() {
		long ret = bindings.CResult_NetAddressDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NetAddressDecodeErrorZ ret_hu_conv = Result_NetAddressDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
