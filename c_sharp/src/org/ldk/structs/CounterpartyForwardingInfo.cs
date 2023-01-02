using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Information needed for constructing an invoice route hint for this channel.
 */
public class CounterpartyForwardingInfo : CommonBase {
	internal CounterpartyForwardingInfo(object _dummy, long ptr) : base(ptr) { }
	~CounterpartyForwardingInfo() {
		if (ptr != 0) { bindings.CounterpartyForwardingInfo_free(ptr); }
	}

	/**
	 * Base routing fee in millisatoshis.
	 */
	public int get_fee_base_msat() {
		int ret = bindings.CounterpartyForwardingInfo_get_fee_base_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Base routing fee in millisatoshis.
	 */
	public void set_fee_base_msat(int val) {
		bindings.CounterpartyForwardingInfo_set_fee_base_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Amount in millionths of a satoshi the channel will charge per transferred satoshi.
	 */
	public int get_fee_proportional_millionths() {
		int ret = bindings.CounterpartyForwardingInfo_get_fee_proportional_millionths(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Amount in millionths of a satoshi the channel will charge per transferred satoshi.
	 */
	public void set_fee_proportional_millionths(int val) {
		bindings.CounterpartyForwardingInfo_set_fee_proportional_millionths(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The minimum difference in cltv_expiry between an ingoing HTLC and its outgoing counterpart,
	 * such that the outgoing HTLC is forwardable to this counterparty. See `msgs::ChannelUpdate`'s
	 * `cltv_expiry_delta` for more details.
	 */
	public short get_cltv_expiry_delta() {
		short ret = bindings.CounterpartyForwardingInfo_get_cltv_expiry_delta(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The minimum difference in cltv_expiry between an ingoing HTLC and its outgoing counterpart,
	 * such that the outgoing HTLC is forwardable to this counterparty. See `msgs::ChannelUpdate`'s
	 * `cltv_expiry_delta` for more details.
	 */
	public void set_cltv_expiry_delta(short val) {
		bindings.CounterpartyForwardingInfo_set_cltv_expiry_delta(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new CounterpartyForwardingInfo given each field
	 */
	public static CounterpartyForwardingInfo of(int fee_base_msat_arg, int fee_proportional_millionths_arg, short cltv_expiry_delta_arg) {
		long ret = bindings.CounterpartyForwardingInfo_new(fee_base_msat_arg, fee_proportional_millionths_arg, cltv_expiry_delta_arg);
		GC.KeepAlive(fee_base_msat_arg);
		GC.KeepAlive(fee_proportional_millionths_arg);
		GC.KeepAlive(cltv_expiry_delta_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CounterpartyForwardingInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CounterpartyForwardingInfo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.CounterpartyForwardingInfo_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the CounterpartyForwardingInfo
	 */
	public CounterpartyForwardingInfo clone() {
		long ret = bindings.CounterpartyForwardingInfo_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CounterpartyForwardingInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CounterpartyForwardingInfo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the CounterpartyForwardingInfo object into a byte array which can be read by CounterpartyForwardingInfo_read
	 */
	public byte[] write() {
		byte[] ret = bindings.CounterpartyForwardingInfo_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a CounterpartyForwardingInfo from a byte array, created by CounterpartyForwardingInfo_write
	 */
	public static Result_CounterpartyForwardingInfoDecodeErrorZ read(byte[] ser) {
		long ret = bindings.CounterpartyForwardingInfo_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CounterpartyForwardingInfoDecodeErrorZ ret_hu_conv = Result_CounterpartyForwardingInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
