package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A gossip_timestamp_filter message is used by a node to request
 * gossip relay for messages in the requested time range when the
 * gossip_queries feature has been negotiated.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class GossipTimestampFilter extends CommonBase {
	GossipTimestampFilter(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.GossipTimestampFilter_free(ptr); }
	}

	/**
	 * The genesis hash of the blockchain for channel and node information
	 */
	public byte[] get_chain_hash() {
		byte[] ret = bindings.GossipTimestampFilter_get_chain_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The genesis hash of the blockchain for channel and node information
	 */
	public void set_chain_hash(byte[] val) {
		bindings.GossipTimestampFilter_set_chain_hash(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The starting unix timestamp
	 */
	public int get_first_timestamp() {
		int ret = bindings.GossipTimestampFilter_get_first_timestamp(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The starting unix timestamp
	 */
	public void set_first_timestamp(int val) {
		bindings.GossipTimestampFilter_set_first_timestamp(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The range of information in seconds
	 */
	public int get_timestamp_range() {
		int ret = bindings.GossipTimestampFilter_get_timestamp_range(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The range of information in seconds
	 */
	public void set_timestamp_range(int val) {
		bindings.GossipTimestampFilter_set_timestamp_range(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new GossipTimestampFilter given each field
	 */
	public static GossipTimestampFilter of(byte[] chain_hash_arg, int first_timestamp_arg, int timestamp_range_arg) {
		long ret = bindings.GossipTimestampFilter_new(InternalUtils.check_arr_len(chain_hash_arg, 32), first_timestamp_arg, timestamp_range_arg);
		Reference.reachabilityFence(chain_hash_arg);
		Reference.reachabilityFence(first_timestamp_arg);
		Reference.reachabilityFence(timestamp_range_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		GossipTimestampFilter ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new GossipTimestampFilter(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.GossipTimestampFilter_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the GossipTimestampFilter
	 */
	public GossipTimestampFilter clone() {
		long ret = bindings.GossipTimestampFilter_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		GossipTimestampFilter ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new GossipTimestampFilter(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the GossipTimestampFilter object into a byte array which can be read by GossipTimestampFilter_read
	 */
	public byte[] write() {
		byte[] ret = bindings.GossipTimestampFilter_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a GossipTimestampFilter from a byte array, created by GossipTimestampFilter_write
	 */
	public static Result_GossipTimestampFilterDecodeErrorZ read(byte[] ser) {
		long ret = bindings.GossipTimestampFilter_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_GossipTimestampFilterDecodeErrorZ ret_hu_conv = Result_GossipTimestampFilterDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
