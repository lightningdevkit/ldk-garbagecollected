package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class AnnouncementSignatures extends CommonBase {
	AnnouncementSignatures(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.AnnouncementSignatures_free(ptr); super.finalize();
	}

	public AnnouncementSignatures(AnnouncementSignatures orig) {
		super(bindings.AnnouncementSignatures_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_channel_id(AnnouncementSignatures this_ptr) {
		byte[] ret = bindings.AnnouncementSignatures_get_channel_id(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_id(AnnouncementSignatures this_ptr, byte[] val) {
		bindings.AnnouncementSignatures_set_channel_id(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_short_channel_id(AnnouncementSignatures this_ptr) {
		long ret = bindings.AnnouncementSignatures_get_short_channel_id(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_short_channel_id(AnnouncementSignatures this_ptr, long val) {
		bindings.AnnouncementSignatures_set_short_channel_id(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	// Skipped AnnouncementSignatures_get_node_signature
	// Skipped AnnouncementSignatures_set_node_signature
	// Skipped AnnouncementSignatures_get_bitcoin_signature
	// Skipped AnnouncementSignatures_set_bitcoin_signature
	// Skipped AnnouncementSignatures_new
	// Skipped AnnouncementSignatures_write
	// Skipped AnnouncementSignatures_read
}
