using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * An opaque identifier describing a specific [`Persist`] method call.
 */
public class MonitorUpdateId : CommonBase {
	internal MonitorUpdateId(object _dummy, long ptr) : base(ptr) { }
	~MonitorUpdateId() {
		if (ptr != 0) { bindings.MonitorUpdateId_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.MonitorUpdateId_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the MonitorUpdateId
	 */
	public MonitorUpdateId clone() {
		long ret = bindings.MonitorUpdateId_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MonitorUpdateId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.MonitorUpdateId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the MonitorUpdateId.
	 */
	public long hash() {
		long ret = bindings.MonitorUpdateId_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two MonitorUpdateIds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.MonitorUpdateId b) {
		bool ret = bindings.MonitorUpdateId_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is MonitorUpdateId)) return false;
		return this.eq((MonitorUpdateId)o);
	}
}
} } }
