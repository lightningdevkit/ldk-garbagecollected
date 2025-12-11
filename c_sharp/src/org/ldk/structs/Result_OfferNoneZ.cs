using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_OfferNoneZ : CommonBase {
	Result_OfferNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_OfferNoneZ() {
		if (ptr != 0) { bindings.CResult_OfferNoneZ_free(ptr); }
	}

	internal static Result_OfferNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_OfferNoneZ_is_ok(ptr)) {
			return new Result_OfferNoneZ_OK(null, ptr);
		} else {
			return new Result_OfferNoneZ_Err(null, ptr);
		}
	}
	public class Result_OfferNoneZ_OK : Result_OfferNoneZ {
		public readonly Offer res;
		internal Result_OfferNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_OfferNoneZ_get_ok(ptr);
			org.ldk.structs.Offer res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.Offer(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_OfferNoneZ_Err : Result_OfferNoneZ {
		internal Result_OfferNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_OfferNoneZ in the success state.
	 */
	public static org.ldk.structs.Result_OfferNoneZ ok(org.ldk.structs.Offer o) {
		long ret = bindings.CResult_OfferNoneZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OfferNoneZ ret_hu_conv = Result_OfferNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_OfferNoneZ in the error state.
	 */
	public static org.ldk.structs.Result_OfferNoneZ err() {
		long ret = bindings.CResult_OfferNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OfferNoneZ ret_hu_conv = Result_OfferNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_OfferNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_OfferNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_OfferNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Result_OfferNoneZ clone() {
		long ret = bindings.CResult_OfferNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OfferNoneZ ret_hu_conv = Result_OfferNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
