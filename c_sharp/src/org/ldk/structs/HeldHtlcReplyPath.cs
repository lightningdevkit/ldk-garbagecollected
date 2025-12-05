using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * Parameters for the reply path to a [`HeldHtlcAvailable`] onion message.
 */
public class HeldHtlcReplyPath : CommonBase {
	protected HeldHtlcReplyPath(object _dummy, long ptr) : base(ptr) { }
	~HeldHtlcReplyPath() {
		if (ptr != 0) { bindings.HeldHtlcReplyPath_free(ptr); }
	}

	internal static HeldHtlcReplyPath constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKHeldHtlcReplyPath_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new HeldHtlcReplyPath_ToUs(ptr);
			case 1: return new HeldHtlcReplyPath_ToCounterparty(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A HeldHtlcReplyPath of type ToUs */
	public class HeldHtlcReplyPath_ToUs : HeldHtlcReplyPath {
		/**
		 * The id of the payment.
		 */
		public byte[] payment_id;
		/**
		 * The peers to use when creating this reply path.
		 */
		public MessageForwardNode[] peers;
		internal HeldHtlcReplyPath_ToUs(long ptr) : base(null, ptr) {
			long payment_id = bindings.LDKHeldHtlcReplyPath_ToUs_get_payment_id(ptr);
			byte[] payment_id_conv = InternalUtils.decodeUint8Array(payment_id);
			this.payment_id = payment_id_conv;
			long peers = bindings.LDKHeldHtlcReplyPath_ToUs_get_peers(ptr);
			int peers_conv_20_len = InternalUtils.getArrayLength(peers);
			MessageForwardNode[] peers_conv_20_arr = new MessageForwardNode[peers_conv_20_len];
			for (int u = 0; u < peers_conv_20_len; u++) {
				long peers_conv_20 = InternalUtils.getU64ArrayElem(peers, u);
				org.ldk.structs.MessageForwardNode peers_conv_20_hu_conv = null; if (peers_conv_20 < 0 || peers_conv_20 > 4096) { peers_conv_20_hu_conv = new org.ldk.structs.MessageForwardNode(null, peers_conv_20); }
				if (peers_conv_20_hu_conv != null) { peers_conv_20_hu_conv.ptrs_to.AddLast(this); };
				peers_conv_20_arr[u] = peers_conv_20_hu_conv;
			}
			bindings.free_buffer(peers);
			this.peers = peers_conv_20_arr;
		}
	}
	/** A HeldHtlcReplyPath of type ToCounterparty */
	public class HeldHtlcReplyPath_ToCounterparty : HeldHtlcReplyPath {
		/**
		 * The blinded path provided to us by our counterparty.
		 */
		public org.ldk.structs.BlindedMessagePath path;
		internal HeldHtlcReplyPath_ToCounterparty(long ptr) : base(null, ptr) {
			long path = bindings.LDKHeldHtlcReplyPath_ToCounterparty_get_path(ptr);
			org.ldk.structs.BlindedMessagePath path_hu_conv = null; if (path < 0 || path > 4096) { path_hu_conv = new org.ldk.structs.BlindedMessagePath(null, path); }
			if (path_hu_conv != null) { path_hu_conv.ptrs_to.AddLast(this); };
			this.path = path_hu_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.HeldHtlcReplyPath_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the HeldHtlcReplyPath
	 */
	public org.ldk.structs.HeldHtlcReplyPath clone() {
		long ret = bindings.HeldHtlcReplyPath_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HeldHtlcReplyPath ret_hu_conv = org.ldk.structs.HeldHtlcReplyPath.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ToUs-variant HeldHtlcReplyPath
	 */
	public static org.ldk.structs.HeldHtlcReplyPath to_us(byte[] payment_id, MessageForwardNode[] peers) {
		long ret = bindings.HeldHtlcReplyPath_to_us(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_id, 32)), InternalUtils.encodeUint64Array(InternalUtils.mapArray(peers, peers_conv_20 => peers_conv_20.ptr)));
		GC.KeepAlive(payment_id);
		GC.KeepAlive(peers);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HeldHtlcReplyPath ret_hu_conv = org.ldk.structs.HeldHtlcReplyPath.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ToCounterparty-variant HeldHtlcReplyPath
	 */
	public static org.ldk.structs.HeldHtlcReplyPath to_counterparty(org.ldk.structs.BlindedMessagePath path) {
		long ret = bindings.HeldHtlcReplyPath_to_counterparty(path.ptr);
		GC.KeepAlive(path);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HeldHtlcReplyPath ret_hu_conv = org.ldk.structs.HeldHtlcReplyPath.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
