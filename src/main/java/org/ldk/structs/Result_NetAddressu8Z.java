package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_NetAddressu8Z extends CommonBase {
	private Result_NetAddressu8Z(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NetAddressu8Z_free(ptr); } super.finalize();
	}

	static Result_NetAddressu8Z constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_NetAddressu8Z_result_ok(ptr)) {
			return new Result_NetAddressu8Z_OK(null, ptr);
		} else {
			return new Result_NetAddressu8Z_Err(null, ptr);
		}
	}
	public static final class Result_NetAddressu8Z_OK extends Result_NetAddressu8Z {
		public final NetAddress res;
		private Result_NetAddressu8Z_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_NetAddressu8Z_get_ok(ptr);
			NetAddress res_hu_conv = NetAddress.constr_from_ptr(res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_NetAddressu8Z_Err extends Result_NetAddressu8Z {
		public final byte err;
		private Result_NetAddressu8Z_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_NetAddressu8Z_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_NetAddressu8Z in the success state.
	 */
	public static Result_NetAddressu8Z ok(NetAddress o) {
		long ret = bindings.CResult_NetAddressu8Z_ok(o.ptr);
		if (ret < 1024) { return null; }
		Result_NetAddressu8Z ret_hu_conv = Result_NetAddressu8Z.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NetAddressu8Z in the error state.
	 */
	public static Result_NetAddressu8Z err(byte e) {
		long ret = bindings.CResult_NetAddressu8Z_err(e);
		if (ret < 1024) { return null; }
		Result_NetAddressu8Z ret_hu_conv = Result_NetAddressu8Z.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NetAddressu8Z which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_NetAddressu8Z clone() {
		long ret = bindings.CResult_NetAddressu8Z_clone(this.ptr);
		if (ret < 1024) { return null; }
		Result_NetAddressu8Z ret_hu_conv = Result_NetAddressu8Z.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
