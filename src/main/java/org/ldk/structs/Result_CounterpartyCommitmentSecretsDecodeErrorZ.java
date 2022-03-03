package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_CounterpartyCommitmentSecretsDecodeErrorZ extends CommonBase {
	private Result_CounterpartyCommitmentSecretsDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CounterpartyCommitmentSecretsDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_CounterpartyCommitmentSecretsDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CounterpartyCommitmentSecretsDecodeErrorZ_is_ok(ptr)) {
			return new Result_CounterpartyCommitmentSecretsDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_CounterpartyCommitmentSecretsDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_CounterpartyCommitmentSecretsDecodeErrorZ_OK extends Result_CounterpartyCommitmentSecretsDecodeErrorZ {
		public final CounterpartyCommitmentSecrets res;
		private Result_CounterpartyCommitmentSecretsDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_CounterpartyCommitmentSecretsDecodeErrorZ_get_ok(ptr);
			CounterpartyCommitmentSecrets res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new CounterpartyCommitmentSecrets(null, res); }
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_CounterpartyCommitmentSecretsDecodeErrorZ_Err extends Result_CounterpartyCommitmentSecretsDecodeErrorZ {
		public final DecodeError err;
		private Result_CounterpartyCommitmentSecretsDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_CounterpartyCommitmentSecretsDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new DecodeError(null, err); }
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_CounterpartyCommitmentSecretsDecodeErrorZ in the success state.
	 */
	public static Result_CounterpartyCommitmentSecretsDecodeErrorZ ok(CounterpartyCommitmentSecrets o) {
		long ret = bindings.CResult_CounterpartyCommitmentSecretsDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CounterpartyCommitmentSecretsDecodeErrorZ ret_hu_conv = Result_CounterpartyCommitmentSecretsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CounterpartyCommitmentSecretsDecodeErrorZ in the error state.
	 */
	public static Result_CounterpartyCommitmentSecretsDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_CounterpartyCommitmentSecretsDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CounterpartyCommitmentSecretsDecodeErrorZ ret_hu_conv = Result_CounterpartyCommitmentSecretsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_CounterpartyCommitmentSecretsDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_CounterpartyCommitmentSecretsDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_CounterpartyCommitmentSecretsDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CounterpartyCommitmentSecretsDecodeErrorZ clone() {
		long ret = bindings.CResult_CounterpartyCommitmentSecretsDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CounterpartyCommitmentSecretsDecodeErrorZ ret_hu_conv = Result_CounterpartyCommitmentSecretsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
