using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A `Refund` is a request to send an [`Bolt12Invoice`] without a preceding [`Offer`].
 * 
 * Typically, after an invoice is paid, the recipient may publish a refund allowing the sender to
 * recoup their funds. A refund may be used more generally as an \"offer for money\", such as with a
 * bitcoin ATM.
 * 
 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
 * [`Offer`]: crate::offers::offer::Offer
 */
public class Refund : CommonBase {
	internal Refund(object _dummy, long ptr) : base(ptr) { }
	~Refund() {
		if (ptr != 0) { bindings.Refund_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.Refund_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Refund
	 */
	public Refund clone() {
		long ret = bindings.Refund_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Refund ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Refund(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * A complete description of the purpose of the refund. Intended to be displayed to the user
	 * but with the caveat that it has not been verified in any way.
	 */
	public PrintableString description() {
		long ret = bindings.Refund_description(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Duration since the Unix epoch when an invoice should no longer be sent.
	 * 
	 * If `None`, the refund does not expire.
	 */
	public Option_u64Z absolute_expiry() {
		long ret = bindings.Refund_absolute_expiry(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Whether the refund has expired.
	 */
	public bool is_expired() {
		bool ret = bindings.Refund_is_expired(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Whether the refund has expired given the duration since the Unix epoch.
	 */
	public bool is_expired_no_std(long duration_since_epoch) {
		bool ret = bindings.Refund_is_expired_no_std(this.ptr, duration_since_epoch);
		GC.KeepAlive(this);
		GC.KeepAlive(duration_since_epoch);
		return ret;
	}

	/**
	 * The issuer of the refund, possibly beginning with `user@domain` or `domain`. Intended to be
	 * displayed to the user but with the caveat that it has not been verified in any way.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public PrintableString issuer() {
		long ret = bindings.Refund_issuer(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Paths to the sender originating from publicly reachable nodes. Blinded paths provide sender
	 * privacy by obfuscating its node id.
	 */
	public BlindedPath[] paths() {
		long ret = bindings.Refund_paths(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_13_len = InternalUtils.getArrayLength(ret);
		BlindedPath[] ret_conv_13_arr = new BlindedPath[ret_conv_13_len];
		for (int n = 0; n < ret_conv_13_len; n++) {
			long ret_conv_13 = InternalUtils.getU64ArrayElem(ret, n);
			org.ldk.structs.BlindedPath ret_conv_13_hu_conv = null; if (ret_conv_13 < 0 || ret_conv_13 > 4096) { ret_conv_13_hu_conv = new org.ldk.structs.BlindedPath(null, ret_conv_13); }
			if (ret_conv_13_hu_conv != null) { ret_conv_13_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_13_arr[n] = ret_conv_13_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_13_arr;
	}

	/**
	 * An unpredictable series of bytes, typically containing information about the derivation of
	 * [`payer_id`].
	 * 
	 * [`payer_id`]: Self::payer_id
	 */
	public byte[] payer_metadata() {
		long ret = bindings.Refund_payer_metadata(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A chain that the refund is valid for.
	 */
	public byte[] chain() {
		long ret = bindings.Refund_chain(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The amount to refund in msats (i.e., the minimum lightning-payable unit for [`chain`]).
	 * 
	 * [`chain`]: Self::chain
	 */
	public long amount_msats() {
		long ret = bindings.Refund_amount_msats(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Features pertaining to requesting an invoice.
	 */
	public InvoiceRequestFeatures features() {
		long ret = bindings.Refund_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoiceRequestFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoiceRequestFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The quantity of an item that refund is for.
	 */
	public Option_u64Z quantity() {
		long ret = bindings.Refund_quantity(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * A public node id to send to in the case where there are no [`paths`]. Otherwise, a possibly
	 * transient pubkey.
	 * 
	 * [`paths`]: Self::paths
	 */
	public byte[] payer_id() {
		long ret = bindings.Refund_payer_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Payer provided note to include in the invoice.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public PrintableString payer_note() {
		long ret = bindings.Refund_payer_note(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PrintableString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PrintableString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the Refund object into a byte array which can be read by Refund_read
	 */
	public byte[] write() {
		long ret = bindings.Refund_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Refund object from a string
	 */
	public static Result_RefundBolt12ParseErrorZ from_str(string s) {
		long ret = bindings.Refund_from_str(InternalUtils.encodeString(s));
		GC.KeepAlive(s);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RefundBolt12ParseErrorZ ret_hu_conv = Result_RefundBolt12ParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
