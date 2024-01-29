using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_WitnessNoneZ : CommonBase {
	Result_WitnessNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_WitnessNoneZ() {
		if (ptr != 0) { bindings.CResult_WitnessNoneZ_free(ptr); }
	}

	internal static Result_WitnessNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_WitnessNoneZ_is_ok(ptr)) {
			return new Result_WitnessNoneZ_OK(null, ptr);
		} else {
			return new Result_WitnessNoneZ_Err(null, ptr);
		}
	}
	public class Result_WitnessNoneZ_OK : Result_WitnessNoneZ {
		public readonly byte[] res;
		internal Result_WitnessNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_WitnessNoneZ_get_ok(ptr);
			byte[] res_conv = InternalUtils.decodeUint8Array(res);
			this.res = res_conv;
		}
	}

	public class Result_WitnessNoneZ_Err : Result_WitnessNoneZ {
		internal Result_WitnessNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_WitnessNoneZ in the success state.
	 */
	public static Result_WitnessNoneZ ok(byte[] o) {
		long ret = bindings.CResult_WitnessNoneZ_ok(InternalUtils.encodeUint8Array(o));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_WitnessNoneZ ret_hu_conv = Result_WitnessNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_WitnessNoneZ in the error state.
	 */
	public static Result_WitnessNoneZ err() {
		long ret = bindings.CResult_WitnessNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_WitnessNoneZ ret_hu_conv = Result_WitnessNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_WitnessNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_WitnessNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_WitnessNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_WitnessNoneZ clone() {
		long ret = bindings.CResult_WitnessNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_WitnessNoneZ ret_hu_conv = Result_WitnessNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
