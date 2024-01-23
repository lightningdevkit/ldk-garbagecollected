package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A splice_ack message to be received by or sent to the splice initiator.
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
	public byte[] get_channel_id() {
		byte[] ret = bindings.SpliceAck_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel ID where splicing is intended
	 */
	public void set_channel_id(byte[] val) {
		bindings.SpliceAck_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The genesis hash of the blockchain where the channel is intended to be spliced
	 */
	public byte[] get_chain_hash() {
		byte[] ret = bindings.SpliceAck_get_chain_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The genesis hash of the blockchain where the channel is intended to be spliced
	 */
	public void set_chain_hash(byte[] val) {
		bindings.SpliceAck_set_chain_hash(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The intended change in channel capacity: the amount to be added (positive value)
	 * or removed (negative value) by the sender (splice acceptor) by splicing into/from the channel.
	 */
	public long get_relative_satoshis() {
		long ret = bindings.SpliceAck_get_relative_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The intended change in channel capacity: the amount to be added (positive value)
	 * or removed (negative value) by the sender (splice acceptor) by splicing into/from the channel.
	 */
	public void set_relative_satoshis(long val) {
		bindings.SpliceAck_set_relative_satoshis(this.ptr, val);
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
	 * Constructs a new SpliceAck given each field
	 */
	public static SpliceAck of(byte[] channel_id_arg, byte[] chain_hash_arg, long relative_satoshis_arg, byte[] funding_pubkey_arg) {
		long ret = bindings.SpliceAck_new(InternalUtils.check_arr_len(channel_id_arg, 32), InternalUtils.check_arr_len(chain_hash_arg, 32), relative_satoshis_arg, InternalUtils.check_arr_len(funding_pubkey_arg, 33));
		Reference.reachabilityFence(channel_id_arg);
		Reference.reachabilityFence(chain_hash_arg);
		Reference.reachabilityFence(relative_satoshis_arg);
		Reference.reachabilityFence(funding_pubkey_arg);
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
		boolean ret = bindings.SpliceAck_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
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
