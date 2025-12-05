using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Recoverable signature
 */
public class Bolt11InvoiceSignature : CommonBase {
	internal Bolt11InvoiceSignature(object _dummy, long ptr) : base(ptr) { }
	~Bolt11InvoiceSignature() {
		if (ptr != 0) { bindings.Bolt11InvoiceSignature_free(ptr); }
	}

	public byte[] get_a() {
		long ret = bindings.Bolt11InvoiceSignature_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	public void set_a(byte[] val) {
		bindings.Bolt11InvoiceSignature_set_a(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 68)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new Bolt11InvoiceSignature given each field
	 */
	public static org.ldk.structs.Bolt11InvoiceSignature of(byte[] a_arg) {
		long ret = bindings.Bolt11InvoiceSignature_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(a_arg, 68)));
		GC.KeepAlive(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11InvoiceSignature ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt11InvoiceSignature(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.Bolt11InvoiceSignature_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt11InvoiceSignature
	 */
	public org.ldk.structs.Bolt11InvoiceSignature clone() {
		long ret = bindings.Bolt11InvoiceSignature_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11InvoiceSignature ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt11InvoiceSignature(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Bolt11InvoiceSignature.
	 */
	public long hash() {
		long ret = bindings.Bolt11InvoiceSignature_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two Bolt11InvoiceSignatures contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.Bolt11InvoiceSignature b) {
		bool ret = bindings.Bolt11InvoiceSignature_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is Bolt11InvoiceSignature)) return false;
		return this.eq((Bolt11InvoiceSignature)o);
	}
}
} } }
