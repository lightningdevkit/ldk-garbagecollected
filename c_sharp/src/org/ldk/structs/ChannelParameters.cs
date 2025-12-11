using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A subset of [`CommonOpenChannelFields`], containing various parameters which are set by the
 * channel initiator and which are not part of the channel funding transaction.
 */
public class ChannelParameters : CommonBase {
	internal ChannelParameters(object _dummy, long ptr) : base(ptr) { }
	~ChannelParameters() {
		if (ptr != 0) { bindings.ChannelParameters_free(ptr); }
	}

	/**
	 * The threshold below which outputs on transactions broadcast by the channel initiator will be
	 * omitted.
	 */
	public long get_dust_limit_satoshis() {
		long ret = bindings.ChannelParameters_get_dust_limit_satoshis(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The threshold below which outputs on transactions broadcast by the channel initiator will be
	 * omitted.
	 */
	public void set_dust_limit_satoshis(long val) {
		bindings.ChannelParameters_set_dust_limit_satoshis(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The maximum inbound HTLC value in flight towards channel initiator, in milli-satoshi
	 */
	public long get_max_htlc_value_in_flight_msat() {
		long ret = bindings.ChannelParameters_get_max_htlc_value_in_flight_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The maximum inbound HTLC value in flight towards channel initiator, in milli-satoshi
	 */
	public void set_max_htlc_value_in_flight_msat(long val) {
		bindings.ChannelParameters_set_max_htlc_value_in_flight_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The minimum HTLC size for HTLCs towards the channel initiator, in milli-satoshi
	 */
	public long get_htlc_minimum_msat() {
		long ret = bindings.ChannelParameters_get_htlc_minimum_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The minimum HTLC size for HTLCs towards the channel initiator, in milli-satoshi
	 */
	public void set_htlc_minimum_msat(long val) {
		bindings.ChannelParameters_set_htlc_minimum_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The feerate for the commitment transaction set by the channel initiator until updated by
	 * [`UpdateFee`]
	 */
	public int get_commitment_feerate_sat_per_1000_weight() {
		int ret = bindings.ChannelParameters_get_commitment_feerate_sat_per_1000_weight(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The feerate for the commitment transaction set by the channel initiator until updated by
	 * [`UpdateFee`]
	 */
	public void set_commitment_feerate_sat_per_1000_weight(int val) {
		bindings.ChannelParameters_set_commitment_feerate_sat_per_1000_weight(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The number of blocks which the non-channel-initator will have to wait to claim on-chain
	 * funds if they broadcast a commitment transaction.
	 */
	public short get_to_self_delay() {
		short ret = bindings.ChannelParameters_get_to_self_delay(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The number of blocks which the non-channel-initator will have to wait to claim on-chain
	 * funds if they broadcast a commitment transaction.
	 */
	public void set_to_self_delay(short val) {
		bindings.ChannelParameters_set_to_self_delay(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The maximum number of pending HTLCs towards the channel initiator.
	 */
	public short get_max_accepted_htlcs() {
		short ret = bindings.ChannelParameters_get_max_accepted_htlcs(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The maximum number of pending HTLCs towards the channel initiator.
	 */
	public void set_max_accepted_htlcs(short val) {
		bindings.ChannelParameters_set_max_accepted_htlcs(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new ChannelParameters given each field
	 */
	public static org.ldk.structs.ChannelParameters of(long dust_limit_satoshis_arg, long max_htlc_value_in_flight_msat_arg, long htlc_minimum_msat_arg, int commitment_feerate_sat_per_1000_weight_arg, short to_self_delay_arg, short max_accepted_htlcs_arg) {
		long ret = bindings.ChannelParameters_new(dust_limit_satoshis_arg, max_htlc_value_in_flight_msat_arg, htlc_minimum_msat_arg, commitment_feerate_sat_per_1000_weight_arg, to_self_delay_arg, max_accepted_htlcs_arg);
		GC.KeepAlive(dust_limit_satoshis_arg);
		GC.KeepAlive(max_htlc_value_in_flight_msat_arg);
		GC.KeepAlive(htlc_minimum_msat_arg);
		GC.KeepAlive(commitment_feerate_sat_per_1000_weight_arg);
		GC.KeepAlive(to_self_delay_arg);
		GC.KeepAlive(max_accepted_htlcs_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.ChannelParameters_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelParameters
	 */
	public org.ldk.structs.ChannelParameters clone() {
		long ret = bindings.ChannelParameters_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ChannelParameters.
	 */
	public long hash() {
		long ret = bindings.ChannelParameters_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two ChannelParameterss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.ChannelParameters b) {
		bool ret = bindings.ChannelParameters_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is ChannelParameters)) return false;
		return this.eq((ChannelParameters)o);
	}
}
} } }
