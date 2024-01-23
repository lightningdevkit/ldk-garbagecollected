package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A splice message to be sent by or received from the stfu initiator (splice initiator).
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Splice extends CommonBase {
	Splice(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Splice_free(ptr); }
	}

	/**
	 * The channel ID where splicing is intended
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.Splice_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel ID where splicing is intended
	 */
	public void set_channel_id(byte[] val) {
		bindings.Splice_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The genesis hash of the blockchain where the channel is intended to be spliced
	 */
	public byte[] get_chain_hash() {
		byte[] ret = bindings.Splice_get_chain_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The genesis hash of the blockchain where the channel is intended to be spliced
	 */
	public void set_chain_hash(byte[] val) {
		bindings.Splice_set_chain_hash(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The intended change in channel capacity: the amount to be added (positive value)
	 * or removed (negative value) by the sender (splice initiator) by splicing into/from the channel.
	 */
	public long get_relative_satoshis() {
		long ret = bindings.Splice_get_relative_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The intended change in channel capacity: the amount to be added (positive value)
	 * or removed (negative value) by the sender (splice initiator) by splicing into/from the channel.
	 */
	public void set_relative_satoshis(long val) {
		bindings.Splice_set_relative_satoshis(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The feerate for the new funding transaction, set by the splice initiator
	 */
	public int get_funding_feerate_perkw() {
		int ret = bindings.Splice_get_funding_feerate_perkw(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The feerate for the new funding transaction, set by the splice initiator
	 */
	public void set_funding_feerate_perkw(int val) {
		bindings.Splice_set_funding_feerate_perkw(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The locktime for the new funding transaction
	 */
	public int get_locktime() {
		int ret = bindings.Splice_get_locktime(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The locktime for the new funding transaction
	 */
	public void set_locktime(int val) {
		bindings.Splice_set_locktime(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The key of the sender (splice initiator) controlling the new funding transaction
	 */
	public byte[] get_funding_pubkey() {
		byte[] ret = bindings.Splice_get_funding_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The key of the sender (splice initiator) controlling the new funding transaction
	 */
	public void set_funding_pubkey(byte[] val) {
		bindings.Splice_set_funding_pubkey(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new Splice given each field
	 */
	public static Splice of(byte[] channel_id_arg, byte[] chain_hash_arg, long relative_satoshis_arg, int funding_feerate_perkw_arg, int locktime_arg, byte[] funding_pubkey_arg) {
		long ret = bindings.Splice_new(InternalUtils.check_arr_len(channel_id_arg, 32), InternalUtils.check_arr_len(chain_hash_arg, 32), relative_satoshis_arg, funding_feerate_perkw_arg, locktime_arg, InternalUtils.check_arr_len(funding_pubkey_arg, 33));
		Reference.reachabilityFence(channel_id_arg);
		Reference.reachabilityFence(chain_hash_arg);
		Reference.reachabilityFence(relative_satoshis_arg);
		Reference.reachabilityFence(funding_feerate_perkw_arg);
		Reference.reachabilityFence(locktime_arg);
		Reference.reachabilityFence(funding_pubkey_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Splice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Splice(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.Splice_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Splice
	 */
	public Splice clone() {
		long ret = bindings.Splice_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Splice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Splice(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Splices contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.Splice b) {
		boolean ret = bindings.Splice_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Splice)) return false;
		return this.eq((Splice)o);
	}
	/**
	 * Serialize the Splice object into a byte array which can be read by Splice_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Splice_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a Splice from a byte array, created by Splice_write
	 */
	public static Result_SpliceDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Splice_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SpliceDecodeErrorZ ret_hu_conv = Result_SpliceDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
