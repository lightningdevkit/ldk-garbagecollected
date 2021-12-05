package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


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
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A human-readable message describing the error
	 */
	public void set_err(java.lang.String val) {
		bindings.LightningError_set_err(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The action which should be taken against the offending peer.
	 */
	public ErrorAction get_action() {
		long ret = bindings.LightningError_get_action(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ErrorAction ret_hu_conv = ErrorAction.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The action which should be taken against the offending peer.
	 */
	public void set_action(ErrorAction val) {
		bindings.LightningError_set_action(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new LightningError given each field
	 */
	public static LightningError of(java.lang.String err_arg, ErrorAction action_arg) {
		long ret = bindings.LightningError_new(err_arg, action_arg.ptr);
		Reference.reachabilityFence(err_arg);
		Reference.reachabilityFence(action_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		LightningError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new LightningError(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.LightningError_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the LightningError
	 */
	public LightningError clone() {
		long ret = bindings.LightningError_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		LightningError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new LightningError(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
