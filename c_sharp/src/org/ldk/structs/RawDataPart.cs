using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Data of the `RawInvoice` that is encoded in the data part
 */
public class RawDataPart : CommonBase {
	internal RawDataPart(object _dummy, long ptr) : base(ptr) { }
	~RawDataPart() {
		if (ptr != 0) { bindings.RawDataPart_free(ptr); }
	}

	/**
	 * generation time of the invoice
	 */
	public PositiveTimestamp get_timestamp() {
		long ret = bindings.RawDataPart_get_timestamp(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PositiveTimestamp ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PositiveTimestamp(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * generation time of the invoice
	 */
	public void set_timestamp(org.ldk.structs.PositiveTimestamp val) {
		bindings.RawDataPart_set_timestamp(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Checks if two RawDataParts contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.RawDataPart b) {
		bool ret = bindings.RawDataPart_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is RawDataPart)) return false;
		return this.eq((RawDataPart)o);
	}
	internal long clone_ptr() {
		long ret = bindings.RawDataPart_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the RawDataPart
	 */
	public RawDataPart clone() {
		long ret = bindings.RawDataPart_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RawDataPart ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RawDataPart(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two RawDataParts contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.RawDataPart_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
}
} } }
