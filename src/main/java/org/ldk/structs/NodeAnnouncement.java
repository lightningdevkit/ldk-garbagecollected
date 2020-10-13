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
		super(bindings.NodeAnnouncement_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_signature(NodeAnnouncement this_ptr) {
		byte[] ret = bindings.NodeAnnouncement_get_signature(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_signature(NodeAnnouncement this_ptr, byte[] val) {
		bindings.NodeAnnouncement_set_signature(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public UnsignedNodeAnnouncement get_contents(NodeAnnouncement this_ptr) {
		UnsignedNodeAnnouncement ret = new UnsignedNodeAnnouncement(null, bindings.NodeAnnouncement_get_contents(this_ptr == null ? 0 : this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_contents(NodeAnnouncement this_ptr, UnsignedNodeAnnouncement val) {
		bindings.NodeAnnouncement_set_contents(this_ptr == null ? 0 : this_ptr.ptr & ~1, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	public NodeAnnouncement(byte[] signature_arg, UnsignedNodeAnnouncement contents_arg) {
		super(bindings.NodeAnnouncement_new(signature_arg, contents_arg == null ? 0 : contents_arg.ptr & ~1));
		this.ptrs_to.add(contents_arg);
	}

	// Skipped NodeAnnouncement_write
	public NodeAnnouncement(byte[] ser) {
		super(bindings.NodeAnnouncement_read(ser));
	}

}
