package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * An Err type for failure to process messages.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class LightningError extends CommonBase {
	LightningError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.LightningError_free(ptr); }
	}

	/**
	 * A human-readable message describing the error
	 */
	public String get_err() {
		String ret = bindings.LightningError_get_err(this.ptr);
		return ret;
	}

	/**
	 * A human-readable message describing the error
	 */
	public void set_err(byte[] val) {
		bindings.LightningError_set_err(this.ptr, val);
	}

	/**
	 * The action which should be taken against the offending peer.
	 */
	public ErrorAction get_action() {
		long ret = bindings.LightningError_get_action(this.ptr);
		ErrorAction ret_hu_conv = ErrorAction.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The action which should be taken against the offending peer.
	 */
	public void set_action(ErrorAction val) {
		bindings.LightningError_set_action(this.ptr, val.ptr);
	}

	/**
	 * Constructs a new LightningError given each field
	 */
	public static LightningError constructor_new(byte[] err_arg, ErrorAction action_arg) {
		long ret = bindings.LightningError_new(err_arg, action_arg.ptr);
		LightningError ret_hu_conv = new LightningError(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a copy of the LightningError
	 */
	public LightningError clone() {
		long ret = bindings.LightningError_clone(this.ptr);
		LightningError ret_hu_conv = new LightningError(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
