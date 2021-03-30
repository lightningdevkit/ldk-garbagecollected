package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * Details about one direction of a channel. Received
 * within a channel update.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class DirectionalChannelInfo extends CommonBase {
	DirectionalChannelInfo(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.DirectionalChannelInfo_free(ptr); }
	}

	/**
	 * When the last update to the channel direction was issued.
	 * Value is opaque, as set in the announcement.
	 */
	public int get_last_update() {
		int ret = bindings.DirectionalChannelInfo_get_last_update(this.ptr);
		return ret;
	}

	/**
	 * When the last update to the channel direction was issued.
	 * Value is opaque, as set in the announcement.
	 */
	public void set_last_update(int val) {
		bindings.DirectionalChannelInfo_set_last_update(this.ptr, val);
	}

	/**
	 * Whether the channel can be currently used for payments (in this one direction).
	 */
	public boolean get_enabled() {
		boolean ret = bindings.DirectionalChannelInfo_get_enabled(this.ptr);
		return ret;
	}

	/**
	 * Whether the channel can be currently used for payments (in this one direction).
	 */
	public void set_enabled(boolean val) {
		bindings.DirectionalChannelInfo_set_enabled(this.ptr, val);
	}

	/**
	 * The difference in CLTV values that you must have when routing through this channel.
	 */
	public short get_cltv_expiry_delta() {
		short ret = bindings.DirectionalChannelInfo_get_cltv_expiry_delta(this.ptr);
		return ret;
	}

	/**
	 * The difference in CLTV values that you must have when routing through this channel.
	 */
	public void set_cltv_expiry_delta(short val) {
		bindings.DirectionalChannelInfo_set_cltv_expiry_delta(this.ptr, val);
	}

	/**
	 * The minimum value, which must be relayed to the next hop via the channel
	 */
	public long get_htlc_minimum_msat() {
		long ret = bindings.DirectionalChannelInfo_get_htlc_minimum_msat(this.ptr);
		return ret;
	}

	/**
	 * The minimum value, which must be relayed to the next hop via the channel
	 */
	public void set_htlc_minimum_msat(long val) {
		bindings.DirectionalChannelInfo_set_htlc_minimum_msat(this.ptr, val);
	}

	/**
	 * The maximum value which may be relayed to the next hop via the channel.
	 */
	public Option_u64Z get_htlc_maximum_msat() {
		long ret = bindings.DirectionalChannelInfo_get_htlc_maximum_msat(this.ptr);
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The maximum value which may be relayed to the next hop via the channel.
	 */
	public void set_htlc_maximum_msat(Option_u64Z val) {
		bindings.DirectionalChannelInfo_set_htlc_maximum_msat(this.ptr, val.ptr);
	}

	/**
	 * Fees charged when the channel is used for routing
	 */
	public RoutingFees get_fees() {
		long ret = bindings.DirectionalChannelInfo_get_fees(this.ptr);
		RoutingFees ret_hu_conv = new RoutingFees(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Fees charged when the channel is used for routing
	 */
	public void set_fees(RoutingFees val) {
		bindings.DirectionalChannelInfo_set_fees(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	/**
	 * Most recent update for the channel received from the network
	 * Mostly redundant with the data we store in fields explicitly.
	 * Everything else is useful only for sending out for initial routing sync.
	 * Not stored if contains excess data to prevent DoS.
	 */
	public ChannelUpdate get_last_update_message() {
		long ret = bindings.DirectionalChannelInfo_get_last_update_message(this.ptr);
		ChannelUpdate ret_hu_conv = new ChannelUpdate(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Most recent update for the channel received from the network
	 * Mostly redundant with the data we store in fields explicitly.
	 * Everything else is useful only for sending out for initial routing sync.
	 * Not stored if contains excess data to prevent DoS.
	 */
	public void set_last_update_message(ChannelUpdate val) {
		bindings.DirectionalChannelInfo_set_last_update_message(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	/**
	 * Constructs a new DirectionalChannelInfo given each field
	 */
	public static DirectionalChannelInfo constructor_new(int last_update_arg, boolean enabled_arg, short cltv_expiry_delta_arg, long htlc_minimum_msat_arg, Option_u64Z htlc_maximum_msat_arg, RoutingFees fees_arg, ChannelUpdate last_update_message_arg) {
		long ret = bindings.DirectionalChannelInfo_new(last_update_arg, enabled_arg, cltv_expiry_delta_arg, htlc_minimum_msat_arg, htlc_maximum_msat_arg.ptr, fees_arg == null ? 0 : fees_arg.ptr & ~1, last_update_message_arg == null ? 0 : last_update_message_arg.ptr & ~1);
		DirectionalChannelInfo ret_hu_conv = new DirectionalChannelInfo(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(fees_arg);
		ret_hu_conv.ptrs_to.add(last_update_message_arg);
		return ret_hu_conv;
	}

	/**
	 * Creates a copy of the DirectionalChannelInfo
	 */
	public DirectionalChannelInfo clone() {
		long ret = bindings.DirectionalChannelInfo_clone(this.ptr);
		DirectionalChannelInfo ret_hu_conv = new DirectionalChannelInfo(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the DirectionalChannelInfo object into a byte array which can be read by DirectionalChannelInfo_read
	 */
	public byte[] write() {
		byte[] ret = bindings.DirectionalChannelInfo_write(this.ptr);
		return ret;
	}

	/**
	 * Read a DirectionalChannelInfo from a byte array, created by DirectionalChannelInfo_write
	 */
	public static Result_DirectionalChannelInfoDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.DirectionalChannelInfo_read(ser);
		Result_DirectionalChannelInfoDecodeErrorZ ret_hu_conv = Result_DirectionalChannelInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
