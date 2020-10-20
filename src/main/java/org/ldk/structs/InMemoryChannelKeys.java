package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class InMemoryChannelKeys extends CommonBase {
	InMemoryChannelKeys(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.InMemoryChannelKeys_free(ptr);
	}

	public static InMemoryChannelKeys constructor_clone(InMemoryChannelKeys orig) {
		long ret = bindings.InMemoryChannelKeys_clone(orig == null ? 0 : orig.ptr & ~1);
		InMemoryChannelKeys ret_hu_conv = new InMemoryChannelKeys(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public byte[] get_funding_key() {
		byte[] ret = bindings.InMemoryChannelKeys_get_funding_key(this.ptr);
		return ret;
	}

	public void set_funding_key(byte[] val) {
		bindings.InMemoryChannelKeys_set_funding_key(this.ptr, val);
	}

	public byte[] get_revocation_base_key() {
		byte[] ret = bindings.InMemoryChannelKeys_get_revocation_base_key(this.ptr);
		return ret;
	}

	public void set_revocation_base_key(byte[] val) {
		bindings.InMemoryChannelKeys_set_revocation_base_key(this.ptr, val);
	}

	public byte[] get_payment_key() {
		byte[] ret = bindings.InMemoryChannelKeys_get_payment_key(this.ptr);
		return ret;
	}

	public void set_payment_key(byte[] val) {
		bindings.InMemoryChannelKeys_set_payment_key(this.ptr, val);
	}

	public byte[] get_delayed_payment_base_key() {
		byte[] ret = bindings.InMemoryChannelKeys_get_delayed_payment_base_key(this.ptr);
		return ret;
	}

	public void set_delayed_payment_base_key(byte[] val) {
		bindings.InMemoryChannelKeys_set_delayed_payment_base_key(this.ptr, val);
	}

	public byte[] get_htlc_base_key() {
		byte[] ret = bindings.InMemoryChannelKeys_get_htlc_base_key(this.ptr);
		return ret;
	}

	public void set_htlc_base_key(byte[] val) {
		bindings.InMemoryChannelKeys_set_htlc_base_key(this.ptr, val);
	}

	public byte[] get_commitment_seed() {
		byte[] ret = bindings.InMemoryChannelKeys_get_commitment_seed(this.ptr);
		return ret;
	}

	public void set_commitment_seed(byte[] val) {
		bindings.InMemoryChannelKeys_set_commitment_seed(this.ptr, val);
	}

	// Skipped InMemoryChannelKeys_new
	public ChannelPublicKeys counterparty_pubkeys() {
		long ret = bindings.InMemoryChannelKeys_counterparty_pubkeys(this.ptr);
		ChannelPublicKeys ret_hu_conv = new ChannelPublicKeys(null, ret);
		return ret_hu_conv;
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
		long ret = bindings.InMemoryChannelKeys_as_ChannelKeys(this.ptr);
		ChannelKeys ret_hu_conv = new ChannelKeys(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public byte[] write(InMemoryChannelKeys obj) {
		byte[] ret = bindings.InMemoryChannelKeys_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static InMemoryChannelKeys constructor_read(byte[] ser) {
		long ret = bindings.InMemoryChannelKeys_read(ser);
		InMemoryChannelKeys ret_hu_conv = new InMemoryChannelKeys(null, ret);
		return ret_hu_conv;
	}

}
