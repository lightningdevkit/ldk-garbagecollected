package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A subset of [`CommonOpenChannelFields`], containing various parameters which are set by the
 * channel initiator and which are not part of the channel funding transaction.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelParameters extends CommonBase {
	ChannelParameters(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelParameters_free(ptr); }
	}

	/**
	 * The threshold below which outputs on transactions broadcast by the channel initiator will be
	 * omitted.
	 */
	public long get_dust_limit_satoshis() {
		long ret = bindings.ChannelParameters_get_dust_limit_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The threshold below which outputs on transactions broadcast by the channel initiator will be
	 * omitted.
	 */
	public void set_dust_limit_satoshis(long val) {
		bindings.ChannelParameters_set_dust_limit_satoshis(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The maximum inbound HTLC value in flight towards channel initiator, in milli-satoshi
	 */
	public long get_max_htlc_value_in_flight_msat() {
		long ret = bindings.ChannelParameters_get_max_htlc_value_in_flight_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The maximum inbound HTLC value in flight towards channel initiator, in milli-satoshi
	 */
	public void set_max_htlc_value_in_flight_msat(long val) {
		bindings.ChannelParameters_set_max_htlc_value_in_flight_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The minimum HTLC size for HTLCs towards the channel initiator, in milli-satoshi
	 */
	public long get_htlc_minimum_msat() {
		long ret = bindings.ChannelParameters_get_htlc_minimum_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The minimum HTLC size for HTLCs towards the channel initiator, in milli-satoshi
	 */
	public void set_htlc_minimum_msat(long val) {
		bindings.ChannelParameters_set_htlc_minimum_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The feerate for the commitment transaction set by the channel initiator until updated by
	 * [`UpdateFee`]
	 */
	public int get_commitment_feerate_sat_per_1000_weight() {
		int ret = bindings.ChannelParameters_get_commitment_feerate_sat_per_1000_weight(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The feerate for the commitment transaction set by the channel initiator until updated by
	 * [`UpdateFee`]
	 */
	public void set_commitment_feerate_sat_per_1000_weight(int val) {
		bindings.ChannelParameters_set_commitment_feerate_sat_per_1000_weight(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The number of blocks which the non-channel-initator will have to wait to claim on-chain
	 * funds if they broadcast a commitment transaction.
	 */
	public short get_to_self_delay() {
		short ret = bindings.ChannelParameters_get_to_self_delay(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The number of blocks which the non-channel-initator will have to wait to claim on-chain
	 * funds if they broadcast a commitment transaction.
	 */
	public void set_to_self_delay(short val) {
		bindings.ChannelParameters_set_to_self_delay(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The maximum number of pending HTLCs towards the channel initiator.
	 */
	public short get_max_accepted_htlcs() {
		short ret = bindings.ChannelParameters_get_max_accepted_htlcs(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The maximum number of pending HTLCs towards the channel initiator.
	 */
	public void set_max_accepted_htlcs(short val) {
		bindings.ChannelParameters_set_max_accepted_htlcs(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new ChannelParameters given each field
	 */
	public static ChannelParameters of(long dust_limit_satoshis_arg, long max_htlc_value_in_flight_msat_arg, long htlc_minimum_msat_arg, int commitment_feerate_sat_per_1000_weight_arg, short to_self_delay_arg, short max_accepted_htlcs_arg) {
		long ret = bindings.ChannelParameters_new(dust_limit_satoshis_arg, max_htlc_value_in_flight_msat_arg, htlc_minimum_msat_arg, commitment_feerate_sat_per_1000_weight_arg, to_self_delay_arg, max_accepted_htlcs_arg);
		Reference.reachabilityFence(dust_limit_satoshis_arg);
		Reference.reachabilityFence(max_htlc_value_in_flight_msat_arg);
		Reference.reachabilityFence(htlc_minimum_msat_arg);
		Reference.reachabilityFence(commitment_feerate_sat_per_1000_weight_arg);
		Reference.reachabilityFence(to_self_delay_arg);
		Reference.reachabilityFence(max_accepted_htlcs_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ChannelParameters_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelParameters
	 */
	public ChannelParameters clone() {
		long ret = bindings.ChannelParameters_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ChannelParameters.
	 */
	public long hash() {
		long ret = bindings.ChannelParameters_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two ChannelParameterss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.ChannelParameters b) {
		boolean ret = bindings.ChannelParameters_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof ChannelParameters)) return false;
		return this.eq((ChannelParameters)o);
	}
}
