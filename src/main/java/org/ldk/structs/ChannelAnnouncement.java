package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelAnnouncement extends CommonBase {
	ChannelAnnouncement(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelAnnouncement_free(ptr); }
	}

	public ChannelAnnouncement clone() {
		long ret = bindings.ChannelAnnouncement_clone(this.ptr);
		ChannelAnnouncement ret_hu_conv = new ChannelAnnouncement(null, ret);
		return ret_hu_conv;
	}

	public byte[] get_node_signature_1() {
		byte[] ret = bindings.ChannelAnnouncement_get_node_signature_1(this.ptr);
		return ret;
	}

	public void set_node_signature_1(byte[] val) {
		bindings.ChannelAnnouncement_set_node_signature_1(this.ptr, val);
	}

	public byte[] get_node_signature_2() {
		byte[] ret = bindings.ChannelAnnouncement_get_node_signature_2(this.ptr);
		return ret;
	}

	public void set_node_signature_2(byte[] val) {
		bindings.ChannelAnnouncement_set_node_signature_2(this.ptr, val);
	}

	public byte[] get_bitcoin_signature_1() {
		byte[] ret = bindings.ChannelAnnouncement_get_bitcoin_signature_1(this.ptr);
		return ret;
	}

	public void set_bitcoin_signature_1(byte[] val) {
		bindings.ChannelAnnouncement_set_bitcoin_signature_1(this.ptr, val);
	}

	public byte[] get_bitcoin_signature_2() {
		byte[] ret = bindings.ChannelAnnouncement_get_bitcoin_signature_2(this.ptr);
		return ret;
	}

	public void set_bitcoin_signature_2(byte[] val) {
		bindings.ChannelAnnouncement_set_bitcoin_signature_2(this.ptr, val);
	}

	public UnsignedChannelAnnouncement get_contents() {
		long ret = bindings.ChannelAnnouncement_get_contents(this.ptr);
		UnsignedChannelAnnouncement ret_hu_conv = new UnsignedChannelAnnouncement(null, ret);
		return ret_hu_conv;
	}

	public void set_contents(UnsignedChannelAnnouncement val) {
		bindings.ChannelAnnouncement_set_contents(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public static ChannelAnnouncement constructor_new(byte[] node_signature_1_arg, byte[] node_signature_2_arg, byte[] bitcoin_signature_1_arg, byte[] bitcoin_signature_2_arg, UnsignedChannelAnnouncement contents_arg) {
		long ret = bindings.ChannelAnnouncement_new(node_signature_1_arg, node_signature_2_arg, bitcoin_signature_1_arg, bitcoin_signature_2_arg, contents_arg == null ? 0 : contents_arg.ptr & ~1);
		ChannelAnnouncement ret_hu_conv = new ChannelAnnouncement(null, ret);
		ret_hu_conv.ptrs_to.add(contents_arg);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.ChannelAnnouncement_write(this.ptr);
		return ret;
	}

	public static ChannelAnnouncement constructor_read(byte[] ser) {
		long ret = bindings.ChannelAnnouncement_read(ser);
		ChannelAnnouncement ret_hu_conv = new ChannelAnnouncement(null, ret);
		return ret_hu_conv;
	}

}
