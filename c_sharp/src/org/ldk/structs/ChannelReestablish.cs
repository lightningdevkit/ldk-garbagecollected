using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`channel_reestablish`] message to be sent to or received from a peer.
 * 
 * [`channel_reestablish`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#message-retransmission
 */
public class ChannelReestablish : CommonBase {
	internal ChannelReestablish(object _dummy, long ptr) : base(ptr) { }
	~ChannelReestablish() {
		if (ptr != 0) { bindings.ChannelReestablish_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public org.ldk.structs.ChannelId get_channel_id() {
		long ret = bindings.ChannelReestablish_get_channel_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(org.ldk.structs.ChannelId val) {
		bindings.ChannelReestablish_set_channel_id(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The next commitment number for the sender
	 */
	public long get_next_local_commitment_number() {
		long ret = bindings.ChannelReestablish_get_next_local_commitment_number(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The next commitment number for the sender
	 */
	public void set_next_local_commitment_number(long val) {
		bindings.ChannelReestablish_set_next_local_commitment_number(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The next commitment number for the recipient
	 */
	public long get_next_remote_commitment_number() {
		long ret = bindings.ChannelReestablish_get_next_remote_commitment_number(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The next commitment number for the recipient
	 */
	public void set_next_remote_commitment_number(long val) {
		bindings.ChannelReestablish_set_next_remote_commitment_number(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Proof that the sender knows the per-commitment secret of a specific commitment transaction
	 * belonging to the recipient
	 */
	public byte[] get_your_last_per_commitment_secret() {
		long ret = bindings.ChannelReestablish_get_your_last_per_commitment_secret(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Proof that the sender knows the per-commitment secret of a specific commitment transaction
	 * belonging to the recipient
	 */
	public void set_your_last_per_commitment_secret(byte[] val) {
		bindings.ChannelReestablish_set_your_last_per_commitment_secret(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The sender's per-commitment point for their current commitment transaction
	 */
	public byte[] get_my_current_per_commitment_point() {
		long ret = bindings.ChannelReestablish_get_my_current_per_commitment_point(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The sender's per-commitment point for their current commitment transaction
	 */
	public void set_my_current_per_commitment_point(byte[] val) {
		bindings.ChannelReestablish_set_my_current_per_commitment_point(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The next funding transaction ID
	 * 
	 * Allows peers to finalize the signing steps of an interactive transaction construction, or
	 * safely abort that transaction if it was not signed by one of the peers, who has thus already
	 * removed it from its state.
	 * 
	 * If we've sent `commtiment_signed` for an interactively constructed transaction
	 * during a signing session, but have not received `tx_signatures` we MUST set `next_funding`
	 * to the txid of that interactive transaction, else we MUST NOT set it.
	 * 
	 * See the spec for further details on this:
	 * `channel_reestablish`-sending node: https:///github.com/lightning/bolts/blob/247e83d/02-peer-protocol.md?plain=1#L2466-L2470
	 * `channel_reestablish`-receiving node: https:///github.com/lightning/bolts/blob/247e83d/02-peer-protocol.md?plain=1#L2520-L2531
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.NextFunding get_next_funding() {
		long ret = bindings.ChannelReestablish_get_next_funding(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NextFunding ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NextFunding(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The next funding transaction ID
	 * 
	 * Allows peers to finalize the signing steps of an interactive transaction construction, or
	 * safely abort that transaction if it was not signed by one of the peers, who has thus already
	 * removed it from its state.
	 * 
	 * If we've sent `commtiment_signed` for an interactively constructed transaction
	 * during a signing session, but have not received `tx_signatures` we MUST set `next_funding`
	 * to the txid of that interactive transaction, else we MUST NOT set it.
	 * 
	 * See the spec for further details on this:
	 * `channel_reestablish`-sending node: https:///github.com/lightning/bolts/blob/247e83d/02-peer-protocol.md?plain=1#L2466-L2470
	 * `channel_reestablish`-receiving node: https:///github.com/lightning/bolts/blob/247e83d/02-peer-protocol.md?plain=1#L2520-L2531
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_next_funding(org.ldk.structs.NextFunding val) {
		bindings.ChannelReestablish_set_next_funding(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The last funding txid sent by the sending node, which may be:
	 * - the txid of the last `splice_locked` it sent, otherwise
	 * - the txid of the funding transaction if it sent `channel_ready`, or else
	 * - `None` if it has never sent `channel_ready` or `splice_locked`
	 * 
	 * Also contains a bitfield indicating which messages should be retransmitted.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.FundingLocked get_my_current_funding_locked() {
		long ret = bindings.ChannelReestablish_get_my_current_funding_locked(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FundingLocked ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.FundingLocked(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The last funding txid sent by the sending node, which may be:
	 * - the txid of the last `splice_locked` it sent, otherwise
	 * - the txid of the funding transaction if it sent `channel_ready`, or else
	 * - `None` if it has never sent `channel_ready` or `splice_locked`
	 * 
	 * Also contains a bitfield indicating which messages should be retransmitted.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_my_current_funding_locked(org.ldk.structs.FundingLocked val) {
		bindings.ChannelReestablish_set_my_current_funding_locked(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new ChannelReestablish given each field
	 * 
	 * Note that next_funding_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 * Note that my_current_funding_locked_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static org.ldk.structs.ChannelReestablish of(org.ldk.structs.ChannelId channel_id_arg, long next_local_commitment_number_arg, long next_remote_commitment_number_arg, byte[] your_last_per_commitment_secret_arg, byte[] my_current_per_commitment_point_arg, org.ldk.structs.NextFunding next_funding_arg, org.ldk.structs.FundingLocked my_current_funding_locked_arg) {
		long ret = bindings.ChannelReestablish_new(channel_id_arg.ptr, next_local_commitment_number_arg, next_remote_commitment_number_arg, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(your_last_per_commitment_secret_arg, 32)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(my_current_per_commitment_point_arg, 33)), next_funding_arg == null ? 0 : next_funding_arg.ptr, my_current_funding_locked_arg == null ? 0 : my_current_funding_locked_arg.ptr);
		GC.KeepAlive(channel_id_arg);
		GC.KeepAlive(next_local_commitment_number_arg);
		GC.KeepAlive(next_remote_commitment_number_arg);
		GC.KeepAlive(your_last_per_commitment_secret_arg);
		GC.KeepAlive(my_current_per_commitment_point_arg);
		GC.KeepAlive(next_funding_arg);
		GC.KeepAlive(my_current_funding_locked_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelReestablish ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelReestablish(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.ChannelReestablish_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelReestablish
	 */
	public org.ldk.structs.ChannelReestablish clone() {
		long ret = bindings.ChannelReestablish_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelReestablish ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelReestablish(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ChannelReestablish.
	 */
	public long hash() {
		long ret = bindings.ChannelReestablish_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two ChannelReestablishs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.ChannelReestablish b) {
		bool ret = bindings.ChannelReestablish_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is ChannelReestablish)) return false;
		return this.eq((ChannelReestablish)o);
	}
	/**
	 * Serialize the ChannelReestablish object into a byte array which can be read by ChannelReestablish_read
	 */
	public byte[] write() {
		long ret = bindings.ChannelReestablish_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ChannelReestablish from a byte array, created by ChannelReestablish_write
	 */
	public static org.ldk.structs.Result_ChannelReestablishDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ChannelReestablish_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelReestablishDecodeErrorZ ret_hu_conv = Result_ChannelReestablishDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
