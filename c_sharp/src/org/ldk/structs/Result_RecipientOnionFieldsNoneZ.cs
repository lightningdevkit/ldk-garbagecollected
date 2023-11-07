using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_RecipientOnionFieldsNoneZ : CommonBase {
	Result_RecipientOnionFieldsNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_RecipientOnionFieldsNoneZ() {
		if (ptr != 0) { bindings.CResult_RecipientOnionFieldsNoneZ_free(ptr); }
	}

	internal static Result_RecipientOnionFieldsNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_RecipientOnionFieldsNoneZ_is_ok(ptr)) {
			return new Result_RecipientOnionFieldsNoneZ_OK(null, ptr);
		} else {
			return new Result_RecipientOnionFieldsNoneZ_Err(null, ptr);
		}
	}
	public class Result_RecipientOnionFieldsNoneZ_OK : Result_RecipientOnionFieldsNoneZ {
		public readonly RecipientOnionFields res;
		internal Result_RecipientOnionFieldsNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_RecipientOnionFieldsNoneZ_get_ok(ptr);
			org.ldk.structs.RecipientOnionFields res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.RecipientOnionFields(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_RecipientOnionFieldsNoneZ_Err : Result_RecipientOnionFieldsNoneZ {
		internal Result_RecipientOnionFieldsNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_RecipientOnionFieldsNoneZ in the success state.
	 */
	public static Result_RecipientOnionFieldsNoneZ ok(org.ldk.structs.RecipientOnionFields o) {
		long ret = bindings.CResult_RecipientOnionFieldsNoneZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RecipientOnionFieldsNoneZ ret_hu_conv = Result_RecipientOnionFieldsNoneZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_RecipientOnionFieldsNoneZ in the error state.
	 */
	public static Result_RecipientOnionFieldsNoneZ err() {
		long ret = bindings.CResult_RecipientOnionFieldsNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RecipientOnionFieldsNoneZ ret_hu_conv = Result_RecipientOnionFieldsNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_RecipientOnionFieldsNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_RecipientOnionFieldsNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_RecipientOnionFieldsNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_RecipientOnionFieldsNoneZ clone() {
		long ret = bindings.CResult_RecipientOnionFieldsNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RecipientOnionFieldsNoneZ ret_hu_conv = Result_RecipientOnionFieldsNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
