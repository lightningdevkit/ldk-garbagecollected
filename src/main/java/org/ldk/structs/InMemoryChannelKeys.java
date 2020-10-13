package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class InMemoryChannelKeys extends CommonBase {
	InMemoryChannelKeys(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.InMemoryChannelKeys_free(ptr); super.finalize();
	}

	public InMemoryChannelKeys(InMemoryChannelKeys orig) {
		super(bindings.InMemoryChannelKeys_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_funding_key(InMemoryChannelKeys this_ptr) {
		byte[] ret = bindings.InMemoryChannelKeys_get_funding_key(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_funding_key(InMemoryChannelKeys this_ptr, byte[] val) {
		bindings.InMemoryChannelKeys_set_funding_key(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_revocation_base_key(InMemoryChannelKeys this_ptr) {
		byte[] ret = bindings.InMemoryChannelKeys_get_revocation_base_key(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_revocation_base_key(InMemoryChannelKeys this_ptr, byte[] val) {
		bindings.InMemoryChannelKeys_set_revocation_base_key(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_payment_key(InMemoryChannelKeys this_ptr) {
		byte[] ret = bindings.InMemoryChannelKeys_get_payment_key(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_payment_key(InMemoryChannelKeys this_ptr, byte[] val) {
		bindings.InMemoryChannelKeys_set_payment_key(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_delayed_payment_base_key(InMemoryChannelKeys this_ptr) {
		byte[] ret = bindings.InMemoryChannelKeys_get_delayed_payment_base_key(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_delayed_payment_base_key(InMemoryChannelKeys this_ptr, byte[] val) {
		bindings.InMemoryChannelKeys_set_delayed_payment_base_key(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_htlc_base_key(InMemoryChannelKeys this_ptr) {
		byte[] ret = bindings.InMemoryChannelKeys_get_htlc_base_key(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_htlc_base_key(InMemoryChannelKeys this_ptr, byte[] val) {
		bindings.InMemoryChannelKeys_set_htlc_base_key(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_commitment_seed(InMemoryChannelKeys this_ptr) {
		byte[] ret = bindings.InMemoryChannelKeys_get_commitment_seed(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_commitment_seed(InMemoryChannelKeys this_ptr, byte[] val) {
		bindings.InMemoryChannelKeys_set_commitment_seed(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	// Skipped InMemoryChannelKeys_new
	public ChannelPublicKeys counterparty_pubkeys() {
		ChannelPublicKeys ret = new ChannelPublicKeys(null, bindings.InMemoryChannelKeys_counterparty_pubkeys(this.ptr));
		return ret;
	}

	public short counterparty_selected_contest_delay() {
		short ret = bindings.InMemoryChannelKeys_counterparty_selected_contest_delay(this.ptr);
		return ret;
	}

	public short holder_selected_contest_delay() {
		short ret = bindings.InMemoryChannelKeys_holder_selected_contest_delay(this.ptr);
		return ret;
	}

	public ChannelKeys as_ChannelKeys() {
		ChannelKeys ret = new ChannelKeys(null, bindings.InMemoryChannelKeys_as_ChannelKeys(this.ptr));
		ret.ptrs_to.add(this);
		return ret;
	}

	// Skipped InMemoryChannelKeys_write
	public InMemoryChannelKeys(byte[] ser) {
		super(bindings.InMemoryChannelKeys_read(ser));
	}

}
