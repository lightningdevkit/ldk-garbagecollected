using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * `min_final_cltv_expiry` to use for the last HTLC in the route
 */
public class MinFinalCltvExpiry : CommonBase {
	internal MinFinalCltvExpiry(object _dummy, long ptr) : base(ptr) { }
	~MinFinalCltvExpiry() {
		if (ptr != 0) { bindings.MinFinalCltvExpiry_free(ptr); }
	}

	public long get_a() {
		long ret = bindings.MinFinalCltvExpiry_get_a(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public void set_a(long val) {
		bindings.MinFinalCltvExpiry_set_a(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new MinFinalCltvExpiry given each field
	 */
	public static MinFinalCltvExpiry of(long a_arg) {
		long ret = bindings.MinFinalCltvExpiry_new(a_arg);
		GC.KeepAlive(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MinFinalCltvExpiry ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.MinFinalCltvExpiry(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.MinFinalCltvExpiry_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the MinFinalCltvExpiry
	 */
	public MinFinalCltvExpiry clone() {
		long ret = bindings.MinFinalCltvExpiry_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MinFinalCltvExpiry ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.MinFinalCltvExpiry(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two MinFinalCltvExpirys contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.MinFinalCltvExpiry_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two MinFinalCltvExpirys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.MinFinalCltvExpiry b) {
		bool ret = bindings.MinFinalCltvExpiry_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is MinFinalCltvExpiry)) return false;
		return this.eq((MinFinalCltvExpiry)o);
	}
}
} } }
