package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class UnsignedNodeAnnouncement extends CommonBase {
	UnsignedNodeAnnouncement(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UnsignedNodeAnnouncement_free(ptr); }
	}

	public UnsignedNodeAnnouncement clone() {
		long ret = bindings.UnsignedNodeAnnouncement_clone(this.ptr);
		UnsignedNodeAnnouncement ret_hu_conv = new UnsignedNodeAnnouncement(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public NodeFeatures get_features() {
		long ret = bindings.UnsignedNodeAnnouncement_get_features(this.ptr);
		NodeFeatures ret_hu_conv = new NodeFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_features(NodeFeatures val) {
		bindings.UnsignedNodeAnnouncement_set_features(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid this being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after this call, val is reset to null and is now a dummy object.
		val.ptr = 0;
	}

	public int get_timestamp() {
		int ret = bindings.UnsignedNodeAnnouncement_get_timestamp(this.ptr);
		return ret;
	}

	public void set_timestamp(int val) {
		bindings.UnsignedNodeAnnouncement_set_timestamp(this.ptr, val);
	}

	public byte[] get_node_id() {
		byte[] ret = bindings.UnsignedNodeAnnouncement_get_node_id(this.ptr);
		return ret;
	}

	public void set_node_id(byte[] val) {
		bindings.UnsignedNodeAnnouncement_set_node_id(this.ptr, val);
	}

	public byte[] get_rgb() {
		byte[] ret = bindings.UnsignedNodeAnnouncement_get_rgb(this.ptr);
		return ret;
	}

	public void set_rgb(byte[] val) {
		bindings.UnsignedNodeAnnouncement_set_rgb(this.ptr, val);
	}

	public byte[] get_alias() {
		byte[] ret = bindings.UnsignedNodeAnnouncement_get_alias(this.ptr);
		return ret;
	}

	public void set_alias(byte[] val) {
		bindings.UnsignedNodeAnnouncement_set_alias(this.ptr, val);
	}

	public void set_addresses(NetAddress[] val) {
		bindings.UnsignedNodeAnnouncement_set_addresses(this.ptr, Arrays.stream(val).mapToLong(arr_conv_12 -> arr_conv_12.ptr).toArray());
		/* TODO 2 NetAddress  */;
	}

	public byte[] write() {
		byte[] ret = bindings.UnsignedNodeAnnouncement_write(this.ptr);
		return ret;
	}

	public static Result_UnsignedNodeAnnouncementDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.UnsignedNodeAnnouncement_read(ser);
		Result_UnsignedNodeAnnouncementDecodeErrorZ ret_hu_conv = Result_UnsignedNodeAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
