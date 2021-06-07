package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * Options which apply on a per-channel basis and may change at runtime or based on negotiation
 * with our counterparty.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelConfig extends CommonBase {
	ChannelConfig(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelConfig_free(ptr); }
	}

	/**
	 * Amount (in millionths of a satoshi) the channel will charge per transferred satoshi.
	 * This may be allowed to change at runtime in a later update, however doing so must result in
	 * update messages sent to notify all nodes of our updated relay fee.
	 * 
	 * Default value: 0.
	 */
	public int get_fee_proportional_millionths() {
		int ret = bindings.ChannelConfig_get_fee_proportional_millionths(this.ptr);
		return ret;
	}

	/**
	 * Amount (in millionths of a satoshi) the channel will charge per transferred satoshi.
	 * This may be allowed to change at runtime in a later update, however doing so must result in
	 * update messages sent to notify all nodes of our updated relay fee.
	 * 
	 * Default value: 0.
	 */
	public void set_fee_proportional_millionths(int val) {
		bindings.ChannelConfig_set_fee_proportional_millionths(this.ptr, val);
	}

	/**
	 * The difference in the CLTV value between incoming HTLCs and an outbound HTLC forwarded over
	 * the channel this config applies to.
	 * 
	 * This is analogous to [`ChannelHandshakeConfig::our_to_self_delay`] but applies to in-flight
	 * HTLC balance when a channel appears on-chain whereas
	 * [`ChannelHandshakeConfig::our_to_self_delay`] applies to the remaining
	 * (non-HTLC-encumbered) balance.
	 * 
	 * Thus, for HTLC-encumbered balances to be enforced on-chain when a channel is force-closed,
	 * we (or one of our watchtowers) MUST be online to check for broadcast of the current
	 * commitment transaction at least once per this many blocks (minus some margin to allow us
	 * enough time to broadcast and confirm a transaction, possibly with time in between to RBF
	 * the spending transaction).
	 * 
	 * Default value: 72 (12 hours at an average of 6 blocks/hour).
	 * Minimum value: [`MIN_CLTV_EXPIRY_DELTA`], any values less than this will be treated as
	 * [`MIN_CLTV_EXPIRY_DELTA`] instead.
	 * 
	 * [`MIN_CLTV_EXPIRY_DELTA`]: crate::ln::channelmanager::MIN_CLTV_EXPIRY_DELTA
	 */
	public short get_cltv_expiry_delta() {
		short ret = bindings.ChannelConfig_get_cltv_expiry_delta(this.ptr);
		return ret;
	}

	/**
	 * The difference in the CLTV value between incoming HTLCs and an outbound HTLC forwarded over
	 * the channel this config applies to.
	 * 
	 * This is analogous to [`ChannelHandshakeConfig::our_to_self_delay`] but applies to in-flight
	 * HTLC balance when a channel appears on-chain whereas
	 * [`ChannelHandshakeConfig::our_to_self_delay`] applies to the remaining
	 * (non-HTLC-encumbered) balance.
	 * 
	 * Thus, for HTLC-encumbered balances to be enforced on-chain when a channel is force-closed,
	 * we (or one of our watchtowers) MUST be online to check for broadcast of the current
	 * commitment transaction at least once per this many blocks (minus some margin to allow us
	 * enough time to broadcast and confirm a transaction, possibly with time in between to RBF
	 * the spending transaction).
	 * 
	 * Default value: 72 (12 hours at an average of 6 blocks/hour).
	 * Minimum value: [`MIN_CLTV_EXPIRY_DELTA`], any values less than this will be treated as
	 * [`MIN_CLTV_EXPIRY_DELTA`] instead.
	 * 
	 * [`MIN_CLTV_EXPIRY_DELTA`]: crate::ln::channelmanager::MIN_CLTV_EXPIRY_DELTA
	 */
	public void set_cltv_expiry_delta(short val) {
		bindings.ChannelConfig_set_cltv_expiry_delta(this.ptr, val);
	}

	/**
	 * Set to announce the channel publicly and notify all nodes that they can route via this
	 * channel.
	 * 
	 * This should only be set to true for nodes which expect to be online reliably.
	 * 
	 * As the node which funds a channel picks this value this will only apply for new outbound
	 * channels unless ChannelHandshakeLimits::force_announced_channel_preferences is set.
	 * 
	 * This cannot be changed after the initial channel handshake.
	 * 
	 * Default value: false.
	 */
	public boolean get_announced_channel() {
		boolean ret = bindings.ChannelConfig_get_announced_channel(this.ptr);
		return ret;
	}

	/**
	 * Set to announce the channel publicly and notify all nodes that they can route via this
	 * channel.
	 * 
	 * This should only be set to true for nodes which expect to be online reliably.
	 * 
	 * As the node which funds a channel picks this value this will only apply for new outbound
	 * channels unless ChannelHandshakeLimits::force_announced_channel_preferences is set.
	 * 
	 * This cannot be changed after the initial channel handshake.
	 * 
	 * Default value: false.
	 */
	public void set_announced_channel(boolean val) {
		bindings.ChannelConfig_set_announced_channel(this.ptr, val);
	}

	/**
	 * When set, we commit to an upfront shutdown_pubkey at channel open. If our counterparty
	 * supports it, they will then enforce the mutual-close output to us matches what we provided
	 * at intialization, preventing us from closing to an alternate pubkey.
	 * 
	 * This is set to true by default to provide a slight increase in security, though ultimately
	 * any attacker who is able to take control of a channel can just as easily send the funds via
	 * lightning payments, so we never require that our counterparties support this option.
	 * 
	 * This cannot be changed after a channel has been initialized.
	 * 
	 * Default value: true.
	 */
	public boolean get_commit_upfront_shutdown_pubkey() {
		boolean ret = bindings.ChannelConfig_get_commit_upfront_shutdown_pubkey(this.ptr);
		return ret;
	}

	/**
	 * When set, we commit to an upfront shutdown_pubkey at channel open. If our counterparty
	 * supports it, they will then enforce the mutual-close output to us matches what we provided
	 * at intialization, preventing us from closing to an alternate pubkey.
	 * 
	 * This is set to true by default to provide a slight increase in security, though ultimately
	 * any attacker who is able to take control of a channel can just as easily send the funds via
	 * lightning payments, so we never require that our counterparties support this option.
	 * 
	 * This cannot be changed after a channel has been initialized.
	 * 
	 * Default value: true.
	 */
	public void set_commit_upfront_shutdown_pubkey(boolean val) {
		bindings.ChannelConfig_set_commit_upfront_shutdown_pubkey(this.ptr, val);
	}

	/**
	 * Constructs a new ChannelConfig given each field
	 */
	public static ChannelConfig of(int fee_proportional_millionths_arg, short cltv_expiry_delta_arg, boolean announced_channel_arg, boolean commit_upfront_shutdown_pubkey_arg) {
		long ret = bindings.ChannelConfig_new(fee_proportional_millionths_arg, cltv_expiry_delta_arg, announced_channel_arg, commit_upfront_shutdown_pubkey_arg);
		ChannelConfig ret_hu_conv = new ChannelConfig(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a copy of the ChannelConfig
	 */
	public ChannelConfig clone() {
		long ret = bindings.ChannelConfig_clone(this.ptr);
		ChannelConfig ret_hu_conv = new ChannelConfig(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" ChannelConfig. See struct and individual field documentaiton for details on which values are used.
	 */
	public static ChannelConfig with_default() {
		long ret = bindings.ChannelConfig_default();
		ChannelConfig ret_hu_conv = new ChannelConfig(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelConfig object into a byte array which can be read by ChannelConfig_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ChannelConfig_write(this.ptr);
		return ret;
	}

	/**
	 * Read a ChannelConfig from a byte array, created by ChannelConfig_write
	 */
	public static Result_ChannelConfigDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ChannelConfig_read(ser);
		Result_ChannelConfigDecodeErrorZ ret_hu_conv = Result_ChannelConfigDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
