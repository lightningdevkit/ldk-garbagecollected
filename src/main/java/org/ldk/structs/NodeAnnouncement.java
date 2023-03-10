package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A [`node_announcement`] message to be sent to or received from a peer.
 * 
 * [`node_announcement`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-node_announcement-message
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class NodeAnnouncement extends CommonBase {
	NodeAnnouncement(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.NodeAnnouncement_free(ptr); }
	}

	/**
	 * The signature by the node key
	 */
	public byte[] get_signature() {
		byte[] ret = bindings.NodeAnnouncement_get_signature(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The signature by the node key
	 */
	public void set_signature(byte[] val) {
		bindings.NodeAnnouncement_set_signature(this.ptr, InternalUtils.check_arr_len(val, 64));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The actual content of the announcement
	 */
	public UnsignedNodeAnnouncement get_contents() {
		long ret = bindings.NodeAnnouncement_get_contents(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnsignedNodeAnnouncement ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UnsignedNodeAnnouncement(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The actual content of the announcement
	 */
	public void set_contents(org.ldk.structs.UnsignedNodeAnnouncement val) {
		bindings.NodeAnnouncement_set_contents(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Constructs a new NodeAnnouncement given each field
	 */
	public static NodeAnnouncement of(byte[] signature_arg, org.ldk.structs.UnsignedNodeAnnouncement contents_arg) {
		long ret = bindings.NodeAnnouncement_new(InternalUtils.check_arr_len(signature_arg, 64), contents_arg == null ? 0 : contents_arg.ptr);
		Reference.reachabilityFence(signature_arg);
		Reference.reachabilityFence(contents_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeAnnouncement ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeAnnouncement(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(contents_arg); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.NodeAnnouncement_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the NodeAnnouncement
	 */
	public NodeAnnouncement clone() {
		long ret = bindings.NodeAnnouncement_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeAnnouncement ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeAnnouncement(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two NodeAnnouncements contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.NodeAnnouncement b) {
		boolean ret = bindings.NodeAnnouncement_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof NodeAnnouncement)) return false;
		return this.eq((NodeAnnouncement)o);
	}
	/**
	 * Serialize the NodeAnnouncement object into a byte array which can be read by NodeAnnouncement_read
	 */
	public byte[] write() {
		byte[] ret = bindings.NodeAnnouncement_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a NodeAnnouncement from a byte array, created by NodeAnnouncement_write
	 */
	public static Result_NodeAnnouncementDecodeErrorZ read(byte[] ser) {
		long ret = bindings.NodeAnnouncement_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NodeAnnouncementDecodeErrorZ ret_hu_conv = Result_NodeAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
