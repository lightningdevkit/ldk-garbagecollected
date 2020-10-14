package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class UnsignedChannelAnnouncement extends CommonBase {
	UnsignedChannelAnnouncement(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.UnsignedChannelAnnouncement_free(ptr);
	}

	public UnsignedChannelAnnouncement(UnsignedChannelAnnouncement orig) {
		super(bindings.UnsignedChannelAnnouncement_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public ChannelFeatures get_features(UnsignedChannelAnnouncement this_ptr) {
		ChannelFeatures ret = new ChannelFeatures(null, bindings.UnsignedChannelAnnouncement_get_features(this_ptr == null ? 0 : this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	// Skipped UnsignedChannelAnnouncement_set_features
	public byte[] get_chain_hash(UnsignedChannelAnnouncement this_ptr) {
		byte[] ret = bindings.UnsignedChannelAnnouncement_get_chain_hash(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_chain_hash(UnsignedChannelAnnouncement this_ptr, byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_chain_hash(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_short_channel_id(UnsignedChannelAnnouncement this_ptr) {
		long ret = bindings.UnsignedChannelAnnouncement_get_short_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_short_channel_id(UnsignedChannelAnnouncement this_ptr, long val) {
		bindings.UnsignedChannelAnnouncement_set_short_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_node_id_1(UnsignedChannelAnnouncement this_ptr) {
		byte[] ret = bindings.UnsignedChannelAnnouncement_get_node_id_1(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_node_id_1(UnsignedChannelAnnouncement this_ptr, byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_node_id_1(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_node_id_2(UnsignedChannelAnnouncement this_ptr) {
		byte[] ret = bindings.UnsignedChannelAnnouncement_get_node_id_2(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_node_id_2(UnsignedChannelAnnouncement this_ptr, byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_node_id_2(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_bitcoin_key_1(UnsignedChannelAnnouncement this_ptr) {
		byte[] ret = bindings.UnsignedChannelAnnouncement_get_bitcoin_key_1(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_bitcoin_key_1(UnsignedChannelAnnouncement this_ptr, byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_bitcoin_key_1(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_bitcoin_key_2(UnsignedChannelAnnouncement this_ptr) {
		byte[] ret = bindings.UnsignedChannelAnnouncement_get_bitcoin_key_2(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_bitcoin_key_2(UnsignedChannelAnnouncement this_ptr, byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_bitcoin_key_2(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	// Skipped UnsignedChannelAnnouncement_write
	public UnsignedChannelAnnouncement(byte[] ser) {
		super(bindings.UnsignedChannelAnnouncement_read(ser));
	}

}
