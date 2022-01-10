package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_COption_TypeZDecodeErrorZ extends CommonBase {
	private Result_COption_TypeZDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_COption_TypeZDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_COption_TypeZDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_COption_TypeZDecodeErrorZ_is_ok(ptr)) {
			return new Result_COption_TypeZDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_COption_TypeZDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_COption_TypeZDecodeErrorZ_OK extends Result_COption_TypeZDecodeErrorZ {
		public final Option_TypeZ res;
		private Result_COption_TypeZDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_COption_TypeZDecodeErrorZ_get_ok(ptr);
			Option_TypeZ res_hu_conv = Option_TypeZ.constr_from_ptr(res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_COption_TypeZDecodeErrorZ_Err extends Result_COption_TypeZDecodeErrorZ {
		public final DecodeError err;
		private Result_COption_TypeZDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_COption_TypeZDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new DecodeError(null, err); }
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_COption_TypeZDecodeErrorZ in the success state.
	 */
	public static Result_COption_TypeZDecodeErrorZ ok(Option_TypeZ o) {
		long ret = bindings.CResult_COption_TypeZDecodeErrorZ_ok(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_TypeZDecodeErrorZ ret_hu_conv = Result_COption_TypeZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_COption_TypeZDecodeErrorZ in the error state.
	 */
	public static Result_COption_TypeZDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_COption_TypeZDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_TypeZDecodeErrorZ ret_hu_conv = Result_COption_TypeZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_COption_TypeZDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_COption_TypeZDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_COption_TypeZDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_COption_TypeZDecodeErrorZ clone() {
		long ret = bindings.CResult_COption_TypeZDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_TypeZDecodeErrorZ ret_hu_conv = Result_COption_TypeZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
