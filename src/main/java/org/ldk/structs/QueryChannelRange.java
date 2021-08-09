package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * A query_channel_range message is used to query a peer for channel
 * UTXOs in a range of blocks. The recipient of a query makes a best
 * effort to reply to the query using one or more reply_channel_range
 * messages.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class QueryChannelRange extends CommonBase {
	QueryChannelRange(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.QueryChannelRange_free(ptr); }
	}

	/**
	 * The genesis hash of the blockchain being queried
	 */
	public byte[] get_chain_hash() {
		byte[] ret = bindings.QueryChannelRange_get_chain_hash(this.ptr);
		return ret;
	}

	/**
	 * The genesis hash of the blockchain being queried
	 */
	public void set_chain_hash(byte[] val) {
		bindings.QueryChannelRange_set_chain_hash(this.ptr, val);
	}

	/**
	 * The height of the first block for the channel UTXOs being queried
	 */
	public int get_first_blocknum() {
		int ret = bindings.QueryChannelRange_get_first_blocknum(this.ptr);
		return ret;
	}

	/**
	 * The height of the first block for the channel UTXOs being queried
	 */
	public void set_first_blocknum(int val) {
		bindings.QueryChannelRange_set_first_blocknum(this.ptr, val);
	}

	/**
	 * The number of blocks to include in the query results
	 */
	public int get_number_of_blocks() {
		int ret = bindings.QueryChannelRange_get_number_of_blocks(this.ptr);
		return ret;
	}

	/**
	 * The number of blocks to include in the query results
	 */
	public void set_number_of_blocks(int val) {
		bindings.QueryChannelRange_set_number_of_blocks(this.ptr, val);
	}

	/**
	 * Constructs a new QueryChannelRange given each field
	 */
	public static QueryChannelRange of(byte[] chain_hash_arg, int first_blocknum_arg, int number_of_blocks_arg) {
		long ret = bindings.QueryChannelRange_new(chain_hash_arg, first_blocknum_arg, number_of_blocks_arg);
		if (ret < 1024) { return null; }
		QueryChannelRange ret_hu_conv = new QueryChannelRange(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a copy of the QueryChannelRange
	 */
	public QueryChannelRange clone() {
		long ret = bindings.QueryChannelRange_clone(this.ptr);
		if (ret < 1024) { return null; }
		QueryChannelRange ret_hu_conv = new QueryChannelRange(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * \n\t * Calculates the overflow safe ending block height for the query.\n\t * Overflow returns `0xffffffff`, otherwise returns `first_blocknum + number_of_blocks`\n\t
	 */
	public int end_blocknum() {
		int ret = bindings.QueryChannelRange_end_blocknum(this.ptr);
		return ret;
	}

	/**
	 * Read a QueryChannelRange from a byte array, created by QueryChannelRange_write
	 */
	public static Result_QueryChannelRangeDecodeErrorZ read(byte[] ser) {
		long ret = bindings.QueryChannelRange_read(ser);
		if (ret < 1024) { return null; }
		Result_QueryChannelRangeDecodeErrorZ ret_hu_conv = Result_QueryChannelRangeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Serialize the QueryChannelRange object into a byte array which can be read by QueryChannelRange_read
	 */
	public byte[] write() {
		byte[] ret = bindings.QueryChannelRange_write(this.ptr);
		return ret;
	}

}
