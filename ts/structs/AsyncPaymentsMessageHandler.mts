

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of AsyncPaymentsMessageHandler */
export interface AsyncPaymentsMessageHandlerInterface {
	/**Handle an [`OfferPathsRequest`] message. If we are a static invoice server and the message was
	 * sent over paths that we previously provided to an async recipient, an [`OfferPaths`] message
	 * should be returned.
	 * 
	 * Note that responder (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	handle_offer_paths_request(message: OfferPathsRequest, context: AsyncPaymentsContext, responder: Responder): Option_C2Tuple_OfferPathsResponseInstructionZZ;
	/**Handle an [`OfferPaths`] message. If this is in response to an [`OfferPathsRequest`] that
	 * we previously sent as an async recipient, we should build an [`Offer`] containing the
	 * included [`OfferPaths::paths`] and a corresponding [`StaticInvoice`], and reply with
	 * [`ServeStaticInvoice`].
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * 
	 * Note that responder (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	handle_offer_paths(message: OfferPaths, context: AsyncPaymentsContext, responder: Responder): Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ;
	/**Handle a [`ServeStaticInvoice`] message. If this is in response to an [`OfferPaths`] message
	 * we previously sent as a static invoice server, a [`StaticInvoicePersisted`] message should be
	 * sent once the message is handled.
	 * 
	 * Note that responder (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	handle_serve_static_invoice(message: ServeStaticInvoice, context: AsyncPaymentsContext, responder: Responder): void;
	/**Handle a [`StaticInvoicePersisted`] message. If this is in response to a
	 * [`ServeStaticInvoice`] message we previously sent as an async recipient, then the offer we
	 * generated on receipt of a previous [`OfferPaths`] message is now ready to be used for async
	 * payments.
	 */
	handle_static_invoice_persisted(message: StaticInvoicePersisted, context: AsyncPaymentsContext): void;
	/**Handle a [`HeldHtlcAvailable`] message. A [`ReleaseHeldHtlc`] should be returned to release
	 * the held funds.
	 * 
	 * Note that responder (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	handle_held_htlc_available(message: HeldHtlcAvailable, context: AsyncPaymentsContext, responder: Responder): Option_C2Tuple_ReleaseHeldHtlcResponseInstructionZZ;
	/**Handle a [`ReleaseHeldHtlc`] message. If authentication of the message succeeds, an HTLC
	 * should be released to the corresponding payee.
	 */
	handle_release_held_htlc(message: ReleaseHeldHtlc, context: AsyncPaymentsContext): void;
	/**Release any [`AsyncPaymentsMessage`]s that need to be sent.
	 * 
	 * Typically, this is used for messages initiating an async payment flow rather than in response
	 * to another message.
	 */
	release_pending_messages(): TwoTuple_AsyncPaymentsMessageMessageSendInstructionsZ[];
}

class LDKAsyncPaymentsMessageHandlerHolder {
	held: AsyncPaymentsMessageHandler|null = null;
}

/**
 * A handler for an [`OnionMessage`] containing an async payments message as its payload.
 * 
 * The [`AsyncPaymentsContext`]s provided to each method was authenticated by the
 * [`OnionMessenger`] as coming from a blinded path that we created.
 * 
 * [`OnionMessage`]: crate::ln::msgs::OnionMessage
 * [`OnionMessenger`]: crate::onion_message::messenger::OnionMessenger
 */
