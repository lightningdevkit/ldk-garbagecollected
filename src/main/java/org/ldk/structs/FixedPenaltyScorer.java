package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * [`Score`] implementation that uses a fixed penalty.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class FixedPenaltyScorer extends CommonBase {
	FixedPenaltyScorer(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.FixedPenaltyScorer_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.FixedPenaltyScorer_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the FixedPenaltyScorer
	 */
	public FixedPenaltyScorer clone() {
		long ret = bindings.FixedPenaltyScorer_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		FixedPenaltyScorer ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new FixedPenaltyScorer(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the FixedPenaltyScorer object into a byte array which can be read by FixedPenaltyScorer_read
	 */
	public byte[] write() {
		byte[] ret = bindings.FixedPenaltyScorer_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a FixedPenaltyScorer from a byte array, created by FixedPenaltyScorer_write
	 */
	public static Result_FixedPenaltyScorerDecodeErrorZ read(byte[] ser) {
		long ret = bindings.FixedPenaltyScorer_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_FixedPenaltyScorerDecodeErrorZ ret_hu_conv = Result_FixedPenaltyScorerDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new scorer using `penalty_msat`.
	 */
	public static FixedPenaltyScorer with_penalty(long penalty_msat) {
		long ret = bindings.FixedPenaltyScorer_with_penalty(penalty_msat);
		Reference.reachabilityFence(penalty_msat);
		if (ret >= 0 && ret <= 4096) { return null; }
		FixedPenaltyScorer ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new FixedPenaltyScorer(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Score which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Score must be freed before this_arg is
	 */
	public Score as_Score() {
		long ret = bindings.FixedPenaltyScorer_as_Score(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Score ret_hu_conv = new Score(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
