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
	public Option_PaymentSecretZ get_payment_secret() {
		long ret = bindings.RecipientOnionFields_get_payment_secret(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PaymentSecretZ ret_hu_conv = org.ldk.structs.Option_PaymentSecretZ.constr_from_ptr(ret);
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
	public void set_payment_secret(org.ldk.structs.Option_PaymentSecretZ val) {
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

	/**
	 * Constructs a new RecipientOnionFields given each field
	 */
	public static RecipientOnionFields of(org.ldk.structs.Option_PaymentSecretZ payment_secret_arg, org.ldk.structs.Option_CVec_u8ZZ payment_metadata_arg) {
		long ret = bindings.RecipientOnionFields_new(payment_secret_arg.ptr, payment_metadata_arg.ptr);
		GC.KeepAlive(payment_secret_arg);
		GC.KeepAlive(payment_metadata_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RecipientOnionFields ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RecipientOnionFields(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(payment_secret_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(payment_metadata_arg); };
		return ret_hu_conv;
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
		byte[] ret = bindings.RecipientOnionFields_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a RecipientOnionFields from a byte array, created by RecipientOnionFields_write
	 */
	public static Result_RecipientOnionFieldsDecodeErrorZ read(byte[] ser) {
		long ret = bindings.RecipientOnionFields_read(ser);
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
		long ret = bindings.RecipientOnionFields_secret_only(InternalUtils.check_arr_len(payment_secret, 32));
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

}
} } }
