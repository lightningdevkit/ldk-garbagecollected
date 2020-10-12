package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class NodeAnnouncement extends CommonBase {
	NodeAnnouncement(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.NodeAnnouncement_free(ptr); super.finalize();
	}

	public NodeAnnouncement(NodeAnnouncement orig) {
		super(bindings.NodeAnnouncement_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	// Skipped NodeAnnouncement_get_signature
	// Skipped NodeAnnouncement_set_signature
	public UnsignedNodeAnnouncement get_contents(NodeAnnouncement this_ptr) {
		UnsignedNodeAnnouncement ret = new UnsignedNodeAnnouncement(null, bindings.NodeAnnouncement_get_contents(this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_contents(NodeAnnouncement this_ptr, UnsignedNodeAnnouncement val) {
		bindings.NodeAnnouncement_set_contents(this_ptr.ptr & ~1, val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	// Skipped NodeAnnouncement_new
	// Skipped NodeAnnouncement_write
	// Skipped NodeAnnouncement_read
}
