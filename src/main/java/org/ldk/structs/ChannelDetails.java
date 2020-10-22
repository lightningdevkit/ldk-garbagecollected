package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelDetails extends CommonBase {
	ChannelDetails(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelDetails_free(ptr); }
	}

	public static ChannelDetails constructor_clone(ChannelDetails orig) {
		long ret = bindings.ChannelDetails_clone(orig == null ? 0 : orig.ptr & ~1);
		ChannelDetails ret_hu_conv = new ChannelDetails(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public byte[] get_channel_id() {
		byte[] ret = bindings.ChannelDetails_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(byte[] val) {
		bindings.ChannelDetails_set_channel_id(this.ptr, val);
	}

	public byte[] get_remote_network_id() {
		byte[] ret = bindings.ChannelDetails_get_remote_network_id(this.ptr);
		return ret;
	}

	public void set_remote_network_id(byte[] val) {
		bindings.ChannelDetails_set_remote_network_id(this.ptr, val);
	}

	public InitFeatures get_counterparty_features() {
		long ret = bindings.ChannelDetails_get_counterparty_features(this.ptr);
		InitFeatures ret_hu_conv = new InitFeatures(null, ret);
		return ret_hu_conv;
	}

	// Skipped ChannelDetails_set_counterparty_features
	public long get_channel_value_satoshis() {
		long ret = bindings.ChannelDetails_get_channel_value_satoshis(this.ptr);
		return ret;
	}

	public void set_channel_value_satoshis(long val) {
		bindings.ChannelDetails_set_channel_value_satoshis(this.ptr, val);
	}

	public long get_user_id() {
		long ret = bindings.ChannelDetails_get_user_id(this.ptr);
		return ret;
	}

	public void set_user_id(long val) {
		bindings.ChannelDetails_set_user_id(this.ptr, val);
	}

	public long get_outbound_capacity_msat() {
		long ret = bindings.ChannelDetails_get_outbound_capacity_msat(this.ptr);
		return ret;
	}

	public void set_outbound_capacity_msat(long val) {
		bindings.ChannelDetails_set_outbound_capacity_msat(this.ptr, val);
	}

	public long get_inbound_capacity_msat() {
		long ret = bindings.ChannelDetails_get_inbound_capacity_msat(this.ptr);
		return ret;
	}

	public void set_inbound_capacity_msat(long val) {
		bindings.ChannelDetails_set_inbound_capacity_msat(this.ptr, val);
	}

	public boolean get_is_live() {
		boolean ret = bindings.ChannelDetails_get_is_live(this.ptr);
		return ret;
	}

	public void set_is_live(boolean val) {
		bindings.ChannelDetails_set_is_live(this.ptr, val);
	}

}
