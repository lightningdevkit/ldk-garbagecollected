package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
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
	 * 
	 * Default value: 500 msat
	 */
	public long get_base_penalty_msat() {
		long ret = bindings.ScoringParameters_get_base_penalty_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A fixed penalty in msats to apply to each channel.
	 * 
	 * Default value: 500 msat
	 */
	public void set_base_penalty_msat(long val) {
		bindings.ScoringParameters_set_base_penalty_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A penalty in msats to apply to a channel upon failing to relay a payment.
	 * 
	 * This accumulates for each failure but may be reduced over time based on
	 * [`failure_penalty_half_life`] or when successfully routing through a channel.
	 * 
	 * Default value: 1,024,000 msat
	 * 
	 * [`failure_penalty_half_life`]: Self::failure_penalty_half_life
	 */
	public long get_failure_penalty_msat() {
		long ret = bindings.ScoringParameters_get_failure_penalty_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A penalty in msats to apply to a channel upon failing to relay a payment.
	 * 
	 * This accumulates for each failure but may be reduced over time based on
	 * [`failure_penalty_half_life`] or when successfully routing through a channel.
	 * 
	 * Default value: 1,024,000 msat
	 * 
	 * [`failure_penalty_half_life`]: Self::failure_penalty_half_life
	 */
	public void set_failure_penalty_msat(long val) {
		bindings.ScoringParameters_set_failure_penalty_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * When the amount being sent over a channel is this many 1024ths of the total channel
	 * capacity, we begin applying [`overuse_penalty_msat_per_1024th`].
	 * 
	 * Default value: 128 1024ths (i.e. begin penalizing when an HTLC uses 1/8th of a channel)
	 * 
	 * [`overuse_penalty_msat_per_1024th`]: Self::overuse_penalty_msat_per_1024th
	 */
	public short get_overuse_penalty_start_1024th() {
		short ret = bindings.ScoringParameters_get_overuse_penalty_start_1024th(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * When the amount being sent over a channel is this many 1024ths of the total channel
	 * capacity, we begin applying [`overuse_penalty_msat_per_1024th`].
	 * 
	 * Default value: 128 1024ths (i.e. begin penalizing when an HTLC uses 1/8th of a channel)
	 * 
	 * [`overuse_penalty_msat_per_1024th`]: Self::overuse_penalty_msat_per_1024th
	 */
	public void set_overuse_penalty_start_1024th(short val) {
		bindings.ScoringParameters_set_overuse_penalty_start_1024th(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A penalty applied, per whole 1024ths of the channel capacity which the amount being sent
	 * over the channel exceeds [`overuse_penalty_start_1024th`] by.
	 * 
	 * Default value: 20 msat (i.e. 2560 msat penalty to use 1/4th of a channel, 7680 msat penalty
	 * to use half a channel, and 12,560 msat penalty to use 3/4ths of a channel)
	 * 
	 * [`overuse_penalty_start_1024th`]: Self::overuse_penalty_start_1024th
	 */
	public long get_overuse_penalty_msat_per_1024th() {
		long ret = bindings.ScoringParameters_get_overuse_penalty_msat_per_1024th(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A penalty applied, per whole 1024ths of the channel capacity which the amount being sent
	 * over the channel exceeds [`overuse_penalty_start_1024th`] by.
	 * 
	 * Default value: 20 msat (i.e. 2560 msat penalty to use 1/4th of a channel, 7680 msat penalty
	 * to use half a channel, and 12,560 msat penalty to use 3/4ths of a channel)
	 * 
	 * [`overuse_penalty_start_1024th`]: Self::overuse_penalty_start_1024th
	 */
	public void set_overuse_penalty_msat_per_1024th(long val) {
		bindings.ScoringParameters_set_overuse_penalty_msat_per_1024th(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The time required to elapse before any accumulated [`failure_penalty_msat`] penalties are
	 * cut in half.
	 * 
	 * Successfully routing through a channel will immediately cut the penalty in half as well.
	 * 
	 * Default value: 1 hour
	 * 
	 * # Note
	 * 
	 * When built with the `no-std` feature, time will never elapse. Therefore, this penalty will
	 * never decay.
	 * 
	 * [`failure_penalty_msat`]: Self::failure_penalty_msat
	 */
	public long get_failure_penalty_half_life() {
		long ret = bindings.ScoringParameters_get_failure_penalty_half_life(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The time required to elapse before any accumulated [`failure_penalty_msat`] penalties are
	 * cut in half.
	 * 
	 * Successfully routing through a channel will immediately cut the penalty in half as well.
	 * 
	 * Default value: 1 hour
	 * 
	 * # Note
	 * 
	 * When built with the `no-std` feature, time will never elapse. Therefore, this penalty will
	 * never decay.
	 * 
	 * [`failure_penalty_msat`]: Self::failure_penalty_msat
	 */
	public void set_failure_penalty_half_life(long val) {
		bindings.ScoringParameters_set_failure_penalty_half_life(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new ScoringParameters given each field
	 */
	public static ScoringParameters of(long base_penalty_msat_arg, long failure_penalty_msat_arg, short overuse_penalty_start_1024th_arg, long overuse_penalty_msat_per_1024th_arg, long failure_penalty_half_life_arg) {
		long ret = bindings.ScoringParameters_new(base_penalty_msat_arg, failure_penalty_msat_arg, overuse_penalty_start_1024th_arg, overuse_penalty_msat_per_1024th_arg, failure_penalty_half_life_arg);
		Reference.reachabilityFence(base_penalty_msat_arg);
		Reference.reachabilityFence(failure_penalty_msat_arg);
		Reference.reachabilityFence(overuse_penalty_start_1024th_arg);
		Reference.reachabilityFence(overuse_penalty_msat_per_1024th_arg);
		Reference.reachabilityFence(failure_penalty_half_life_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		ScoringParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ScoringParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ScoringParameters_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ScoringParameters
	 */
	public ScoringParameters clone() {
		long ret = bindings.ScoringParameters_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ScoringParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ScoringParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ScoringParameters object into a byte array which can be read by ScoringParameters_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ScoringParameters_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a ScoringParameters from a byte array, created by ScoringParameters_write
	 */
	public static Result_ScoringParametersDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ScoringParameters_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ScoringParametersDecodeErrorZ ret_hu_conv = Result_ScoringParametersDecodeErrorZ.constr_from_ptr(ret);
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
