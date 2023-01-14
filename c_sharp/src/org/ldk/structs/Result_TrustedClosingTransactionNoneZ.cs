using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_TrustedClosingTransactionNoneZ : CommonBase {
	Result_TrustedClosingTransactionNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_TrustedClosingTransactionNoneZ() {
		if (ptr != 0) { bindings.CResult_TrustedClosingTransactionNoneZ_free(ptr); }
	}

	internal static Result_TrustedClosingTransactionNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_TrustedClosingTransactionNoneZ_is_ok(ptr)) {
			return new Result_TrustedClosingTransactionNoneZ_OK(null, ptr);
		} else {
			return new Result_TrustedClosingTransactionNoneZ_Err(null, ptr);
		}
	}
	public class Result_TrustedClosingTransactionNoneZ_OK : Result_TrustedClosingTransactionNoneZ {
		public readonly TrustedClosingTransaction res;
		internal Result_TrustedClosingTransactionNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_TrustedClosingTransactionNoneZ_get_ok(ptr);
			org.ldk.structs.TrustedClosingTransaction res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.TrustedClosingTransaction(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_TrustedClosingTransactionNoneZ_Err : Result_TrustedClosingTransactionNoneZ {
		internal Result_TrustedClosingTransactionNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_TrustedClosingTransactionNoneZ in the success state.
	 */
	public static Result_TrustedClosingTransactionNoneZ ok(org.ldk.structs.TrustedClosingTransaction o) {
		long ret = bindings.CResult_TrustedClosingTransactionNoneZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TrustedClosingTransactionNoneZ ret_hu_conv = Result_TrustedClosingTransactionNoneZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid ret_hu_conv being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after ret_hu_conv call, o is reset to null and is now a dummy object.
		o.ptr = 0;;
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_TrustedClosingTransactionNoneZ in the error state.
	 */
	public static Result_TrustedClosingTransactionNoneZ err() {
		long ret = bindings.CResult_TrustedClosingTransactionNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TrustedClosingTransactionNoneZ ret_hu_conv = Result_TrustedClosingTransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_TrustedClosingTransactionNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
