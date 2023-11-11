using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`gossip_timestamp_filter`] message is used by a node to request
 * gossip relay for messages in the requested time range when the
 * `gossip_queries` feature has been negotiated.
 * 
 * [`gossip_timestamp_filter`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-gossip_timestamp_filter-message
 */
public class GossipTimestampFilter : CommonBase {
	internal GossipTimestampFilter(object _dummy, long ptr) : base(ptr) { }
	~GossipTimestampFilter() {
		if (ptr != 0) { bindings.GossipTimestampFilter_free(ptr); }
	}

	/**
	 * The genesis hash of the blockchain for channel and node information
	 */
	public byte[] get_chain_hash() {
		long ret = bindings.GossipTimestampFilter_get_chain_hash(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The genesis hash of the blockchain for channel and node information
	 */
	public void set_chain_hash(byte[] val) {
		bindings.GossipTimestampFilter_set_chain_hash(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The starting unix timestamp
	 */
	public int get_first_timestamp() {
		int ret = bindings.GossipTimestampFilter_get_first_timestamp(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The starting unix timestamp
	 */
	public void set_first_timestamp(int val) {
		bindings.GossipTimestampFilter_set_first_timestamp(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The range of information in seconds
	 */
	public int get_timestamp_range() {
		int ret = bindings.GossipTimestampFilter_get_timestamp_range(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The range of information in seconds
	 */
	public void set_timestamp_range(int val) {
		bindings.GossipTimestampFilter_set_timestamp_range(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new GossipTimestampFilter given each field
	 */
	public static GossipTimestampFilter of(byte[] chain_hash_arg, int first_timestamp_arg, int timestamp_range_arg) {
		long ret = bindings.GossipTimestampFilter_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(chain_hash_arg, 32)), first_timestamp_arg, timestamp_range_arg);
		GC.KeepAlive(chain_hash_arg);
		GC.KeepAlive(first_timestamp_arg);
		GC.KeepAlive(timestamp_range_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.GossipTimestampFilter ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.GossipTimestampFilter(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.GossipTimestampFilter_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the GossipTimestampFilter
	 */
	public GossipTimestampFilter clone() {
		long ret = bindings.GossipTimestampFilter_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.GossipTimestampFilter ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.GossipTimestampFilter(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two GossipTimestampFilters contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.GossipTimestampFilter b) {
		bool ret = bindings.GossipTimestampFilter_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is GossipTimestampFilter)) return false;
		return this.eq((GossipTimestampFilter)o);
	}
	/**
	 * Serialize the GossipTimestampFilter object into a byte array which can be read by GossipTimestampFilter_read
	 */
	public byte[] write() {
		long ret = bindings.GossipTimestampFilter_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a GossipTimestampFilter from a byte array, created by GossipTimestampFilter_write
	 */
	public static Result_GossipTimestampFilterDecodeErrorZ read(byte[] ser) {
		long ret = bindings.GossipTimestampFilter_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_GossipTimestampFilterDecodeErrorZ ret_hu_conv = Result_GossipTimestampFilterDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
