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
	 * The node id of the peer pertaining to the logged record.
	 * 
	 * Note that in some cases a [`Self::channel_id`] may be filled in but this may still be
	 * `None`, depending on if the peer information is readily available in LDK when the log is
	 * generated.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public byte[] get_peer_id() {
		long ret = bindings.Record_get_peer_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The node id of the peer pertaining to the logged record.
	 * 
	 * Note that in some cases a [`Self::channel_id`] may be filled in but this may still be
	 * `None`, depending on if the peer information is readily available in LDK when the log is
	 * generated.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_peer_id(byte[] val) {
		bindings.Record_set_peer_id(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The channel id of the channel pertaining to the logged record. May be a temporary id before
	 * the channel has been funded.
	 */
	public Option_ThirtyTwoBytesZ get_channel_id() {
		long ret = bindings.Record_get_channel_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ThirtyTwoBytesZ ret_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The channel id of the channel pertaining to the logged record. May be a temporary id before
	 * the channel has been funded.
	 */
	public void set_channel_id(org.ldk.structs.Option_ThirtyTwoBytesZ val) {
		bindings.Record_set_channel_id(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
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

	/**
	 * Constructs a new Record given each field
	 * 
	 * Note that peer_id_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static Record of(Level level_arg, byte[] peer_id_arg, org.ldk.structs.Option_ThirtyTwoBytesZ channel_id_arg, string args_arg, string module_path_arg, string file_arg, int line_arg) {
		long ret = bindings.Record_new(level_arg, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(peer_id_arg, 33)), channel_id_arg.ptr, InternalUtils.encodeString(args_arg), InternalUtils.encodeString(module_path_arg), InternalUtils.encodeString(file_arg), line_arg);
		GC.KeepAlive(level_arg);
		GC.KeepAlive(peer_id_arg);
		GC.KeepAlive(channel_id_arg);
		GC.KeepAlive(args_arg);
		GC.KeepAlive(module_path_arg);
		GC.KeepAlive(file_arg);
		GC.KeepAlive(line_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Record ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Record(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(channel_id_arg); };
		return ret_hu_conv;
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
