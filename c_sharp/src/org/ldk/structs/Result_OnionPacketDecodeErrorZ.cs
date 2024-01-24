using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_OnionPacketDecodeErrorZ : CommonBase {
	Result_OnionPacketDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_OnionPacketDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_OnionPacketDecodeErrorZ_free(ptr); }
	}

	internal static Result_OnionPacketDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_OnionPacketDecodeErrorZ_is_ok(ptr)) {
			return new Result_OnionPacketDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_OnionPacketDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_OnionPacketDecodeErrorZ_OK : Result_OnionPacketDecodeErrorZ {
		public readonly OnionPacket res;
		internal Result_OnionPacketDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_OnionPacketDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.OnionPacket res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.OnionPacket(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_OnionPacketDecodeErrorZ_Err : Result_OnionPacketDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_OnionPacketDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_OnionPacketDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_OnionPacketDecodeErrorZ in the success state.
	 */
	public static Result_OnionPacketDecodeErrorZ ok(org.ldk.structs.OnionPacket o) {
		long ret = bindings.CResult_OnionPacketDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OnionPacketDecodeErrorZ ret_hu_conv = Result_OnionPacketDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_OnionPacketDecodeErrorZ in the error state.
	 */
	public static Result_OnionPacketDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_OnionPacketDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OnionPacketDecodeErrorZ ret_hu_conv = Result_OnionPacketDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_OnionPacketDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_OnionPacketDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_OnionPacketDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_OnionPacketDecodeErrorZ clone() {
		long ret = bindings.CResult_OnionPacketDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OnionPacketDecodeErrorZ ret_hu_conv = Result_OnionPacketDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
