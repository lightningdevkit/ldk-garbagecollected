package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * Information needed for constructing an invoice route hint for this channel.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class CounterpartyForwardingInfo extends CommonBase {
	CounterpartyForwardingInfo(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.CounterpartyForwardingInfo_free(ptr); }
	}

	/**
	 * Base routing fee in millisatoshis.
	 */
	public int get_fee_base_msat() {
		int ret = bindings.CounterpartyForwardingInfo_get_fee_base_msat(this.ptr);
		return ret;
	}

	/**
	 * Base routing fee in millisatoshis.
	 */
	public void set_fee_base_msat(int val) {
		bindings.CounterpartyForwardingInfo_set_fee_base_msat(this.ptr, val);
	}

	/**
	 * Amount in millionths of a satoshi the channel will charge per transferred satoshi.
	 */
	public int get_fee_proportional_millionths() {
		int ret = bindings.CounterpartyForwardingInfo_get_fee_proportional_millionths(this.ptr);
		return ret;
	}

	/**
	 * Amount in millionths of a satoshi the channel will charge per transferred satoshi.
	 */
	public void set_fee_proportional_millionths(int val) {
		bindings.CounterpartyForwardingInfo_set_fee_proportional_millionths(this.ptr, val);
	}

	/**
	 * The minimum difference in cltv_expiry between an ingoing HTLC and its outgoing counterpart,
	 * such that the outgoing HTLC is forwardable to this counterparty. See `msgs::ChannelUpdate`'s
	 * `cltv_expiry_delta` for more details.
	 */
	public short get_cltv_expiry_delta() {
		short ret = bindings.CounterpartyForwardingInfo_get_cltv_expiry_delta(this.ptr);
		return ret;
	}

	/**
	 * The minimum difference in cltv_expiry between an ingoing HTLC and its outgoing counterpart,
	 * such that the outgoing HTLC is forwardable to this counterparty. See `msgs::ChannelUpdate`'s
	 * `cltv_expiry_delta` for more details.
	 */
	public void set_cltv_expiry_delta(short val) {
		bindings.CounterpartyForwardingInfo_set_cltv_expiry_delta(this.ptr, val);
	}

	/**
	 * Constructs a new CounterpartyForwardingInfo given each field
	 */
	public static CounterpartyForwardingInfo of(int fee_base_msat_arg, int fee_proportional_millionths_arg, short cltv_expiry_delta_arg) {
		long ret = bindings.CounterpartyForwardingInfo_new(fee_base_msat_arg, fee_proportional_millionths_arg, cltv_expiry_delta_arg);
		if (ret < 1024) { return null; }
		CounterpartyForwardingInfo ret_hu_conv = new CounterpartyForwardingInfo(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a copy of the CounterpartyForwardingInfo
	 */
	public CounterpartyForwardingInfo clone() {
		long ret = bindings.CounterpartyForwardingInfo_clone(this.ptr);
		if (ret < 1024) { return null; }
		CounterpartyForwardingInfo ret_hu_conv = new CounterpartyForwardingInfo(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
