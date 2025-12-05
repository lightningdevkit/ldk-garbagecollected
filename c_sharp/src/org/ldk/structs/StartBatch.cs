using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`start_batch`] message to be sent to group together multiple channel messages as a single
 * logical message.
 * 
 * [`start_batch`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#batching-channel-messages
 */
public class StartBatch : CommonBase {
	internal StartBatch(object _dummy, long ptr) : base(ptr) { }
	~StartBatch() {
		if (ptr != 0) { bindings.StartBatch_free(ptr); }
	}

	/**
	 * The channel ID of all messages in the batch.
	 */
	public org.ldk.structs.ChannelId get_channel_id() {
		long ret = bindings.StartBatch_get_channel_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The channel ID of all messages in the batch.
	 */
	public void set_channel_id(org.ldk.structs.ChannelId val) {
		bindings.StartBatch_set_channel_id(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The number of messages to follow.
	 */
	public short get_batch_size() {
		short ret = bindings.StartBatch_get_batch_size(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The number of messages to follow.
	 */
	public void set_batch_size(short val) {
		bindings.StartBatch_set_batch_size(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The type of all messages expected in the batch.
	 */
	public org.ldk.structs.Option_u16Z get_message_type() {
		long ret = bindings.StartBatch_get_message_type(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u16Z ret_hu_conv = org.ldk.structs.Option_u16Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The type of all messages expected in the batch.
	 */
	public void set_message_type(org.ldk.structs.Option_u16Z val) {
		bindings.StartBatch_set_message_type(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new StartBatch given each field
	 */
	public static org.ldk.structs.StartBatch of(org.ldk.structs.ChannelId channel_id_arg, short batch_size_arg, org.ldk.structs.Option_u16Z message_type_arg) {
		long ret = bindings.StartBatch_new(channel_id_arg.ptr, batch_size_arg, message_type_arg.ptr);
		GC.KeepAlive(channel_id_arg);
		GC.KeepAlive(batch_size_arg);
		GC.KeepAlive(message_type_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.StartBatch ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.StartBatch(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.StartBatch_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the StartBatch
	 */
	public org.ldk.structs.StartBatch clone() {
		long ret = bindings.StartBatch_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.StartBatch ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.StartBatch(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the StartBatch.
	 */
	public long hash() {
		long ret = bindings.StartBatch_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two StartBatchs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.StartBatch b) {
		bool ret = bindings.StartBatch_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is StartBatch)) return false;
		return this.eq((StartBatch)o);
	}
	/**
	 * Serialize the StartBatch object into a byte array which can be read by StartBatch_read
	 */
	public byte[] write() {
		long ret = bindings.StartBatch_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a StartBatch from a byte array, created by StartBatch_write
	 */
	public static org.ldk.structs.Result_StartBatchDecodeErrorZ read(byte[] ser) {
		long ret = bindings.StartBatch_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StartBatchDecodeErrorZ ret_hu_conv = Result_StartBatchDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
