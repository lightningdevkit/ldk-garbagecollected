package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class AcceptChannel extends CommonBase {
	AcceptChannel(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.AcceptChannel_free(ptr); }
	}

	public AcceptChannel clone() {
		long ret = bindings.AcceptChannel_clone(this.ptr);
		AcceptChannel ret_hu_conv = new AcceptChannel(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public byte[] get_temporary_channel_id() {
		byte[] ret = bindings.AcceptChannel_get_temporary_channel_id(this.ptr);
		return ret;
	}

	public void set_temporary_channel_id(byte[] val) {
		bindings.AcceptChannel_set_temporary_channel_id(this.ptr, val);
	}

	public long get_dust_limit_satoshis() {
		long ret = bindings.AcceptChannel_get_dust_limit_satoshis(this.ptr);
		return ret;
	}

	public void set_dust_limit_satoshis(long val) {
		bindings.AcceptChannel_set_dust_limit_satoshis(this.ptr, val);
	}

	public long get_max_htlc_value_in_flight_msat() {
		long ret = bindings.AcceptChannel_get_max_htlc_value_in_flight_msat(this.ptr);
		return ret;
	}

	public void set_max_htlc_value_in_flight_msat(long val) {
		bindings.AcceptChannel_set_max_htlc_value_in_flight_msat(this.ptr, val);
	}

	public long get_channel_reserve_satoshis() {
		long ret = bindings.AcceptChannel_get_channel_reserve_satoshis(this.ptr);
		return ret;
	}

	public void set_channel_reserve_satoshis(long val) {
		bindings.AcceptChannel_set_channel_reserve_satoshis(this.ptr, val);
	}

	public long get_htlc_minimum_msat() {
		long ret = bindings.AcceptChannel_get_htlc_minimum_msat(this.ptr);
		return ret;
	}

	public void set_htlc_minimum_msat(long val) {
		bindings.AcceptChannel_set_htlc_minimum_msat(this.ptr, val);
	}

	public int get_minimum_depth() {
		int ret = bindings.AcceptChannel_get_minimum_depth(this.ptr);
		return ret;
	}

	public void set_minimum_depth(int val) {
		bindings.AcceptChannel_set_minimum_depth(this.ptr, val);
	}

	public short get_to_self_delay() {
		short ret = bindings.AcceptChannel_get_to_self_delay(this.ptr);
		return ret;
	}

	public void set_to_self_delay(short val) {
		bindings.AcceptChannel_set_to_self_delay(this.ptr, val);
	}

	public short get_max_accepted_htlcs() {
		short ret = bindings.AcceptChannel_get_max_accepted_htlcs(this.ptr);
		return ret;
	}

	public void set_max_accepted_htlcs(short val) {
		bindings.AcceptChannel_set_max_accepted_htlcs(this.ptr, val);
	}

	public byte[] get_funding_pubkey() {
		byte[] ret = bindings.AcceptChannel_get_funding_pubkey(this.ptr);
		return ret;
	}

	public void set_funding_pubkey(byte[] val) {
		bindings.AcceptChannel_set_funding_pubkey(this.ptr, val);
	}

	public byte[] get_revocation_basepoint() {
		byte[] ret = bindings.AcceptChannel_get_revocation_basepoint(this.ptr);
		return ret;
	}

	public void set_revocation_basepoint(byte[] val) {
		bindings.AcceptChannel_set_revocation_basepoint(this.ptr, val);
	}

	public byte[] get_payment_point() {
		byte[] ret = bindings.AcceptChannel_get_payment_point(this.ptr);
		return ret;
	}

	public void set_payment_point(byte[] val) {
		bindings.AcceptChannel_set_payment_point(this.ptr, val);
	}

	public byte[] get_delayed_payment_basepoint() {
		byte[] ret = bindings.AcceptChannel_get_delayed_payment_basepoint(this.ptr);
		return ret;
	}

	public void set_delayed_payment_basepoint(byte[] val) {
		bindings.AcceptChannel_set_delayed_payment_basepoint(this.ptr, val);
	}

	public byte[] get_htlc_basepoint() {
		byte[] ret = bindings.AcceptChannel_get_htlc_basepoint(this.ptr);
		return ret;
	}

	public void set_htlc_basepoint(byte[] val) {
		bindings.AcceptChannel_set_htlc_basepoint(this.ptr, val);
	}

	public byte[] get_first_per_commitment_point() {
		byte[] ret = bindings.AcceptChannel_get_first_per_commitment_point(this.ptr);
		return ret;
	}

	public void set_first_per_commitment_point(byte[] val) {
		bindings.AcceptChannel_set_first_per_commitment_point(this.ptr, val);
	}

	public byte[] write() {
		byte[] ret = bindings.AcceptChannel_write(this.ptr);
		return ret;
	}

	public static AcceptChannel constructor_read(byte[] ser) {
		long ret = bindings.AcceptChannel_read(ser);
		AcceptChannel ret_hu_conv = new AcceptChannel(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
