using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`reply_short_channel_ids_end`] message is sent as a reply to a
 * message. The query recipient makes a best
 * effort to respond based on their local network view which may not be
 * a perfect view of the network.
 * 
 * [`reply_short_channel_ids_end`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-query_short_channel_idsreply_short_channel_ids_end-messages
 */
public class ReplyShortChannelIdsEnd : CommonBase {
	internal ReplyShortChannelIdsEnd(object _dummy, long ptr) : base(ptr) { }
	~ReplyShortChannelIdsEnd() {
		if (ptr != 0) { bindings.ReplyShortChannelIdsEnd_free(ptr); }
	}

	/**
	 * The genesis hash of the blockchain that was queried
	 */
	public byte[] get_chain_hash() {
		long ret = bindings.ReplyShortChannelIdsEnd_get_chain_hash(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The genesis hash of the blockchain that was queried
	 */
	public void set_chain_hash(byte[] val) {
		bindings.ReplyShortChannelIdsEnd_set_chain_hash(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Indicates if the query recipient maintains up-to-date channel
	 * information for the `chain_hash`
	 */
	public bool get_full_information() {
		bool ret = bindings.ReplyShortChannelIdsEnd_get_full_information(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Indicates if the query recipient maintains up-to-date channel
	 * information for the `chain_hash`
	 */
	public void set_full_information(bool val) {
		bindings.ReplyShortChannelIdsEnd_set_full_information(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new ReplyShortChannelIdsEnd given each field
	 */
	public static ReplyShortChannelIdsEnd of(byte[] chain_hash_arg, bool full_information_arg) {
		long ret = bindings.ReplyShortChannelIdsEnd_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(chain_hash_arg, 32)), full_information_arg);
		GC.KeepAlive(chain_hash_arg);
		GC.KeepAlive(full_information_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ReplyShortChannelIdsEnd ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ReplyShortChannelIdsEnd(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.ReplyShortChannelIdsEnd_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ReplyShortChannelIdsEnd
	 */
	public ReplyShortChannelIdsEnd clone() {
		long ret = bindings.ReplyShortChannelIdsEnd_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ReplyShortChannelIdsEnd ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ReplyShortChannelIdsEnd(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two ReplyShortChannelIdsEnds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.ReplyShortChannelIdsEnd b) {
		bool ret = bindings.ReplyShortChannelIdsEnd_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is ReplyShortChannelIdsEnd)) return false;
		return this.eq((ReplyShortChannelIdsEnd)o);
	}
	/**
	 * Serialize the ReplyShortChannelIdsEnd object into a byte array which can be read by ReplyShortChannelIdsEnd_read
	 */
	public byte[] write() {
		long ret = bindings.ReplyShortChannelIdsEnd_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ReplyShortChannelIdsEnd from a byte array, created by ReplyShortChannelIdsEnd_write
	 */
	public static Result_ReplyShortChannelIdsEndDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ReplyShortChannelIdsEnd_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ReplyShortChannelIdsEndDecodeErrorZ ret_hu_conv = Result_ReplyShortChannelIdsEndDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
