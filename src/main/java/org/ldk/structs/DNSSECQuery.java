package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A message which is sent to a DNSSEC prover requesting a DNSSEC proof for the given name.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class DNSSECQuery extends CommonBase {
	DNSSECQuery(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.DNSSECQuery_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.DNSSECQuery_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the DNSSECQuery
	 */
	public DNSSECQuery clone() {
		long ret = bindings.DNSSECQuery_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DNSSECQuery ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DNSSECQuery(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the DNSSECQuery.
	 */
	public long hash() {
		long ret = bindings.DNSSECQuery_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two DNSSECQuerys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.DNSSECQuery b) {
		boolean ret = bindings.DNSSECQuery_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof DNSSECQuery)) return false;
		return this.eq((DNSSECQuery)o);
	}
}
