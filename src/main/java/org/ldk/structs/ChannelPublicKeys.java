package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelPublicKeys extends CommonBase {
	ChannelPublicKeys(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.ChannelPublicKeys_free(ptr);
	}

	public static ChannelPublicKeys constructor_clone(ChannelPublicKeys orig) {
		long ret = bindings.ChannelPublicKeys_clone(orig == null ? 0 : orig.ptr & ~1);
		ChannelPublicKeys ret_hu_conv = new ChannelPublicKeys(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public byte[] get_funding_pubkey() {
		byte[] ret = bindings.ChannelPublicKeys_get_funding_pubkey(this.ptr);
		return ret;
	}

	public void set_funding_pubkey(byte[] val) {
		bindings.ChannelPublicKeys_set_funding_pubkey(this.ptr, val);
	}

	public byte[] get_revocation_basepoint() {
		byte[] ret = bindings.ChannelPublicKeys_get_revocation_basepoint(this.ptr);
		return ret;
	}

	public void set_revocation_basepoint(byte[] val) {
		bindings.ChannelPublicKeys_set_revocation_basepoint(this.ptr, val);
	}

	public byte[] get_payment_point() {
		byte[] ret = bindings.ChannelPublicKeys_get_payment_point(this.ptr);
		return ret;
	}

	public void set_payment_point(byte[] val) {
		bindings.ChannelPublicKeys_set_payment_point(this.ptr, val);
	}

	public byte[] get_delayed_payment_basepoint() {
		byte[] ret = bindings.ChannelPublicKeys_get_delayed_payment_basepoint(this.ptr);
		return ret;
	}

	public void set_delayed_payment_basepoint(byte[] val) {
		bindings.ChannelPublicKeys_set_delayed_payment_basepoint(this.ptr, val);
	}

	public byte[] get_htlc_basepoint() {
		byte[] ret = bindings.ChannelPublicKeys_get_htlc_basepoint(this.ptr);
		return ret;
	}

	public void set_htlc_basepoint(byte[] val) {
		bindings.ChannelPublicKeys_set_htlc_basepoint(this.ptr, val);
	}

	public static ChannelPublicKeys constructor_new(byte[] funding_pubkey_arg, byte[] revocation_basepoint_arg, byte[] payment_point_arg, byte[] delayed_payment_basepoint_arg, byte[] htlc_basepoint_arg) {
		long ret = bindings.ChannelPublicKeys_new(funding_pubkey_arg, revocation_basepoint_arg, payment_point_arg, delayed_payment_basepoint_arg, htlc_basepoint_arg);
		ChannelPublicKeys ret_hu_conv = new ChannelPublicKeys(null, ret);
		return ret_hu_conv;
	}

	public byte[] write(ChannelPublicKeys obj) {
		byte[] ret = bindings.ChannelPublicKeys_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static ChannelPublicKeys constructor_read(byte[] ser) {
		long ret = bindings.ChannelPublicKeys_read(ser);
		ChannelPublicKeys ret_hu_conv = new ChannelPublicKeys(null, ret);
		return ret_hu_conv;
	}

}
