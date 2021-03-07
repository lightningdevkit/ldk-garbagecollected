package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * A query_short_channel_ids message is used to query a peer for
 * routing gossip messages related to one or more short_channel_ids.
 * The query recipient will reply with the latest, if available,
 * channel_announcement, channel_update and node_announcement messages
 * it maintains for the requested short_channel_ids followed by a
 * reply_short_channel_ids_end message. The short_channel_ids sent in
 * this query are encoded. We only support encoding_type=0 uncompressed
 * serialization and do not support encoding_type=1 zlib serialization.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class QueryShortChannelIds extends CommonBase {
	QueryShortChannelIds(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.QueryShortChannelIds_free(ptr); }
	}

	/**
	 * The genesis hash of the blockchain being queried
	 */
	public byte[] get_chain_hash() {
		byte[] ret = bindings.QueryShortChannelIds_get_chain_hash(this.ptr);
		return ret;
	}

	/**
	 * The genesis hash of the blockchain being queried
	 */
	public void set_chain_hash(byte[] val) {
		bindings.QueryShortChannelIds_set_chain_hash(this.ptr, val);
	}

	/**
	 * The short_channel_ids that are being queried
	 */
	public void set_short_channel_ids(long[] val) {
		bindings.QueryShortChannelIds_set_short_channel_ids(this.ptr, val);
	}

	/**
	 * Constructs a new QueryShortChannelIds given each field
	 */
	public static QueryShortChannelIds constructor_new(byte[] chain_hash_arg, long[] short_channel_ids_arg) {
		long ret = bindings.QueryShortChannelIds_new(chain_hash_arg, short_channel_ids_arg);
		QueryShortChannelIds ret_hu_conv = new QueryShortChannelIds(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a copy of the QueryShortChannelIds
	 */
	public QueryShortChannelIds clone() {
		long ret = bindings.QueryShortChannelIds_clone(this.ptr);
		QueryShortChannelIds ret_hu_conv = new QueryShortChannelIds(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Read a QueryShortChannelIds from a byte array, created by QueryShortChannelIds_write
	 */
	public static Result_QueryShortChannelIdsDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.QueryShortChannelIds_read(ser);
		Result_QueryShortChannelIdsDecodeErrorZ ret_hu_conv = Result_QueryShortChannelIdsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Serialize the QueryShortChannelIds object into a byte array which can be read by QueryShortChannelIds_read
	 */
	public byte[] write() {
		byte[] ret = bindings.QueryShortChannelIds_write(this.ptr);
		return ret;
	}

}
