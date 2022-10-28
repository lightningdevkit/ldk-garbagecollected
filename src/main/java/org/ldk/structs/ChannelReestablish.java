package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A channel_reestablish message to be sent or received from a peer
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelReestablish extends CommonBase {
	ChannelReestablish(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelReestablish_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.ChannelReestablish_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.ChannelReestablish_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The next commitment number for the sender
	 */
	public long get_next_local_commitment_number() {
		long ret = bindings.ChannelReestablish_get_next_local_commitment_number(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The next commitment number for the sender
	 */
	public void set_next_local_commitment_number(long val) {
		bindings.ChannelReestablish_set_next_local_commitment_number(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The next commitment number for the recipient
	 */
	public long get_next_remote_commitment_number() {
		long ret = bindings.ChannelReestablish_get_next_remote_commitment_number(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The next commitment number for the recipient
	 */
	public void set_next_remote_commitment_number(long val) {
		bindings.ChannelReestablish_set_next_remote_commitment_number(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	long clone_ptr() {
		long ret = bindings.ChannelReestablish_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelReestablish
	 */
	public ChannelReestablish clone() {
		long ret = bindings.ChannelReestablish_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelReestablish ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelReestablish(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two ChannelReestablishs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(ChannelReestablish b) {
		boolean ret = bindings.ChannelReestablish_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof ChannelReestablish)) return false;
		return this.eq((ChannelReestablish)o);
	}
	/**
	 * Serialize the ChannelReestablish object into a byte array which can be read by ChannelReestablish_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ChannelReestablish_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a ChannelReestablish from a byte array, created by ChannelReestablish_write
	 */
	public static Result_ChannelReestablishDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ChannelReestablish_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelReestablishDecodeErrorZ ret_hu_conv = Result_ChannelReestablishDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
