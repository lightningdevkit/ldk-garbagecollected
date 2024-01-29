using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`reply_channel_range`] message is a reply to a [`QueryChannelRange`]
 * message.
 * 
 * Multiple `reply_channel_range` messages can be sent in reply
 * to a single [`QueryChannelRange`] message. The query recipient makes a
 * best effort to respond based on their local network view which may
 * not be a perfect view of the network. The `short_channel_id`s in the
 * reply are encoded. We only support `encoding_type=0` uncompressed
 * serialization and do not support `encoding_type=1` zlib serialization.
 * 
 * [`reply_channel_range`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-query_channel_range-and-reply_channel_range-messages
 */
public class ReplyChannelRange : CommonBase {
	internal ReplyChannelRange(object _dummy, long ptr) : base(ptr) { }
	~ReplyChannelRange() {
		if (ptr != 0) { bindings.ReplyChannelRange_free(ptr); }
	}

	/**
	 * The genesis hash of the blockchain being queried
	 */
	public byte[] get_chain_hash() {
		long ret = bindings.ReplyChannelRange_get_chain_hash(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The genesis hash of the blockchain being queried
	 */
	public void set_chain_hash(byte[] val) {
		bindings.ReplyChannelRange_set_chain_hash(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The height of the first block in the range of the reply
	 */
	public int get_first_blocknum() {
		int ret = bindings.ReplyChannelRange_get_first_blocknum(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The height of the first block in the range of the reply
	 */
	public void set_first_blocknum(int val) {
		bindings.ReplyChannelRange_set_first_blocknum(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The number of blocks included in the range of the reply
	 */
	public int get_number_of_blocks() {
		int ret = bindings.ReplyChannelRange_get_number_of_blocks(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The number of blocks included in the range of the reply
	 */
	public void set_number_of_blocks(int val) {
		bindings.ReplyChannelRange_set_number_of_blocks(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * True when this is the final reply for a query
	 */
	public bool get_sync_complete() {
		bool ret = bindings.ReplyChannelRange_get_sync_complete(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * True when this is the final reply for a query
	 */
	public void set_sync_complete(bool val) {
		bindings.ReplyChannelRange_set_sync_complete(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The `short_channel_id`s in the channel range
	 * 
	 * Returns a copy of the field.
	 */
	public long[] get_short_channel_ids() {
		long ret = bindings.ReplyChannelRange_get_short_channel_ids(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		long[] ret_conv = InternalUtils.decodeUint64Array(ret);
		return ret_conv;
	}

	/**
	 * The `short_channel_id`s in the channel range
	 */
	public void set_short_channel_ids(long[] val) {
		bindings.ReplyChannelRange_set_short_channel_ids(this.ptr, InternalUtils.encodeUint64Array(val));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new ReplyChannelRange given each field
	 */
	public static ReplyChannelRange of(byte[] chain_hash_arg, int first_blocknum_arg, int number_of_blocks_arg, bool sync_complete_arg, long[] short_channel_ids_arg) {
		long ret = bindings.ReplyChannelRange_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(chain_hash_arg, 32)), first_blocknum_arg, number_of_blocks_arg, sync_complete_arg, InternalUtils.encodeUint64Array(short_channel_ids_arg));
		GC.KeepAlive(chain_hash_arg);
		GC.KeepAlive(first_blocknum_arg);
		GC.KeepAlive(number_of_blocks_arg);
		GC.KeepAlive(sync_complete_arg);
		GC.KeepAlive(short_channel_ids_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ReplyChannelRange ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ReplyChannelRange(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.ReplyChannelRange_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ReplyChannelRange
	 */
	public ReplyChannelRange clone() {
		long ret = bindings.ReplyChannelRange_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ReplyChannelRange ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ReplyChannelRange(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ReplyChannelRange.
	 */
	public long hash() {
		long ret = bindings.ReplyChannelRange_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two ReplyChannelRanges contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.ReplyChannelRange b) {
		bool ret = bindings.ReplyChannelRange_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is ReplyChannelRange)) return false;
		return this.eq((ReplyChannelRange)o);
	}
	/**
	 * Read a ReplyChannelRange from a byte array, created by ReplyChannelRange_write
	 */
	public static Result_ReplyChannelRangeDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ReplyChannelRange_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ReplyChannelRangeDecodeErrorZ ret_hu_conv = Result_ReplyChannelRangeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ReplyChannelRange object into a byte array which can be read by ReplyChannelRange_read
	 */
	public byte[] write() {
		long ret = bindings.ReplyChannelRange_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

}
} } }
