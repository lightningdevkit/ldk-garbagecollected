package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * SHA-256 hash
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Sha256 extends CommonBase {
	Sha256(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Sha256_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.Sha256_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Sha256
	 */
	public Sha256 clone() {
		long ret = bindings.Sha256_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Sha256 ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new Sha256(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two Sha256s contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.Sha256_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two Sha256s contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(Sha256 b) {
		boolean ret = bindings.Sha256_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		this.ptrs_to.add(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Sha256)) return false;
		return this.eq((Sha256)o);
	}
}
