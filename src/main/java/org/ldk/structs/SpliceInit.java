package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A `splice_init` message to be sent by or received from the stfu initiator (splice initiator).
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class SpliceInit extends CommonBase {
	SpliceInit(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.SpliceInit_free(ptr); }
	}

	/**
	 * The channel ID where splicing is intended
	 */
	public ChannelId get_channel_id() {
		long ret = bindings.SpliceInit_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The channel ID where splicing is intended
	 */
	public void set_channel_id(org.ldk.structs.ChannelId val) {
		bindings.SpliceInit_set_channel_id(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The amount the splice initiator is intending to add to its channel balance (splice-in)
	 * or remove from its channel balance (splice-out).
	 */
	public long get_funding_contribution_satoshis() {
		long ret = bindings.SpliceInit_get_funding_contribution_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The amount the splice initiator is intending to add to its channel balance (splice-in)
	 * or remove from its channel balance (splice-out).
	 */
	public void set_funding_contribution_satoshis(long val) {
		bindings.SpliceInit_set_funding_contribution_satoshis(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The feerate for the new funding transaction, set by the splice initiator
	 */
	public int get_funding_feerate_per_kw() {
		int ret = bindings.SpliceInit_get_funding_feerate_per_kw(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The feerate for the new funding transaction, set by the splice initiator
	 */
	public void set_funding_feerate_per_kw(int val) {
		bindings.SpliceInit_set_funding_feerate_per_kw(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The locktime for the new funding transaction
	 */
	public int get_locktime() {
		int ret = bindings.SpliceInit_get_locktime(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The locktime for the new funding transaction
	 */
	public void set_locktime(int val) {
		bindings.SpliceInit_set_locktime(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The key of the sender (splice initiator) controlling the new funding transaction
	 */
	public byte[] get_funding_pubkey() {
		byte[] ret = bindings.SpliceInit_get_funding_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The key of the sender (splice initiator) controlling the new funding transaction
	 */
	public void set_funding_pubkey(byte[] val) {
		bindings.SpliceInit_set_funding_pubkey(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * If set, only confirmed inputs added (by the splice acceptor) will be accepted
	 */
	public COption_NoneZ get_require_confirmed_inputs() {
		COption_NoneZ ret = bindings.SpliceInit_get_require_confirmed_inputs(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * If set, only confirmed inputs added (by the splice acceptor) will be accepted
	 */
	public void set_require_confirmed_inputs(org.ldk.enums.COption_NoneZ val) {
		bindings.SpliceInit_set_require_confirmed_inputs(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new SpliceInit given each field
	 */
	public static SpliceInit of(org.ldk.structs.ChannelId channel_id_arg, long funding_contribution_satoshis_arg, int funding_feerate_per_kw_arg, int locktime_arg, byte[] funding_pubkey_arg, org.ldk.enums.COption_NoneZ require_confirmed_inputs_arg) {
		long ret = bindings.SpliceInit_new(channel_id_arg.ptr, funding_contribution_satoshis_arg, funding_feerate_per_kw_arg, locktime_arg, InternalUtils.check_arr_len(funding_pubkey_arg, 33), require_confirmed_inputs_arg);
		Reference.reachabilityFence(channel_id_arg);
		Reference.reachabilityFence(funding_contribution_satoshis_arg);
		Reference.reachabilityFence(funding_feerate_per_kw_arg);
		Reference.reachabilityFence(locktime_arg);
		Reference.reachabilityFence(funding_pubkey_arg);
		Reference.reachabilityFence(require_confirmed_inputs_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SpliceInit ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.SpliceInit(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.SpliceInit_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the SpliceInit
	 */
	public SpliceInit clone() {
		long ret = bindings.SpliceInit_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SpliceInit ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.SpliceInit(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two SpliceInits contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.SpliceInit b) {
		boolean ret = bindings.SpliceInit_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof SpliceInit)) return false;
		return this.eq((SpliceInit)o);
	}
	/**
	 * Serialize the SpliceInit object into a byte array which can be read by SpliceInit_read
	 */
	public byte[] write() {
		byte[] ret = bindings.SpliceInit_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a SpliceInit from a byte array, created by SpliceInit_write
	 */
	public static Result_SpliceInitDecodeErrorZ read(byte[] ser) {
		long ret = bindings.SpliceInit_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SpliceInitDecodeErrorZ ret_hu_conv = Result_SpliceInitDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
