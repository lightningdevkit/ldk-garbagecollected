package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A [`reply_short_channel_ids_end`] message is sent as a reply to a
 * message. The query recipient makes a best
 * effort to respond based on their local network view which may not be
 * a perfect view of the network.
 * 
 * [`reply_short_channel_ids_end`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-query_short_channel_idsreply_short_channel_ids_end-messages
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ReplyShortChannelIdsEnd extends CommonBase {
	ReplyShortChannelIdsEnd(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ReplyShortChannelIdsEnd_free(ptr); }
	}

	/**
	 * The genesis hash of the blockchain that was queried
	 */
	public byte[] get_chain_hash() {
		byte[] ret = bindings.ReplyShortChannelIdsEnd_get_chain_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The genesis hash of the blockchain that was queried
	 */
	public void set_chain_hash(byte[] val) {
		bindings.ReplyShortChannelIdsEnd_set_chain_hash(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Indicates if the query recipient maintains up-to-date channel
	 * information for the `chain_hash`
	 */
	public boolean get_full_information() {
		boolean ret = bindings.ReplyShortChannelIdsEnd_get_full_information(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Indicates if the query recipient maintains up-to-date channel
	 * information for the `chain_hash`
	 */
	public void set_full_information(boolean val) {
		bindings.ReplyShortChannelIdsEnd_set_full_information(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new ReplyShortChannelIdsEnd given each field
	 */
	public static ReplyShortChannelIdsEnd of(byte[] chain_hash_arg, boolean full_information_arg) {
		long ret = bindings.ReplyShortChannelIdsEnd_new(InternalUtils.check_arr_len(chain_hash_arg, 32), full_information_arg);
		Reference.reachabilityFence(chain_hash_arg);
		Reference.reachabilityFence(full_information_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ReplyShortChannelIdsEnd ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ReplyShortChannelIdsEnd(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ReplyShortChannelIdsEnd_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ReplyShortChannelIdsEnd
	 */
	public ReplyShortChannelIdsEnd clone() {
		long ret = bindings.ReplyShortChannelIdsEnd_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ReplyShortChannelIdsEnd ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ReplyShortChannelIdsEnd(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two ReplyShortChannelIdsEnds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.ReplyShortChannelIdsEnd b) {
		boolean ret = bindings.ReplyShortChannelIdsEnd_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof ReplyShortChannelIdsEnd)) return false;
		return this.eq((ReplyShortChannelIdsEnd)o);
	}
	/**
	 * Serialize the ReplyShortChannelIdsEnd object into a byte array which can be read by ReplyShortChannelIdsEnd_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ReplyShortChannelIdsEnd_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a ReplyShortChannelIdsEnd from a byte array, created by ReplyShortChannelIdsEnd_write
	 */
	public static Result_ReplyShortChannelIdsEndDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ReplyShortChannelIdsEnd_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ReplyShortChannelIdsEndDecodeErrorZ ret_hu_conv = Result_ReplyShortChannelIdsEndDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
