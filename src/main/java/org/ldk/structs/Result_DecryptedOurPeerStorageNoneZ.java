package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_DecryptedOurPeerStorageNoneZ extends CommonBase {
	private Result_DecryptedOurPeerStorageNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_DecryptedOurPeerStorageNoneZ_free(ptr); } super.finalize();
	}

	protected void force_free() {
		if (ptr != 0) { bindings.CResult_DecryptedOurPeerStorageNoneZ_free(ptr); ptr = 0; }
	}

	static Result_DecryptedOurPeerStorageNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_DecryptedOurPeerStorageNoneZ_is_ok(ptr)) {
			return new Result_DecryptedOurPeerStorageNoneZ_OK(null, ptr);
		} else {
			return new Result_DecryptedOurPeerStorageNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_DecryptedOurPeerStorageNoneZ_OK extends Result_DecryptedOurPeerStorageNoneZ {
		public final DecryptedOurPeerStorage res;
		private Result_DecryptedOurPeerStorageNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_DecryptedOurPeerStorageNoneZ_get_ok(ptr);
			org.ldk.structs.DecryptedOurPeerStorage res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.DecryptedOurPeerStorage(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_DecryptedOurPeerStorageNoneZ_Err extends Result_DecryptedOurPeerStorageNoneZ {
		private Result_DecryptedOurPeerStorageNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_DecryptedOurPeerStorageNoneZ in the success state.
	 */
	public static Result_DecryptedOurPeerStorageNoneZ ok(byte[] o_data) {
		long ret = bindings.CResult_DecryptedOurPeerStorageNoneZ_ok(bindings.DecryptedOurPeerStorage_new(o_data));
		Reference.reachabilityFence(o_data);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_DecryptedOurPeerStorageNoneZ ret_hu_conv = Result_DecryptedOurPeerStorageNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_DecryptedOurPeerStorageNoneZ in the error state.
	 */
	public static Result_DecryptedOurPeerStorageNoneZ err() {
		long ret = bindings.CResult_DecryptedOurPeerStorageNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_DecryptedOurPeerStorageNoneZ ret_hu_conv = Result_DecryptedOurPeerStorageNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_DecryptedOurPeerStorageNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
