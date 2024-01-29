package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A [`query_short_channel_ids`] message is used to query a peer for
 * routing gossip messages related to one or more `short_channel_id`s.
 * 
 * The query recipient will reply with the latest, if available,
 * [`ChannelAnnouncement`], [`ChannelUpdate`] and [`NodeAnnouncement`] messages
 * it maintains for the requested `short_channel_id`s followed by a
 * [`ReplyShortChannelIdsEnd`] message. The `short_channel_id`s sent in
 * this query are encoded. We only support `encoding_type=0` uncompressed
 * serialization and do not support `encoding_type=1` zlib serialization.
 * 
 * [`query_short_channel_ids`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-query_short_channel_idsreply_short_channel_ids_end-messages
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
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The genesis hash of the blockchain being queried
	 */
	public void set_chain_hash(byte[] val) {
		bindings.QueryShortChannelIds_set_chain_hash(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The short_channel_ids that are being queried
	 * 
	 * Returns a copy of the field.
	 */
	public long[] get_short_channel_ids() {
		long[] ret = bindings.QueryShortChannelIds_get_short_channel_ids(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The short_channel_ids that are being queried
	 */
	public void set_short_channel_ids(long[] val) {
		bindings.QueryShortChannelIds_set_short_channel_ids(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new QueryShortChannelIds given each field
	 */
	public static QueryShortChannelIds of(byte[] chain_hash_arg, long[] short_channel_ids_arg) {
		long ret = bindings.QueryShortChannelIds_new(InternalUtils.check_arr_len(chain_hash_arg, 32), short_channel_ids_arg);
		Reference.reachabilityFence(chain_hash_arg);
		Reference.reachabilityFence(short_channel_ids_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.QueryShortChannelIds ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.QueryShortChannelIds(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.QueryShortChannelIds_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the QueryShortChannelIds
	 */
	public QueryShortChannelIds clone() {
		long ret = bindings.QueryShortChannelIds_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.QueryShortChannelIds ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.QueryShortChannelIds(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the QueryShortChannelIds.
	 */
	public long hash() {
		long ret = bindings.QueryShortChannelIds_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two QueryShortChannelIdss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.QueryShortChannelIds b) {
		boolean ret = bindings.QueryShortChannelIds_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof QueryShortChannelIds)) return false;
		return this.eq((QueryShortChannelIds)o);
	}
	/**
	 * Read a QueryShortChannelIds from a byte array, created by QueryShortChannelIds_write
	 */
	public static Result_QueryShortChannelIdsDecodeErrorZ read(byte[] ser) {
		long ret = bindings.QueryShortChannelIds_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_QueryShortChannelIdsDecodeErrorZ ret_hu_conv = Result_QueryShortChannelIdsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Serialize the QueryShortChannelIds object into a byte array which can be read by QueryShortChannelIds_read
	 */
	public byte[] write() {
		byte[] ret = bindings.QueryShortChannelIds_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
