package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Parameters for the reply path to a [`HeldHtlcAvailable`] onion message.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class HeldHtlcReplyPath extends CommonBase {
	private HeldHtlcReplyPath(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.HeldHtlcReplyPath_free(ptr); }
	}
	static HeldHtlcReplyPath constr_from_ptr(long ptr) {
		bindings.LDKHeldHtlcReplyPath raw_val = bindings.LDKHeldHtlcReplyPath_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKHeldHtlcReplyPath.ToUs.class) {
			return new ToUs(ptr, (bindings.LDKHeldHtlcReplyPath.ToUs)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKHeldHtlcReplyPath.ToCounterparty.class) {
			return new ToCounterparty(ptr, (bindings.LDKHeldHtlcReplyPath.ToCounterparty)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * The reply path to the [`HeldHtlcAvailable`] message should terminate at our node.
	 */
	public final static class ToUs extends HeldHtlcReplyPath {
		/**
		 * The id of the payment.
		*/
		public final byte[] payment_id;
		/**
		 * The peers to use when creating this reply path.
		*/
		public final MessageForwardNode[] peers;
		private ToUs(long ptr, bindings.LDKHeldHtlcReplyPath.ToUs obj) {
			super(null, ptr);
			this.payment_id = obj.payment_id;
			long[] peers = obj.peers;
			int peers_conv_20_len = peers.length;
			MessageForwardNode[] peers_conv_20_arr = new MessageForwardNode[peers_conv_20_len];
			for (int u = 0; u < peers_conv_20_len; u++) {
				long peers_conv_20 = peers[u];
				org.ldk.structs.MessageForwardNode peers_conv_20_hu_conv = null; if (peers_conv_20 < 0 || peers_conv_20 > 4096) { peers_conv_20_hu_conv = new org.ldk.structs.MessageForwardNode(null, peers_conv_20); }
				if (peers_conv_20_hu_conv != null) { peers_conv_20_hu_conv.ptrs_to.add(this); };
				peers_conv_20_arr[u] = peers_conv_20_hu_conv;
			}
			this.peers = peers_conv_20_arr;
		}
	}
	/**
	 * The reply path to the [`HeldHtlcAvailable`] message should terminate at our next-hop channel
	 * counterparty, as they are holding our HTLC until they receive the corresponding
	 * [`ReleaseHeldHtlc`] message.
	 * 
	 * [`ReleaseHeldHtlc`]: crate::onion_message::async_payments::ReleaseHeldHtlc
	 */
	public final static class ToCounterparty extends HeldHtlcReplyPath {
		/**
		 * The blinded path provided to us by our counterparty.
		*/
		public final org.ldk.structs.BlindedMessagePath path;
		private ToCounterparty(long ptr, bindings.LDKHeldHtlcReplyPath.ToCounterparty obj) {
			super(null, ptr);
			long path = obj.path;
			org.ldk.structs.BlindedMessagePath path_hu_conv = null; if (path < 0 || path > 4096) { path_hu_conv = new org.ldk.structs.BlindedMessagePath(null, path); }
			if (path_hu_conv != null) { path_hu_conv.ptrs_to.add(this); };
			this.path = path_hu_conv;
		}
	}
	long clone_ptr() {
		long ret = bindings.HeldHtlcReplyPath_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the HeldHtlcReplyPath
	 */
	public HeldHtlcReplyPath clone() {
		long ret = bindings.HeldHtlcReplyPath_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HeldHtlcReplyPath ret_hu_conv = org.ldk.structs.HeldHtlcReplyPath.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ToUs-variant HeldHtlcReplyPath
	 */
	public static HeldHtlcReplyPath to_us(byte[] payment_id, MessageForwardNode[] peers) {
		long ret = bindings.HeldHtlcReplyPath_to_us(InternalUtils.check_arr_len(payment_id, 32), peers != null ? Arrays.stream(peers).mapToLong(peers_conv_20 -> peers_conv_20.ptr).toArray() : null);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(peers);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HeldHtlcReplyPath ret_hu_conv = org.ldk.structs.HeldHtlcReplyPath.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ToCounterparty-variant HeldHtlcReplyPath
	 */
	public static HeldHtlcReplyPath to_counterparty(org.ldk.structs.BlindedMessagePath path) {
		long ret = bindings.HeldHtlcReplyPath_to_counterparty(path.ptr);
		Reference.reachabilityFence(path);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HeldHtlcReplyPath ret_hu_conv = org.ldk.structs.HeldHtlcReplyPath.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}