export class AsyncPaymentsMessageHandler extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKAsyncPaymentsMessageHandler|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.AsyncPaymentsMessageHandler_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of AsyncPaymentsMessageHandler from a given implementation */
	public static new_impl(arg: AsyncPaymentsMessageHandlerInterface): AsyncPaymentsMessageHandler {
		const impl_holder: LDKAsyncPaymentsMessageHandlerHolder = new LDKAsyncPaymentsMessageHandlerHolder();
		let structImplementation = {
			handle_offer_paths_request (message: bigint, context: bigint, responder: bigint): bigint {
				const message_hu_conv: OfferPathsRequest = new OfferPathsRequest(null, message);
				CommonBase.add_ref_from(message_hu_conv, this);
				const context_hu_conv: AsyncPaymentsContext = AsyncPaymentsContext.constr_from_ptr(context);
				CommonBase.add_ref_from(context_hu_conv, this);
				const responder_hu_conv: Responder = new Responder(null, responder);
				CommonBase.add_ref_from(responder_hu_conv, this);
				const ret: Option_C2Tuple_OfferPathsResponseInstructionZZ = arg.handle_offer_paths_request(message_hu_conv, context_hu_conv, responder_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			handle_offer_paths (message: bigint, context: bigint, responder: bigint): bigint {
				const message_hu_conv: OfferPaths = new OfferPaths(null, message);
				CommonBase.add_ref_from(message_hu_conv, this);
				const context_hu_conv: AsyncPaymentsContext = AsyncPaymentsContext.constr_from_ptr(context);
				CommonBase.add_ref_from(context_hu_conv, this);
				const responder_hu_conv: Responder = new Responder(null, responder);
				CommonBase.add_ref_from(responder_hu_conv, this);
				const ret: Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ = arg.handle_offer_paths(message_hu_conv, context_hu_conv, responder_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			handle_serve_static_invoice (message: bigint, context: bigint, responder: bigint): void {
				const message_hu_conv: ServeStaticInvoice = new ServeStaticInvoice(null, message);
				CommonBase.add_ref_from(message_hu_conv, this);
				const context_hu_conv: AsyncPaymentsContext = AsyncPaymentsContext.constr_from_ptr(context);
				CommonBase.add_ref_from(context_hu_conv, this);
				const responder_hu_conv: Responder = new Responder(null, responder);
				CommonBase.add_ref_from(responder_hu_conv, this);
				arg.handle_serve_static_invoice(message_hu_conv, context_hu_conv, responder_hu_conv);
			},
			handle_static_invoice_persisted (message: bigint, context: bigint): void {
				const message_hu_conv: StaticInvoicePersisted = new StaticInvoicePersisted(null, message);
				CommonBase.add_ref_from(message_hu_conv, this);
				const context_hu_conv: AsyncPaymentsContext = AsyncPaymentsContext.constr_from_ptr(context);
				CommonBase.add_ref_from(context_hu_conv, this);
				arg.handle_static_invoice_persisted(message_hu_conv, context_hu_conv);
			},
			handle_held_htlc_available (message: bigint, context: bigint, responder: bigint): bigint {
				const message_hu_conv: HeldHtlcAvailable = new HeldHtlcAvailable(null, message);
				CommonBase.add_ref_from(message_hu_conv, this);
				const context_hu_conv: AsyncPaymentsContext = AsyncPaymentsContext.constr_from_ptr(context);
				CommonBase.add_ref_from(context_hu_conv, this);
				const responder_hu_conv: Responder = new Responder(null, responder);
				CommonBase.add_ref_from(responder_hu_conv, this);
				const ret: Option_C2Tuple_ReleaseHeldHtlcResponseInstructionZZ = arg.handle_held_htlc_available(message_hu_conv, context_hu_conv, responder_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			handle_release_held_htlc (message: bigint, context: bigint): void {
				const message_hu_conv: ReleaseHeldHtlc = new ReleaseHeldHtlc(null, message);
				CommonBase.add_ref_from(message_hu_conv, this);
				const context_hu_conv: AsyncPaymentsContext = AsyncPaymentsContext.constr_from_ptr(context);
				CommonBase.add_ref_from(context_hu_conv, this);
				arg.handle_release_held_htlc(message_hu_conv, context_hu_conv);
			},
			release_pending_messages (): number {
				const ret: TwoTuple_AsyncPaymentsMessageMessageSendInstructionsZ[] = arg.release_pending_messages();
				const result: number = bindings.encodeUint64Array(ret.map(ret_conv_55 => ret_conv_55.clone_ptr()));
				return result;
			},
		} as bindings.LDKAsyncPaymentsMessageHandler;
		const ptr_idx: [bigint, number] = bindings.LDKAsyncPaymentsMessageHandler_new(structImplementation);

		impl_holder.held = new AsyncPaymentsMessageHandler(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Handle an [`OfferPathsRequest`] message. If we are a static invoice server and the message was
	 * sent over paths that we previously provided to an async recipient, an [`OfferPaths`] message
	 * should be returned.
	 * 
	 * Note that responder (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public handle_offer_paths_request(message: OfferPathsRequest, context: AsyncPaymentsContext, responder: Responder|null): Option_C2Tuple_OfferPathsResponseInstructionZZ {
		const ret: bigint = bindings.AsyncPaymentsMessageHandler_handle_offer_paths_request(this.ptr, CommonBase.get_ptr_of(message), CommonBase.get_ptr_of(context), responder == null ? 0n : CommonBase.get_ptr_of(responder));
		const ret_hu_conv: Option_C2Tuple_OfferPathsResponseInstructionZZ = Option_C2Tuple_OfferPathsResponseInstructionZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Handle an [`OfferPaths`] message. If this is in response to an [`OfferPathsRequest`] that
	 * we previously sent as an async recipient, we should build an [`Offer`] containing the
	 * included [`OfferPaths::paths`] and a corresponding [`StaticInvoice`], and reply with
	 * [`ServeStaticInvoice`].
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * 
	 * Note that responder (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public handle_offer_paths(message: OfferPaths, context: AsyncPaymentsContext, responder: Responder|null): Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ {
		const ret: bigint = bindings.AsyncPaymentsMessageHandler_handle_offer_paths(this.ptr, CommonBase.get_ptr_of(message), CommonBase.get_ptr_of(context), responder == null ? 0n : CommonBase.get_ptr_of(responder));
		const ret_hu_conv: Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ = Option_C2Tuple_ServeStaticInvoiceResponseInstructionZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Handle a [`ServeStaticInvoice`] message. If this is in response to an [`OfferPaths`] message
	 * we previously sent as a static invoice server, a [`StaticInvoicePersisted`] message should be
	 * sent once the message is handled.
	 * 
	 * Note that responder (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public handle_serve_static_invoice(message: ServeStaticInvoice, context: AsyncPaymentsContext, responder: Responder|null): void {
		bindings.AsyncPaymentsMessageHandler_handle_serve_static_invoice(this.ptr, CommonBase.get_ptr_of(message), CommonBase.get_ptr_of(context), responder == null ? 0n : CommonBase.get_ptr_of(responder));
	}

	/**
	 * Handle a [`StaticInvoicePersisted`] message. If this is in response to a
	 * [`ServeStaticInvoice`] message we previously sent as an async recipient, then the offer we
	 * generated on receipt of a previous [`OfferPaths`] message is now ready to be used for async
	 * payments.
	 */
	public handle_static_invoice_persisted(message: StaticInvoicePersisted, context: AsyncPaymentsContext): void {
		bindings.AsyncPaymentsMessageHandler_handle_static_invoice_persisted(this.ptr, CommonBase.get_ptr_of(message), CommonBase.get_ptr_of(context));
	}

	/**
	 * Handle a [`HeldHtlcAvailable`] message. A [`ReleaseHeldHtlc`] should be returned to release
	 * the held funds.
	 * 
	 * Note that responder (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public handle_held_htlc_available(message: HeldHtlcAvailable, context: AsyncPaymentsContext, responder: Responder|null): Option_C2Tuple_ReleaseHeldHtlcResponseInstructionZZ {
		const ret: bigint = bindings.AsyncPaymentsMessageHandler_handle_held_htlc_available(this.ptr, CommonBase.get_ptr_of(message), CommonBase.get_ptr_of(context), responder == null ? 0n : CommonBase.get_ptr_of(responder));
		const ret_hu_conv: Option_C2Tuple_ReleaseHeldHtlcResponseInstructionZZ = Option_C2Tuple_ReleaseHeldHtlcResponseInstructionZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Handle a [`ReleaseHeldHtlc`] message. If authentication of the message succeeds, an HTLC
	 * should be released to the corresponding payee.
	 */
	public handle_release_held_htlc(message: ReleaseHeldHtlc, context: AsyncPaymentsContext): void {
		bindings.AsyncPaymentsMessageHandler_handle_release_held_htlc(this.ptr, CommonBase.get_ptr_of(message), CommonBase.get_ptr_of(context));
	}

	/**
	 * Release any [`AsyncPaymentsMessage`]s that need to be sent.
	 * 
	 * Typically, this is used for messages initiating an async payment flow rather than in response
	 * to another message.
	 */
	public release_pending_messages(): TwoTuple_AsyncPaymentsMessageMessageSendInstructionsZ[] {
		const ret: number = bindings.AsyncPaymentsMessageHandler_release_pending_messages(this.ptr);
		const ret_conv_55_len: number = bindings.getArrayLength(ret);
		const ret_conv_55_arr: TwoTuple_AsyncPaymentsMessageMessageSendInstructionsZ[] = new Array(ret_conv_55_len).fill(null);
		for (var d = 0; d < ret_conv_55_len; d++) {
			const ret_conv_55: bigint = bindings.getU64ArrayElem(ret, d);
			const ret_conv_55_hu_conv: TwoTuple_AsyncPaymentsMessageMessageSendInstructionsZ = new TwoTuple_AsyncPaymentsMessageMessageSendInstructionsZ(null, ret_conv_55);
			CommonBase.add_ref_from(ret_conv_55_hu_conv, this);
			ret_conv_55_arr[d] = ret_conv_55_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_55_arr;
	}

}
