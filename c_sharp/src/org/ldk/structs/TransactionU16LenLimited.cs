using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A wrapper for a `Transaction` which can only be constructed with [`TransactionU16LenLimited::new`]
 * if the `Transaction`'s consensus-serialized length is <= u16::MAX.
 * 
 * Use [`TransactionU16LenLimited::into_transaction`] to convert into the contained `Transaction`.
 */
public class TransactionU16LenLimited : CommonBase {
	internal TransactionU16LenLimited(object _dummy, long ptr) : base(ptr) { }
	~TransactionU16LenLimited() {
		if (ptr != 0) { bindings.TransactionU16LenLimited_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.TransactionU16LenLimited_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the TransactionU16LenLimited
	 */
	public TransactionU16LenLimited clone() {
		long ret = bindings.TransactionU16LenLimited_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TransactionU16LenLimited ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TransactionU16LenLimited(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two TransactionU16LenLimiteds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.TransactionU16LenLimited b) {
		bool ret = bindings.TransactionU16LenLimited_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is TransactionU16LenLimited)) return false;
		return this.eq((TransactionU16LenLimited)o);
	}
	/**
	 * Constructs a new `TransactionU16LenLimited` from a `Transaction` only if it's consensus-
	 * serialized length is <= u16::MAX.
	 */
	public static Result_TransactionU16LenLimitedNoneZ of(byte[] transaction) {
		long ret = bindings.TransactionU16LenLimited_new(InternalUtils.encodeUint8Array(transaction));
		GC.KeepAlive(transaction);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TransactionU16LenLimitedNoneZ ret_hu_conv = Result_TransactionU16LenLimitedNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Consumes this `TransactionU16LenLimited` and returns its contained `Transaction`.
	 */
	public byte[] into_transaction() {
		long ret = bindings.TransactionU16LenLimited_into_transaction(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		if (this != null) { this.ptrs_to.AddLast(this); };
		return ret_conv;
	}

	/**
	 * Serialize the TransactionU16LenLimited object into a byte array which can be read by TransactionU16LenLimited_read
	 */
	public byte[] write() {
		long ret = bindings.TransactionU16LenLimited_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a TransactionU16LenLimited from a byte array, created by TransactionU16LenLimited_write
	 */
	public static Result_TransactionU16LenLimitedDecodeErrorZ read(byte[] ser) {
		long ret = bindings.TransactionU16LenLimited_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TransactionU16LenLimitedDecodeErrorZ ret_hu_conv = Result_TransactionU16LenLimitedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
