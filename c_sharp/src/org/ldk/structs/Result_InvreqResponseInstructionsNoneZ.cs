using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_InvreqResponseInstructionsNoneZ : CommonBase {
	Result_InvreqResponseInstructionsNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_InvreqResponseInstructionsNoneZ() {
		if (ptr != 0) { bindings.CResult_InvreqResponseInstructionsNoneZ_free(ptr); }
	}

	internal static Result_InvreqResponseInstructionsNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_InvreqResponseInstructionsNoneZ_is_ok(ptr)) {
			return new Result_InvreqResponseInstructionsNoneZ_OK(null, ptr);
		} else {
			return new Result_InvreqResponseInstructionsNoneZ_Err(null, ptr);
		}
	}
	public class Result_InvreqResponseInstructionsNoneZ_OK : Result_InvreqResponseInstructionsNoneZ {
		public readonly InvreqResponseInstructions res;
		internal Result_InvreqResponseInstructionsNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_InvreqResponseInstructionsNoneZ_get_ok(ptr);
			org.ldk.structs.InvreqResponseInstructions res_hu_conv = org.ldk.structs.InvreqResponseInstructions.constr_from_ptr(res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_InvreqResponseInstructionsNoneZ_Err : Result_InvreqResponseInstructionsNoneZ {
		internal Result_InvreqResponseInstructionsNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_InvreqResponseInstructionsNoneZ in the success state.
	 */
	public static org.ldk.structs.Result_InvreqResponseInstructionsNoneZ ok(org.ldk.structs.InvreqResponseInstructions o) {
		long ret = bindings.CResult_InvreqResponseInstructionsNoneZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvreqResponseInstructionsNoneZ ret_hu_conv = Result_InvreqResponseInstructionsNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_InvreqResponseInstructionsNoneZ in the error state.
	 */
	public static org.ldk.structs.Result_InvreqResponseInstructionsNoneZ err() {
		long ret = bindings.CResult_InvreqResponseInstructionsNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvreqResponseInstructionsNoneZ ret_hu_conv = Result_InvreqResponseInstructionsNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_InvreqResponseInstructionsNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
