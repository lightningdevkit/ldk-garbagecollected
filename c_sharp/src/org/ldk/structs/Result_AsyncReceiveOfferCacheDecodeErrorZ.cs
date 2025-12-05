using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_AsyncReceiveOfferCacheDecodeErrorZ : CommonBase {
	Result_AsyncReceiveOfferCacheDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_AsyncReceiveOfferCacheDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_AsyncReceiveOfferCacheDecodeErrorZ_free(ptr); }
	}

	internal static Result_AsyncReceiveOfferCacheDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_AsyncReceiveOfferCacheDecodeErrorZ_is_ok(ptr)) {
			return new Result_AsyncReceiveOfferCacheDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_AsyncReceiveOfferCacheDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_AsyncReceiveOfferCacheDecodeErrorZ_OK : Result_AsyncReceiveOfferCacheDecodeErrorZ {
		public readonly AsyncReceiveOfferCache res;
		internal Result_AsyncReceiveOfferCacheDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_AsyncReceiveOfferCacheDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.AsyncReceiveOfferCache res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.AsyncReceiveOfferCache(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_AsyncReceiveOfferCacheDecodeErrorZ_Err : Result_AsyncReceiveOfferCacheDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_AsyncReceiveOfferCacheDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_AsyncReceiveOfferCacheDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_AsyncReceiveOfferCacheDecodeErrorZ in the success state.
	 */
	public static org.ldk.structs.Result_AsyncReceiveOfferCacheDecodeErrorZ ok(org.ldk.structs.AsyncReceiveOfferCache o) {
		long ret = bindings.CResult_AsyncReceiveOfferCacheDecodeErrorZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_AsyncReceiveOfferCacheDecodeErrorZ ret_hu_conv = Result_AsyncReceiveOfferCacheDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
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
	 * Creates a new CResult_AsyncReceiveOfferCacheDecodeErrorZ in the error state.
	 */
	public static org.ldk.structs.Result_AsyncReceiveOfferCacheDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_AsyncReceiveOfferCacheDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_AsyncReceiveOfferCacheDecodeErrorZ ret_hu_conv = Result_AsyncReceiveOfferCacheDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_AsyncReceiveOfferCacheDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
