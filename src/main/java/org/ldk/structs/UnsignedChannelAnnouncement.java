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
		bindings.UnsignedChannelAnnouncement_free(ptr);
	}

	public static UnsignedChannelAnnouncement constructor_clone(UnsignedChannelAnnouncement orig) {
		long ret = bindings.UnsignedChannelAnnouncement_clone(orig == null ? 0 : orig.ptr & ~1);
		UnsignedChannelAnnouncement ret_hu_conv = new UnsignedChannelAnnouncement(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public ChannelFeatures get_features() {
		long ret = bindings.UnsignedChannelAnnouncement_get_features(this.ptr);
		ChannelFeatures ret_hu_conv = new ChannelFeatures(null, ret);
		return ret_hu_conv;
	}

	// Skipped UnsignedChannelAnnouncement_set_features
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

	public byte[] write(UnsignedChannelAnnouncement obj) {
		byte[] ret = bindings.UnsignedChannelAnnouncement_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static UnsignedChannelAnnouncement constructor_read(byte[] ser) {
		long ret = bindings.UnsignedChannelAnnouncement_read(ser);
		UnsignedChannelAnnouncement ret_hu_conv = new UnsignedChannelAnnouncement(null, ret);
		return ret_hu_conv;
	}

}
