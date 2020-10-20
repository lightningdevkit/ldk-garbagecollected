package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class NodeAnnouncement extends CommonBase {
	NodeAnnouncement(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.NodeAnnouncement_free(ptr);
	}

	public static NodeAnnouncement constructor_clone(NodeAnnouncement orig) {
		long ret = bindings.NodeAnnouncement_clone(orig == null ? 0 : orig.ptr & ~1);
		NodeAnnouncement ret_hu_conv = new NodeAnnouncement(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public byte[] get_signature() {
		byte[] ret = bindings.NodeAnnouncement_get_signature(this.ptr);
		return ret;
	}

	public void set_signature(byte[] val) {
		bindings.NodeAnnouncement_set_signature(this.ptr, val);
	}

	public UnsignedNodeAnnouncement get_contents() {
		long ret = bindings.NodeAnnouncement_get_contents(this.ptr);
		UnsignedNodeAnnouncement ret_hu_conv = new UnsignedNodeAnnouncement(null, ret);
		return ret_hu_conv;
	}

	public void set_contents(UnsignedNodeAnnouncement val) {
		bindings.NodeAnnouncement_set_contents(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public static NodeAnnouncement constructor_new(byte[] signature_arg, UnsignedNodeAnnouncement contents_arg) {
		long ret = bindings.NodeAnnouncement_new(signature_arg, contents_arg == null ? 0 : contents_arg.ptr & ~1);
		NodeAnnouncement ret_hu_conv = new NodeAnnouncement(null, ret);
		ret_hu_conv.ptrs_to.add(contents_arg);
		return ret_hu_conv;
	}

	public byte[] write(NodeAnnouncement obj) {
		byte[] ret = bindings.NodeAnnouncement_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static NodeAnnouncement constructor_read(byte[] ser) {
		long ret = bindings.NodeAnnouncement_read(ser);
		NodeAnnouncement ret_hu_conv = new NodeAnnouncement(null, ret);
		return ret_hu_conv;
	}

}
