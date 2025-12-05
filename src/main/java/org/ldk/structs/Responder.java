package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The `Responder` struct creates an appropriate [`ResponseInstruction`] for responding to a
 * message.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Responder extends CommonBase {
	Responder(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Responder_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.Responder_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Responder
	 */
	public Responder clone() {
		long ret = bindings.Responder_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Responder ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Responder(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Responders contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.Responder b) {
		boolean ret = bindings.Responder_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Responder)) return false;
		return this.eq((Responder)o);
	}
	/**
	 * Serialize the Responder object into a byte array which can be read by Responder_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Responder_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a Responder from a byte array, created by Responder_write
	 */
	public static Result_ResponderDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Responder_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ResponderDecodeErrorZ ret_hu_conv = Result_ResponderDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a [`ResponseInstruction`] for responding without including a reply path.
	 * 
	 * Use when the recipient doesn't need to send back a reply to us.
	 */
	public ResponseInstruction respond() {
		long ret = bindings.Responder_respond(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ResponseInstruction ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ResponseInstruction(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		;
		return ret_hu_conv;
	}

	/**
	 * Creates a [`ResponseInstruction`] for responding including a reply path.
	 * 
	 * Use when the recipient needs to send back a reply to us.
	 */
	public ResponseInstruction respond_with_reply_path(org.ldk.structs.MessageContext context) {
		long ret = bindings.Responder_respond_with_reply_path(this.ptr, context.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(context);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ResponseInstruction ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ResponseInstruction(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		;
		return ret_hu_conv;
	}

}
