package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An `stfu` (quiescence) message to be sent by or received from the stfu initiator.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Stfu extends CommonBase {
	Stfu(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Stfu_free(ptr); }
	}

	/**
	 * The channel ID where quiescence is intended
	 */
	public ChannelId get_channel_id() {
		long ret = bindings.Stfu_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The channel ID where quiescence is intended
	 */
	public void set_channel_id(org.ldk.structs.ChannelId val) {
		bindings.Stfu_set_channel_id(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Initiator flag, true if initiating, false if replying to an stfu.
	 */
	public boolean get_initiator() {
		boolean ret = bindings.Stfu_get_initiator(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Initiator flag, true if initiating, false if replying to an stfu.
	 */
	public void set_initiator(boolean val) {
		bindings.Stfu_set_initiator(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new Stfu given each field
	 */
	public static Stfu of(org.ldk.structs.ChannelId channel_id_arg, boolean initiator_arg) {
		long ret = bindings.Stfu_new(channel_id_arg.ptr, initiator_arg);
		Reference.reachabilityFence(channel_id_arg);
		Reference.reachabilityFence(initiator_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Stfu ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Stfu(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.Stfu_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Stfu
	 */
	public Stfu clone() {
		long ret = bindings.Stfu_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Stfu ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Stfu(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Stfus contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.Stfu b) {
		boolean ret = bindings.Stfu_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Stfu)) return false;
		return this.eq((Stfu)o);
	}
	/**
	 * Serialize the Stfu object into a byte array which can be read by Stfu_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Stfu_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a Stfu from a byte array, created by Stfu_write
	 */
	public static Result_StfuDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Stfu_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StfuDecodeErrorZ ret_hu_conv = Result_StfuDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
