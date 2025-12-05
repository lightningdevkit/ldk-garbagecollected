
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Possible async payment messages sent and received via an [`OnionMessage`].
 * 
 * [`OnionMessage`]: crate::ln::msgs::OnionMessage
 */
export class AsyncPaymentsMessage extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.AsyncPaymentsMessage_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): AsyncPaymentsMessage {
		const raw_ty: number = bindings.LDKAsyncPaymentsMessage_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new AsyncPaymentsMessage_OfferPathsRequest(ptr);
			case 1: return new AsyncPaymentsMessage_OfferPaths(ptr);
			case 2: return new AsyncPaymentsMessage_ServeStaticInvoice(ptr);
			case 3: return new AsyncPaymentsMessage_StaticInvoicePersisted(ptr);
			case 4: return new AsyncPaymentsMessage_HeldHtlcAvailable(ptr);
			case 5: return new AsyncPaymentsMessage_ReleaseHeldHtlc(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.AsyncPaymentsMessage_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the AsyncPaymentsMessage
	 */
	public clone(): AsyncPaymentsMessage {
		const ret: bigint = bindings.AsyncPaymentsMessage_clone(this.ptr);
		const ret_hu_conv: AsyncPaymentsMessage = AsyncPaymentsMessage.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OfferPathsRequest-variant AsyncPaymentsMessage
	 */
	public static constructor_offer_paths_request(a: OfferPathsRequest): AsyncPaymentsMessage {
		const ret: bigint = bindings.AsyncPaymentsMessage_offer_paths_request(CommonBase.get_ptr_of(a));
		const ret_hu_conv: AsyncPaymentsMessage = AsyncPaymentsMessage.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OfferPaths-variant AsyncPaymentsMessage
	 */
	public static constructor_offer_paths(a: OfferPaths): AsyncPaymentsMessage {
		const ret: bigint = bindings.AsyncPaymentsMessage_offer_paths(CommonBase.get_ptr_of(a));
		const ret_hu_conv: AsyncPaymentsMessage = AsyncPaymentsMessage.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ServeStaticInvoice-variant AsyncPaymentsMessage
	 */
	public static constructor_serve_static_invoice(a: ServeStaticInvoice): AsyncPaymentsMessage {
		const ret: bigint = bindings.AsyncPaymentsMessage_serve_static_invoice(CommonBase.get_ptr_of(a));
		const ret_hu_conv: AsyncPaymentsMessage = AsyncPaymentsMessage.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new StaticInvoicePersisted-variant AsyncPaymentsMessage
	 */
	public static constructor_static_invoice_persisted(a: StaticInvoicePersisted): AsyncPaymentsMessage {
		const ret: bigint = bindings.AsyncPaymentsMessage_static_invoice_persisted(CommonBase.get_ptr_of(a));
		const ret_hu_conv: AsyncPaymentsMessage = AsyncPaymentsMessage.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HeldHtlcAvailable-variant AsyncPaymentsMessage
	 */
	public static constructor_held_htlc_available(a: HeldHtlcAvailable): AsyncPaymentsMessage {
		const ret: bigint = bindings.AsyncPaymentsMessage_held_htlc_available(CommonBase.get_ptr_of(a));
		const ret_hu_conv: AsyncPaymentsMessage = AsyncPaymentsMessage.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ReleaseHeldHtlc-variant AsyncPaymentsMessage
	 */
	public static constructor_release_held_htlc(a: ReleaseHeldHtlc): AsyncPaymentsMessage {
		const ret: bigint = bindings.AsyncPaymentsMessage_release_held_htlc(CommonBase.get_ptr_of(a));
		const ret_hu_conv: AsyncPaymentsMessage = AsyncPaymentsMessage.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OnionMessageContents which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OnionMessageContents must be freed before this_arg is
	 */
	public as_OnionMessageContents(): OnionMessageContents {
		const ret: bigint = bindings.AsyncPaymentsMessage_as_OnionMessageContents(this.ptr);
		const ret_hu_conv: OnionMessageContents = new OnionMessageContents(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the AsyncPaymentsMessage object into a byte array which can be read by AsyncPaymentsMessage_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.AsyncPaymentsMessage_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a AsyncPaymentsMessage from a byte array, created by AsyncPaymentsMessage_write
	 */
	public static constructor_read(ser: Uint8Array, arg: bigint): Result_AsyncPaymentsMessageDecodeErrorZ {
		const ret: bigint = bindings.AsyncPaymentsMessage_read(bindings.encodeUint8Array(ser), arg);
		const ret_hu_conv: Result_AsyncPaymentsMessageDecodeErrorZ = Result_AsyncPaymentsMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
/** A AsyncPaymentsMessage of type OfferPathsRequest */
export class AsyncPaymentsMessage_OfferPathsRequest extends AsyncPaymentsMessage {
	public offer_paths_request: OfferPathsRequest;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const offer_paths_request: bigint = bindings.LDKAsyncPaymentsMessage_OfferPathsRequest_get_offer_paths_request(ptr);
		const offer_paths_request_hu_conv: OfferPathsRequest = new OfferPathsRequest(null, offer_paths_request);
			CommonBase.add_ref_from(offer_paths_request_hu_conv, this);
		this.offer_paths_request = offer_paths_request_hu_conv;
	}
}
/** A AsyncPaymentsMessage of type OfferPaths */
export class AsyncPaymentsMessage_OfferPaths extends AsyncPaymentsMessage {
	public offer_paths: OfferPaths;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const offer_paths: bigint = bindings.LDKAsyncPaymentsMessage_OfferPaths_get_offer_paths(ptr);
		const offer_paths_hu_conv: OfferPaths = new OfferPaths(null, offer_paths);
			CommonBase.add_ref_from(offer_paths_hu_conv, this);
		this.offer_paths = offer_paths_hu_conv;
	}
}
/** A AsyncPaymentsMessage of type ServeStaticInvoice */
export class AsyncPaymentsMessage_ServeStaticInvoice extends AsyncPaymentsMessage {
	public serve_static_invoice: ServeStaticInvoice;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const serve_static_invoice: bigint = bindings.LDKAsyncPaymentsMessage_ServeStaticInvoice_get_serve_static_invoice(ptr);
		const serve_static_invoice_hu_conv: ServeStaticInvoice = new ServeStaticInvoice(null, serve_static_invoice);
			CommonBase.add_ref_from(serve_static_invoice_hu_conv, this);
		this.serve_static_invoice = serve_static_invoice_hu_conv;
	}
}
/** A AsyncPaymentsMessage of type StaticInvoicePersisted */
export class AsyncPaymentsMessage_StaticInvoicePersisted extends AsyncPaymentsMessage {
	public static_invoice_persisted: StaticInvoicePersisted;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const static_invoice_persisted: bigint = bindings.LDKAsyncPaymentsMessage_StaticInvoicePersisted_get_static_invoice_persisted(ptr);
		const static_invoice_persisted_hu_conv: StaticInvoicePersisted = new StaticInvoicePersisted(null, static_invoice_persisted);
			CommonBase.add_ref_from(static_invoice_persisted_hu_conv, this);
		this.static_invoice_persisted = static_invoice_persisted_hu_conv;
	}
}
/** A AsyncPaymentsMessage of type HeldHtlcAvailable */
export class AsyncPaymentsMessage_HeldHtlcAvailable extends AsyncPaymentsMessage {
	public held_htlc_available: HeldHtlcAvailable;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const held_htlc_available: bigint = bindings.LDKAsyncPaymentsMessage_HeldHtlcAvailable_get_held_htlc_available(ptr);
		const held_htlc_available_hu_conv: HeldHtlcAvailable = new HeldHtlcAvailable(null, held_htlc_available);
			CommonBase.add_ref_from(held_htlc_available_hu_conv, this);
		this.held_htlc_available = held_htlc_available_hu_conv;
	}
}
/** A AsyncPaymentsMessage of type ReleaseHeldHtlc */
export class AsyncPaymentsMessage_ReleaseHeldHtlc extends AsyncPaymentsMessage {
	public release_held_htlc: ReleaseHeldHtlc;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const release_held_htlc: bigint = bindings.LDKAsyncPaymentsMessage_ReleaseHeldHtlc_get_release_held_htlc(ptr);
		const release_held_htlc_hu_conv: ReleaseHeldHtlc = new ReleaseHeldHtlc(null, release_held_htlc);
			CommonBase.add_ref_from(release_held_htlc_hu_conv, this);
		this.release_held_htlc = release_held_htlc_hu_conv;
	}
}
