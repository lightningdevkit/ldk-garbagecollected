package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * Description string
 * 
 * # Invariants
 * The description can be at most 639 __bytes__ long
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Description extends CommonBase {
	Description(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Description_free(ptr); }
	}

	/**
	 * Creates a copy of the Description
	 */
	public Description clone() {
		long ret = bindings.Description_clone(this.ptr);
		if (ret < 1024) { return null; }
		Description ret_hu_conv = new Description(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two Descriptions contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.Description_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two Descriptions contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(Description b) {
		boolean ret = bindings.Description_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	/**
	 * Creates a new `Description` if `description` is at most 1023 __bytes__ long,
	 * returns `CreationError::DescriptionTooLong` otherwise
	 * 
	 * Please note that single characters may use more than one byte due to UTF8 encoding.
	 */
	public static Result_DescriptionCreationErrorZ of(java.lang.String description) {
		long ret = bindings.Description_new(description);
		if (ret < 1024) { return null; }
		Result_DescriptionCreationErrorZ ret_hu_conv = Result_DescriptionCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns the underlying description `String`
	 */
	public String into_inner() {
		String ret = bindings.Description_into_inner(this.ptr);
		this.ptrs_to.add(this);
		return ret;
	}

}
