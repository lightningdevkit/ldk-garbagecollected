package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A [`revoke_and_ack`] message to be sent to or received from a peer.
 * 
 * [`revoke_and_ack`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#completing-the-transition-to-the-updated-state-revoke_and_ack
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class RevokeAndACK extends CommonBase {
	RevokeAndACK(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.RevokeAndACK_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public ChannelId get_channel_id() {
		long ret = bindings.RevokeAndACK_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(org.ldk.structs.ChannelId val) {
		bindings.RevokeAndACK_set_channel_id(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The secret corresponding to the per-commitment point
	 */
	public byte[] get_per_commitment_secret() {
		byte[] ret = bindings.RevokeAndACK_get_per_commitment_secret(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The secret corresponding to the per-commitment point
	 */
	public void set_per_commitment_secret(byte[] val) {
		bindings.RevokeAndACK_set_per_commitment_secret(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The next sender-broadcast commitment transaction's per-commitment point
	 */
	public byte[] get_next_per_commitment_point() {
		byte[] ret = bindings.RevokeAndACK_get_next_per_commitment_point(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The next sender-broadcast commitment transaction's per-commitment point
	 */
	public void set_next_per_commitment_point(byte[] val) {
		bindings.RevokeAndACK_set_next_per_commitment_point(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A list of `(htlc_id, blinded_path)`. The receiver of this message will use the blinded paths
	 * as reply paths to [`HeldHtlcAvailable`] onion messages that they send to the often-offline
	 * receiver of this HTLC. The `htlc_id` is used by the receiver of this message to identify which
	 * held HTLC a given blinded path corresponds to.
	 * 
	 * [`HeldHtlcAvailable`]: crate::onion_message::async_payments::HeldHtlcAvailable
	 * 
	 * Returns a copy of the field.
	 */
	public TwoTuple_u64BlindedMessagePathZ[] get_release_htlc_message_paths() {
		long[] ret = bindings.RevokeAndACK_get_release_htlc_message_paths(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_33_len = ret.length;
		TwoTuple_u64BlindedMessagePathZ[] ret_conv_33_arr = new TwoTuple_u64BlindedMessagePathZ[ret_conv_33_len];
		for (int h = 0; h < ret_conv_33_len; h++) {
			long ret_conv_33 = ret[h];
			TwoTuple_u64BlindedMessagePathZ ret_conv_33_hu_conv = new TwoTuple_u64BlindedMessagePathZ(null, ret_conv_33);
			if (ret_conv_33_hu_conv != null) { ret_conv_33_hu_conv.ptrs_to.add(this); };
			ret_conv_33_arr[h] = ret_conv_33_hu_conv;
		}
		return ret_conv_33_arr;
	}

	/**
	 * A list of `(htlc_id, blinded_path)`. The receiver of this message will use the blinded paths
	 * as reply paths to [`HeldHtlcAvailable`] onion messages that they send to the often-offline
	 * receiver of this HTLC. The `htlc_id` is used by the receiver of this message to identify which
	 * held HTLC a given blinded path corresponds to.
	 * 
	 * [`HeldHtlcAvailable`]: crate::onion_message::async_payments::HeldHtlcAvailable
	 */
	public void set_release_htlc_message_paths(TwoTuple_u64BlindedMessagePathZ[] val) {
		bindings.RevokeAndACK_set_release_htlc_message_paths(this.ptr, val != null ? Arrays.stream(val).mapToLong(val_conv_33 -> val_conv_33.ptr).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new RevokeAndACK given each field
	 */
	public static RevokeAndACK of(org.ldk.structs.ChannelId channel_id_arg, byte[] per_commitment_secret_arg, byte[] next_per_commitment_point_arg, TwoTuple_u64BlindedMessagePathZ[] release_htlc_message_paths_arg) {
		long ret = bindings.RevokeAndACK_new(channel_id_arg.ptr, InternalUtils.check_arr_len(per_commitment_secret_arg, 32), InternalUtils.check_arr_len(next_per_commitment_point_arg, 33), release_htlc_message_paths_arg != null ? Arrays.stream(release_htlc_message_paths_arg).mapToLong(release_htlc_message_paths_arg_conv_33 -> release_htlc_message_paths_arg_conv_33.ptr).toArray() : null);
		Reference.reachabilityFence(channel_id_arg);
		Reference.reachabilityFence(per_commitment_secret_arg);
		Reference.reachabilityFence(next_per_commitment_point_arg);
		Reference.reachabilityFence(release_htlc_message_paths_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RevokeAndACK ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RevokeAndACK(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.RevokeAndACK_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the RevokeAndACK
	 */
	public RevokeAndACK clone() {
		long ret = bindings.RevokeAndACK_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RevokeAndACK ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RevokeAndACK(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the RevokeAndACK.
	 */
	public long hash() {
		long ret = bindings.RevokeAndACK_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two RevokeAndACKs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.RevokeAndACK b) {
		boolean ret = bindings.RevokeAndACK_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof RevokeAndACK)) return false;
		return this.eq((RevokeAndACK)o);
	}
	/**
	 * Serialize the RevokeAndACK object into a byte array which can be read by RevokeAndACK_read
	 */
	public byte[] write() {
		byte[] ret = bindings.RevokeAndACK_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a RevokeAndACK from a byte array, created by RevokeAndACK_write
	 */
	public static Result_RevokeAndACKDecodeErrorZ read(byte[] ser) {
		long ret = bindings.RevokeAndACK_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RevokeAndACKDecodeErrorZ ret_hu_conv = Result_RevokeAndACKDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
