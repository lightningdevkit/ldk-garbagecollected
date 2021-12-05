package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A pong message to be sent or received from a peer
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Pong extends CommonBase {
	Pong(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Pong_free(ptr); }
	}

	/**
	 * The pong packet size.
	 * This field is not sent on the wire. byteslen zeros are sent.
	 */
	public short get_byteslen() {
		short ret = bindings.Pong_get_byteslen(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The pong packet size.
	 * This field is not sent on the wire. byteslen zeros are sent.
	 */
	public void set_byteslen(short val) {
		bindings.Pong_set_byteslen(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new Pong given each field
	 */
	public static Pong of(short byteslen_arg) {
		long ret = bindings.Pong_new(byteslen_arg);
		Reference.reachabilityFence(byteslen_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Pong ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new Pong(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.Pong_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Pong
	 */
	public Pong clone() {
		long ret = bindings.Pong_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Pong ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new Pong(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the Pong object into a byte array which can be read by Pong_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Pong_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a Pong from a byte array, created by Pong_write
	 */
	public static Result_PongDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Pong_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PongDecodeErrorZ ret_hu_conv = Result_PongDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
