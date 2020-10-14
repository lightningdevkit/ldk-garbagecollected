package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class UnsignedNodeAnnouncement extends CommonBase {
	UnsignedNodeAnnouncement(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.UnsignedNodeAnnouncement_free(ptr);
	}

	public UnsignedNodeAnnouncement(UnsignedNodeAnnouncement orig) {
		super(bindings.UnsignedNodeAnnouncement_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public NodeFeatures get_features(UnsignedNodeAnnouncement this_ptr) {
		NodeFeatures ret = new NodeFeatures(null, bindings.UnsignedNodeAnnouncement_get_features(this_ptr == null ? 0 : this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	// Skipped UnsignedNodeAnnouncement_set_features
	public int get_timestamp(UnsignedNodeAnnouncement this_ptr) {
		int ret = bindings.UnsignedNodeAnnouncement_get_timestamp(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_timestamp(UnsignedNodeAnnouncement this_ptr, int val) {
		bindings.UnsignedNodeAnnouncement_set_timestamp(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_node_id(UnsignedNodeAnnouncement this_ptr) {
		byte[] ret = bindings.UnsignedNodeAnnouncement_get_node_id(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_node_id(UnsignedNodeAnnouncement this_ptr, byte[] val) {
		bindings.UnsignedNodeAnnouncement_set_node_id(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_rgb(UnsignedNodeAnnouncement this_ptr) {
		byte[] ret = bindings.UnsignedNodeAnnouncement_get_rgb(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_rgb(UnsignedNodeAnnouncement this_ptr, byte[] val) {
		bindings.UnsignedNodeAnnouncement_set_rgb(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_alias(UnsignedNodeAnnouncement this_ptr) {
		byte[] ret = bindings.UnsignedNodeAnnouncement_get_alias(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_alias(UnsignedNodeAnnouncement this_ptr, byte[] val) {
		bindings.UnsignedNodeAnnouncement_set_alias(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	// Skipped UnsignedNodeAnnouncement_set_addresses
	// Skipped UnsignedNodeAnnouncement_write
	public UnsignedNodeAnnouncement(byte[] ser) {
		super(bindings.UnsignedNodeAnnouncement_read(ser));
	}

}
