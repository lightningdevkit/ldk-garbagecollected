package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class UnsignedChannelAnnouncement extends CommonBase {
	UnsignedChannelAnnouncement(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UnsignedChannelAnnouncement_free(ptr); }
	}

	public ChannelFeatures get_features() {
		long ret = bindings.UnsignedChannelAnnouncement_get_features(this.ptr);
		ChannelFeatures ret_hu_conv = new ChannelFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_features(ChannelFeatures val) {
		bindings.UnsignedChannelAnnouncement_set_features(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public byte[] get_chain_hash() {
		byte[] ret = bindings.UnsignedChannelAnnouncement_get_chain_hash(this.ptr);
		return ret;
	}

	public void set_chain_hash(byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_chain_hash(this.ptr, val);
	}

	public long get_short_channel_id() {
		long ret = bindings.UnsignedChannelAnnouncement_get_short_channel_id(this.ptr);
		return ret;
	}

	public void set_short_channel_id(long val) {
		bindings.UnsignedChannelAnnouncement_set_short_channel_id(this.ptr, val);
	}

	public byte[] get_node_id_1() {
		byte[] ret = bindings.UnsignedChannelAnnouncement_get_node_id_1(this.ptr);
		return ret;
	}

	public void set_node_id_1(byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_node_id_1(this.ptr, val);
	}

	public byte[] get_node_id_2() {
		byte[] ret = bindings.UnsignedChannelAnnouncement_get_node_id_2(this.ptr);
		return ret;
	}

	public void set_node_id_2(byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_node_id_2(this.ptr, val);
	}

	public byte[] get_bitcoin_key_1() {
		byte[] ret = bindings.UnsignedChannelAnnouncement_get_bitcoin_key_1(this.ptr);
		return ret;
	}

	public void set_bitcoin_key_1(byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_bitcoin_key_1(this.ptr, val);
	}

	public byte[] get_bitcoin_key_2() {
		byte[] ret = bindings.UnsignedChannelAnnouncement_get_bitcoin_key_2(this.ptr);
		return ret;
	}

	public void set_bitcoin_key_2(byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_bitcoin_key_2(this.ptr, val);
	}

	public UnsignedChannelAnnouncement clone() {
		long ret = bindings.UnsignedChannelAnnouncement_clone(this.ptr);
		UnsignedChannelAnnouncement ret_hu_conv = new UnsignedChannelAnnouncement(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.UnsignedChannelAnnouncement_write(this.ptr);
		return ret;
	}

	public static Result_UnsignedChannelAnnouncementDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.UnsignedChannelAnnouncement_read(ser);
		Result_UnsignedChannelAnnouncementDecodeErrorZ ret_hu_conv = Result_UnsignedChannelAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
