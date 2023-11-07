using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * An error occurring when converting from [`Script`] to [`ShutdownScript`].
 */
public class InvalidShutdownScript : CommonBase {
	internal InvalidShutdownScript(object _dummy, long ptr) : base(ptr) { }
	~InvalidShutdownScript() {
		if (ptr != 0) { bindings.InvalidShutdownScript_free(ptr); }
	}

	/**
	 * The script that did not meet the requirements from [BOLT #2].
	 * 
	 * [BOLT #2]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md
	 */
	public byte[] get_script() {
		long ret = bindings.InvalidShutdownScript_get_script(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The script that did not meet the requirements from [BOLT #2].
	 * 
	 * [BOLT #2]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md
	 */
	public void set_script(byte[] val) {
		bindings.InvalidShutdownScript_set_script(this.ptr, InternalUtils.encodeUint8Array(val));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new InvalidShutdownScript given each field
	 */
	public static InvalidShutdownScript of(byte[] script_arg) {
		long ret = bindings.InvalidShutdownScript_new(InternalUtils.encodeUint8Array(script_arg));
		GC.KeepAlive(script_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvalidShutdownScript ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvalidShutdownScript(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.InvalidShutdownScript_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the InvalidShutdownScript
	 */
	public InvalidShutdownScript clone() {
		long ret = bindings.InvalidShutdownScript_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvalidShutdownScript ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvalidShutdownScript(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
