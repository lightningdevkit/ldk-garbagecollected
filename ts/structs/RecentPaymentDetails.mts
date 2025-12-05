
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Used by [`ChannelManager::list_recent_payments`] to express the status of recent payments.
 * These include payments that have yet to find a successful path, or have unresolved HTLCs.
 */
export class RecentPaymentDetails extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.RecentPaymentDetails_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): RecentPaymentDetails {
		const raw_ty: number = bindings.LDKRecentPaymentDetails_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new RecentPaymentDetails_AwaitingInvoice(ptr);
			case 1: return new RecentPaymentDetails_Pending(ptr);
			case 2: return new RecentPaymentDetails_Fulfilled(ptr);
			case 3: return new RecentPaymentDetails_Abandoned(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.RecentPaymentDetails_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the RecentPaymentDetails
	 */
	public clone(): RecentPaymentDetails {
		const ret: bigint = bindings.RecentPaymentDetails_clone(this.ptr);
		const ret_hu_conv: RecentPaymentDetails = RecentPaymentDetails.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new AwaitingInvoice-variant RecentPaymentDetails
	 */
	public static constructor_awaiting_invoice(payment_id: Uint8Array): RecentPaymentDetails {
		const ret: bigint = bindings.RecentPaymentDetails_awaiting_invoice(bindings.encodeUint8Array(payment_id));
		const ret_hu_conv: RecentPaymentDetails = RecentPaymentDetails.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Pending-variant RecentPaymentDetails
	 */
	public static constructor_pending(payment_id: Uint8Array, payment_hash: Uint8Array, total_msat: bigint): RecentPaymentDetails {
		const ret: bigint = bindings.RecentPaymentDetails_pending(bindings.encodeUint8Array(payment_id), bindings.encodeUint8Array(payment_hash), total_msat);
		const ret_hu_conv: RecentPaymentDetails = RecentPaymentDetails.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Fulfilled-variant RecentPaymentDetails
	 */
	public static constructor_fulfilled(payment_id: Uint8Array, payment_hash: Option_ThirtyTwoBytesZ): RecentPaymentDetails {
		const ret: bigint = bindings.RecentPaymentDetails_fulfilled(bindings.encodeUint8Array(payment_id), CommonBase.get_ptr_of(payment_hash));
		const ret_hu_conv: RecentPaymentDetails = RecentPaymentDetails.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Abandoned-variant RecentPaymentDetails
	 */
	public static constructor_abandoned(payment_id: Uint8Array, payment_hash: Uint8Array): RecentPaymentDetails {
		const ret: bigint = bindings.RecentPaymentDetails_abandoned(bindings.encodeUint8Array(payment_id), bindings.encodeUint8Array(payment_hash));
		const ret_hu_conv: RecentPaymentDetails = RecentPaymentDetails.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
/** A RecentPaymentDetails of type AwaitingInvoice */
export class RecentPaymentDetails_AwaitingInvoice extends RecentPaymentDetails {
	/**
	 * A user-provided identifier in [`ChannelManager::pay_for_offer`] used to uniquely identify a
	 * payment and ensure idempotency in LDK.
	 */
	public payment_id: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_id: number = bindings.LDKRecentPaymentDetails_AwaitingInvoice_get_payment_id(ptr);
		const payment_id_conv: Uint8Array = bindings.decodeUint8Array(payment_id);
		this.payment_id = payment_id_conv;
	}
}
/** A RecentPaymentDetails of type Pending */
export class RecentPaymentDetails_Pending extends RecentPaymentDetails {
	/**
	 * A user-provided identifier in [`send_payment`] or [`pay_for_offer`] used to uniquely
	 * identify a payment and ensure idempotency in LDK.
	 * 
	 * [`send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 * [`pay_for_offer`]: crate::ln::channelmanager::ChannelManager::pay_for_offer
	 */
	public payment_id: Uint8Array;
	/**
	 * Hash of the payment that is currently being sent but has yet to be fulfilled or
	 * abandoned.
	 */
	public payment_hash: Uint8Array;
	/**
	 * Total amount (in msat, excluding fees) across all paths for this payment,
	 * not just the amount currently inflight.
	 */
	public total_msat: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_id: number = bindings.LDKRecentPaymentDetails_Pending_get_payment_id(ptr);
		const payment_id_conv: Uint8Array = bindings.decodeUint8Array(payment_id);
		this.payment_id = payment_id_conv;
		const payment_hash: number = bindings.LDKRecentPaymentDetails_Pending_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
		this.total_msat = bindings.LDKRecentPaymentDetails_Pending_get_total_msat(ptr);
	}
}
/** A RecentPaymentDetails of type Fulfilled */
export class RecentPaymentDetails_Fulfilled extends RecentPaymentDetails {
	/**
	 * A user-provided identifier in [`send_payment`] or [`pay_for_offer`] used to uniquely
	 * identify a payment and ensure idempotency in LDK.
	 * 
	 * [`send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 * [`pay_for_offer`]: crate::ln::channelmanager::ChannelManager::pay_for_offer
	 */
	public payment_id: Uint8Array;
	/**
	 * Hash of the payment that was claimed. `None` for serializations of [`ChannelManager`]
	 * made before LDK version 0.0.104.
	 */
	public payment_hash: Option_ThirtyTwoBytesZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_id: number = bindings.LDKRecentPaymentDetails_Fulfilled_get_payment_id(ptr);
		const payment_id_conv: Uint8Array = bindings.decodeUint8Array(payment_id);
		this.payment_id = payment_id_conv;
		const payment_hash: bigint = bindings.LDKRecentPaymentDetails_Fulfilled_get_payment_hash(ptr);
		const payment_hash_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(payment_hash);
			CommonBase.add_ref_from(payment_hash_hu_conv, this);
		this.payment_hash = payment_hash_hu_conv;
	}
}
/** A RecentPaymentDetails of type Abandoned */
export class RecentPaymentDetails_Abandoned extends RecentPaymentDetails {
	/**
	 * A user-provided identifier in [`send_payment`] or [`pay_for_offer`] used to uniquely
	 * identify a payment and ensure idempotency in LDK.
	 * 
	 * [`send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
	 * [`pay_for_offer`]: crate::ln::channelmanager::ChannelManager::pay_for_offer
	 */
	public payment_id: Uint8Array;
	/**
	 * Hash of the payment that we have given up trying to send.
	 */
	public payment_hash: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_id: number = bindings.LDKRecentPaymentDetails_Abandoned_get_payment_id(ptr);
		const payment_id_conv: Uint8Array = bindings.decodeUint8Array(payment_id);
		this.payment_id = payment_id_conv;
		const payment_hash: number = bindings.LDKRecentPaymentDetails_Abandoned_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
	}
}
