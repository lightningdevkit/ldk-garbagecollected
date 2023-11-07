using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Details about one direction of a channel as received within a [`ChannelUpdate`].
 */
public class ChannelUpdateInfo : CommonBase {
	internal ChannelUpdateInfo(object _dummy, long ptr) : base(ptr) { }
	~ChannelUpdateInfo() {
		if (ptr != 0) { bindings.ChannelUpdateInfo_free(ptr); }
	}

	/**
	 * When the last update to the channel direction was issued.
	 * Value is opaque, as set in the announcement.
	 */
	public int get_last_update() {
		int ret = bindings.ChannelUpdateInfo_get_last_update(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * When the last update to the channel direction was issued.
	 * Value is opaque, as set in the announcement.
	 */
	public void set_last_update(int val) {
		bindings.ChannelUpdateInfo_set_last_update(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Whether the channel can be currently used for payments (in this one direction).
	 */
	public bool get_enabled() {
		bool ret = bindings.ChannelUpdateInfo_get_enabled(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Whether the channel can be currently used for payments (in this one direction).
	 */
	public void set_enabled(bool val) {
		bindings.ChannelUpdateInfo_set_enabled(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The difference in CLTV values that you must have when routing through this channel.
	 */
	public short get_cltv_expiry_delta() {
		short ret = bindings.ChannelUpdateInfo_get_cltv_expiry_delta(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The difference in CLTV values that you must have when routing through this channel.
	 */
	public void set_cltv_expiry_delta(short val) {
		bindings.ChannelUpdateInfo_set_cltv_expiry_delta(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The minimum value, which must be relayed to the next hop via the channel
	 */
	public long get_htlc_minimum_msat() {
		long ret = bindings.ChannelUpdateInfo_get_htlc_minimum_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The minimum value, which must be relayed to the next hop via the channel
	 */
	public void set_htlc_minimum_msat(long val) {
		bindings.ChannelUpdateInfo_set_htlc_minimum_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The maximum value which may be relayed to the next hop via the channel.
	 */
	public long get_htlc_maximum_msat() {
		long ret = bindings.ChannelUpdateInfo_get_htlc_maximum_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The maximum value which may be relayed to the next hop via the channel.
	 */
	public void set_htlc_maximum_msat(long val) {
		bindings.ChannelUpdateInfo_set_htlc_maximum_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Fees charged when the channel is used for routing
	 */
	public RoutingFees get_fees() {
		long ret = bindings.ChannelUpdateInfo_get_fees(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RoutingFees ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RoutingFees(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Fees charged when the channel is used for routing
	 */
	public void set_fees(org.ldk.structs.RoutingFees val) {
		bindings.ChannelUpdateInfo_set_fees(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Most recent update for the channel received from the network
	 * Mostly redundant with the data we store in fields explicitly.
	 * Everything else is useful only for sending out for initial routing sync.
	 * Not stored if contains excess data to prevent DoS.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public ChannelUpdate get_last_update_message() {
		long ret = bindings.ChannelUpdateInfo_get_last_update_message(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelUpdate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelUpdate(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
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
	public void set_last_update_message(org.ldk.structs.ChannelUpdate val) {
		bindings.ChannelUpdateInfo_set_last_update_message(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Constructs a new ChannelUpdateInfo given each field
	 * 
	 * Note that last_update_message_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static ChannelUpdateInfo of(int last_update_arg, bool enabled_arg, short cltv_expiry_delta_arg, long htlc_minimum_msat_arg, long htlc_maximum_msat_arg, org.ldk.structs.RoutingFees fees_arg, org.ldk.structs.ChannelUpdate last_update_message_arg) {
		long ret = bindings.ChannelUpdateInfo_new(last_update_arg, enabled_arg, cltv_expiry_delta_arg, htlc_minimum_msat_arg, htlc_maximum_msat_arg, fees_arg == null ? 0 : fees_arg.ptr, last_update_message_arg == null ? 0 : last_update_message_arg.ptr);
		GC.KeepAlive(last_update_arg);
		GC.KeepAlive(enabled_arg);
		GC.KeepAlive(cltv_expiry_delta_arg);
		GC.KeepAlive(htlc_minimum_msat_arg);
		GC.KeepAlive(htlc_maximum_msat_arg);
		GC.KeepAlive(fees_arg);
		GC.KeepAlive(last_update_message_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelUpdateInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelUpdateInfo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(fees_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(last_update_message_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.ChannelUpdateInfo_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelUpdateInfo
	 */
	public ChannelUpdateInfo clone() {
		long ret = bindings.ChannelUpdateInfo_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelUpdateInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelUpdateInfo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two ChannelUpdateInfos contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.ChannelUpdateInfo b) {
		bool ret = bindings.ChannelUpdateInfo_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is ChannelUpdateInfo)) return false;
		return this.eq((ChannelUpdateInfo)o);
	}
	/**
	 * Serialize the ChannelUpdateInfo object into a byte array which can be read by ChannelUpdateInfo_read
	 */
	public byte[] write() {
		long ret = bindings.ChannelUpdateInfo_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ChannelUpdateInfo from a byte array, created by ChannelUpdateInfo_write
	 */
	public static Result_ChannelUpdateInfoDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ChannelUpdateInfo_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelUpdateInfoDecodeErrorZ ret_hu_conv = Result_ChannelUpdateInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
