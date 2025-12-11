package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


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
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class AsyncReceiveOfferCache extends CommonBase {
	AsyncReceiveOfferCache(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.AsyncReceiveOfferCache_free(ptr); }
	}

	/**
	 * Creates an empty [`AsyncReceiveOfferCache`] to be passed into [`OffersMessageFlow`].
	 * 
	 * [`OffersMessageFlow`]: crate::offers::flow::OffersMessageFlow
	 */
	public static AsyncReceiveOfferCache of() {
		long ret = bindings.AsyncReceiveOfferCache_new();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncReceiveOfferCache ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.AsyncReceiveOfferCache(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the AsyncReceiveOfferCache object into a byte array which can be read by AsyncReceiveOfferCache_read
	 */
	public byte[] write() {
		byte[] ret = bindings.AsyncReceiveOfferCache_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a AsyncReceiveOfferCache from a byte array, created by AsyncReceiveOfferCache_write
	 */
	public static Result_AsyncReceiveOfferCacheDecodeErrorZ read(byte[] ser) {
		long ret = bindings.AsyncReceiveOfferCache_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_AsyncReceiveOfferCacheDecodeErrorZ ret_hu_conv = Result_AsyncReceiveOfferCacheDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
