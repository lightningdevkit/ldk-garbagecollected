package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A `splice_ack` message to be received by or sent to the splice initiator.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class SpliceAck extends CommonBase {
	SpliceAck(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.SpliceAck_free(ptr); }
	}

	/**
	 * The channel ID where splicing is intended
	 */
	public ChannelId get_channel_id() {
		long ret = bindings.SpliceAck_get_channel_id(this.ptr);
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
		bindings.SpliceAck_set_channel_id(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The amount the splice acceptor is intending to add to its channel balance (splice-in)
	 * or remove from its channel balance (splice-out).
	 */
	public long get_funding_contribution_satoshis() {
		long ret = bindings.SpliceAck_get_funding_contribution_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The amount the splice acceptor is intending to add to its channel balance (splice-in)
	 * or remove from its channel balance (splice-out).
	 */
	public void set_funding_contribution_satoshis(long val) {
		bindings.SpliceAck_set_funding_contribution_satoshis(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The key of the sender (splice acceptor) controlling the new funding transaction
	 */
	public byte[] get_funding_pubkey() {
		byte[] ret = bindings.SpliceAck_get_funding_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The key of the sender (splice acceptor) controlling the new funding transaction
	 */
	public void set_funding_pubkey(byte[] val) {
		bindings.SpliceAck_set_funding_pubkey(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * If set, only confirmed inputs added (by the splice initiator) will be accepted
	 */
	public COption_NoneZ get_require_confirmed_inputs() {
		COption_NoneZ ret = bindings.SpliceAck_get_require_confirmed_inputs(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * If set, only confirmed inputs added (by the splice initiator) will be accepted
	 */
	public void set_require_confirmed_inputs(org.ldk.enums.COption_NoneZ val) {
		bindings.SpliceAck_set_require_confirmed_inputs(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new SpliceAck given each field
	 */
	public static SpliceAck of(org.ldk.structs.ChannelId channel_id_arg, long funding_contribution_satoshis_arg, byte[] funding_pubkey_arg, org.ldk.enums.COption_NoneZ require_confirmed_inputs_arg) {
		long ret = bindings.SpliceAck_new(channel_id_arg.ptr, funding_contribution_satoshis_arg, InternalUtils.check_arr_len(funding_pubkey_arg, 33), require_confirmed_inputs_arg);
		Reference.reachabilityFence(channel_id_arg);
		Reference.reachabilityFence(funding_contribution_satoshis_arg);
		Reference.reachabilityFence(funding_pubkey_arg);
		Reference.reachabilityFence(require_confirmed_inputs_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SpliceAck ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.SpliceAck(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.SpliceAck_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the SpliceAck
	 */
	public SpliceAck clone() {
		long ret = bindings.SpliceAck_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SpliceAck ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.SpliceAck(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two SpliceAcks contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.SpliceAck b) {
		boolean ret = bindings.SpliceAck_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof SpliceAck)) return false;
		return this.eq((SpliceAck)o);
	}
	/**
	 * Serialize the SpliceAck object into a byte array which can be read by SpliceAck_read
	 */
	public byte[] write() {
		byte[] ret = bindings.SpliceAck_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a SpliceAck from a byte array, created by SpliceAck_write
	 */
	public static Result_SpliceAckDecodeErrorZ read(byte[] ser) {
		long ret = bindings.SpliceAck_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SpliceAckDecodeErrorZ ret_hu_conv = Result_SpliceAckDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
