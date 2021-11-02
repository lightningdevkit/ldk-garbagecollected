package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_TxCreationKeysErrorZ extends CommonBase {
	private Result_TxCreationKeysErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_TxCreationKeysErrorZ_free(ptr); } super.finalize();
	}

	static Result_TxCreationKeysErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_TxCreationKeysErrorZ_result_ok(ptr)) {
			return new Result_TxCreationKeysErrorZ_OK(null, ptr);
		} else {
			return new Result_TxCreationKeysErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_TxCreationKeysErrorZ_OK extends Result_TxCreationKeysErrorZ {
		public final TxCreationKeys res;
		private Result_TxCreationKeysErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_TxCreationKeysErrorZ_get_ok(ptr);
			TxCreationKeys res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new TxCreationKeys(null, res); }
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_TxCreationKeysErrorZ_Err extends Result_TxCreationKeysErrorZ {
		public final Secp256k1Error err;
		private Result_TxCreationKeysErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_TxCreationKeysErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_TxCreationKeysErrorZ in the success state.
	 */
	public static Result_TxCreationKeysErrorZ ok(TxCreationKeys o) {
		long ret = bindings.CResult_TxCreationKeysErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxCreationKeysErrorZ ret_hu_conv = Result_TxCreationKeysErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_TxCreationKeysErrorZ in the error state.
	 */
	public static Result_TxCreationKeysErrorZ err(org.ldk.enums.Secp256k1Error e) {
		long ret = bindings.CResult_TxCreationKeysErrorZ_err(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxCreationKeysErrorZ ret_hu_conv = Result_TxCreationKeysErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_TxCreationKeysErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_TxCreationKeysErrorZ clone() {
		long ret = bindings.CResult_TxCreationKeysErrorZ_clone(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxCreationKeysErrorZ ret_hu_conv = Result_TxCreationKeysErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
