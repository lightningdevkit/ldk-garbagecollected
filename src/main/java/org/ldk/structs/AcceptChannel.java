package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class AcceptChannel extends CommonBase {
	AcceptChannel(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.AcceptChannel_free(ptr);
	}

	public AcceptChannel(AcceptChannel orig) {
		super(bindings.AcceptChannel_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_temporary_channel_id(AcceptChannel this_ptr) {
		byte[] ret = bindings.AcceptChannel_get_temporary_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_temporary_channel_id(AcceptChannel this_ptr, byte[] val) {
		bindings.AcceptChannel_set_temporary_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_dust_limit_satoshis(AcceptChannel this_ptr) {
		long ret = bindings.AcceptChannel_get_dust_limit_satoshis(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_dust_limit_satoshis(AcceptChannel this_ptr, long val) {
		bindings.AcceptChannel_set_dust_limit_satoshis(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_max_htlc_value_in_flight_msat(AcceptChannel this_ptr) {
		long ret = bindings.AcceptChannel_get_max_htlc_value_in_flight_msat(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_max_htlc_value_in_flight_msat(AcceptChannel this_ptr, long val) {
		bindings.AcceptChannel_set_max_htlc_value_in_flight_msat(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_channel_reserve_satoshis(AcceptChannel this_ptr) {
		long ret = bindings.AcceptChannel_get_channel_reserve_satoshis(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_reserve_satoshis(AcceptChannel this_ptr, long val) {
		bindings.AcceptChannel_set_channel_reserve_satoshis(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_htlc_minimum_msat(AcceptChannel this_ptr) {
		long ret = bindings.AcceptChannel_get_htlc_minimum_msat(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_htlc_minimum_msat(AcceptChannel this_ptr, long val) {
		bindings.AcceptChannel_set_htlc_minimum_msat(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public int get_minimum_depth(AcceptChannel this_ptr) {
		int ret = bindings.AcceptChannel_get_minimum_depth(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_minimum_depth(AcceptChannel this_ptr, int val) {
		bindings.AcceptChannel_set_minimum_depth(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public short get_to_self_delay(AcceptChannel this_ptr) {
		short ret = bindings.AcceptChannel_get_to_self_delay(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_to_self_delay(AcceptChannel this_ptr, short val) {
		bindings.AcceptChannel_set_to_self_delay(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public short get_max_accepted_htlcs(AcceptChannel this_ptr) {
		short ret = bindings.AcceptChannel_get_max_accepted_htlcs(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_max_accepted_htlcs(AcceptChannel this_ptr, short val) {
		bindings.AcceptChannel_set_max_accepted_htlcs(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_funding_pubkey(AcceptChannel this_ptr) {
		byte[] ret = bindings.AcceptChannel_get_funding_pubkey(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_funding_pubkey(AcceptChannel this_ptr, byte[] val) {
		bindings.AcceptChannel_set_funding_pubkey(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_revocation_basepoint(AcceptChannel this_ptr) {
		byte[] ret = bindings.AcceptChannel_get_revocation_basepoint(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_revocation_basepoint(AcceptChannel this_ptr, byte[] val) {
		bindings.AcceptChannel_set_revocation_basepoint(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_payment_point(AcceptChannel this_ptr) {
		byte[] ret = bindings.AcceptChannel_get_payment_point(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_payment_point(AcceptChannel this_ptr, byte[] val) {
		bindings.AcceptChannel_set_payment_point(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_delayed_payment_basepoint(AcceptChannel this_ptr) {
		byte[] ret = bindings.AcceptChannel_get_delayed_payment_basepoint(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_delayed_payment_basepoint(AcceptChannel this_ptr, byte[] val) {
		bindings.AcceptChannel_set_delayed_payment_basepoint(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_htlc_basepoint(AcceptChannel this_ptr) {
		byte[] ret = bindings.AcceptChannel_get_htlc_basepoint(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_htlc_basepoint(AcceptChannel this_ptr, byte[] val) {
		bindings.AcceptChannel_set_htlc_basepoint(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_first_per_commitment_point(AcceptChannel this_ptr) {
		byte[] ret = bindings.AcceptChannel_get_first_per_commitment_point(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_first_per_commitment_point(AcceptChannel this_ptr, byte[] val) {
		bindings.AcceptChannel_set_first_per_commitment_point(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] write(AcceptChannel obj) {
		byte[] ret = bindings.AcceptChannel_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public AcceptChannel(byte[] ser) {
		super(bindings.AcceptChannel_read(ser));
	}

}
