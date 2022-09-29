package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_BlindedRouteNoneZ extends CommonBase {
	private Result_BlindedRouteNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_BlindedRouteNoneZ_free(ptr); } super.finalize();
	}

	static Result_BlindedRouteNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_BlindedRouteNoneZ_is_ok(ptr)) {
			return new Result_BlindedRouteNoneZ_OK(null, ptr);
		} else {
			return new Result_BlindedRouteNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_BlindedRouteNoneZ_OK extends Result_BlindedRouteNoneZ {
		public final BlindedRoute res;
		private Result_BlindedRouteNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_BlindedRouteNoneZ_get_ok(ptr);
			org.ldk.structs.BlindedRoute res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.BlindedRoute(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_BlindedRouteNoneZ_Err extends Result_BlindedRouteNoneZ {
		private Result_BlindedRouteNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_BlindedRouteNoneZ in the success state.
	 */
	public static Result_BlindedRouteNoneZ ok(BlindedRoute o) {
		long ret = bindings.CResult_BlindedRouteNoneZ_ok(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedRouteNoneZ ret_hu_conv = Result_BlindedRouteNoneZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
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
	 * Creates a new CResult_BlindedRouteNoneZ in the error state.
	 */
	public static Result_BlindedRouteNoneZ err() {
		long ret = bindings.CResult_BlindedRouteNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedRouteNoneZ ret_hu_conv = Result_BlindedRouteNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_BlindedRouteNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
