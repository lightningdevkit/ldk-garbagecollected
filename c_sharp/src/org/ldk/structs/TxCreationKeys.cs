using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * The set of public keys which are used in the creation of one commitment transaction.
 * These are derived from the channel base keys and per-commitment data.
 * 
 * A broadcaster key is provided from potential broadcaster of the computed transaction.
 * A countersignatory key is coming from a protocol participant unable to broadcast the
 * transaction.
 * 
 * These keys are assumed to be good, either because the code derived them from
 * channel basepoints via the new function, or they were obtained via
 * CommitmentTransaction.trust().keys() because we trusted the source of the
 * pre-calculated keys.
 */
public class TxCreationKeys : CommonBase {
	internal TxCreationKeys(object _dummy, long ptr) : base(ptr) { }
	~TxCreationKeys() {
		if (ptr != 0) { bindings.TxCreationKeys_free(ptr); }
	}

	/**
	 * The broadcaster's per-commitment public key which was used to derive the other keys.
	 */
	public byte[] get_per_commitment_point() {
		long ret = bindings.TxCreationKeys_get_per_commitment_point(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The broadcaster's per-commitment public key which was used to derive the other keys.
	 */
	public void set_per_commitment_point(byte[] val) {
		bindings.TxCreationKeys_set_per_commitment_point(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The revocation key which is used to allow the broadcaster of the commitment
	 * transaction to provide their counterparty the ability to punish them if they broadcast
	 * an old state.
	 */
	public byte[] get_revocation_key() {
		long ret = bindings.TxCreationKeys_get_revocation_key(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The revocation key which is used to allow the broadcaster of the commitment
	 * transaction to provide their counterparty the ability to punish them if they broadcast
	 * an old state.
	 */
	public void set_revocation_key(byte[] val) {
		bindings.TxCreationKeys_set_revocation_key(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Broadcaster's HTLC Key
	 */
	public byte[] get_broadcaster_htlc_key() {
		long ret = bindings.TxCreationKeys_get_broadcaster_htlc_key(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Broadcaster's HTLC Key
	 */
	public void set_broadcaster_htlc_key(byte[] val) {
		bindings.TxCreationKeys_set_broadcaster_htlc_key(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Countersignatory's HTLC Key
	 */
	public byte[] get_countersignatory_htlc_key() {
		long ret = bindings.TxCreationKeys_get_countersignatory_htlc_key(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Countersignatory's HTLC Key
	 */
	public void set_countersignatory_htlc_key(byte[] val) {
		bindings.TxCreationKeys_set_countersignatory_htlc_key(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Broadcaster's Payment Key (which isn't allowed to be spent from for some delay)
	 */
	public byte[] get_broadcaster_delayed_payment_key() {
		long ret = bindings.TxCreationKeys_get_broadcaster_delayed_payment_key(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Broadcaster's Payment Key (which isn't allowed to be spent from for some delay)
	 */
	public void set_broadcaster_delayed_payment_key(byte[] val) {
		bindings.TxCreationKeys_set_broadcaster_delayed_payment_key(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new TxCreationKeys given each field
	 */
	public static TxCreationKeys of(byte[] per_commitment_point_arg, byte[] revocation_key_arg, byte[] broadcaster_htlc_key_arg, byte[] countersignatory_htlc_key_arg, byte[] broadcaster_delayed_payment_key_arg) {
		long ret = bindings.TxCreationKeys_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(per_commitment_point_arg, 33)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(revocation_key_arg, 33)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(broadcaster_htlc_key_arg, 33)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(countersignatory_htlc_key_arg, 33)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(broadcaster_delayed_payment_key_arg, 33)));
		GC.KeepAlive(per_commitment_point_arg);
		GC.KeepAlive(revocation_key_arg);
		GC.KeepAlive(broadcaster_htlc_key_arg);
		GC.KeepAlive(countersignatory_htlc_key_arg);
		GC.KeepAlive(broadcaster_delayed_payment_key_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxCreationKeys ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxCreationKeys(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two TxCreationKeyss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.TxCreationKeys b) {
		bool ret = bindings.TxCreationKeys_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is TxCreationKeys)) return false;
		return this.eq((TxCreationKeys)o);
	}
	internal long clone_ptr() {
		long ret = bindings.TxCreationKeys_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the TxCreationKeys
	 */
	public TxCreationKeys clone() {
		long ret = bindings.TxCreationKeys_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxCreationKeys ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxCreationKeys(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the TxCreationKeys object into a byte array which can be read by TxCreationKeys_read
	 */
	public byte[] write() {
		long ret = bindings.TxCreationKeys_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a TxCreationKeys from a byte array, created by TxCreationKeys_write
	 */
	public static Result_TxCreationKeysDecodeErrorZ read(byte[] ser) {
		long ret = bindings.TxCreationKeys_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxCreationKeysDecodeErrorZ ret_hu_conv = Result_TxCreationKeysDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Create per-state keys from channel base points and the per-commitment point.
	 * Key set is asymmetric and can't be used as part of counter-signatory set of transactions.
	 */
	public static TxCreationKeys derive_new(byte[] per_commitment_point, byte[] broadcaster_delayed_payment_base, byte[] broadcaster_htlc_base, byte[] countersignatory_revocation_base, byte[] countersignatory_htlc_base) {
		long ret = bindings.TxCreationKeys_derive_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(per_commitment_point, 33)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(broadcaster_delayed_payment_base, 33)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(broadcaster_htlc_base, 33)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(countersignatory_revocation_base, 33)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(countersignatory_htlc_base, 33)));
		GC.KeepAlive(per_commitment_point);
		GC.KeepAlive(broadcaster_delayed_payment_base);
		GC.KeepAlive(broadcaster_htlc_base);
		GC.KeepAlive(countersignatory_revocation_base);
		GC.KeepAlive(countersignatory_htlc_base);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxCreationKeys ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxCreationKeys(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Generate per-state keys from channel static keys.
	 * Key set is asymmetric and can't be used as part of counter-signatory set of transactions.
	 */
	public static TxCreationKeys from_channel_static_keys(byte[] per_commitment_point, org.ldk.structs.ChannelPublicKeys broadcaster_keys, org.ldk.structs.ChannelPublicKeys countersignatory_keys) {
		long ret = bindings.TxCreationKeys_from_channel_static_keys(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(per_commitment_point, 33)), broadcaster_keys == null ? 0 : broadcaster_keys.ptr, countersignatory_keys == null ? 0 : countersignatory_keys.ptr);
		GC.KeepAlive(per_commitment_point);
		GC.KeepAlive(broadcaster_keys);
		GC.KeepAlive(countersignatory_keys);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxCreationKeys ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxCreationKeys(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(broadcaster_keys); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(countersignatory_keys); };
		return ret_hu_conv;
	}

}
} } }
