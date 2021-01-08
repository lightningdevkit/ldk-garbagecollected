package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class TxCreationKeys extends CommonBase {
	TxCreationKeys(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.TxCreationKeys_free(ptr); }
	}

	public TxCreationKeys clone() {
		long ret = bindings.TxCreationKeys_clone(this.ptr);
		TxCreationKeys ret_hu_conv = new TxCreationKeys(null, ret);
		return ret_hu_conv;
	}

	public byte[] get_per_commitment_point() {
		byte[] ret = bindings.TxCreationKeys_get_per_commitment_point(this.ptr);
		return ret;
	}

	public void set_per_commitment_point(byte[] val) {
		bindings.TxCreationKeys_set_per_commitment_point(this.ptr, val);
	}

	public byte[] get_revocation_key() {
		byte[] ret = bindings.TxCreationKeys_get_revocation_key(this.ptr);
		return ret;
	}

	public void set_revocation_key(byte[] val) {
		bindings.TxCreationKeys_set_revocation_key(this.ptr, val);
	}

	public byte[] get_broadcaster_htlc_key() {
		byte[] ret = bindings.TxCreationKeys_get_broadcaster_htlc_key(this.ptr);
		return ret;
	}

	public void set_broadcaster_htlc_key(byte[] val) {
		bindings.TxCreationKeys_set_broadcaster_htlc_key(this.ptr, val);
	}

	public byte[] get_countersignatory_htlc_key() {
		byte[] ret = bindings.TxCreationKeys_get_countersignatory_htlc_key(this.ptr);
		return ret;
	}

	public void set_countersignatory_htlc_key(byte[] val) {
		bindings.TxCreationKeys_set_countersignatory_htlc_key(this.ptr, val);
	}

	public byte[] get_broadcaster_delayed_payment_key() {
		byte[] ret = bindings.TxCreationKeys_get_broadcaster_delayed_payment_key(this.ptr);
		return ret;
	}

	public void set_broadcaster_delayed_payment_key(byte[] val) {
		bindings.TxCreationKeys_set_broadcaster_delayed_payment_key(this.ptr, val);
	}

	public static TxCreationKeys constructor_new(byte[] per_commitment_point_arg, byte[] revocation_key_arg, byte[] broadcaster_htlc_key_arg, byte[] countersignatory_htlc_key_arg, byte[] broadcaster_delayed_payment_key_arg) {
		long ret = bindings.TxCreationKeys_new(per_commitment_point_arg, revocation_key_arg, broadcaster_htlc_key_arg, countersignatory_htlc_key_arg, broadcaster_delayed_payment_key_arg);
		TxCreationKeys ret_hu_conv = new TxCreationKeys(null, ret);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.TxCreationKeys_write(this.ptr);
		return ret;
	}

	public static TxCreationKeys constructor_read(byte[] ser) {
		long ret = bindings.TxCreationKeys_read(ser);
		TxCreationKeys ret_hu_conv = new TxCreationKeys(null, ret);
		return ret_hu_conv;
	}

	public static Result_TxCreationKeysSecpErrorZ constructor_derive_new(byte[] per_commitment_point, byte[] broadcaster_delayed_payment_base, byte[] broadcaster_htlc_base, byte[] countersignatory_revocation_base, byte[] countersignatory_htlc_base) {
		long ret = bindings.TxCreationKeys_derive_new(per_commitment_point, broadcaster_delayed_payment_base, broadcaster_htlc_base, countersignatory_revocation_base, countersignatory_htlc_base);
		Result_TxCreationKeysSecpErrorZ ret_hu_conv = Result_TxCreationKeysSecpErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_TxCreationKeysSecpErrorZ constructor_from_channel_static_keys(byte[] per_commitment_point, ChannelPublicKeys broadcaster_keys, ChannelPublicKeys countersignatory_keys) {
		long ret = bindings.TxCreationKeys_from_channel_static_keys(per_commitment_point, broadcaster_keys == null ? 0 : broadcaster_keys.ptr & ~1, countersignatory_keys == null ? 0 : countersignatory_keys.ptr & ~1);
		Result_TxCreationKeysSecpErrorZ ret_hu_conv = Result_TxCreationKeysSecpErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(broadcaster_keys);
		ret_hu_conv.ptrs_to.add(countersignatory_keys);
		return ret_hu_conv;
	}

}
