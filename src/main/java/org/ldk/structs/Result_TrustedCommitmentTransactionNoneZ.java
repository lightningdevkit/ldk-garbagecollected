package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_TrustedCommitmentTransactionNoneZ extends CommonBase {
	private Result_TrustedCommitmentTransactionNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_TrustedCommitmentTransactionNoneZ_free(ptr); } super.finalize();
	}

	static Result_TrustedCommitmentTransactionNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_TrustedCommitmentTransactionNoneZ_is_ok(ptr)) {
			return new Result_TrustedCommitmentTransactionNoneZ_OK(null, ptr);
		} else {
			return new Result_TrustedCommitmentTransactionNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_TrustedCommitmentTransactionNoneZ_OK extends Result_TrustedCommitmentTransactionNoneZ {
		public final TrustedCommitmentTransaction res;
		private Result_TrustedCommitmentTransactionNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_TrustedCommitmentTransactionNoneZ_get_ok(ptr);
			TrustedCommitmentTransaction res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new TrustedCommitmentTransaction(null, res); }
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_TrustedCommitmentTransactionNoneZ_Err extends Result_TrustedCommitmentTransactionNoneZ {
		private Result_TrustedCommitmentTransactionNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_TrustedCommitmentTransactionNoneZ in the success state.
	 */
	public static Result_TrustedCommitmentTransactionNoneZ ok(TrustedCommitmentTransaction o) {
		long ret = bindings.CResult_TrustedCommitmentTransactionNoneZ_ok(o == null ? 0 : o.ptr & ~1);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TrustedCommitmentTransactionNoneZ ret_hu_conv = Result_TrustedCommitmentTransactionNoneZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
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
	public boolean is_ok() {
		boolean ret = bindings.CResult_TrustedCommitmentTransactionNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
