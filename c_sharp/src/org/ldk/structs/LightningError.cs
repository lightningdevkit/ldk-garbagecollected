using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * An Err type for failure to process messages.
 */
public class LightningError : CommonBase {
	internal LightningError(object _dummy, long ptr) : base(ptr) { }
	~LightningError() {
		if (ptr != 0) { bindings.LightningError_free(ptr); }
	}

	/**
	 * A human-readable message describing the error
	 */
	public string get_err() {
		string ret = bindings.LightningError_get_err(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * A human-readable message describing the error
	 */
	public void set_err(string val) {
		bindings.LightningError_set_err(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The action which should be taken against the offending peer.
	 */
	public ErrorAction get_action() {
		long ret = bindings.LightningError_get_action(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ErrorAction ret_hu_conv = org.ldk.structs.ErrorAction.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The action which should be taken against the offending peer.
	 */
	public void set_action(org.ldk.structs.ErrorAction val) {
		bindings.LightningError_set_action(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Constructs a new LightningError given each field
	 */
	public static LightningError of(string err_arg, org.ldk.structs.ErrorAction action_arg) {
		long ret = bindings.LightningError_new(err_arg, action_arg.ptr);
		GC.KeepAlive(err_arg);
		GC.KeepAlive(action_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LightningError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.LightningError(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(action_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.LightningError_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the LightningError
	 */
	public LightningError clone() {
		long ret = bindings.LightningError_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LightningError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.LightningError(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
