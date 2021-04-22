package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_SiPrefixNoneZ extends CommonBase {
	private Result_SiPrefixNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_SiPrefixNoneZ_free(ptr); } super.finalize();
	}

	static Result_SiPrefixNoneZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_SiPrefixNoneZ_result_ok(ptr)) {
			return new Result_SiPrefixNoneZ_OK(null, ptr);
		} else {
			return new Result_SiPrefixNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_SiPrefixNoneZ_OK extends Result_SiPrefixNoneZ {
		public final LDKSiPrefix res;
		private Result_SiPrefixNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_SiPrefixNoneZ_get_ok(ptr);
		}
	}

	public static final class Result_SiPrefixNoneZ_Err extends Result_SiPrefixNoneZ {
		private Result_SiPrefixNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_SiPrefixNoneZ in the success state.
	 */
	public static Result_SiPrefixNoneZ constructor_ok(LDKSiPrefix o) {
		long ret = bindings.CResult_SiPrefixNoneZ_ok(o);
		Result_SiPrefixNoneZ ret_hu_conv = Result_SiPrefixNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SiPrefixNoneZ in the error state.
	 */
	public static Result_SiPrefixNoneZ constructor_err() {
		long ret = bindings.CResult_SiPrefixNoneZ_err();
		Result_SiPrefixNoneZ ret_hu_conv = Result_SiPrefixNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SiPrefixNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_SiPrefixNoneZ clone() {
		long ret = bindings.CResult_SiPrefixNoneZ_clone(this.ptr);
		Result_SiPrefixNoneZ ret_hu_conv = Result_SiPrefixNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
