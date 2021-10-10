package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_ShutdownScriptInvalidShutdownScriptZ extends CommonBase {
	private Result_ShutdownScriptInvalidShutdownScriptZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_free(ptr); } super.finalize();
	}

	static Result_ShutdownScriptInvalidShutdownScriptZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ShutdownScriptInvalidShutdownScriptZ_result_ok(ptr)) {
			return new Result_ShutdownScriptInvalidShutdownScriptZ_OK(null, ptr);
		} else {
			return new Result_ShutdownScriptInvalidShutdownScriptZ_Err(null, ptr);
		}
	}
	public static final class Result_ShutdownScriptInvalidShutdownScriptZ_OK extends Result_ShutdownScriptInvalidShutdownScriptZ {
		public final ShutdownScript res;
		private Result_ShutdownScriptInvalidShutdownScriptZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_ShutdownScriptInvalidShutdownScriptZ_get_ok(ptr);
			ShutdownScript res_hu_conv = new ShutdownScript(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ShutdownScriptInvalidShutdownScriptZ_Err extends Result_ShutdownScriptInvalidShutdownScriptZ {
		public final InvalidShutdownScript err;
		private Result_ShutdownScriptInvalidShutdownScriptZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_ShutdownScriptInvalidShutdownScriptZ_get_err(ptr);
			InvalidShutdownScript err_hu_conv = new InvalidShutdownScript(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_ShutdownScriptInvalidShutdownScriptZ in the success state.
	 */
	public static Result_ShutdownScriptInvalidShutdownScriptZ ok(ShutdownScript o) {
		long ret = bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_ok(o == null ? 0 : o.ptr & ~1);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_ShutdownScriptInvalidShutdownScriptZ ret_hu_conv = Result_ShutdownScriptInvalidShutdownScriptZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ShutdownScriptInvalidShutdownScriptZ in the error state.
	 */
	public static Result_ShutdownScriptInvalidShutdownScriptZ err(byte[] e_script_arg) {
		long ret = bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_err(bindings.InvalidShutdownScript_new(e_script_arg));
		if (ret >= 0 && ret < 1024) { return null; }
		Result_ShutdownScriptInvalidShutdownScriptZ ret_hu_conv = Result_ShutdownScriptInvalidShutdownScriptZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
