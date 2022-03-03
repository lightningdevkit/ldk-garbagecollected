package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Details about one direction of a channel as received within a [`ChannelUpdate`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelUpdateInfo extends CommonBase {
	ChannelUpdateInfo(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelUpdateInfo_free(ptr); }
	}

	/**
	 * When the last update to the channel direction was issued.
	 * Value is opaque, as set in the announcement.
	 */
	public int get_last_update() {
		int ret = bindings.ChannelUpdateInfo_get_last_update(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * When the last update to the channel direction was issued.
	 * Value is opaque, as set in the announcement.
	 */
	public void set_last_update(int val) {
		bindings.ChannelUpdateInfo_set_last_update(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Whether the channel can be currently used for payments (in this one direction).
	 */
	public boolean get_enabled() {
		boolean ret = bindings.ChannelUpdateInfo_get_enabled(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Whether the channel can be currently used for payments (in this one direction).
	 */
	public void set_enabled(boolean val) {
		bindings.ChannelUpdateInfo_set_enabled(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The difference in CLTV values that you must have when routing through this channel.
	 */
	public short get_cltv_expiry_delta() {
		short ret = bindings.ChannelUpdateInfo_get_cltv_expiry_delta(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The difference in CLTV values that you must have when routing through this channel.
	 */
	public void set_cltv_expiry_delta(short val) {
		bindings.ChannelUpdateInfo_set_cltv_expiry_delta(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The minimum value, which must be relayed to the next hop via the channel
	 */
	public long get_htlc_minimum_msat() {
		long ret = bindings.ChannelUpdateInfo_get_htlc_minimum_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The minimum value, which must be relayed to the next hop via the channel
	 */
	public void set_htlc_minimum_msat(long val) {
		bindings.ChannelUpdateInfo_set_htlc_minimum_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The maximum value which may be relayed to the next hop via the channel.
	 */
	public Option_u64Z get_htlc_maximum_msat() {
		long ret = bindings.ChannelUpdateInfo_get_htlc_maximum_msat(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The maximum value which may be relayed to the next hop via the channel.
	 */
	public void set_htlc_maximum_msat(Option_u64Z val) {
		bindings.ChannelUpdateInfo_set_htlc_maximum_msat(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Fees charged when the channel is used for routing
	 */
	public RoutingFees get_fees() {
		long ret = bindings.ChannelUpdateInfo_get_fees(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		RoutingFees ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new RoutingFees(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Fees charged when the channel is used for routing
	 */
	public void set_fees(RoutingFees val) {
		bindings.ChannelUpdateInfo_set_fees(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Most recent update for the channel received from the network
	 * Mostly redundant with the data we store in fields explicitly.
	 * Everything else is useful only for sending out for initial routing sync.
	 * Not stored if contains excess data to prevent DoS.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public ChannelUpdate get_last_update_message() {
		long ret = bindings.ChannelUpdateInfo_get_last_update_message(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelUpdate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelUpdate(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Most recent update for the channel received from the network
	 * Mostly redundant with the data we store in fields explicitly.
	 * Everything else is useful only for sending out for initial routing sync.
	 * Not stored if contains excess data to prevent DoS.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_last_update_message(@Nullable ChannelUpdate val) {
		bindings.ChannelUpdateInfo_set_last_update_message(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new ChannelUpdateInfo given each field
	 */
	public static ChannelUpdateInfo of(int last_update_arg, boolean enabled_arg, short cltv_expiry_delta_arg, long htlc_minimum_msat_arg, Option_u64Z htlc_maximum_msat_arg, RoutingFees fees_arg, ChannelUpdate last_update_message_arg) {
		long ret = bindings.ChannelUpdateInfo_new(last_update_arg, enabled_arg, cltv_expiry_delta_arg, htlc_minimum_msat_arg, htlc_maximum_msat_arg.ptr, fees_arg == null ? 0 : fees_arg.ptr & ~1, last_update_message_arg == null ? 0 : last_update_message_arg.ptr & ~1);
		Reference.reachabilityFence(last_update_arg);
		Reference.reachabilityFence(enabled_arg);
		Reference.reachabilityFence(cltv_expiry_delta_arg);
		Reference.reachabilityFence(htlc_minimum_msat_arg);
		Reference.reachabilityFence(htlc_maximum_msat_arg);
		Reference.reachabilityFence(fees_arg);
		Reference.reachabilityFence(last_update_message_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelUpdateInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelUpdateInfo(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ChannelUpdateInfo_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelUpdateInfo
	 */
	public ChannelUpdateInfo clone() {
		long ret = bindings.ChannelUpdateInfo_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelUpdateInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelUpdateInfo(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelUpdateInfo object into a byte array which can be read by ChannelUpdateInfo_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ChannelUpdateInfo_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a ChannelUpdateInfo from a byte array, created by ChannelUpdateInfo_write
	 */
	public static Result_ChannelUpdateInfoDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ChannelUpdateInfo_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelUpdateInfoDecodeErrorZ ret_hu_conv = Result_ChannelUpdateInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
