package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * `min_final_cltv_expiry` to use for the last HTLC in the route
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class MinFinalCltvExpiry extends CommonBase {
	MinFinalCltvExpiry(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.MinFinalCltvExpiry_free(ptr); }
	}

	public long get_a() {
		long ret = bindings.MinFinalCltvExpiry_get_a(this.ptr);
		return ret;
	}

	public void set_a(long val) {
		bindings.MinFinalCltvExpiry_set_a(this.ptr, val);
	}

	/**
	 * Constructs a new MinFinalCltvExpiry given each field
	 */
	public static MinFinalCltvExpiry of(long a_arg) {
		long ret = bindings.MinFinalCltvExpiry_new(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		MinFinalCltvExpiry ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new MinFinalCltvExpiry(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.MinFinalCltvExpiry_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the MinFinalCltvExpiry
	 */
	public MinFinalCltvExpiry clone() {
		long ret = bindings.MinFinalCltvExpiry_clone(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		MinFinalCltvExpiry ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new MinFinalCltvExpiry(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two MinFinalCltvExpirys contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.MinFinalCltvExpiry_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two MinFinalCltvExpirys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(MinFinalCltvExpiry b) {
		boolean ret = bindings.MinFinalCltvExpiry_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

}
