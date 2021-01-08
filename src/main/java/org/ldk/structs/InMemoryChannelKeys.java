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
		if (ptr != 0) { bindings.InMemoryChannelKeys_free(ptr); }
	}

	public InMemoryChannelKeys clone() {
		long ret = bindings.InMemoryChannelKeys_clone(this.ptr);
		InMemoryChannelKeys ret_hu_conv = new InMemoryChannelKeys(null, ret);
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

	public static InMemoryChannelKeys constructor_new(byte[] funding_key, byte[] revocation_base_key, byte[] payment_key, byte[] delayed_payment_base_key, byte[] htlc_base_key, byte[] commitment_seed, long channel_value_satoshis, TwoTuple<Long, Long> key_derivation_params) {
		long ret = bindings.InMemoryChannelKeys_new(funding_key, revocation_base_key, payment_key, delayed_payment_base_key, htlc_base_key, commitment_seed, channel_value_satoshis, bindings.C2Tuple_u64u64Z_new(key_derivation_params.a, key_derivation_params.b));
		InMemoryChannelKeys ret_hu_conv = new InMemoryChannelKeys(null, ret);
		return ret_hu_conv;
	}

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

	public boolean is_outbound() {
		boolean ret = bindings.InMemoryChannelKeys_is_outbound(this.ptr);
		return ret;
	}

	public OutPoint funding_outpoint() {
		long ret = bindings.InMemoryChannelKeys_funding_outpoint(this.ptr);
		OutPoint ret_hu_conv = new OutPoint(null, ret);
		return ret_hu_conv;
	}

	public ChannelTransactionParameters get_channel_parameters() {
		long ret = bindings.InMemoryChannelKeys_get_channel_parameters(this.ptr);
		ChannelTransactionParameters ret_hu_conv = new ChannelTransactionParameters(null, ret);
		return ret_hu_conv;
	}

	public ChannelKeys as_ChannelKeys() {
		long ret = bindings.InMemoryChannelKeys_as_ChannelKeys(this.ptr);
		ChannelKeys ret_hu_conv = new ChannelKeys(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.InMemoryChannelKeys_write(this.ptr);
		return ret;
	}

	public static Result_InMemoryChannelKeysDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.InMemoryChannelKeys_read(ser);
		Result_InMemoryChannelKeysDecodeErrorZ ret_hu_conv = Result_InMemoryChannelKeysDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
