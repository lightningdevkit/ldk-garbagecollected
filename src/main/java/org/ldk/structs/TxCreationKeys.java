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
		bindings.TxCreationKeys_free(ptr);
	}

	public static TxCreationKeys constructor_clone(TxCreationKeys orig) {
		long ret = bindings.TxCreationKeys_clone(orig == null ? 0 : orig.ptr & ~1);
		TxCreationKeys ret_hu_conv = new TxCreationKeys(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
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

	public byte[] write(TxCreationKeys obj) {
		byte[] ret = bindings.TxCreationKeys_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static TxCreationKeys constructor_read(byte[] ser) {
		long ret = bindings.TxCreationKeys_read(ser);
		TxCreationKeys ret_hu_conv = new TxCreationKeys(null, ret);
		return ret_hu_conv;
	}

	public Result_TxCreationKeysSecpErrorZ derive_new(byte[] per_commitment_point, byte[] broadcaster_delayed_payment_base, byte[] broadcaster_htlc_base, byte[] countersignatory_revocation_base, byte[] countersignatory_htlc_base) {
		long ret = bindings.TxCreationKeys_derive_new(per_commitment_point, broadcaster_delayed_payment_base, broadcaster_htlc_base, countersignatory_revocation_base, countersignatory_htlc_base);
		Result_TxCreationKeysSecpErrorZ ret_hu_conv = Result_TxCreationKeysSecpErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
