package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class ChannelAnnouncement extends CommonBase {
	ChannelAnnouncement(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.ChannelAnnouncement_free(ptr); super.finalize();
	}

	public ChannelAnnouncement(ChannelAnnouncement orig) {
		super(bindings.ChannelAnnouncement_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	// Skipped ChannelAnnouncement_get_node_signature_1
	// Skipped ChannelAnnouncement_set_node_signature_1
	// Skipped ChannelAnnouncement_get_node_signature_2
	// Skipped ChannelAnnouncement_set_node_signature_2
	// Skipped ChannelAnnouncement_get_bitcoin_signature_1
	// Skipped ChannelAnnouncement_set_bitcoin_signature_1
	// Skipped ChannelAnnouncement_get_bitcoin_signature_2
	// Skipped ChannelAnnouncement_set_bitcoin_signature_2
	public UnsignedChannelAnnouncement get_contents(ChannelAnnouncement this_ptr) {
		UnsignedChannelAnnouncement ret = new UnsignedChannelAnnouncement(null, bindings.ChannelAnnouncement_get_contents(this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_contents(ChannelAnnouncement this_ptr, UnsignedChannelAnnouncement val) {
		bindings.ChannelAnnouncement_set_contents(this_ptr.ptr & ~1, val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	// Skipped ChannelAnnouncement_new
	// Skipped ChannelAnnouncement_write
	// Skipped ChannelAnnouncement_read
}
