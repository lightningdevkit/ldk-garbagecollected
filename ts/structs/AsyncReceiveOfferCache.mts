
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * If we are an often-offline recipient, we'll want to interactively build offers and static
 * invoices with an always-online node that will serve those static invoices to payers on our
 * behalf when we are offline.
 * 
 * This struct is used to cache those interactively built offers, and should be passed into
 * [`OffersMessageFlow`] on startup as well as persisted whenever an offer or invoice is updated.
 * 
 * ## Lifecycle of a cached offer
 * 
 * 1. On initial startup, recipients will request offer paths from the static invoice server
 * 2. Once a set of offer paths is received, recipients will build an offer and corresponding
 * static invoice, cache the offer as pending, and send the invoice to the server for
 * persistence
 * 3. Once the invoice is confirmed as persisted by the server, the recipient will mark the
 * corresponding offer as ready to receive payments
 * 4. If the offer is later returned to the user, it will be kept cached and its invoice will be
 * kept up-to-date until the offer expires
 * 5. If the offer does not get returned to the user within a certain timeframe, it will be
 * replaced with a new one using fresh offer paths requested from the static invoice server
 * 
 * ## Staying in sync with the Static Invoice Server
 * 
 * Pending offers: for a given cached offer where a corresponding invoice is not yet confirmed as
 * persisted by the static invoice server, we will retry persisting an invoice for that offer until
 * it succeeds, once per timer tick
 * Confirmed offers that have not yet been returned to the user: we will periodically replace an
 * unused confirmed offer with a new one, to try to always have a fresh offer available. We wait
 * several hours in between replacements to ensure the new offer replacement doesn't conflict with
 * the old one
 * Confirmed offers that have been returned to the user: we will send the server a fresh invoice
 * corresponding to each used offer once per timer tick until the offer expires
 * 
 * [`OffersMessageFlow`]: crate::offers::flow::OffersMessageFlow
 */
export class AsyncReceiveOfferCache extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.AsyncReceiveOfferCache_free);
	}

	/**
	 * Creates an empty [`AsyncReceiveOfferCache`] to be passed into [`OffersMessageFlow`].
	 * 
	 * [`OffersMessageFlow`]: crate::offers::flow::OffersMessageFlow
	 */
	public static constructor_new(): AsyncReceiveOfferCache {
		const ret: bigint = bindings.AsyncReceiveOfferCache_new();
		const ret_hu_conv: AsyncReceiveOfferCache = new AsyncReceiveOfferCache(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Serialize the AsyncReceiveOfferCache object into a byte array which can be read by AsyncReceiveOfferCache_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.AsyncReceiveOfferCache_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a AsyncReceiveOfferCache from a byte array, created by AsyncReceiveOfferCache_write
	 */
	public static constructor_read(ser: Uint8Array): Result_AsyncReceiveOfferCacheDecodeErrorZ {
		const ret: bigint = bindings.AsyncReceiveOfferCache_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_AsyncReceiveOfferCacheDecodeErrorZ = Result_AsyncReceiveOfferCacheDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
