package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A reply_channel_range message is a reply to a query_channel_range
 * message. Multiple reply_channel_range messages can be sent in reply
 * to a single query_channel_range message. The query recipient makes a
 * best effort to respond based on their local network view which may
 * not be a perfect view of the network. The short_channel_ids in the
 * reply are encoded. We only support encoding_type=0 uncompressed
 * serialization and do not support encoding_type=1 zlib serialization.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ReplyChannelRange extends CommonBase {
	ReplyChannelRange(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ReplyChannelRange_free(ptr); }
	}

	/**
	 * The genesis hash of the blockchain being queried
	 */
	public byte[] get_chain_hash() {
		byte[] ret = bindings.ReplyChannelRange_get_chain_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The genesis hash of the blockchain being queried
	 */
	public void set_chain_hash(byte[] val) {
		bindings.ReplyChannelRange_set_chain_hash(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The height of the first block in the range of the reply
	 */
	public int get_first_blocknum() {
		int ret = bindings.ReplyChannelRange_get_first_blocknum(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The height of the first block in the range of the reply
	 */
	public void set_first_blocknum(int val) {
		bindings.ReplyChannelRange_set_first_blocknum(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The number of blocks included in the range of the reply
	 */
	public int get_number_of_blocks() {
		int ret = bindings.ReplyChannelRange_get_number_of_blocks(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The number of blocks included in the range of the reply
	 */
	public void set_number_of_blocks(int val) {
		bindings.ReplyChannelRange_set_number_of_blocks(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * True when this is the final reply for a query
	 */
	public boolean get_sync_complete() {
		boolean ret = bindings.ReplyChannelRange_get_sync_complete(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * True when this is the final reply for a query
	 */
	public void set_sync_complete(boolean val) {
		bindings.ReplyChannelRange_set_sync_complete(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The short_channel_ids in the channel range
	 */
	public void set_short_channel_ids(long[] val) {
		bindings.ReplyChannelRange_set_short_channel_ids(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new ReplyChannelRange given each field
	 */
	public static ReplyChannelRange of(byte[] chain_hash_arg, int first_blocknum_arg, int number_of_blocks_arg, boolean sync_complete_arg, long[] short_channel_ids_arg) {
		long ret = bindings.ReplyChannelRange_new(InternalUtils.check_arr_len(chain_hash_arg, 32), first_blocknum_arg, number_of_blocks_arg, sync_complete_arg, short_channel_ids_arg);
		Reference.reachabilityFence(chain_hash_arg);
		Reference.reachabilityFence(first_blocknum_arg);
		Reference.reachabilityFence(number_of_blocks_arg);
		Reference.reachabilityFence(sync_complete_arg);
		Reference.reachabilityFence(short_channel_ids_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		ReplyChannelRange ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ReplyChannelRange(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ReplyChannelRange_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ReplyChannelRange
	 */
	public ReplyChannelRange clone() {
		long ret = bindings.ReplyChannelRange_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ReplyChannelRange ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ReplyChannelRange(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Read a ReplyChannelRange from a byte array, created by ReplyChannelRange_write
	 */
	public static Result_ReplyChannelRangeDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ReplyChannelRange_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ReplyChannelRangeDecodeErrorZ ret_hu_conv = Result_ReplyChannelRangeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ReplyChannelRange object into a byte array which can be read by ReplyChannelRange_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ReplyChannelRange_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
