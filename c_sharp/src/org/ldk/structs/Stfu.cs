using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * An `stfu` (quiescence) message to be sent by or received from the stfu initiator.
 */
public class Stfu : CommonBase {
	internal Stfu(object _dummy, long ptr) : base(ptr) { }
	~Stfu() {
		if (ptr != 0) { bindings.Stfu_free(ptr); }
	}

	/**
	 * The channel ID where quiescence is intended
	 */
	public org.ldk.structs.ChannelId get_channel_id() {
		long ret = bindings.Stfu_get_channel_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The channel ID where quiescence is intended
	 */
	public void set_channel_id(org.ldk.structs.ChannelId val) {
		bindings.Stfu_set_channel_id(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Initiator flag, true if initiating, false if replying to an stfu.
	 */
	public bool get_initiator() {
		bool ret = bindings.Stfu_get_initiator(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Initiator flag, true if initiating, false if replying to an stfu.
	 */
	public void set_initiator(bool val) {
		bindings.Stfu_set_initiator(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new Stfu given each field
	 */
	public static org.ldk.structs.Stfu of(org.ldk.structs.ChannelId channel_id_arg, bool initiator_arg) {
		long ret = bindings.Stfu_new(channel_id_arg.ptr, initiator_arg);
		GC.KeepAlive(channel_id_arg);
		GC.KeepAlive(initiator_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Stfu ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Stfu(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.Stfu_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Stfu
	 */
	public org.ldk.structs.Stfu clone() {
		long ret = bindings.Stfu_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Stfu ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Stfu(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Stfus contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.Stfu b) {
		bool ret = bindings.Stfu_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is Stfu)) return false;
		return this.eq((Stfu)o);
	}
	/**
	 * Serialize the Stfu object into a byte array which can be read by Stfu_read
	 */
	public byte[] write() {
		long ret = bindings.Stfu_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Stfu from a byte array, created by Stfu_write
	 */
	public static org.ldk.structs.Result_StfuDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Stfu_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StfuDecodeErrorZ ret_hu_conv = Result_StfuDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
