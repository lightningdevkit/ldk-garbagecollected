package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A Record, unit of logging output with Metadata to enable filtering
 * Module_path, file, line to inform on log's source
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Record extends CommonBase {
	Record(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Record_free(ptr); }
	}

	/**
	 * The verbosity level of the message.
	 */
	public Level get_level() {
		Level ret = bindings.Record_get_level(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The verbosity level of the message.
	 */
	public void set_level(org.ldk.enums.Level val) {
		bindings.Record_set_level(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The message body.
	 */
	public String get_args() {
		String ret = bindings.Record_get_args(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The message body.
	 */
	public void set_args(java.lang.String val) {
		bindings.Record_set_args(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The module path of the message.
	 */
	public String get_module_path() {
		String ret = bindings.Record_get_module_path(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The module path of the message.
	 */
	public void set_module_path(java.lang.String val) {
		bindings.Record_set_module_path(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The source file containing the message.
	 */
	public String get_file() {
		String ret = bindings.Record_get_file(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The source file containing the message.
	 */
	public void set_file(java.lang.String val) {
		bindings.Record_set_file(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The line containing the message.
	 */
	public int get_line() {
		int ret = bindings.Record_get_line(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The line containing the message.
	 */
	public void set_line(int val) {
		bindings.Record_set_line(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	long clone_ptr() {
		long ret = bindings.Record_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Record
	 */
	public Record clone() {
		long ret = bindings.Record_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Record ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new Record(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
