using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * [`ScoreLookUp`] implementation that uses a fixed penalty.
 */
public class FixedPenaltyScorer : CommonBase {
	internal FixedPenaltyScorer(object _dummy, long ptr) : base(ptr) { }
	~FixedPenaltyScorer() {
		if (ptr != 0) { bindings.FixedPenaltyScorer_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.FixedPenaltyScorer_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the FixedPenaltyScorer
	 */
	public FixedPenaltyScorer clone() {
		long ret = bindings.FixedPenaltyScorer_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FixedPenaltyScorer ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.FixedPenaltyScorer(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new scorer using `penalty_msat`.
	 */
	public static FixedPenaltyScorer with_penalty(long penalty_msat) {
		long ret = bindings.FixedPenaltyScorer_with_penalty(penalty_msat);
		GC.KeepAlive(penalty_msat);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FixedPenaltyScorer ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.FixedPenaltyScorer(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new ScoreLookUp which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ScoreLookUp must be freed before this_arg is
	 */
	public ScoreLookUp as_ScoreLookUp() {
		long ret = bindings.FixedPenaltyScorer_as_ScoreLookUp(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ScoreLookUp ret_hu_conv = new ScoreLookUp(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new ScoreUpdate which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ScoreUpdate must be freed before this_arg is
	 */
	public ScoreUpdate as_ScoreUpdate() {
		long ret = bindings.FixedPenaltyScorer_as_ScoreUpdate(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ScoreUpdate ret_hu_conv = new ScoreUpdate(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the FixedPenaltyScorer object into a byte array which can be read by FixedPenaltyScorer_read
	 */
	public byte[] write() {
		long ret = bindings.FixedPenaltyScorer_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a FixedPenaltyScorer from a byte array, created by FixedPenaltyScorer_write
	 */
	public static Result_FixedPenaltyScorerDecodeErrorZ read(byte[] ser, long arg) {
		long ret = bindings.FixedPenaltyScorer_read(InternalUtils.encodeUint8Array(ser), arg);
		GC.KeepAlive(ser);
		GC.KeepAlive(arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_FixedPenaltyScorerDecodeErrorZ ret_hu_conv = Result_FixedPenaltyScorerDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
