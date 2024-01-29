using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Invalid inbound onion payment.
 */
public class InboundHTLCErr : CommonBase {
	internal InboundHTLCErr(object _dummy, long ptr) : base(ptr) { }
	~InboundHTLCErr() {
		if (ptr != 0) { bindings.InboundHTLCErr_free(ptr); }
	}

	/**
	 * BOLT 4 error code.
	 */
	public short get_err_code() {
		short ret = bindings.InboundHTLCErr_get_err_code(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * BOLT 4 error code.
	 */
	public void set_err_code(short val) {
		bindings.InboundHTLCErr_set_err_code(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Data attached to this error.
	 * 
	 * Returns a copy of the field.
	 */
	public byte[] get_err_data() {
		long ret = bindings.InboundHTLCErr_get_err_data(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Data attached to this error.
	 */
	public void set_err_data(byte[] val) {
		bindings.InboundHTLCErr_set_err_data(this.ptr, InternalUtils.encodeUint8Array(val));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Error message text.
	 */
	public string get_msg() {
		long ret = bindings.InboundHTLCErr_get_msg(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		string ret_conv = InternalUtils.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Error message text.
	 */
	public void set_msg(string val) {
		bindings.InboundHTLCErr_set_msg(this.ptr, InternalUtils.encodeString(val));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new InboundHTLCErr given each field
	 */
	public static InboundHTLCErr of(short err_code_arg, byte[] err_data_arg, string msg_arg) {
		long ret = bindings.InboundHTLCErr_new(err_code_arg, InternalUtils.encodeUint8Array(err_data_arg), InternalUtils.encodeString(msg_arg));
		GC.KeepAlive(err_code_arg);
		GC.KeepAlive(err_data_arg);
		GC.KeepAlive(msg_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InboundHTLCErr ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InboundHTLCErr(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
