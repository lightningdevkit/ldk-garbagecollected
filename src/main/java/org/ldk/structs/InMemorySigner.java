package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class InMemorySigner extends CommonBase {
	InMemorySigner(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.InMemorySigner_free(ptr); }
	}

	public byte[] get_funding_key() {
		byte[] ret = bindings.InMemorySigner_get_funding_key(this.ptr);
		return ret;
	}

	public void set_funding_key(byte[] val) {
		bindings.InMemorySigner_set_funding_key(this.ptr, val);
	}

	public byte[] get_revocation_base_key() {
		byte[] ret = bindings.InMemorySigner_get_revocation_base_key(this.ptr);
		return ret;
	}

	public void set_revocation_base_key(byte[] val) {
		bindings.InMemorySigner_set_revocation_base_key(this.ptr, val);
	}

	public byte[] get_payment_key() {
		byte[] ret = bindings.InMemorySigner_get_payment_key(this.ptr);
		return ret;
	}

	public void set_payment_key(byte[] val) {
		bindings.InMemorySigner_set_payment_key(this.ptr, val);
	}

	public byte[] get_delayed_payment_base_key() {
		byte[] ret = bindings.InMemorySigner_get_delayed_payment_base_key(this.ptr);
		return ret;
	}

	public void set_delayed_payment_base_key(byte[] val) {
		bindings.InMemorySigner_set_delayed_payment_base_key(this.ptr, val);
	}

	public byte[] get_htlc_base_key() {
		byte[] ret = bindings.InMemorySigner_get_htlc_base_key(this.ptr);
		return ret;
	}

	public void set_htlc_base_key(byte[] val) {
		bindings.InMemorySigner_set_htlc_base_key(this.ptr, val);
	}

	public byte[] get_commitment_seed() {
		byte[] ret = bindings.InMemorySigner_get_commitment_seed(this.ptr);
		return ret;
	}

	public void set_commitment_seed(byte[] val) {
		bindings.InMemorySigner_set_commitment_seed(this.ptr, val);
	}

	public InMemorySigner clone() {
		long ret = bindings.InMemorySigner_clone(this.ptr);
		InMemorySigner ret_hu_conv = new InMemorySigner(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static InMemorySigner constructor_new(byte[] funding_key, byte[] revocation_base_key, byte[] payment_key, byte[] delayed_payment_base_key, byte[] htlc_base_key, byte[] commitment_seed, long channel_value_satoshis, byte[] channel_keys_id) {
		long ret = bindings.InMemorySigner_new(funding_key, revocation_base_key, payment_key, delayed_payment_base_key, htlc_base_key, commitment_seed, channel_value_satoshis, channel_keys_id);
		InMemorySigner ret_hu_conv = new InMemorySigner(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public ChannelPublicKeys counterparty_pubkeys() {
		long ret = bindings.InMemorySigner_counterparty_pubkeys(this.ptr);
		ChannelPublicKeys ret_hu_conv = new ChannelPublicKeys(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public short counterparty_selected_contest_delay() {
		short ret = bindings.InMemorySigner_counterparty_selected_contest_delay(this.ptr);
		return ret;
	}

	public short holder_selected_contest_delay() {
		short ret = bindings.InMemorySigner_holder_selected_contest_delay(this.ptr);
		return ret;
	}

	public boolean is_outbound() {
		boolean ret = bindings.InMemorySigner_is_outbound(this.ptr);
		return ret;
	}

	public OutPoint funding_outpoint() {
		long ret = bindings.InMemorySigner_funding_outpoint(this.ptr);
		OutPoint ret_hu_conv = new OutPoint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public ChannelTransactionParameters get_channel_parameters() {
		long ret = bindings.InMemorySigner_get_channel_parameters(this.ptr);
		ChannelTransactionParameters ret_hu_conv = new ChannelTransactionParameters(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Result_CVec_CVec_u8ZZNoneZ sign_counterparty_payment_input(byte[] spend_tx, long input_idx, StaticPaymentOutputDescriptor descriptor) {
		long ret = bindings.InMemorySigner_sign_counterparty_payment_input(this.ptr, spend_tx, input_idx, descriptor == null ? 0 : descriptor.ptr & ~1);
		Result_CVec_CVec_u8ZZNoneZ ret_hu_conv = Result_CVec_CVec_u8ZZNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(descriptor);
		return ret_hu_conv;
	}

	public Result_CVec_CVec_u8ZZNoneZ sign_dynamic_p2wsh_input(byte[] spend_tx, long input_idx, DelayedPaymentOutputDescriptor descriptor) {
		long ret = bindings.InMemorySigner_sign_dynamic_p2wsh_input(this.ptr, spend_tx, input_idx, descriptor == null ? 0 : descriptor.ptr & ~1);
		Result_CVec_CVec_u8ZZNoneZ ret_hu_conv = Result_CVec_CVec_u8ZZNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(descriptor);
		return ret_hu_conv;
	}

	public Sign as_Sign() {
		long ret = bindings.InMemorySigner_as_Sign(this.ptr);
		Sign ret_hu_conv = new Sign(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.InMemorySigner_write(this.ptr);
		return ret;
	}

	public static Result_InMemorySignerDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.InMemorySigner_read(ser);
		Result_InMemorySignerDecodeErrorZ ret_hu_conv = Result_InMemorySignerDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
