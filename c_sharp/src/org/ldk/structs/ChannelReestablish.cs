using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A channel_reestablish message to be sent or received from a peer
 */
public class ChannelReestablish : CommonBase {
	internal ChannelReestablish(object _dummy, long ptr) : base(ptr) { }
	~ChannelReestablish() {
		if (ptr != 0) { bindings.ChannelReestablish_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.ChannelReestablish_get_channel_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.ChannelReestablish_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The next commitment number for the sender
	 */
	public long get_next_local_commitment_number() {
		long ret = bindings.ChannelReestablish_get_next_local_commitment_number(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The next commitment number for the sender
	 */
	public void set_next_local_commitment_number(long val) {
		bindings.ChannelReestablish_set_next_local_commitment_number(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The next commitment number for the recipient
	 */
	public long get_next_remote_commitment_number() {
		long ret = bindings.ChannelReestablish_get_next_remote_commitment_number(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The next commitment number for the recipient
	 */
	public void set_next_remote_commitment_number(long val) {
		bindings.ChannelReestablish_set_next_remote_commitment_number(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	internal long clone_ptr() {
		long ret = bindings.ChannelReestablish_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelReestablish
	 */
	public ChannelReestablish clone() {
		long ret = bindings.ChannelReestablish_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelReestablish ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelReestablish(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two ChannelReestablishs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.ChannelReestablish b) {
		bool ret = bindings.ChannelReestablish_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is ChannelReestablish)) return false;
		return this.eq((ChannelReestablish)o);
	}
	/**
	 * Serialize the ChannelReestablish object into a byte array which can be read by ChannelReestablish_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ChannelReestablish_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a ChannelReestablish from a byte array, created by ChannelReestablish_write
	 */
	public static Result_ChannelReestablishDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ChannelReestablish_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelReestablishDecodeErrorZ ret_hu_conv = Result_ChannelReestablishDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
