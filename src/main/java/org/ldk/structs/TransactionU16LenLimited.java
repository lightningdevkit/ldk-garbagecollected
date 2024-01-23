package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A wrapper for a `Transaction` which can only be constructed with [`TransactionU16LenLimited::new`]
 * if the `Transaction`'s consensus-serialized length is <= u16::MAX.
 * 
 * Use [`TransactionU16LenLimited::into_transaction`] to convert into the contained `Transaction`.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class TransactionU16LenLimited extends CommonBase {
	TransactionU16LenLimited(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.TransactionU16LenLimited_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.TransactionU16LenLimited_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the TransactionU16LenLimited
	 */
	public TransactionU16LenLimited clone() {
		long ret = bindings.TransactionU16LenLimited_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TransactionU16LenLimited ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TransactionU16LenLimited(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the TransactionU16LenLimited.
	 */
	public long hash() {
		long ret = bindings.TransactionU16LenLimited_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two TransactionU16LenLimiteds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.TransactionU16LenLimited b) {
		boolean ret = bindings.TransactionU16LenLimited_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof TransactionU16LenLimited)) return false;
		return this.eq((TransactionU16LenLimited)o);
	}
	/**
	 * Constructs a new `TransactionU16LenLimited` from a `Transaction` only if it's consensus-
	 * serialized length is <= u16::MAX.
	 */
	public static Result_TransactionU16LenLimitedNoneZ of(byte[] transaction) {
		long ret = bindings.TransactionU16LenLimited_new(transaction);
		Reference.reachabilityFence(transaction);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TransactionU16LenLimitedNoneZ ret_hu_conv = Result_TransactionU16LenLimitedNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Consumes this `TransactionU16LenLimited` and returns its contained `Transaction`.
	 */
	public byte[] into_transaction() {
		byte[] ret = bindings.TransactionU16LenLimited_into_transaction(this.ptr);
		Reference.reachabilityFence(this);
		if (this != null) { this.ptrs_to.add(this); };
		return ret;
	}

	/**
	 * Serialize the TransactionU16LenLimited object into a byte array which can be read by TransactionU16LenLimited_read
	 */
	public byte[] write() {
		byte[] ret = bindings.TransactionU16LenLimited_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a TransactionU16LenLimited from a byte array, created by TransactionU16LenLimited_write
	 */
	public static Result_TransactionU16LenLimitedDecodeErrorZ read(byte[] ser) {
		long ret = bindings.TransactionU16LenLimited_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TransactionU16LenLimitedDecodeErrorZ ret_hu_conv = Result_TransactionU16LenLimitedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
