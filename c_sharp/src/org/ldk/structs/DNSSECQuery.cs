using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A message which is sent to a DNSSEC prover requesting a DNSSEC proof for the given name.
 */
public class DNSSECQuery : CommonBase {
	internal DNSSECQuery(object _dummy, long ptr) : base(ptr) { }
	~DNSSECQuery() {
		if (ptr != 0) { bindings.DNSSECQuery_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.DNSSECQuery_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the DNSSECQuery
	 */
	public org.ldk.structs.DNSSECQuery clone() {
		long ret = bindings.DNSSECQuery_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DNSSECQuery ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DNSSECQuery(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the DNSSECQuery.
	 */
	public long hash() {
		long ret = bindings.DNSSECQuery_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two DNSSECQuerys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.DNSSECQuery b) {
		bool ret = bindings.DNSSECQuery_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is DNSSECQuery)) return false;
		return this.eq((DNSSECQuery)o);
	}
}
} } }
