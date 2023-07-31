package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Options for how to set the max dust HTLC exposure allowed on a channel. See
 * [`ChannelConfig::max_dust_htlc_exposure`] for details.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class MaxDustHTLCExposure extends CommonBase {
	private MaxDustHTLCExposure(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.MaxDustHTLCExposure_free(ptr); }
	}
	static MaxDustHTLCExposure constr_from_ptr(long ptr) {
		bindings.LDKMaxDustHTLCExposure raw_val = bindings.LDKMaxDustHTLCExposure_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKMaxDustHTLCExposure.FixedLimitMsat.class) {
			return new FixedLimitMsat(ptr, (bindings.LDKMaxDustHTLCExposure.FixedLimitMsat)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMaxDustHTLCExposure.FeeRateMultiplier.class) {
			return new FeeRateMultiplier(ptr, (bindings.LDKMaxDustHTLCExposure.FeeRateMultiplier)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * This sets a fixed limit on the total dust exposure in millisatoshis. Setting this too low
	 * may prevent the sending or receipt of low-value HTLCs on high-traffic nodes, however this
	 * limit is very important to prevent stealing of large amounts of dust HTLCs by miners
	 * through [fee griefing
	 * attacks](https://lists.linuxfoundation.org/pipermail/lightning-dev/2020-May/002714.html).
	 * 
	 * Note that if the feerate increases significantly, without a manual increase
	 * to this maximum the channel may be unable to send/receive HTLCs between the maximum dust
	 * exposure and the new minimum value for HTLCs to be economically viable to claim.
	 */
	public final static class FixedLimitMsat extends MaxDustHTLCExposure {
		public final long fixed_limit_msat;
		private FixedLimitMsat(long ptr, bindings.LDKMaxDustHTLCExposure.FixedLimitMsat obj) {
			super(null, ptr);
			this.fixed_limit_msat = obj.fixed_limit_msat;
		}
	}
	/**
	 * This sets a multiplier on the estimated high priority feerate (sats/KW, as obtained from
	 * [`FeeEstimator`]) to determine the maximum allowed dust exposure. If this variant is used
	 * then the maximum dust exposure in millisatoshis is calculated as:
	 * `high_priority_feerate_per_kw * value`. For example, with our default value
	 * `FeeRateMultiplier(5000)`:
	 * 
	 * - For the minimum fee rate of 1 sat/vByte (250 sat/KW, although the minimum
	 * defaults to 253 sats/KW for rounding, see [`FeeEstimator`]), the max dust exposure would
	 * be 253 * 5000 = 1,265,000 msats.
	 * - For a fee rate of 30 sat/vByte (7500 sat/KW), the max dust exposure would be
	 * 7500 * 5000 = 37,500,000 msats.
	 * 
	 * This allows the maximum dust exposure to automatically scale with fee rate changes.
	 * 
	 * Note, if you're using a third-party fee estimator, this may leave you more exposed to a
	 * fee griefing attack, where your fee estimator may purposely overestimate the fee rate,
	 * causing you to accept more dust HTLCs than you would otherwise.
	 * 
	 * This variant is primarily meant to serve pre-anchor channels, as HTLC fees being included
	 * on HTLC outputs means your channel may be subject to more dust exposure in the event of
	 * increases in fee rate.
	 * 
	 * # Backwards Compatibility
	 * This variant only became available in LDK 0.0.116, so if you downgrade to a prior version
	 * by default this will be set to a [`Self::FixedLimitMsat`] of 5,000,000 msat.
	 * 
	 * [`FeeEstimator`]: crate::chain::chaininterface::FeeEstimator
	 */
	public final static class FeeRateMultiplier extends MaxDustHTLCExposure {
		public final long fee_rate_multiplier;
		private FeeRateMultiplier(long ptr, bindings.LDKMaxDustHTLCExposure.FeeRateMultiplier obj) {
			super(null, ptr);
			this.fee_rate_multiplier = obj.fee_rate_multiplier;
		}
	}
	long clone_ptr() {
		long ret = bindings.MaxDustHTLCExposure_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the MaxDustHTLCExposure
	 */
	public MaxDustHTLCExposure clone() {
		long ret = bindings.MaxDustHTLCExposure_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MaxDustHTLCExposure ret_hu_conv = org.ldk.structs.MaxDustHTLCExposure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FixedLimitMsat-variant MaxDustHTLCExposure
	 */
	public static MaxDustHTLCExposure fixed_limit_msat(long a) {
		long ret = bindings.MaxDustHTLCExposure_fixed_limit_msat(a);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MaxDustHTLCExposure ret_hu_conv = org.ldk.structs.MaxDustHTLCExposure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FeeRateMultiplier-variant MaxDustHTLCExposure
	 */
	public static MaxDustHTLCExposure fee_rate_multiplier(long a) {
		long ret = bindings.MaxDustHTLCExposure_fee_rate_multiplier(a);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MaxDustHTLCExposure ret_hu_conv = org.ldk.structs.MaxDustHTLCExposure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two MaxDustHTLCExposures contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.MaxDustHTLCExposure b) {
		boolean ret = bindings.MaxDustHTLCExposure_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof MaxDustHTLCExposure)) return false;
		return this.eq((MaxDustHTLCExposure)o);
	}
	/**
	 * Serialize the MaxDustHTLCExposure object into a byte array which can be read by MaxDustHTLCExposure_read
	 */
	public byte[] write() {
		byte[] ret = bindings.MaxDustHTLCExposure_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a MaxDustHTLCExposure from a byte array, created by MaxDustHTLCExposure_write
	 */
	public static Result_MaxDustHTLCExposureDecodeErrorZ read(byte[] ser) {
		long ret = bindings.MaxDustHTLCExposure_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_MaxDustHTLCExposureDecodeErrorZ ret_hu_conv = Result_MaxDustHTLCExposureDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
