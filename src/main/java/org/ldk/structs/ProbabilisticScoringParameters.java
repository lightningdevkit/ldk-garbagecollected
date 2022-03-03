package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Parameters for configuring [`ProbabilisticScorer`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ProbabilisticScoringParameters extends CommonBase {
	ProbabilisticScoringParameters(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ProbabilisticScoringParameters_free(ptr); }
	}

	/**
	 * A multiplier used to determine the amount in msats willing to be paid to avoid routing
	 * through a channel, as per multiplying by the negative `log10` of the channel's success
	 * probability for a payment.
	 * 
	 * The success probability is determined by the effective channel capacity, the payment amount,
	 * and knowledge learned from prior successful and unsuccessful payments. The lower bound of
	 * the success probability is 0.01, effectively limiting the penalty to the range
	 * `0..=2*liquidity_penalty_multiplier_msat`. The knowledge learned is decayed over time based
	 * on [`liquidity_offset_half_life`].
	 * 
	 * Default value: 10,000 msat
	 * 
	 * [`liquidity_offset_half_life`]: Self::liquidity_offset_half_life
	 */
	public long get_liquidity_penalty_multiplier_msat() {
		long ret = bindings.ProbabilisticScoringParameters_get_liquidity_penalty_multiplier_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A multiplier used to determine the amount in msats willing to be paid to avoid routing
	 * through a channel, as per multiplying by the negative `log10` of the channel's success
	 * probability for a payment.
	 * 
	 * The success probability is determined by the effective channel capacity, the payment amount,
	 * and knowledge learned from prior successful and unsuccessful payments. The lower bound of
	 * the success probability is 0.01, effectively limiting the penalty to the range
	 * `0..=2*liquidity_penalty_multiplier_msat`. The knowledge learned is decayed over time based
	 * on [`liquidity_offset_half_life`].
	 * 
	 * Default value: 10,000 msat
	 * 
	 * [`liquidity_offset_half_life`]: Self::liquidity_offset_half_life
	 */
	public void set_liquidity_penalty_multiplier_msat(long val) {
		bindings.ProbabilisticScoringParameters_set_liquidity_penalty_multiplier_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The time required to elapse before any knowledge learned about channel liquidity balances is
	 * cut in half.
	 * 
	 * The bounds are defined in terms of offsets and are initially zero. Increasing the offsets
	 * gives tighter bounds on the channel liquidity balance. Thus, halving the offsets decreases
	 * the certainty of the channel liquidity balance.
	 * 
	 * Default value: 1 hour
	 * 
	 * # Note
	 * 
	 * When built with the `no-std` feature, time will never elapse. Therefore, the channel
	 * liquidity knowledge will never decay except when the bounds cross.
	 */
	public long get_liquidity_offset_half_life() {
		long ret = bindings.ProbabilisticScoringParameters_get_liquidity_offset_half_life(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The time required to elapse before any knowledge learned about channel liquidity balances is
	 * cut in half.
	 * 
	 * The bounds are defined in terms of offsets and are initially zero. Increasing the offsets
	 * gives tighter bounds on the channel liquidity balance. Thus, halving the offsets decreases
	 * the certainty of the channel liquidity balance.
	 * 
	 * Default value: 1 hour
	 * 
	 * # Note
	 * 
	 * When built with the `no-std` feature, time will never elapse. Therefore, the channel
	 * liquidity knowledge will never decay except when the bounds cross.
	 */
	public void set_liquidity_offset_half_life(long val) {
		bindings.ProbabilisticScoringParameters_set_liquidity_offset_half_life(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new ProbabilisticScoringParameters given each field
	 */
	public static ProbabilisticScoringParameters of(long liquidity_penalty_multiplier_msat_arg, long liquidity_offset_half_life_arg) {
		long ret = bindings.ProbabilisticScoringParameters_new(liquidity_penalty_multiplier_msat_arg, liquidity_offset_half_life_arg);
		Reference.reachabilityFence(liquidity_penalty_multiplier_msat_arg);
		Reference.reachabilityFence(liquidity_offset_half_life_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		ProbabilisticScoringParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ProbabilisticScoringParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ProbabilisticScoringParameters_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ProbabilisticScoringParameters
	 */
	public ProbabilisticScoringParameters clone() {
		long ret = bindings.ProbabilisticScoringParameters_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ProbabilisticScoringParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ProbabilisticScoringParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ProbabilisticScoringParameters object into a byte array which can be read by ProbabilisticScoringParameters_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ProbabilisticScoringParameters_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a ProbabilisticScoringParameters from a byte array, created by ProbabilisticScoringParameters_write
	 */
	public static Result_ProbabilisticScoringParametersDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ProbabilisticScoringParameters_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ProbabilisticScoringParametersDecodeErrorZ ret_hu_conv = Result_ProbabilisticScoringParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" ProbabilisticScoringParameters. See struct and individual field documentaiton for details on which values are used.
	 */
	public static ProbabilisticScoringParameters with_default() {
		long ret = bindings.ProbabilisticScoringParameters_default();
		if (ret >= 0 && ret <= 4096) { return null; }
		ProbabilisticScoringParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ProbabilisticScoringParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
