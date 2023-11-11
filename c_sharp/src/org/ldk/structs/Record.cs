using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Record, unit of logging output with Metadata to enable filtering
 * Module_path, file, line to inform on log's source
 */
public class Record : CommonBase {
	internal Record(object _dummy, long ptr) : base(ptr) { }
	~Record() {
		if (ptr != 0) { bindings.Record_free(ptr); }
	}

	/**
	 * The verbosity level of the message.
	 */
	public Level get_level() {
		Level ret = bindings.Record_get_level(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The verbosity level of the message.
	 */
	public void set_level(Level val) {
		bindings.Record_set_level(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The message body.
	 */
	public string get_args() {
		long ret = bindings.Record_get_args(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		string ret_conv = InternalUtils.decodeString(ret);
		return ret_conv;
	}

	/**
	 * The message body.
	 */
	public void set_args(string val) {
		bindings.Record_set_args(this.ptr, InternalUtils.encodeString(val));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The module path of the message.
	 */
	public string get_module_path() {
		long ret = bindings.Record_get_module_path(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		string ret_conv = InternalUtils.decodeString(ret);
		return ret_conv;
	}

	/**
	 * The module path of the message.
	 */
	public void set_module_path(string val) {
		bindings.Record_set_module_path(this.ptr, InternalUtils.encodeString(val));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The source file containing the message.
	 */
	public string get_file() {
		long ret = bindings.Record_get_file(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		string ret_conv = InternalUtils.decodeString(ret);
		return ret_conv;
	}

	/**
	 * The source file containing the message.
	 */
	public void set_file(string val) {
		bindings.Record_set_file(this.ptr, InternalUtils.encodeString(val));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The line containing the message.
	 */
	public int get_line() {
		int ret = bindings.Record_get_line(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The line containing the message.
	 */
	public void set_line(int val) {
		bindings.Record_set_line(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	internal long clone_ptr() {
		long ret = bindings.Record_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Record
	 */
	public Record clone() {
		long ret = bindings.Record_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Record ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Record(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
