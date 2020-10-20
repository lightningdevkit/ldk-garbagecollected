package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class HTLCOutputInCommitment extends CommonBase {
	HTLCOutputInCommitment(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.HTLCOutputInCommitment_free(ptr);
	}

	public static HTLCOutputInCommitment constructor_clone(HTLCOutputInCommitment orig) {
		long ret = bindings.HTLCOutputInCommitment_clone(orig == null ? 0 : orig.ptr & ~1);
		HTLCOutputInCommitment ret_hu_conv = new HTLCOutputInCommitment(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public boolean get_offered() {
		boolean ret = bindings.HTLCOutputInCommitment_get_offered(this.ptr);
		return ret;
	}

	public void set_offered(boolean val) {
		bindings.HTLCOutputInCommitment_set_offered(this.ptr, val);
	}

	public long get_amount_msat() {
		long ret = bindings.HTLCOutputInCommitment_get_amount_msat(this.ptr);
		return ret;
	}

	public void set_amount_msat(long val) {
		bindings.HTLCOutputInCommitment_set_amount_msat(this.ptr, val);
	}

	public int get_cltv_expiry() {
		int ret = bindings.HTLCOutputInCommitment_get_cltv_expiry(this.ptr);
		return ret;
	}

	public void set_cltv_expiry(int val) {
		bindings.HTLCOutputInCommitment_set_cltv_expiry(this.ptr, val);
	}

	public byte[] get_payment_hash() {
		byte[] ret = bindings.HTLCOutputInCommitment_get_payment_hash(this.ptr);
		return ret;
	}

	public void set_payment_hash(byte[] val) {
		bindings.HTLCOutputInCommitment_set_payment_hash(this.ptr, val);
	}

	public byte[] write(HTLCOutputInCommitment obj) {
		byte[] ret = bindings.HTLCOutputInCommitment_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static HTLCOutputInCommitment constructor_read(byte[] ser) {
		long ret = bindings.HTLCOutputInCommitment_read(ser);
		HTLCOutputInCommitment ret_hu_conv = new HTLCOutputInCommitment(null, ret);
		return ret_hu_conv;
	}

}
