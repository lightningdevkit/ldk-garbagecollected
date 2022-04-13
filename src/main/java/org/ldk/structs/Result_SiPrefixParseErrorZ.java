package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_SiPrefixParseErrorZ extends CommonBase {
	private Result_SiPrefixParseErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_SiPrefixParseErrorZ_free(ptr); } super.finalize();
	}

	static Result_SiPrefixParseErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_SiPrefixParseErrorZ_is_ok(ptr)) {
			return new Result_SiPrefixParseErrorZ_OK(null, ptr);
		} else {
			return new Result_SiPrefixParseErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_SiPrefixParseErrorZ_OK extends Result_SiPrefixParseErrorZ {
		public final SiPrefix res;
		private Result_SiPrefixParseErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_SiPrefixParseErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_SiPrefixParseErrorZ_Err extends Result_SiPrefixParseErrorZ {
		public final ParseError err;
		private Result_SiPrefixParseErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_SiPrefixParseErrorZ_get_err(ptr);
			org.ldk.structs.ParseError err_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_SiPrefixParseErrorZ in the success state.
	 */
	public static Result_SiPrefixParseErrorZ ok(org.ldk.enums.SiPrefix o) {
		long ret = bindings.CResult_SiPrefixParseErrorZ_ok(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SiPrefixParseErrorZ ret_hu_conv = Result_SiPrefixParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SiPrefixParseErrorZ in the error state.
	 */
	public static Result_SiPrefixParseErrorZ err(ParseError e) {
		long ret = bindings.CResult_SiPrefixParseErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SiPrefixParseErrorZ ret_hu_conv = Result_SiPrefixParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_SiPrefixParseErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_SiPrefixParseErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_SiPrefixParseErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_SiPrefixParseErrorZ clone() {
		long ret = bindings.CResult_SiPrefixParseErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SiPrefixParseErrorZ ret_hu_conv = Result_SiPrefixParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
