using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * The `Responder` struct creates an appropriate [`ResponseInstruction`] for responding to a
 * message.
 */
public class Responder : CommonBase {
	internal Responder(object _dummy, long ptr) : base(ptr) { }
	~Responder() {
		if (ptr != 0) { bindings.Responder_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.Responder_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Responder
	 */
	public org.ldk.structs.Responder clone() {
		long ret = bindings.Responder_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Responder ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Responder(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Responders contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.Responder b) {
		bool ret = bindings.Responder_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is Responder)) return false;
		return this.eq((Responder)o);
	}
	/**
	 * Serialize the Responder object into a byte array which can be read by Responder_read
	 */
	public byte[] write() {
		long ret = bindings.Responder_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Responder from a byte array, created by Responder_write
	 */
	public static org.ldk.structs.Result_ResponderDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Responder_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ResponderDecodeErrorZ ret_hu_conv = Result_ResponderDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a [`ResponseInstruction`] for responding without including a reply path.
	 * 
	 * Use when the recipient doesn't need to send back a reply to us.
	 */
	public org.ldk.structs.ResponseInstruction respond() {
		long ret = bindings.Responder_respond(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ResponseInstruction ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ResponseInstruction(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		;
		return ret_hu_conv;
	}

	/**
	 * Creates a [`ResponseInstruction`] for responding including a reply path.
	 * 
	 * Use when the recipient needs to send back a reply to us.
	 */
	public org.ldk.structs.ResponseInstruction respond_with_reply_path(org.ldk.structs.MessageContext context) {
		long ret = bindings.Responder_respond_with_reply_path(this.ptr, context.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(context);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ResponseInstruction ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ResponseInstruction(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		;
		return ret_hu_conv;
	}

}
} } }
