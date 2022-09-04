package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * All-encompassing standard error type that processing can return
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class GraphSyncError extends CommonBase {
	private GraphSyncError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.GraphSyncError_free(ptr); }
	}
	static GraphSyncError constr_from_ptr(long ptr) {
		bindings.LDKGraphSyncError raw_val = bindings.LDKGraphSyncError_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKGraphSyncError.DecodeError.class) {
			return new DecodeError(ptr, (bindings.LDKGraphSyncError.DecodeError)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKGraphSyncError.LightningError.class) {
			return new LightningError(ptr, (bindings.LDKGraphSyncError.LightningError)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * Error trying to read the update data, typically due to an erroneous data length indication
	 * that is greater than the actual amount of data provided
	 */
	public final static class DecodeError extends GraphSyncError {
		public final org.ldk.structs.DecodeError decode_error;
		private DecodeError(long ptr, bindings.LDKGraphSyncError.DecodeError obj) {
			super(null, ptr);
			long decode_error = obj.decode_error;
			org.ldk.structs.DecodeError decode_error_hu_conv = null; if (decode_error < 0 || decode_error > 4096) { decode_error_hu_conv = new org.ldk.structs.DecodeError(null, decode_error); }
			if (decode_error_hu_conv != null) { decode_error_hu_conv.ptrs_to.add(this); };
			this.decode_error = decode_error_hu_conv;
		}
	}
	/**
	 * Error applying the patch to the network graph, usually the result of updates that are too
	 * old or missing prerequisite data to the application of updates out of order
	 */
	public final static class LightningError extends GraphSyncError {
		public final org.ldk.structs.LightningError lightning_error;
		private LightningError(long ptr, bindings.LDKGraphSyncError.LightningError obj) {
			super(null, ptr);
			long lightning_error = obj.lightning_error;
			org.ldk.structs.LightningError lightning_error_hu_conv = null; if (lightning_error < 0 || lightning_error > 4096) { lightning_error_hu_conv = new org.ldk.structs.LightningError(null, lightning_error); }
			if (lightning_error_hu_conv != null) { lightning_error_hu_conv.ptrs_to.add(this); };
			this.lightning_error = lightning_error_hu_conv;
		}
	}
	long clone_ptr() {
		long ret = bindings.GraphSyncError_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the GraphSyncError
	 */
	public GraphSyncError clone() {
		long ret = bindings.GraphSyncError_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.GraphSyncError ret_hu_conv = org.ldk.structs.GraphSyncError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DecodeError-variant GraphSyncError
	 */
	public static GraphSyncError decode_error(DecodeError a) {
		long ret = bindings.GraphSyncError_decode_error(a == null ? 0 : a.ptr & ~1);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.GraphSyncError ret_hu_conv = org.ldk.structs.GraphSyncError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new LightningError-variant GraphSyncError
	 */
	public static GraphSyncError lightning_error(LightningError a) {
		long ret = bindings.GraphSyncError_lightning_error(a == null ? 0 : a.ptr & ~1);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.GraphSyncError ret_hu_conv = org.ldk.structs.GraphSyncError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}
