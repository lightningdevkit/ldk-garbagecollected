package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * Parameters for configuring [`Scorer`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ScoringParameters extends CommonBase {
	ScoringParameters(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ScoringParameters_free(ptr); }
	}

	/**
	 * A fixed penalty in msats to apply to each channel.
	 */
	public long get_base_penalty_msat() {
		long ret = bindings.ScoringParameters_get_base_penalty_msat(this.ptr);
		return ret;
	}

	/**
	 * A fixed penalty in msats to apply to each channel.
	 */
	public void set_base_penalty_msat(long val) {
		bindings.ScoringParameters_set_base_penalty_msat(this.ptr, val);
	}

	/**
	 * A penalty in msats to apply to a channel upon failure.
	 * 
	 * This may be reduced over time based on [`failure_penalty_half_life`].
	 * 
	 * [`failure_penalty_half_life`]: Self::failure_penalty_half_life
	 */
	public long get_failure_penalty_msat() {
		long ret = bindings.ScoringParameters_get_failure_penalty_msat(this.ptr);
		return ret;
	}

	/**
	 * A penalty in msats to apply to a channel upon failure.
	 * 
	 * This may be reduced over time based on [`failure_penalty_half_life`].
	 * 
	 * [`failure_penalty_half_life`]: Self::failure_penalty_half_life
	 */
	public void set_failure_penalty_msat(long val) {
		bindings.ScoringParameters_set_failure_penalty_msat(this.ptr, val);
	}

	/**
	 * The time needed before any accumulated channel failure penalties are cut in half.
	 */
	public long get_failure_penalty_half_life() {
		long ret = bindings.ScoringParameters_get_failure_penalty_half_life(this.ptr);
		return ret;
	}

	/**
	 * The time needed before any accumulated channel failure penalties are cut in half.
	 */
	public void set_failure_penalty_half_life(long val) {
		bindings.ScoringParameters_set_failure_penalty_half_life(this.ptr, val);
	}

	/**
	 * Constructs a new ScoringParameters given each field
	 */
	public static ScoringParameters of(long base_penalty_msat_arg, long failure_penalty_msat_arg, long failure_penalty_half_life_arg) {
		long ret = bindings.ScoringParameters_new(base_penalty_msat_arg, failure_penalty_msat_arg, failure_penalty_half_life_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		ScoringParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ScoringParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" ScoringParameters. See struct and individual field documentaiton for details on which values are used.
	 */
	public static ScoringParameters with_default() {
		long ret = bindings.ScoringParameters_default();
		if (ret >= 0 && ret <= 4096) { return null; }
		ScoringParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ScoringParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
