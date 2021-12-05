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
		UnsignedChannelUpdate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new UnsignedChannelUpdate(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
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
