using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * The type of HTLC handling performed in [`Event::HTLCHandlingFailed`].
 */
public class HTLCHandlingFailureType : CommonBase {
	protected HTLCHandlingFailureType(object _dummy, long ptr) : base(ptr) { }
	~HTLCHandlingFailureType() {
		if (ptr != 0) { bindings.HTLCHandlingFailureType_free(ptr); }
	}

	internal static HTLCHandlingFailureType constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKHTLCHandlingFailureType_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new HTLCHandlingFailureType_Forward(ptr);
			case 1: return new HTLCHandlingFailureType_UnknownNextHop(ptr);
			case 2: return new HTLCHandlingFailureType_InvalidForward(ptr);
			case 3: return new HTLCHandlingFailureType_InvalidOnion(ptr);
			case 4: return new HTLCHandlingFailureType_Receive(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A HTLCHandlingFailureType of type Forward */
	public class HTLCHandlingFailureType_Forward : HTLCHandlingFailureType {
		/**
		 * The `node_id` of the next node. For backwards compatibility, this field is
		 * marked as optional, versions prior to 0.0.110 may not always be able to provide
		 * counterparty node information.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		public byte[] node_id;
		/**
		 * The outgoing `channel_id` between us and the next node.
		 */
		public org.ldk.structs.ChannelId channel_id;
		internal HTLCHandlingFailureType_Forward(long ptr) : base(null, ptr) {
			long node_id = bindings.LDKHTLCHandlingFailureType_Forward_get_node_id(ptr);
			byte[] node_id_conv = InternalUtils.decodeUint8Array(node_id);
			this.node_id = node_id_conv;
			long channel_id = bindings.LDKHTLCHandlingFailureType_Forward_get_channel_id(ptr);
			org.ldk.structs.ChannelId channel_id_hu_conv = null; if (channel_id < 0 || channel_id > 4096) { channel_id_hu_conv = new org.ldk.structs.ChannelId(null, channel_id); }
			if (channel_id_hu_conv != null) { channel_id_hu_conv.ptrs_to.AddLast(this); };
			this.channel_id = channel_id_hu_conv;
		}
	}
	/** A HTLCHandlingFailureType of type UnknownNextHop */
	public class HTLCHandlingFailureType_UnknownNextHop : HTLCHandlingFailureType {
		/**
		 * Short channel id we are requesting to forward an HTLC to.
		 */
		public long requested_forward_scid;
		internal HTLCHandlingFailureType_UnknownNextHop(long ptr) : base(null, ptr) {
			this.requested_forward_scid = bindings.LDKHTLCHandlingFailureType_UnknownNextHop_get_requested_forward_scid(ptr);
		}
	}
	/** A HTLCHandlingFailureType of type InvalidForward */
	public class HTLCHandlingFailureType_InvalidForward : HTLCHandlingFailureType {
		/**
		 * Short channel id we are requesting to forward an HTLC to.
		 */
		public long requested_forward_scid;
		internal HTLCHandlingFailureType_InvalidForward(long ptr) : base(null, ptr) {
			this.requested_forward_scid = bindings.LDKHTLCHandlingFailureType_InvalidForward_get_requested_forward_scid(ptr);
		}
	}
	/** A HTLCHandlingFailureType of type InvalidOnion */
	public class HTLCHandlingFailureType_InvalidOnion : HTLCHandlingFailureType {
		internal HTLCHandlingFailureType_InvalidOnion(long ptr) : base(null, ptr) {
		}
	}
	/** A HTLCHandlingFailureType of type Receive */
	public class HTLCHandlingFailureType_Receive : HTLCHandlingFailureType {
		/**
		 * The payment hash of the payment we attempted to process.
		 */
		public byte[] payment_hash;
		internal HTLCHandlingFailureType_Receive(long ptr) : base(null, ptr) {
			long payment_hash = bindings.LDKHTLCHandlingFailureType_Receive_get_payment_hash(ptr);
			byte[] payment_hash_conv = InternalUtils.decodeUint8Array(payment_hash);
			this.payment_hash = payment_hash_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.HTLCHandlingFailureType_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the HTLCHandlingFailureType
	 */
	public org.ldk.structs.HTLCHandlingFailureType clone() {
		long ret = bindings.HTLCHandlingFailureType_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCHandlingFailureType ret_hu_conv = org.ldk.structs.HTLCHandlingFailureType.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Forward-variant HTLCHandlingFailureType
	 */
	public static org.ldk.structs.HTLCHandlingFailureType forward(byte[] node_id, org.ldk.structs.ChannelId channel_id) {
		long ret = bindings.HTLCHandlingFailureType_forward(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(node_id, 33)), channel_id.ptr);
		GC.KeepAlive(node_id);
		GC.KeepAlive(channel_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCHandlingFailureType ret_hu_conv = org.ldk.structs.HTLCHandlingFailureType.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownNextHop-variant HTLCHandlingFailureType
	 */
	public static org.ldk.structs.HTLCHandlingFailureType unknown_next_hop(long requested_forward_scid) {
		long ret = bindings.HTLCHandlingFailureType_unknown_next_hop(requested_forward_scid);
		GC.KeepAlive(requested_forward_scid);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCHandlingFailureType ret_hu_conv = org.ldk.structs.HTLCHandlingFailureType.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidForward-variant HTLCHandlingFailureType
	 */
	public static org.ldk.structs.HTLCHandlingFailureType invalid_forward(long requested_forward_scid) {
		long ret = bindings.HTLCHandlingFailureType_invalid_forward(requested_forward_scid);
		GC.KeepAlive(requested_forward_scid);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCHandlingFailureType ret_hu_conv = org.ldk.structs.HTLCHandlingFailureType.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidOnion-variant HTLCHandlingFailureType
	 */
	public static org.ldk.structs.HTLCHandlingFailureType invalid_onion() {
		long ret = bindings.HTLCHandlingFailureType_invalid_onion();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCHandlingFailureType ret_hu_conv = org.ldk.structs.HTLCHandlingFailureType.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Receive-variant HTLCHandlingFailureType
	 */
	public static org.ldk.structs.HTLCHandlingFailureType receive(byte[] payment_hash) {
		long ret = bindings.HTLCHandlingFailureType_receive(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_hash, 32)));
		GC.KeepAlive(payment_hash);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCHandlingFailureType ret_hu_conv = org.ldk.structs.HTLCHandlingFailureType.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two HTLCHandlingFailureTypes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.HTLCHandlingFailureType b) {
		bool ret = bindings.HTLCHandlingFailureType_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is HTLCHandlingFailureType)) return false;
		return this.eq((HTLCHandlingFailureType)o);
	}
	/**
	 * Serialize the HTLCHandlingFailureType object into a byte array which can be read by HTLCHandlingFailureType_read
	 */
	public byte[] write() {
		long ret = bindings.HTLCHandlingFailureType_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

}
} } }
