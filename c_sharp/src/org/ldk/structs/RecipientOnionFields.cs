using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Information which is provided, encrypted, to the payment recipient when sending HTLCs.
 * 
 * This should generally be constructed with data communicated to us from the recipient (via a
 * BOLT11 or BOLT12 invoice).
 */
public class RecipientOnionFields : CommonBase {
	internal RecipientOnionFields(object _dummy, long ptr) : base(ptr) { }
	~RecipientOnionFields() {
		if (ptr != 0) { bindings.RecipientOnionFields_free(ptr); }
	}

	/**
	 * The [`PaymentSecret`] is an arbitrary 32 bytes provided by the recipient for us to repeat
	 * in the onion. It is unrelated to `payment_hash` (or [`PaymentPreimage`]) and exists to
	 * authenticate the sender to the recipient and prevent payment-probing (deanonymization)
	 * attacks.
	 * 
	 * If you do not have one, the [`Route`] you pay over must not contain multiple paths as
	 * multi-path payments require a recipient-provided secret.
	 * 
	 * Some implementations may reject spontaneous payments with payment secrets, so you may only
	 * want to provide a secret for a spontaneous payment if MPP is needed and you know your
	 * recipient will not reject it.
	 */
	public Option_ThirtyTwoBytesZ get_payment_secret() {
		long ret = bindings.RecipientOnionFields_get_payment_secret(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ThirtyTwoBytesZ ret_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The [`PaymentSecret`] is an arbitrary 32 bytes provided by the recipient for us to repeat
	 * in the onion. It is unrelated to `payment_hash` (or [`PaymentPreimage`]) and exists to
	 * authenticate the sender to the recipient and prevent payment-probing (deanonymization)
	 * attacks.
	 * 
	 * If you do not have one, the [`Route`] you pay over must not contain multiple paths as
	 * multi-path payments require a recipient-provided secret.
	 * 
	 * Some implementations may reject spontaneous payments with payment secrets, so you may only
	 * want to provide a secret for a spontaneous payment if MPP is needed and you know your
	 * recipient will not reject it.
	 */
	public void set_payment_secret(org.ldk.structs.Option_ThirtyTwoBytesZ val) {
		bindings.RecipientOnionFields_set_payment_secret(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The payment metadata serves a similar purpose as [`Self::payment_secret`] but is of
	 * arbitrary length. This gives recipients substantially more flexibility to receive
	 * additional data.
	 * 
	 * In LDK, while the [`Self::payment_secret`] is fixed based on an internal authentication
	 * scheme to authenticate received payments against expected payments and invoices, this field
	 * is not used in LDK for received payments, and can be used to store arbitrary data in
	 * invoices which will be received with the payment.
	 * 
	 * Note that this field was added to the lightning specification more recently than
	 * [`Self::payment_secret`] and while nearly all lightning senders support secrets, metadata
	 * may not be supported as universally.
	 * 
	 * Returns a copy of the field.
	 */
	public Option_CVec_u8ZZ get_payment_metadata() {
		long ret = bindings.RecipientOnionFields_get_payment_metadata(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_u8ZZ ret_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The payment metadata serves a similar purpose as [`Self::payment_secret`] but is of
	 * arbitrary length. This gives recipients substantially more flexibility to receive
	 * additional data.
	 * 
	 * In LDK, while the [`Self::payment_secret`] is fixed based on an internal authentication
	 * scheme to authenticate received payments against expected payments and invoices, this field
	 * is not used in LDK for received payments, and can be used to store arbitrary data in
	 * invoices which will be received with the payment.
	 * 
	 * Note that this field was added to the lightning specification more recently than
	 * [`Self::payment_secret`] and while nearly all lightning senders support secrets, metadata
	 * may not be supported as universally.
	 */
	public void set_payment_metadata(org.ldk.structs.Option_CVec_u8ZZ val) {
		bindings.RecipientOnionFields_set_payment_metadata(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	internal long clone_ptr() {
		long ret = bindings.RecipientOnionFields_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the RecipientOnionFields
	 */
	public RecipientOnionFields clone() {
		long ret = bindings.RecipientOnionFields_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RecipientOnionFields ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RecipientOnionFields(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two RecipientOnionFieldss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.RecipientOnionFields b) {
		bool ret = bindings.RecipientOnionFields_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is RecipientOnionFields)) return false;
		return this.eq((RecipientOnionFields)o);
	}
	/**
	 * Serialize the RecipientOnionFields object into a byte array which can be read by RecipientOnionFields_read
	 */
	public byte[] write() {
		long ret = bindings.RecipientOnionFields_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a RecipientOnionFields from a byte array, created by RecipientOnionFields_write
	 */
	public static Result_RecipientOnionFieldsDecodeErrorZ read(byte[] ser) {
		long ret = bindings.RecipientOnionFields_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RecipientOnionFieldsDecodeErrorZ ret_hu_conv = Result_RecipientOnionFieldsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a [`RecipientOnionFields`] from only a [`PaymentSecret`]. This is the most common
	 * set of onion fields for today's BOLT11 invoices - most nodes require a [`PaymentSecret`]
	 * but do not require or provide any further data.
	 */
	public static RecipientOnionFields secret_only(byte[] payment_secret) {
		long ret = bindings.RecipientOnionFields_secret_only(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_secret, 32)));
		GC.KeepAlive(payment_secret);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RecipientOnionFields ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RecipientOnionFields(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new [`RecipientOnionFields`] with no fields. This generally does not create
	 * payable HTLCs except for single-path spontaneous payments, i.e. this should generally
	 * only be used for calls to [`ChannelManager::send_spontaneous_payment`]. If you are sending
	 * a spontaneous MPP this will not work as all MPP require payment secrets; you may
	 * instead want to use [`RecipientOnionFields::secret_only`].
	 * 
	 * [`ChannelManager::send_spontaneous_payment`]: super::channelmanager::ChannelManager::send_spontaneous_payment
	 * [`RecipientOnionFields::secret_only`]: RecipientOnionFields::secret_only
	 */
	public static RecipientOnionFields spontaneous_empty() {
		long ret = bindings.RecipientOnionFields_spontaneous_empty();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RecipientOnionFields ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RecipientOnionFields(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new [`RecipientOnionFields`] from an existing one, adding custom TLVs. Each
	 * TLV is provided as a `(u64, Vec<u8>)` for the type number and serialized value
	 * respectively. TLV type numbers must be unique and within the range
	 * reserved for custom types, i.e. >= 2^16, otherwise this method will return `Err(())`.
	 * 
	 * This method will also error for types in the experimental range which have been
	 * standardized within the protocol, which only includes 5482373484 (keysend) for now.
	 * 
	 * See [`Self::custom_tlvs`] for more info.
	 */
	public Result_RecipientOnionFieldsNoneZ with_custom_tlvs(TwoTuple_u64CVec_u8ZZ[] custom_tlvs) {
		long ret = bindings.RecipientOnionFields_with_custom_tlvs(this.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(custom_tlvs, custom_tlvs_conv_23 => custom_tlvs_conv_23 != null ? custom_tlvs_conv_23.ptr : 0)));
		GC.KeepAlive(this);
		GC.KeepAlive(custom_tlvs);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RecipientOnionFieldsNoneZ ret_hu_conv = Result_RecipientOnionFieldsNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Gets the custom TLVs that will be sent or have been received.
	 * 
	 * Custom TLVs allow sending extra application-specific data with a payment. They provide
	 * additional flexibility on top of payment metadata, as while other implementations may
	 * require `payment_metadata` to reflect metadata provided in an invoice, custom TLVs
	 * do not have this restriction.
	 * 
	 * Note that if this field is non-empty, it will contain strictly increasing TLVs, each
	 * represented by a `(u64, Vec<u8>)` for its type number and serialized value respectively.
	 * This is validated when setting this field using [`Self::with_custom_tlvs`].
	 */
	public TwoTuple_u64CVec_u8ZZ[] custom_tlvs() {
		long ret = bindings.RecipientOnionFields_custom_tlvs(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_23_len = InternalUtils.getArrayLength(ret);
		TwoTuple_u64CVec_u8ZZ[] ret_conv_23_arr = new TwoTuple_u64CVec_u8ZZ[ret_conv_23_len];
		for (int x = 0; x < ret_conv_23_len; x++) {
			long ret_conv_23 = InternalUtils.getU64ArrayElem(ret, x);
			TwoTuple_u64CVec_u8ZZ ret_conv_23_hu_conv = new TwoTuple_u64CVec_u8ZZ(null, ret_conv_23);
			if (ret_conv_23_hu_conv != null) { ret_conv_23_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_23_arr[x] = ret_conv_23_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_23_arr;
	}

}
} } }
