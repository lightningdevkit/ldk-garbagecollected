using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * Used by [`ChannelManager::list_recent_payments`] to express the status of recent payments.
 * These include payments that have yet to find a successful path, or have unresolved HTLCs.
 */
public class RecentPaymentDetails : CommonBase {
	protected RecentPaymentDetails(object _dummy, long ptr) : base(ptr) { }
	~RecentPaymentDetails() {
		if (ptr != 0) { bindings.RecentPaymentDetails_free(ptr); }
	}

	internal static RecentPaymentDetails constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKRecentPaymentDetails_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new RecentPaymentDetails_AwaitingInvoice(ptr);
			case 1: return new RecentPaymentDetails_Pending(ptr);
			case 2: return new RecentPaymentDetails_Fulfilled(ptr);
			case 3: return new RecentPaymentDetails_Abandoned(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A RecentPaymentDetails of type AwaitingInvoice */
	public class RecentPaymentDetails_AwaitingInvoice : RecentPaymentDetails {
		/**
		 * A user-provided identifier in [`ChannelManager::send_payment`] used to uniquely identify
		 * a payment and ensure idempotency in LDK.
		 */
		public byte[] payment_id;
		internal RecentPaymentDetails_AwaitingInvoice(long ptr) : base(null, ptr) {
			long payment_id = bindings.LDKRecentPaymentDetails_AwaitingInvoice_get_payment_id(ptr);
			byte[] payment_id_conv = InternalUtils.decodeUint8Array(payment_id);
			this.payment_id = payment_id_conv;
		}
	}
	/** A RecentPaymentDetails of type Pending */
	public class RecentPaymentDetails_Pending : RecentPaymentDetails {
		/**
		 * A user-provided identifier in [`ChannelManager::send_payment`] used to uniquely identify
		 * a payment and ensure idempotency in LDK.
		 */
		public byte[] payment_id;
		/**
		 * Hash of the payment that is currently being sent but has yet to be fulfilled or
		 * abandoned.
		 */
		public byte[] payment_hash;
		/**
		 * Total amount (in msat, excluding fees) across all paths for this payment,
		 * not just the amount currently inflight.
		 */
		public long total_msat;
		internal RecentPaymentDetails_Pending(long ptr) : base(null, ptr) {
			long payment_id = bindings.LDKRecentPaymentDetails_Pending_get_payment_id(ptr);
			byte[] payment_id_conv = InternalUtils.decodeUint8Array(payment_id);
			this.payment_id = payment_id_conv;
			long payment_hash = bindings.LDKRecentPaymentDetails_Pending_get_payment_hash(ptr);
			byte[] payment_hash_conv = InternalUtils.decodeUint8Array(payment_hash);
			this.payment_hash = payment_hash_conv;
			this.total_msat = bindings.LDKRecentPaymentDetails_Pending_get_total_msat(ptr);
		}
	}
	/** A RecentPaymentDetails of type Fulfilled */
	public class RecentPaymentDetails_Fulfilled : RecentPaymentDetails {
		/**
		 * A user-provided identifier in [`ChannelManager::send_payment`] used to uniquely identify
		 * a payment and ensure idempotency in LDK.
		 */
		public byte[] payment_id;
		/**
		 * Hash of the payment that was claimed. `None` for serializations of [`ChannelManager`]
		 * made before LDK version 0.0.104.
		 */
		public Option_ThirtyTwoBytesZ payment_hash;
		internal RecentPaymentDetails_Fulfilled(long ptr) : base(null, ptr) {
			long payment_id = bindings.LDKRecentPaymentDetails_Fulfilled_get_payment_id(ptr);
			byte[] payment_id_conv = InternalUtils.decodeUint8Array(payment_id);
			this.payment_id = payment_id_conv;
			long payment_hash = bindings.LDKRecentPaymentDetails_Fulfilled_get_payment_hash(ptr);
			org.ldk.structs.Option_ThirtyTwoBytesZ payment_hash_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(payment_hash);
			if (payment_hash_hu_conv != null) { payment_hash_hu_conv.ptrs_to.AddLast(this); };
			this.payment_hash = payment_hash_hu_conv;
		}
	}
	/** A RecentPaymentDetails of type Abandoned */
	public class RecentPaymentDetails_Abandoned : RecentPaymentDetails {
		/**
		 * A user-provided identifier in [`ChannelManager::send_payment`] used to uniquely identify
		 * a payment and ensure idempotency in LDK.
		 */
		public byte[] payment_id;
		/**
		 * Hash of the payment that we have given up trying to send.
		 */
		public byte[] payment_hash;
		internal RecentPaymentDetails_Abandoned(long ptr) : base(null, ptr) {
			long payment_id = bindings.LDKRecentPaymentDetails_Abandoned_get_payment_id(ptr);
			byte[] payment_id_conv = InternalUtils.decodeUint8Array(payment_id);
			this.payment_id = payment_id_conv;
			long payment_hash = bindings.LDKRecentPaymentDetails_Abandoned_get_payment_hash(ptr);
			byte[] payment_hash_conv = InternalUtils.decodeUint8Array(payment_hash);
			this.payment_hash = payment_hash_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.RecentPaymentDetails_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the RecentPaymentDetails
	 */
	public RecentPaymentDetails clone() {
		long ret = bindings.RecentPaymentDetails_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RecentPaymentDetails ret_hu_conv = org.ldk.structs.RecentPaymentDetails.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new AwaitingInvoice-variant RecentPaymentDetails
	 */
	public static RecentPaymentDetails awaiting_invoice(byte[] payment_id) {
		long ret = bindings.RecentPaymentDetails_awaiting_invoice(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_id, 32)));
		GC.KeepAlive(payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RecentPaymentDetails ret_hu_conv = org.ldk.structs.RecentPaymentDetails.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Pending-variant RecentPaymentDetails
	 */
	public static RecentPaymentDetails pending(byte[] payment_id, byte[] payment_hash, long total_msat) {
		long ret = bindings.RecentPaymentDetails_pending(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_id, 32)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_hash, 32)), total_msat);
		GC.KeepAlive(payment_id);
		GC.KeepAlive(payment_hash);
		GC.KeepAlive(total_msat);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RecentPaymentDetails ret_hu_conv = org.ldk.structs.RecentPaymentDetails.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Fulfilled-variant RecentPaymentDetails
	 */
	public static RecentPaymentDetails fulfilled(byte[] payment_id, org.ldk.structs.Option_ThirtyTwoBytesZ payment_hash) {
		long ret = bindings.RecentPaymentDetails_fulfilled(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_id, 32)), payment_hash.ptr);
		GC.KeepAlive(payment_id);
		GC.KeepAlive(payment_hash);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RecentPaymentDetails ret_hu_conv = org.ldk.structs.RecentPaymentDetails.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(payment_hash); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Abandoned-variant RecentPaymentDetails
	 */
	public static RecentPaymentDetails abandoned(byte[] payment_id, byte[] payment_hash) {
		long ret = bindings.RecentPaymentDetails_abandoned(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_id, 32)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_hash, 32)));
		GC.KeepAlive(payment_id);
		GC.KeepAlive(payment_hash);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RecentPaymentDetails ret_hu_conv = org.ldk.structs.RecentPaymentDetails.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
