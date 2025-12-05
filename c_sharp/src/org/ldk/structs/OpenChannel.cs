using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * An [`open_channel`] message to be sent to or received from a peer.
 * 
 * Used in V1 channel establishment
 * 
 * [`open_channel`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-open_channel-message
 */
public class OpenChannel : CommonBase {
	internal OpenChannel(object _dummy, long ptr) : base(ptr) { }
	~OpenChannel() {
		if (ptr != 0) { bindings.OpenChannel_free(ptr); }
	}

	/**
	 * Common fields of `open_channel(2)`-like messages
	 */
	public org.ldk.structs.CommonOpenChannelFields get_common_fields() {
		long ret = bindings.OpenChannel_get_common_fields(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CommonOpenChannelFields ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CommonOpenChannelFields(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Common fields of `open_channel(2)`-like messages
	 */
	public void set_common_fields(org.ldk.structs.CommonOpenChannelFields val) {
		bindings.OpenChannel_set_common_fields(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The amount to push to the counterparty as part of the open, in milli-satoshi
	 */
	public long get_push_msat() {
		long ret = bindings.OpenChannel_get_push_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The amount to push to the counterparty as part of the open, in milli-satoshi
	 */
	public void set_push_msat(long val) {
		bindings.OpenChannel_set_push_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The minimum value unencumbered by HTLCs for the counterparty to keep in the channel
	 */
	public long get_channel_reserve_satoshis() {
		long ret = bindings.OpenChannel_get_channel_reserve_satoshis(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The minimum value unencumbered by HTLCs for the counterparty to keep in the channel
	 */
	public void set_channel_reserve_satoshis(long val) {
		bindings.OpenChannel_set_channel_reserve_satoshis(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new OpenChannel given each field
	 */
	public static org.ldk.structs.OpenChannel of(org.ldk.structs.CommonOpenChannelFields common_fields_arg, long push_msat_arg, long channel_reserve_satoshis_arg) {
		long ret = bindings.OpenChannel_new(common_fields_arg.ptr, push_msat_arg, channel_reserve_satoshis_arg);
		GC.KeepAlive(common_fields_arg);
		GC.KeepAlive(push_msat_arg);
		GC.KeepAlive(channel_reserve_satoshis_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OpenChannel ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OpenChannel(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.OpenChannel_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the OpenChannel
	 */
	public org.ldk.structs.OpenChannel clone() {
		long ret = bindings.OpenChannel_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OpenChannel ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OpenChannel(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the OpenChannel.
	 */
	public long hash() {
		long ret = bindings.OpenChannel_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two OpenChannels contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.OpenChannel b) {
		bool ret = bindings.OpenChannel_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is OpenChannel)) return false;
		return this.eq((OpenChannel)o);
	}
	/**
	 * Serialize the OpenChannel object into a byte array which can be read by OpenChannel_read
	 */
	public byte[] write() {
		long ret = bindings.OpenChannel_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a OpenChannel from a byte array, created by OpenChannel_write
	 */
	public static org.ldk.structs.Result_OpenChannelDecodeErrorZ read(byte[] ser) {
		long ret = bindings.OpenChannel_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OpenChannelDecodeErrorZ ret_hu_conv = Result_OpenChannelDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
