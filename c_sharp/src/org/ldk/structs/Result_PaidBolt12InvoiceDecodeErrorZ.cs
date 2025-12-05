using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_PaidBolt12InvoiceDecodeErrorZ : CommonBase {
	Result_PaidBolt12InvoiceDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_PaidBolt12InvoiceDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_PaidBolt12InvoiceDecodeErrorZ_free(ptr); }
	}

	internal static Result_PaidBolt12InvoiceDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PaidBolt12InvoiceDecodeErrorZ_is_ok(ptr)) {
			return new Result_PaidBolt12InvoiceDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_PaidBolt12InvoiceDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_PaidBolt12InvoiceDecodeErrorZ_OK : Result_PaidBolt12InvoiceDecodeErrorZ {
		public readonly PaidBolt12Invoice res;
		internal Result_PaidBolt12InvoiceDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_PaidBolt12InvoiceDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.PaidBolt12Invoice res_hu_conv = org.ldk.structs.PaidBolt12Invoice.constr_from_ptr(res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_PaidBolt12InvoiceDecodeErrorZ_Err : Result_PaidBolt12InvoiceDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_PaidBolt12InvoiceDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_PaidBolt12InvoiceDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PaidBolt12InvoiceDecodeErrorZ in the success state.
	 */
	public static org.ldk.structs.Result_PaidBolt12InvoiceDecodeErrorZ ok(org.ldk.structs.PaidBolt12Invoice o) {
		long ret = bindings.CResult_PaidBolt12InvoiceDecodeErrorZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaidBolt12InvoiceDecodeErrorZ ret_hu_conv = Result_PaidBolt12InvoiceDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaidBolt12InvoiceDecodeErrorZ in the error state.
	 */
	public static org.ldk.structs.Result_PaidBolt12InvoiceDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_PaidBolt12InvoiceDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaidBolt12InvoiceDecodeErrorZ ret_hu_conv = Result_PaidBolt12InvoiceDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_PaidBolt12InvoiceDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_PaidBolt12InvoiceDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PaidBolt12InvoiceDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Result_PaidBolt12InvoiceDecodeErrorZ clone() {
		long ret = bindings.CResult_PaidBolt12InvoiceDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaidBolt12InvoiceDecodeErrorZ ret_hu_conv = Result_PaidBolt12InvoiceDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
