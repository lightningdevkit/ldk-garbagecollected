package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * [`Score`] implementation that provides reasonable default behavior.
 * 
 * Used to apply a fixed penalty to each channel, thus avoiding long paths when shorter paths with
 * slightly higher fees are available. Will further penalize channels that fail to relay payments.
 * 
 * See [module-level documentation] for usage and [`ScoringParameters`] for customization.
 * 
 * # Note
 * 
 * Mixing the `no-std` feature between serialization and deserialization results in undefined
 * behavior.
 * 
 * [module-level documentation]: crate::routing::scoring
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Scorer extends CommonBase {
	Scorer(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Scorer_free(ptr); }
	}

	/**
	 * Creates a new scorer using the given scoring parameters.
	 */
	public static Scorer of(ScoringParameters params) {
		long ret = bindings.Scorer_new(params == null ? 0 : params.ptr & ~1);
		Reference.reachabilityFence(params);
		if (ret >= 0 && ret <= 4096) { return null; }
		Scorer ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new Scorer(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" Scorer. See struct and individual field documentaiton for details on which values are used.
	 */
	public static Scorer with_default() {
		long ret = bindings.Scorer_default();
		if (ret >= 0 && ret <= 4096) { return null; }
		Scorer ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new Scorer(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Score which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Score must be freed before this_arg is
	 */
	public Score as_Score() {
		long ret = bindings.Scorer_as_Score(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Score ret_hu_conv = new Score(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the Scorer object into a byte array which can be read by Scorer_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Scorer_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a Scorer from a byte array, created by Scorer_write
	 */
	public static Result_ScorerDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Scorer_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ScorerDecodeErrorZ ret_hu_conv = Result_ScorerDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
