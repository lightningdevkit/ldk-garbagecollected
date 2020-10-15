package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class ChannelAnnouncement extends CommonBase {
	ChannelAnnouncement(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.ChannelAnnouncement_free(ptr);
	}

	public ChannelAnnouncement(ChannelAnnouncement orig) {
		super(bindings.ChannelAnnouncement_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_node_signature_1(ChannelAnnouncement this_ptr) {
		byte[] ret = bindings.ChannelAnnouncement_get_node_signature_1(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_node_signature_1(ChannelAnnouncement this_ptr, byte[] val) {
		bindings.ChannelAnnouncement_set_node_signature_1(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_node_signature_2(ChannelAnnouncement this_ptr) {
		byte[] ret = bindings.ChannelAnnouncement_get_node_signature_2(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_node_signature_2(ChannelAnnouncement this_ptr, byte[] val) {
		bindings.ChannelAnnouncement_set_node_signature_2(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_bitcoin_signature_1(ChannelAnnouncement this_ptr) {
		byte[] ret = bindings.ChannelAnnouncement_get_bitcoin_signature_1(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_bitcoin_signature_1(ChannelAnnouncement this_ptr, byte[] val) {
		bindings.ChannelAnnouncement_set_bitcoin_signature_1(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_bitcoin_signature_2(ChannelAnnouncement this_ptr) {
		byte[] ret = bindings.ChannelAnnouncement_get_bitcoin_signature_2(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_bitcoin_signature_2(ChannelAnnouncement this_ptr, byte[] val) {
		bindings.ChannelAnnouncement_set_bitcoin_signature_2(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public UnsignedChannelAnnouncement get_contents(ChannelAnnouncement this_ptr) {
		UnsignedChannelAnnouncement ret = new UnsignedChannelAnnouncement(null, bindings.ChannelAnnouncement_get_contents(this_ptr == null ? 0 : this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_contents(ChannelAnnouncement this_ptr, UnsignedChannelAnnouncement val) {
		bindings.ChannelAnnouncement_set_contents(this_ptr == null ? 0 : this_ptr.ptr & ~1, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	public ChannelAnnouncement(byte[] node_signature_1_arg, byte[] node_signature_2_arg, byte[] bitcoin_signature_1_arg, byte[] bitcoin_signature_2_arg, UnsignedChannelAnnouncement contents_arg) {
		super(bindings.ChannelAnnouncement_new(node_signature_1_arg, node_signature_2_arg, bitcoin_signature_1_arg, bitcoin_signature_2_arg, contents_arg == null ? 0 : contents_arg.ptr & ~1));
		this.ptrs_to.add(contents_arg);
	}

	public byte[] write(ChannelAnnouncement obj) {
		byte[] ret = bindings.ChannelAnnouncement_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public ChannelAnnouncement(byte[] ser) {
		super(bindings.ChannelAnnouncement_read(ser));
	}

}
