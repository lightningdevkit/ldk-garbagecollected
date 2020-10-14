package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class AnnouncementSignatures extends CommonBase {
	AnnouncementSignatures(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.AnnouncementSignatures_free(ptr);
	}

	public AnnouncementSignatures(AnnouncementSignatures orig) {
		super(bindings.AnnouncementSignatures_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_channel_id(AnnouncementSignatures this_ptr) {
		byte[] ret = bindings.AnnouncementSignatures_get_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_id(AnnouncementSignatures this_ptr, byte[] val) {
		bindings.AnnouncementSignatures_set_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_short_channel_id(AnnouncementSignatures this_ptr) {
		long ret = bindings.AnnouncementSignatures_get_short_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_short_channel_id(AnnouncementSignatures this_ptr, long val) {
		bindings.AnnouncementSignatures_set_short_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_node_signature(AnnouncementSignatures this_ptr) {
		byte[] ret = bindings.AnnouncementSignatures_get_node_signature(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_node_signature(AnnouncementSignatures this_ptr, byte[] val) {
		bindings.AnnouncementSignatures_set_node_signature(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_bitcoin_signature(AnnouncementSignatures this_ptr) {
		byte[] ret = bindings.AnnouncementSignatures_get_bitcoin_signature(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_bitcoin_signature(AnnouncementSignatures this_ptr, byte[] val) {
		bindings.AnnouncementSignatures_set_bitcoin_signature(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public AnnouncementSignatures(byte[] channel_id_arg, long short_channel_id_arg, byte[] node_signature_arg, byte[] bitcoin_signature_arg) {
		super(bindings.AnnouncementSignatures_new(channel_id_arg, short_channel_id_arg, node_signature_arg, bitcoin_signature_arg));
	}

	// Skipped AnnouncementSignatures_write
	public AnnouncementSignatures(byte[] ser) {
		super(bindings.AnnouncementSignatures_read(ser));
	}

}
