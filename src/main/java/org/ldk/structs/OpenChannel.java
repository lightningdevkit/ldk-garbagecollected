package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class OpenChannel extends CommonBase {
	OpenChannel(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.OpenChannel_free(ptr); super.finalize();
	}

	public OpenChannel(OpenChannel orig) {
		super(bindings.OpenChannel_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_chain_hash(OpenChannel this_ptr) {
		byte[] ret = bindings.OpenChannel_get_chain_hash(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_chain_hash(OpenChannel this_ptr, byte[] val) {
		bindings.OpenChannel_set_chain_hash(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_temporary_channel_id(OpenChannel this_ptr) {
		byte[] ret = bindings.OpenChannel_get_temporary_channel_id(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_temporary_channel_id(OpenChannel this_ptr, byte[] val) {
		bindings.OpenChannel_set_temporary_channel_id(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_funding_satoshis(OpenChannel this_ptr) {
		long ret = bindings.OpenChannel_get_funding_satoshis(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_funding_satoshis(OpenChannel this_ptr, long val) {
		bindings.OpenChannel_set_funding_satoshis(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_push_msat(OpenChannel this_ptr) {
		long ret = bindings.OpenChannel_get_push_msat(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_push_msat(OpenChannel this_ptr, long val) {
		bindings.OpenChannel_set_push_msat(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_dust_limit_satoshis(OpenChannel this_ptr) {
		long ret = bindings.OpenChannel_get_dust_limit_satoshis(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_dust_limit_satoshis(OpenChannel this_ptr, long val) {
		bindings.OpenChannel_set_dust_limit_satoshis(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_max_htlc_value_in_flight_msat(OpenChannel this_ptr) {
		long ret = bindings.OpenChannel_get_max_htlc_value_in_flight_msat(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_max_htlc_value_in_flight_msat(OpenChannel this_ptr, long val) {
		bindings.OpenChannel_set_max_htlc_value_in_flight_msat(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_channel_reserve_satoshis(OpenChannel this_ptr) {
		long ret = bindings.OpenChannel_get_channel_reserve_satoshis(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_reserve_satoshis(OpenChannel this_ptr, long val) {
		bindings.OpenChannel_set_channel_reserve_satoshis(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_htlc_minimum_msat(OpenChannel this_ptr) {
		long ret = bindings.OpenChannel_get_htlc_minimum_msat(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_htlc_minimum_msat(OpenChannel this_ptr, long val) {
		bindings.OpenChannel_set_htlc_minimum_msat(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public int get_feerate_per_kw(OpenChannel this_ptr) {
		int ret = bindings.OpenChannel_get_feerate_per_kw(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_feerate_per_kw(OpenChannel this_ptr, int val) {
		bindings.OpenChannel_set_feerate_per_kw(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public short get_to_self_delay(OpenChannel this_ptr) {
		short ret = bindings.OpenChannel_get_to_self_delay(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_to_self_delay(OpenChannel this_ptr, short val) {
		bindings.OpenChannel_set_to_self_delay(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public short get_max_accepted_htlcs(OpenChannel this_ptr) {
		short ret = bindings.OpenChannel_get_max_accepted_htlcs(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_max_accepted_htlcs(OpenChannel this_ptr, short val) {
		bindings.OpenChannel_set_max_accepted_htlcs(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_funding_pubkey(OpenChannel this_ptr) {
		byte[] ret = bindings.OpenChannel_get_funding_pubkey(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_funding_pubkey(OpenChannel this_ptr, byte[] val) {
		bindings.OpenChannel_set_funding_pubkey(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_revocation_basepoint(OpenChannel this_ptr) {
		byte[] ret = bindings.OpenChannel_get_revocation_basepoint(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_revocation_basepoint(OpenChannel this_ptr, byte[] val) {
		bindings.OpenChannel_set_revocation_basepoint(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_payment_point(OpenChannel this_ptr) {
		byte[] ret = bindings.OpenChannel_get_payment_point(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_payment_point(OpenChannel this_ptr, byte[] val) {
		bindings.OpenChannel_set_payment_point(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_delayed_payment_basepoint(OpenChannel this_ptr) {
		byte[] ret = bindings.OpenChannel_get_delayed_payment_basepoint(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_delayed_payment_basepoint(OpenChannel this_ptr, byte[] val) {
		bindings.OpenChannel_set_delayed_payment_basepoint(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_htlc_basepoint(OpenChannel this_ptr) {
		byte[] ret = bindings.OpenChannel_get_htlc_basepoint(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_htlc_basepoint(OpenChannel this_ptr, byte[] val) {
		bindings.OpenChannel_set_htlc_basepoint(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_first_per_commitment_point(OpenChannel this_ptr) {
		byte[] ret = bindings.OpenChannel_get_first_per_commitment_point(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_first_per_commitment_point(OpenChannel this_ptr, byte[] val) {
		bindings.OpenChannel_set_first_per_commitment_point(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte get_channel_flags(OpenChannel this_ptr) {
		byte ret = bindings.OpenChannel_get_channel_flags(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_flags(OpenChannel this_ptr, byte val) {
		bindings.OpenChannel_set_channel_flags(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	// Skipped OpenChannel_write
	// Skipped OpenChannel_read
}
