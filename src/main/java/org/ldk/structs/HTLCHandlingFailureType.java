package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The type of HTLC handling performed in [`Event::HTLCHandlingFailed`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class HTLCHandlingFailureType extends CommonBase {
	private HTLCHandlingFailureType(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.HTLCHandlingFailureType_free(ptr); }
	}
	static HTLCHandlingFailureType constr_from_ptr(long ptr) {
		bindings.LDKHTLCHandlingFailureType raw_val = bindings.LDKHTLCHandlingFailureType_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKHTLCHandlingFailureType.Forward.class) {
			return new Forward(ptr, (bindings.LDKHTLCHandlingFailureType.Forward)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKHTLCHandlingFailureType.UnknownNextHop.class) {
			return new UnknownNextHop(ptr, (bindings.LDKHTLCHandlingFailureType.UnknownNextHop)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKHTLCHandlingFailureType.InvalidForward.class) {
			return new InvalidForward(ptr, (bindings.LDKHTLCHandlingFailureType.InvalidForward)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKHTLCHandlingFailureType.InvalidOnion.class) {
			return new InvalidOnion(ptr, (bindings.LDKHTLCHandlingFailureType.InvalidOnion)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKHTLCHandlingFailureType.Receive.class) {
			return new Receive(ptr, (bindings.LDKHTLCHandlingFailureType.Receive)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * We tried forwarding to a channel but failed to do so. An example of such an instance is when
	 * there is insufficient capacity in our outbound channel.
	 */
	public final static class Forward extends HTLCHandlingFailureType {
		/**
		 * The `node_id` of the next node. For backwards compatibility, this field is
		 * marked as optional, versions prior to 0.0.110 may not always be able to provide
		 * counterparty node information.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final byte[] node_id;
		/**
		 * The outgoing `channel_id` between us and the next node.
		*/
		public final org.ldk.structs.ChannelId channel_id;
		private Forward(long ptr, bindings.LDKHTLCHandlingFailureType.Forward obj) {
			super(null, ptr);
			this.node_id = obj.node_id;
			long channel_id = obj.channel_id;
			org.ldk.structs.ChannelId channel_id_hu_conv = null; if (channel_id < 0 || channel_id > 4096) { channel_id_hu_conv = new org.ldk.structs.ChannelId(null, channel_id); }
			if (channel_id_hu_conv != null) { channel_id_hu_conv.ptrs_to.add(this); };
			this.channel_id = channel_id_hu_conv;
		}
	}
	/**
	 * Scenario where we are unsure of the next node to forward the HTLC to.
	 * 
	 * Deprecated: will only be used in versions before LDK v0.2.0. Downgrades will result in
	 * this type being represented as [`Self::InvalidForward`].
	 */
	public final static class UnknownNextHop extends HTLCHandlingFailureType {
		/**
		 * Short channel id we are requesting to forward an HTLC to.
		*/
		public final long requested_forward_scid;
		private UnknownNextHop(long ptr, bindings.LDKHTLCHandlingFailureType.UnknownNextHop obj) {
			super(null, ptr);
			this.requested_forward_scid = obj.requested_forward_scid;
		}
	}
	/**
	 * We couldn't forward to the outgoing scid. An example would be attempting to send a duplicate
	 * intercept HTLC.
	 * 
	 * In LDK v0.2.0 and greater, this variant replaces [`Self::UnknownNextHop`].
	 */
	public final static class InvalidForward extends HTLCHandlingFailureType {
		/**
		 * Short channel id we are requesting to forward an HTLC to.
		*/
		public final long requested_forward_scid;
		private InvalidForward(long ptr, bindings.LDKHTLCHandlingFailureType.InvalidForward obj) {
			super(null, ptr);
			this.requested_forward_scid = obj.requested_forward_scid;
		}
	}
	/**
	 * We couldn't decode the incoming onion to obtain the forwarding details.
	 */
	public final static class InvalidOnion extends HTLCHandlingFailureType {
		private InvalidOnion(long ptr, bindings.LDKHTLCHandlingFailureType.InvalidOnion obj) {
			super(null, ptr);
		}
	}
	/**
	 * Failure scenario where an HTLC may have been forwarded to be intended for us,
	 * but is invalid for some reason, so we reject it.
	 * 
	 * Some of the reasons may include:
	 * HTLC Timeouts
	 * Excess HTLCs for a payment that we have already fully received, over-paying for the
	 * payment,
	 * The counterparty node modified the HTLC in transit,
	 * A probing attack where an intermediary node is trying to detect if we are the ultimate
	 * recipient for a payment.
	 */
	public final static class Receive extends HTLCHandlingFailureType {
		/**
		 * The payment hash of the payment we attempted to process.
		*/
		public final byte[] payment_hash;
		private Receive(long ptr, bindings.LDKHTLCHandlingFailureType.Receive obj) {
			super(null, ptr);
			this.payment_hash = obj.payment_hash;
		}
	}
	long clone_ptr() {
		long ret = bindings.HTLCHandlingFailureType_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the HTLCHandlingFailureType
	 */
	public HTLCHandlingFailureType clone() {
		long ret = bindings.HTLCHandlingFailureType_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCHandlingFailureType ret_hu_conv = org.ldk.structs.HTLCHandlingFailureType.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Forward-variant HTLCHandlingFailureType
	 */
	public static HTLCHandlingFailureType forward(byte[] node_id, org.ldk.structs.ChannelId channel_id) {
		long ret = bindings.HTLCHandlingFailureType_forward(InternalUtils.check_arr_len(node_id, 33), channel_id.ptr);
		Reference.reachabilityFence(node_id);
		Reference.reachabilityFence(channel_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCHandlingFailureType ret_hu_conv = org.ldk.structs.HTLCHandlingFailureType.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownNextHop-variant HTLCHandlingFailureType
	 */
	public static HTLCHandlingFailureType unknown_next_hop(long requested_forward_scid) {
		long ret = bindings.HTLCHandlingFailureType_unknown_next_hop(requested_forward_scid);
		Reference.reachabilityFence(requested_forward_scid);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCHandlingFailureType ret_hu_conv = org.ldk.structs.HTLCHandlingFailureType.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidForward-variant HTLCHandlingFailureType
	 */
	public static HTLCHandlingFailureType invalid_forward(long requested_forward_scid) {
		long ret = bindings.HTLCHandlingFailureType_invalid_forward(requested_forward_scid);
		Reference.reachabilityFence(requested_forward_scid);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCHandlingFailureType ret_hu_conv = org.ldk.structs.HTLCHandlingFailureType.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidOnion-variant HTLCHandlingFailureType
	 */
	public static HTLCHandlingFailureType invalid_onion() {
		long ret = bindings.HTLCHandlingFailureType_invalid_onion();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCHandlingFailureType ret_hu_conv = org.ldk.structs.HTLCHandlingFailureType.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Receive-variant HTLCHandlingFailureType
	 */
	public static HTLCHandlingFailureType receive(byte[] payment_hash) {
		long ret = bindings.HTLCHandlingFailureType_receive(InternalUtils.check_arr_len(payment_hash, 32));
		Reference.reachabilityFence(payment_hash);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCHandlingFailureType ret_hu_conv = org.ldk.structs.HTLCHandlingFailureType.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two HTLCHandlingFailureTypes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.HTLCHandlingFailureType b) {
		boolean ret = bindings.HTLCHandlingFailureType_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof HTLCHandlingFailureType)) return false;
		return this.eq((HTLCHandlingFailureType)o);
	}
	/**
	 * Serialize the HTLCHandlingFailureType object into a byte array which can be read by HTLCHandlingFailureType_read
	 */
	public byte[] write() {
		byte[] ret = bindings.HTLCHandlingFailureType_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
