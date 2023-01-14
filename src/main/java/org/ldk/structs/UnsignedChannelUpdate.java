package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The unsigned part of a channel_update
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class UnsignedChannelUpdate extends CommonBase {
	UnsignedChannelUpdate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UnsignedChannelUpdate_free(ptr); }
	}

	/**
	 * The genesis hash of the blockchain where the channel is to be opened
	 */
	public byte[] get_chain_hash() {
		byte[] ret = bindings.UnsignedChannelUpdate_get_chain_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The genesis hash of the blockchain where the channel is to be opened
	 */
	public void set_chain_hash(byte[] val) {
		bindings.UnsignedChannelUpdate_set_chain_hash(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The short channel ID
	 */
	public long get_short_channel_id() {
		long ret = bindings.UnsignedChannelUpdate_get_short_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The short channel ID
	 */
	public void set_short_channel_id(long val) {
		bindings.UnsignedChannelUpdate_set_short_channel_id(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A strictly monotonic announcement counter, with gaps allowed, specific to this channel
	 */
	public int get_timestamp() {
		int ret = bindings.UnsignedChannelUpdate_get_timestamp(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A strictly monotonic announcement counter, with gaps allowed, specific to this channel
	 */
	public void set_timestamp(int val) {
		bindings.UnsignedChannelUpdate_set_timestamp(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Channel flags
	 */
	public byte get_flags() {
		byte ret = bindings.UnsignedChannelUpdate_get_flags(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Channel flags
	 */
	public void set_flags(byte val) {
		bindings.UnsignedChannelUpdate_set_flags(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The number of blocks such that if:
	 * `incoming_htlc.cltv_expiry < outgoing_htlc.cltv_expiry + cltv_expiry_delta`
	 * then we need to fail the HTLC backwards. When forwarding an HTLC, cltv_expiry_delta determines
	 * the outgoing HTLC's minimum cltv_expiry value -- so, if an incoming HTLC comes in with a
	 * cltv_expiry of 100000, and the node we're forwarding to has a cltv_expiry_delta value of 10,
	 * then we'll check that the outgoing HTLC's cltv_expiry value is at least 100010 before
	 * forwarding. Note that the HTLC sender is the one who originally sets this value when
	 * constructing the route.
	 */
	public short get_cltv_expiry_delta() {
		short ret = bindings.UnsignedChannelUpdate_get_cltv_expiry_delta(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The number of blocks such that if:
	 * `incoming_htlc.cltv_expiry < outgoing_htlc.cltv_expiry + cltv_expiry_delta`
	 * then we need to fail the HTLC backwards. When forwarding an HTLC, cltv_expiry_delta determines
	 * the outgoing HTLC's minimum cltv_expiry value -- so, if an incoming HTLC comes in with a
	 * cltv_expiry of 100000, and the node we're forwarding to has a cltv_expiry_delta value of 10,
	 * then we'll check that the outgoing HTLC's cltv_expiry value is at least 100010 before
	 * forwarding. Note that the HTLC sender is the one who originally sets this value when
	 * constructing the route.
	 */
	public void set_cltv_expiry_delta(short val) {
		bindings.UnsignedChannelUpdate_set_cltv_expiry_delta(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The minimum HTLC size incoming to sender, in milli-satoshi
	 */
	public long get_htlc_minimum_msat() {
		long ret = bindings.UnsignedChannelUpdate_get_htlc_minimum_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The minimum HTLC size incoming to sender, in milli-satoshi
	 */
	public void set_htlc_minimum_msat(long val) {
		bindings.UnsignedChannelUpdate_set_htlc_minimum_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The maximum HTLC value incoming to sender, in milli-satoshi. Used to be optional.
	 */
	public long get_htlc_maximum_msat() {
		long ret = bindings.UnsignedChannelUpdate_get_htlc_maximum_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The maximum HTLC value incoming to sender, in milli-satoshi. Used to be optional.
	 */
	public void set_htlc_maximum_msat(long val) {
		bindings.UnsignedChannelUpdate_set_htlc_maximum_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The base HTLC fee charged by sender, in milli-satoshi
	 */
	public int get_fee_base_msat() {
		int ret = bindings.UnsignedChannelUpdate_get_fee_base_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The base HTLC fee charged by sender, in milli-satoshi
	 */
	public void set_fee_base_msat(int val) {
		bindings.UnsignedChannelUpdate_set_fee_base_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The amount to fee multiplier, in micro-satoshi
	 */
	public int get_fee_proportional_millionths() {
		int ret = bindings.UnsignedChannelUpdate_get_fee_proportional_millionths(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The amount to fee multiplier, in micro-satoshi
	 */
	public void set_fee_proportional_millionths(int val) {
		bindings.UnsignedChannelUpdate_set_fee_proportional_millionths(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Excess data which was signed as a part of the message which we do not (yet) understand how
	 * to decode. This is stored to ensure forward-compatibility as new fields are added to the
	 * lightning gossip
	 * 
	 * Returns a copy of the field.
	 */
	public byte[] get_excess_data() {
		byte[] ret = bindings.UnsignedChannelUpdate_get_excess_data(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Excess data which was signed as a part of the message which we do not (yet) understand how
	 * to decode. This is stored to ensure forward-compatibility as new fields are added to the
	 * lightning gossip
	 */
	public void set_excess_data(byte[] val) {
		bindings.UnsignedChannelUpdate_set_excess_data(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new UnsignedChannelUpdate given each field
	 */
	public static UnsignedChannelUpdate of(byte[] chain_hash_arg, long short_channel_id_arg, int timestamp_arg, byte flags_arg, short cltv_expiry_delta_arg, long htlc_minimum_msat_arg, long htlc_maximum_msat_arg, int fee_base_msat_arg, int fee_proportional_millionths_arg, byte[] excess_data_arg) {
		long ret = bindings.UnsignedChannelUpdate_new(InternalUtils.check_arr_len(chain_hash_arg, 32), short_channel_id_arg, timestamp_arg, flags_arg, cltv_expiry_delta_arg, htlc_minimum_msat_arg, htlc_maximum_msat_arg, fee_base_msat_arg, fee_proportional_millionths_arg, excess_data_arg);
		Reference.reachabilityFence(chain_hash_arg);
		Reference.reachabilityFence(short_channel_id_arg);
		Reference.reachabilityFence(timestamp_arg);
		Reference.reachabilityFence(flags_arg);
		Reference.reachabilityFence(cltv_expiry_delta_arg);
		Reference.reachabilityFence(htlc_minimum_msat_arg);
		Reference.reachabilityFence(htlc_maximum_msat_arg);
		Reference.reachabilityFence(fee_base_msat_arg);
		Reference.reachabilityFence(fee_proportional_millionths_arg);
		Reference.reachabilityFence(excess_data_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnsignedChannelUpdate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UnsignedChannelUpdate(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.UnsignedChannelUpdate_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the UnsignedChannelUpdate
	 */
	public UnsignedChannelUpdate clone() {
		long ret = bindings.UnsignedChannelUpdate_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnsignedChannelUpdate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UnsignedChannelUpdate(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two UnsignedChannelUpdates contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.UnsignedChannelUpdate b) {
		boolean ret = bindings.UnsignedChannelUpdate_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof UnsignedChannelUpdate)) return false;
		return this.eq((UnsignedChannelUpdate)o);
	}
	/**
	 * Serialize the UnsignedChannelUpdate object into a byte array which can be read by UnsignedChannelUpdate_read
	 */
	public byte[] write() {
		byte[] ret = bindings.UnsignedChannelUpdate_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a UnsignedChannelUpdate from a byte array, created by UnsignedChannelUpdate_write
	 */
	public static Result_UnsignedChannelUpdateDecodeErrorZ read(byte[] ser) {
		long ret = bindings.UnsignedChannelUpdate_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_UnsignedChannelUpdateDecodeErrorZ ret_hu_conv = Result_UnsignedChannelUpdateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
