package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class ChannelPublicKeys extends CommonBase {
	ChannelPublicKeys(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.ChannelPublicKeys_free(ptr); super.finalize();
	}

	public ChannelPublicKeys(ChannelPublicKeys orig) {
		super(bindings.ChannelPublicKeys_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_funding_pubkey(ChannelPublicKeys this_ptr) {
		byte[] ret = bindings.ChannelPublicKeys_get_funding_pubkey(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_funding_pubkey(ChannelPublicKeys this_ptr, byte[] val) {
		bindings.ChannelPublicKeys_set_funding_pubkey(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_revocation_basepoint(ChannelPublicKeys this_ptr) {
		byte[] ret = bindings.ChannelPublicKeys_get_revocation_basepoint(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_revocation_basepoint(ChannelPublicKeys this_ptr, byte[] val) {
		bindings.ChannelPublicKeys_set_revocation_basepoint(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_payment_point(ChannelPublicKeys this_ptr) {
		byte[] ret = bindings.ChannelPublicKeys_get_payment_point(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_payment_point(ChannelPublicKeys this_ptr, byte[] val) {
		bindings.ChannelPublicKeys_set_payment_point(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_delayed_payment_basepoint(ChannelPublicKeys this_ptr) {
		byte[] ret = bindings.ChannelPublicKeys_get_delayed_payment_basepoint(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_delayed_payment_basepoint(ChannelPublicKeys this_ptr, byte[] val) {
		bindings.ChannelPublicKeys_set_delayed_payment_basepoint(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_htlc_basepoint(ChannelPublicKeys this_ptr) {
		byte[] ret = bindings.ChannelPublicKeys_get_htlc_basepoint(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_htlc_basepoint(ChannelPublicKeys this_ptr, byte[] val) {
		bindings.ChannelPublicKeys_set_htlc_basepoint(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public ChannelPublicKeys(byte[] funding_pubkey_arg, byte[] revocation_basepoint_arg, byte[] payment_point_arg, byte[] delayed_payment_basepoint_arg, byte[] htlc_basepoint_arg) {
		super(bindings.ChannelPublicKeys_new(funding_pubkey_arg, revocation_basepoint_arg, payment_point_arg, delayed_payment_basepoint_arg, htlc_basepoint_arg));
	}

	// Skipped ChannelPublicKeys_write
	// Skipped ChannelPublicKeys_read
}
