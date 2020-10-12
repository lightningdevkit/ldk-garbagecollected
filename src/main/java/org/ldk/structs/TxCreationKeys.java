package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class TxCreationKeys extends CommonBase {
	TxCreationKeys(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.TxCreationKeys_free(ptr); super.finalize();
	}

	public TxCreationKeys(TxCreationKeys orig) {
		super(bindings.TxCreationKeys_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_per_commitment_point(TxCreationKeys this_ptr) {
		byte[] ret = bindings.TxCreationKeys_get_per_commitment_point(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_per_commitment_point(TxCreationKeys this_ptr, byte[] val) {
		bindings.TxCreationKeys_set_per_commitment_point(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_revocation_key(TxCreationKeys this_ptr) {
		byte[] ret = bindings.TxCreationKeys_get_revocation_key(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_revocation_key(TxCreationKeys this_ptr, byte[] val) {
		bindings.TxCreationKeys_set_revocation_key(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_broadcaster_htlc_key(TxCreationKeys this_ptr) {
		byte[] ret = bindings.TxCreationKeys_get_broadcaster_htlc_key(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_broadcaster_htlc_key(TxCreationKeys this_ptr, byte[] val) {
		bindings.TxCreationKeys_set_broadcaster_htlc_key(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_countersignatory_htlc_key(TxCreationKeys this_ptr) {
		byte[] ret = bindings.TxCreationKeys_get_countersignatory_htlc_key(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_countersignatory_htlc_key(TxCreationKeys this_ptr, byte[] val) {
		bindings.TxCreationKeys_set_countersignatory_htlc_key(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_broadcaster_delayed_payment_key(TxCreationKeys this_ptr) {
		byte[] ret = bindings.TxCreationKeys_get_broadcaster_delayed_payment_key(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_broadcaster_delayed_payment_key(TxCreationKeys this_ptr, byte[] val) {
		bindings.TxCreationKeys_set_broadcaster_delayed_payment_key(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public TxCreationKeys(byte[] per_commitment_point_arg, byte[] revocation_key_arg, byte[] broadcaster_htlc_key_arg, byte[] countersignatory_htlc_key_arg, byte[] broadcaster_delayed_payment_key_arg) {
		super(bindings.TxCreationKeys_new(per_commitment_point_arg, revocation_key_arg, broadcaster_htlc_key_arg, countersignatory_htlc_key_arg, broadcaster_delayed_payment_key_arg));
	}

	// Skipped TxCreationKeys_write
	// Skipped TxCreationKeys_read
	// Skipped TxCreationKeys_derive_new
}
