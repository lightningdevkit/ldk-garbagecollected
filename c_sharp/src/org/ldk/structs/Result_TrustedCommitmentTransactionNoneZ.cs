using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_TrustedCommitmentTransactionNoneZ : CommonBase {
	Result_TrustedCommitmentTransactionNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_TrustedCommitmentTransactionNoneZ() {
		if (ptr != 0) { bindings.CResult_TrustedCommitmentTransactionNoneZ_free(ptr); }
	}

	internal static Result_TrustedCommitmentTransactionNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_TrustedCommitmentTransactionNoneZ_is_ok(ptr)) {
			return new Result_TrustedCommitmentTransactionNoneZ_OK(null, ptr);
		} else {
			return new Result_TrustedCommitmentTransactionNoneZ_Err(null, ptr);
		}
	}
	public class Result_TrustedCommitmentTransactionNoneZ_OK : Result_TrustedCommitmentTransactionNoneZ {
		public readonly TrustedCommitmentTransaction res;
		internal Result_TrustedCommitmentTransactionNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_TrustedCommitmentTransactionNoneZ_get_ok(ptr);
			org.ldk.structs.TrustedCommitmentTransaction res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.TrustedCommitmentTransaction(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_TrustedCommitmentTransactionNoneZ_Err : Result_TrustedCommitmentTransactionNoneZ {
		internal Result_TrustedCommitmentTransactionNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_TrustedCommitmentTransactionNoneZ in the success state.
	 */
	public static Result_TrustedCommitmentTransactionNoneZ ok(org.ldk.structs.TrustedCommitmentTransaction o) {
		long ret = bindings.CResult_TrustedCommitmentTransactionNoneZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TrustedCommitmentTransactionNoneZ ret_hu_conv = Result_TrustedCommitmentTransactionNoneZ.constr_from_ptr(ret);
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
	 * Creates a new CResult_TrustedCommitmentTransactionNoneZ in the error state.
	 */
	public static Result_TrustedCommitmentTransactionNoneZ err() {
		long ret = bindings.CResult_TrustedCommitmentTransactionNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TrustedCommitmentTransactionNoneZ ret_hu_conv = Result_TrustedCommitmentTransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_TrustedCommitmentTransactionNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
