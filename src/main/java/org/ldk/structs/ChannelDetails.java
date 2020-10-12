package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class ChannelDetails extends CommonBase {
	ChannelDetails(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.ChannelDetails_free(ptr); super.finalize();
	}

	public byte[] get_channel_id(ChannelDetails this_ptr) {
		byte[] ret = bindings.ChannelDetails_get_channel_id(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_id(ChannelDetails this_ptr, byte[] val) {
		bindings.ChannelDetails_set_channel_id(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_remote_network_id(ChannelDetails this_ptr) {
		byte[] ret = bindings.ChannelDetails_get_remote_network_id(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_remote_network_id(ChannelDetails this_ptr, byte[] val) {
		bindings.ChannelDetails_set_remote_network_id(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public InitFeatures get_counterparty_features(ChannelDetails this_ptr) {
		InitFeatures ret = new InitFeatures(null, bindings.ChannelDetails_get_counterparty_features(this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_counterparty_features(ChannelDetails this_ptr, InitFeatures val) {
		bindings.ChannelDetails_set_counterparty_features(this_ptr.ptr & ~1, val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	public long get_channel_value_satoshis(ChannelDetails this_ptr) {
		long ret = bindings.ChannelDetails_get_channel_value_satoshis(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_value_satoshis(ChannelDetails this_ptr, long val) {
		bindings.ChannelDetails_set_channel_value_satoshis(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_user_id(ChannelDetails this_ptr) {
		long ret = bindings.ChannelDetails_get_user_id(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_user_id(ChannelDetails this_ptr, long val) {
		bindings.ChannelDetails_set_user_id(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_outbound_capacity_msat(ChannelDetails this_ptr) {
		long ret = bindings.ChannelDetails_get_outbound_capacity_msat(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_outbound_capacity_msat(ChannelDetails this_ptr, long val) {
		bindings.ChannelDetails_set_outbound_capacity_msat(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_inbound_capacity_msat(ChannelDetails this_ptr) {
		long ret = bindings.ChannelDetails_get_inbound_capacity_msat(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_inbound_capacity_msat(ChannelDetails this_ptr, long val) {
		bindings.ChannelDetails_set_inbound_capacity_msat(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public boolean get_is_live(ChannelDetails this_ptr) {
		boolean ret = bindings.ChannelDetails_get_is_live(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_is_live(ChannelDetails this_ptr, boolean val) {
		bindings.ChannelDetails_set_is_live(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

}
