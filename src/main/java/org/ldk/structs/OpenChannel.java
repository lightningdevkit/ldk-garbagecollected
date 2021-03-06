package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OpenChannel extends CommonBase {
	OpenChannel(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.OpenChannel_free(ptr); }
	}

	public byte[] get_chain_hash() {
		byte[] ret = bindings.OpenChannel_get_chain_hash(this.ptr);
		return ret;
	}

	public void set_chain_hash(byte[] val) {
		bindings.OpenChannel_set_chain_hash(this.ptr, val);
	}

	public byte[] get_temporary_channel_id() {
		byte[] ret = bindings.OpenChannel_get_temporary_channel_id(this.ptr);
		return ret;
	}

	public void set_temporary_channel_id(byte[] val) {
		bindings.OpenChannel_set_temporary_channel_id(this.ptr, val);
	}

	public long get_funding_satoshis() {
		long ret = bindings.OpenChannel_get_funding_satoshis(this.ptr);
		return ret;
	}

	public void set_funding_satoshis(long val) {
		bindings.OpenChannel_set_funding_satoshis(this.ptr, val);
	}

	public long get_push_msat() {
		long ret = bindings.OpenChannel_get_push_msat(this.ptr);
		return ret;
	}

	public void set_push_msat(long val) {
		bindings.OpenChannel_set_push_msat(this.ptr, val);
	}

	public long get_dust_limit_satoshis() {
		long ret = bindings.OpenChannel_get_dust_limit_satoshis(this.ptr);
		return ret;
	}

	public void set_dust_limit_satoshis(long val) {
		bindings.OpenChannel_set_dust_limit_satoshis(this.ptr, val);
	}

	public long get_max_htlc_value_in_flight_msat() {
		long ret = bindings.OpenChannel_get_max_htlc_value_in_flight_msat(this.ptr);
		return ret;
	}

	public void set_max_htlc_value_in_flight_msat(long val) {
		bindings.OpenChannel_set_max_htlc_value_in_flight_msat(this.ptr, val);
	}

	public long get_channel_reserve_satoshis() {
		long ret = bindings.OpenChannel_get_channel_reserve_satoshis(this.ptr);
		return ret;
	}

	public void set_channel_reserve_satoshis(long val) {
		bindings.OpenChannel_set_channel_reserve_satoshis(this.ptr, val);
	}

	public long get_htlc_minimum_msat() {
		long ret = bindings.OpenChannel_get_htlc_minimum_msat(this.ptr);
		return ret;
	}

	public void set_htlc_minimum_msat(long val) {
		bindings.OpenChannel_set_htlc_minimum_msat(this.ptr, val);
	}

	public int get_feerate_per_kw() {
		int ret = bindings.OpenChannel_get_feerate_per_kw(this.ptr);
		return ret;
	}

	public void set_feerate_per_kw(int val) {
		bindings.OpenChannel_set_feerate_per_kw(this.ptr, val);
	}

	public short get_to_self_delay() {
		short ret = bindings.OpenChannel_get_to_self_delay(this.ptr);
		return ret;
	}

	public void set_to_self_delay(short val) {
		bindings.OpenChannel_set_to_self_delay(this.ptr, val);
	}

	public short get_max_accepted_htlcs() {
		short ret = bindings.OpenChannel_get_max_accepted_htlcs(this.ptr);
		return ret;
	}

	public void set_max_accepted_htlcs(short val) {
		bindings.OpenChannel_set_max_accepted_htlcs(this.ptr, val);
	}

	public byte[] get_funding_pubkey() {
		byte[] ret = bindings.OpenChannel_get_funding_pubkey(this.ptr);
		return ret;
	}

	public void set_funding_pubkey(byte[] val) {
		bindings.OpenChannel_set_funding_pubkey(this.ptr, val);
	}

	public byte[] get_revocation_basepoint() {
		byte[] ret = bindings.OpenChannel_get_revocation_basepoint(this.ptr);
		return ret;
	}

	public void set_revocation_basepoint(byte[] val) {
		bindings.OpenChannel_set_revocation_basepoint(this.ptr, val);
	}

	public byte[] get_payment_point() {
		byte[] ret = bindings.OpenChannel_get_payment_point(this.ptr);
		return ret;
	}

	public void set_payment_point(byte[] val) {
		bindings.OpenChannel_set_payment_point(this.ptr, val);
	}

	public byte[] get_delayed_payment_basepoint() {
		byte[] ret = bindings.OpenChannel_get_delayed_payment_basepoint(this.ptr);
		return ret;
	}

	public void set_delayed_payment_basepoint(byte[] val) {
		bindings.OpenChannel_set_delayed_payment_basepoint(this.ptr, val);
	}

	public byte[] get_htlc_basepoint() {
		byte[] ret = bindings.OpenChannel_get_htlc_basepoint(this.ptr);
		return ret;
	}

	public void set_htlc_basepoint(byte[] val) {
		bindings.OpenChannel_set_htlc_basepoint(this.ptr, val);
	}

	public byte[] get_first_per_commitment_point() {
		byte[] ret = bindings.OpenChannel_get_first_per_commitment_point(this.ptr);
		return ret;
	}

	public void set_first_per_commitment_point(byte[] val) {
		bindings.OpenChannel_set_first_per_commitment_point(this.ptr, val);
	}

	public byte get_channel_flags() {
		byte ret = bindings.OpenChannel_get_channel_flags(this.ptr);
		return ret;
	}

	public void set_channel_flags(byte val) {
		bindings.OpenChannel_set_channel_flags(this.ptr, val);
	}

	public OpenChannel clone() {
		long ret = bindings.OpenChannel_clone(this.ptr);
		OpenChannel ret_hu_conv = new OpenChannel(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.OpenChannel_write(this.ptr);
		return ret;
	}

	public static Result_OpenChannelDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.OpenChannel_read(ser);
		Result_OpenChannelDecodeErrorZ ret_hu_conv = Result_OpenChannelDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
