package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_RecoverableSignatureNoneZ extends CommonBase {
	private Result_RecoverableSignatureNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_RecoverableSignatureNoneZ_free(ptr); } super.finalize();
	}

	static Result_RecoverableSignatureNoneZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_RecoverableSignatureNoneZ_result_ok(ptr)) {
			return new Result_RecoverableSignatureNoneZ_OK(null, ptr);
		} else {
			return new Result_RecoverableSignatureNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_RecoverableSignatureNoneZ_OK extends Result_RecoverableSignatureNoneZ {
		public final byte[] res;
		private Result_RecoverableSignatureNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_RecoverableSignatureNoneZ_get_ok(ptr);
		}
	}

	public static final class Result_RecoverableSignatureNoneZ_Err extends Result_RecoverableSignatureNoneZ {
		private Result_RecoverableSignatureNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_RecoverableSignatureNoneZ in the success state.
	 */
	public static Result_RecoverableSignatureNoneZ ok(byte[] arg) {
		long ret = bindings.CResult_RecoverableSignatureNoneZ_ok(arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RecoverableSignatureNoneZ ret_hu_conv = Result_RecoverableSignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_RecoverableSignatureNoneZ in the error state.
	 */
	public static Result_RecoverableSignatureNoneZ err() {
		long ret = bindings.CResult_RecoverableSignatureNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RecoverableSignatureNoneZ ret_hu_conv = Result_RecoverableSignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_RecoverableSignatureNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_RecoverableSignatureNoneZ clone() {
		long ret = bindings.CResult_RecoverableSignatureNoneZ_clone(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RecoverableSignatureNoneZ ret_hu_conv = Result_RecoverableSignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
