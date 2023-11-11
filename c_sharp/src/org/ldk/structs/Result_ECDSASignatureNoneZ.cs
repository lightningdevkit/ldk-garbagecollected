using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_ECDSASignatureNoneZ : CommonBase {
	Result_ECDSASignatureNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_ECDSASignatureNoneZ() {
		if (ptr != 0) { bindings.CResult_ECDSASignatureNoneZ_free(ptr); }
	}

	internal static Result_ECDSASignatureNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ECDSASignatureNoneZ_is_ok(ptr)) {
			return new Result_ECDSASignatureNoneZ_OK(null, ptr);
		} else {
			return new Result_ECDSASignatureNoneZ_Err(null, ptr);
		}
	}
	public class Result_ECDSASignatureNoneZ_OK : Result_ECDSASignatureNoneZ {
		public readonly byte[] res;
		internal Result_ECDSASignatureNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_ECDSASignatureNoneZ_get_ok(ptr);
			byte[] res_conv = InternalUtils.decodeUint8Array(res);
			this.res = res_conv;
		}
	}

	public class Result_ECDSASignatureNoneZ_Err : Result_ECDSASignatureNoneZ {
		internal Result_ECDSASignatureNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_ECDSASignatureNoneZ in the success state.
	 */
	public static Result_ECDSASignatureNoneZ ok(byte[] o) {
		long ret = bindings.CResult_ECDSASignatureNoneZ_ok(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(o, 64)));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ECDSASignatureNoneZ ret_hu_conv = Result_ECDSASignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ECDSASignatureNoneZ in the error state.
	 */
	public static Result_ECDSASignatureNoneZ err() {
		long ret = bindings.CResult_ECDSASignatureNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ECDSASignatureNoneZ ret_hu_conv = Result_ECDSASignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_ECDSASignatureNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_ECDSASignatureNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_ECDSASignatureNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ECDSASignatureNoneZ clone() {
		long ret = bindings.CResult_ECDSASignatureNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ECDSASignatureNoneZ ret_hu_conv = Result_ECDSASignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
