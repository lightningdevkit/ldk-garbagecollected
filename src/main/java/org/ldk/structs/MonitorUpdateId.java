package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An opaque identifier describing a specific [`Persist`] method call.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class MonitorUpdateId extends CommonBase {
	MonitorUpdateId(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.MonitorUpdateId_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.MonitorUpdateId_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the MonitorUpdateId
	 */
	public MonitorUpdateId clone() {
		long ret = bindings.MonitorUpdateId_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		MonitorUpdateId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new MonitorUpdateId(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two MonitorUpdateIds contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.MonitorUpdateId_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two MonitorUpdateIds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(MonitorUpdateId b) {
		boolean ret = bindings.MonitorUpdateId_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		this.ptrs_to.add(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof MonitorUpdateId)) return false;
		return this.eq((MonitorUpdateId)o);
	}
}
