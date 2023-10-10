using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Optional channel limits which are applied during channel creation.
 * 
 * These limits are only applied to our counterparty's limits, not our own.
 * 
 * Use 0/`<type>::max_value()` as appropriate to skip checking.
 * 
 * Provides sane defaults for most configurations.
 * 
 * Most additional limits are disabled except those with which specify a default in individual
 * field documentation. Note that this may result in barely-usable channels, but since they
 * are applied mostly only to incoming channels that's not much of a problem.
 */
public class ChannelHandshakeLimits : CommonBase {
	internal ChannelHandshakeLimits(object _dummy, long ptr) : base(ptr) { }
	~ChannelHandshakeLimits() {
		if (ptr != 0) { bindings.ChannelHandshakeLimits_free(ptr); }
	}

	/**
	 * Minimum allowed satoshis when a channel is funded. This is supplied by the sender and so
	 * only applies to inbound channels.
	 * 
	 * Default value: 0.
	 */
	public long get_min_funding_satoshis() {
		long ret = bindings.ChannelHandshakeLimits_get_min_funding_satoshis(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Minimum allowed satoshis when a channel is funded. This is supplied by the sender and so
	 * only applies to inbound channels.
	 * 
	 * Default value: 0.
	 */
	public void set_min_funding_satoshis(long val) {
		bindings.ChannelHandshakeLimits_set_min_funding_satoshis(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Maximum allowed satoshis when a channel is funded. This is supplied by the sender and so
	 * only applies to inbound channels.
	 * 
	 * Default value: 2^24 - 1.
	 */
	public long get_max_funding_satoshis() {
		long ret = bindings.ChannelHandshakeLimits_get_max_funding_satoshis(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Maximum allowed satoshis when a channel is funded. This is supplied by the sender and so
	 * only applies to inbound channels.
	 * 
	 * Default value: 2^24 - 1.
	 */
	public void set_max_funding_satoshis(long val) {
		bindings.ChannelHandshakeLimits_set_max_funding_satoshis(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The remote node sets a limit on the minimum size of HTLCs we can send to them. This allows
	 * you to limit the maximum minimum-size they can require.
	 * 
	 * Default value: u64::max_value.
	 */
	public long get_max_htlc_minimum_msat() {
		long ret = bindings.ChannelHandshakeLimits_get_max_htlc_minimum_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The remote node sets a limit on the minimum size of HTLCs we can send to them. This allows
	 * you to limit the maximum minimum-size they can require.
	 * 
	 * Default value: u64::max_value.
	 */
	public void set_max_htlc_minimum_msat(long val) {
		bindings.ChannelHandshakeLimits_set_max_htlc_minimum_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The remote node sets a limit on the maximum value of pending HTLCs to them at any given
	 * time to limit their funds exposure to HTLCs. This allows you to set a minimum such value.
	 * 
	 * Default value: 0.
	 */
	public long get_min_max_htlc_value_in_flight_msat() {
		long ret = bindings.ChannelHandshakeLimits_get_min_max_htlc_value_in_flight_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The remote node sets a limit on the maximum value of pending HTLCs to them at any given
	 * time to limit their funds exposure to HTLCs. This allows you to set a minimum such value.
	 * 
	 * Default value: 0.
	 */
	public void set_min_max_htlc_value_in_flight_msat(long val) {
		bindings.ChannelHandshakeLimits_set_min_max_htlc_value_in_flight_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The remote node will require we keep a certain amount in direct payment to ourselves at all
	 * time, ensuring that we are able to be punished if we broadcast an old state. This allows to
	 * you limit the amount which we will have to keep to ourselves (and cannot use for HTLCs).
	 * 
	 * Default value: u64::max_value.
	 */
	public long get_max_channel_reserve_satoshis() {
		long ret = bindings.ChannelHandshakeLimits_get_max_channel_reserve_satoshis(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The remote node will require we keep a certain amount in direct payment to ourselves at all
	 * time, ensuring that we are able to be punished if we broadcast an old state. This allows to
	 * you limit the amount which we will have to keep to ourselves (and cannot use for HTLCs).
	 * 
	 * Default value: u64::max_value.
	 */
	public void set_max_channel_reserve_satoshis(long val) {
		bindings.ChannelHandshakeLimits_set_max_channel_reserve_satoshis(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The remote node sets a limit on the maximum number of pending HTLCs to them at any given
	 * time. This allows you to set a minimum such value.
	 * 
	 * Default value: 0.
	 */
	public short get_min_max_accepted_htlcs() {
		short ret = bindings.ChannelHandshakeLimits_get_min_max_accepted_htlcs(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The remote node sets a limit on the maximum number of pending HTLCs to them at any given
	 * time. This allows you to set a minimum such value.
	 * 
	 * Default value: 0.
	 */
	public void set_min_max_accepted_htlcs(short val) {
		bindings.ChannelHandshakeLimits_set_min_max_accepted_htlcs(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Before a channel is usable the funding transaction will need to be confirmed by at least a
	 * certain number of blocks, specified by the node which is not the funder (as the funder can
	 * assume they aren't going to double-spend themselves).
	 * This config allows you to set a limit on the maximum amount of time to wait.
	 * 
	 * Default value: 144, or roughly one day and only applies to outbound channels.
	 */
	public int get_max_minimum_depth() {
		int ret = bindings.ChannelHandshakeLimits_get_max_minimum_depth(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Before a channel is usable the funding transaction will need to be confirmed by at least a
	 * certain number of blocks, specified by the node which is not the funder (as the funder can
	 * assume they aren't going to double-spend themselves).
	 * This config allows you to set a limit on the maximum amount of time to wait.
	 * 
	 * Default value: 144, or roughly one day and only applies to outbound channels.
	 */
	public void set_max_minimum_depth(int val) {
		bindings.ChannelHandshakeLimits_set_max_minimum_depth(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Whether we implicitly trust funding transactions generated by us for our own outbound
	 * channels to not be double-spent.
	 * 
	 * If this is set, we assume that our own funding transactions are *never* double-spent, and
	 * thus we can trust them without any confirmations. This is generally a reasonable
	 * assumption, given we're the only ones who could ever double-spend it (assuming we have sole
	 * control of the signing keys).
	 * 
	 * You may wish to un-set this if you allow the user to (or do in an automated fashion)
	 * double-spend the funding transaction to RBF with an alternative channel open.
	 * 
	 * This only applies if our counterparty set their confirmations-required value to 0, and we
	 * always trust our own funding transaction at 1 confirmation irrespective of this value.
	 * Thus, this effectively acts as a `min_minimum_depth`, with the only possible values being
	 * `true` (0) and `false` (1).
	 * 
	 * Default value: true
	 */
	public bool get_trust_own_funding_0conf() {
		bool ret = bindings.ChannelHandshakeLimits_get_trust_own_funding_0conf(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Whether we implicitly trust funding transactions generated by us for our own outbound
	 * channels to not be double-spent.
	 * 
	 * If this is set, we assume that our own funding transactions are *never* double-spent, and
	 * thus we can trust them without any confirmations. This is generally a reasonable
	 * assumption, given we're the only ones who could ever double-spend it (assuming we have sole
	 * control of the signing keys).
	 * 
	 * You may wish to un-set this if you allow the user to (or do in an automated fashion)
	 * double-spend the funding transaction to RBF with an alternative channel open.
	 * 
	 * This only applies if our counterparty set their confirmations-required value to 0, and we
	 * always trust our own funding transaction at 1 confirmation irrespective of this value.
	 * Thus, this effectively acts as a `min_minimum_depth`, with the only possible values being
	 * `true` (0) and `false` (1).
	 * 
	 * Default value: true
	 */
	public void set_trust_own_funding_0conf(bool val) {
		bindings.ChannelHandshakeLimits_set_trust_own_funding_0conf(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Set to force an incoming channel to match our announced channel preference in
	 * [`ChannelHandshakeConfig::announced_channel`].
	 * 
	 * For a node which is not online reliably, this should be set to true and
	 * [`ChannelHandshakeConfig::announced_channel`] set to false, ensuring that no announced (aka public)
	 * channels will ever be opened.
	 * 
	 * Default value: true.
	 */
	public bool get_force_announced_channel_preference() {
		bool ret = bindings.ChannelHandshakeLimits_get_force_announced_channel_preference(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set to force an incoming channel to match our announced channel preference in
	 * [`ChannelHandshakeConfig::announced_channel`].
	 * 
	 * For a node which is not online reliably, this should be set to true and
	 * [`ChannelHandshakeConfig::announced_channel`] set to false, ensuring that no announced (aka public)
	 * channels will ever be opened.
	 * 
	 * Default value: true.
	 */
	public void set_force_announced_channel_preference(bool val) {
		bindings.ChannelHandshakeLimits_set_force_announced_channel_preference(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Set to the amount of time we're willing to wait to claim money back to us.
	 * 
	 * Not checking this value would be a security issue, as our peer would be able to set it to
	 * max relative lock-time (a year) and we would \"lose\" money as it would be locked for a long time.
	 * 
	 * Default value: 2016, which we also enforce as a maximum value so you can tweak config to
	 * reduce the loss of having useless locked funds (if your peer accepts)
	 */
	public short get_their_to_self_delay() {
		short ret = bindings.ChannelHandshakeLimits_get_their_to_self_delay(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Set to the amount of time we're willing to wait to claim money back to us.
	 * 
	 * Not checking this value would be a security issue, as our peer would be able to set it to
	 * max relative lock-time (a year) and we would \"lose\" money as it would be locked for a long time.
	 * 
	 * Default value: 2016, which we also enforce as a maximum value so you can tweak config to
	 * reduce the loss of having useless locked funds (if your peer accepts)
	 */
	public void set_their_to_self_delay(short val) {
		bindings.ChannelHandshakeLimits_set_their_to_self_delay(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new ChannelHandshakeLimits given each field
	 */
	public static ChannelHandshakeLimits of(long min_funding_satoshis_arg, long max_funding_satoshis_arg, long max_htlc_minimum_msat_arg, long min_max_htlc_value_in_flight_msat_arg, long max_channel_reserve_satoshis_arg, short min_max_accepted_htlcs_arg, int max_minimum_depth_arg, bool trust_own_funding_0conf_arg, bool force_announced_channel_preference_arg, short their_to_self_delay_arg) {
		long ret = bindings.ChannelHandshakeLimits_new(min_funding_satoshis_arg, max_funding_satoshis_arg, max_htlc_minimum_msat_arg, min_max_htlc_value_in_flight_msat_arg, max_channel_reserve_satoshis_arg, min_max_accepted_htlcs_arg, max_minimum_depth_arg, trust_own_funding_0conf_arg, force_announced_channel_preference_arg, their_to_self_delay_arg);
		GC.KeepAlive(min_funding_satoshis_arg);
		GC.KeepAlive(max_funding_satoshis_arg);
		GC.KeepAlive(max_htlc_minimum_msat_arg);
		GC.KeepAlive(min_max_htlc_value_in_flight_msat_arg);
		GC.KeepAlive(max_channel_reserve_satoshis_arg);
		GC.KeepAlive(min_max_accepted_htlcs_arg);
		GC.KeepAlive(max_minimum_depth_arg);
		GC.KeepAlive(trust_own_funding_0conf_arg);
		GC.KeepAlive(force_announced_channel_preference_arg);
		GC.KeepAlive(their_to_self_delay_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelHandshakeLimits ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelHandshakeLimits(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.ChannelHandshakeLimits_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelHandshakeLimits
	 */
	public ChannelHandshakeLimits clone() {
		long ret = bindings.ChannelHandshakeLimits_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelHandshakeLimits ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelHandshakeLimits(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" ChannelHandshakeLimits. See struct and individual field documentaiton for details on which values are used.
	 */
	public static ChannelHandshakeLimits with_default() {
		long ret = bindings.ChannelHandshakeLimits_default();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelHandshakeLimits ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelHandshakeLimits(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
