package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A ping message to be sent or received from a peer
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Ping extends CommonBase {
	Ping(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Ping_free(ptr); }
	}

	/**
	 * The desired response length
	 */
	public short get_ponglen() {
		short ret = bindings.Ping_get_ponglen(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The desired response length
	 */
	public void set_ponglen(short val) {
		bindings.Ping_set_ponglen(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The ping packet size.
	 * This field is not sent on the wire. byteslen zeros are sent.
	 */
	public short get_byteslen() {
		short ret = bindings.Ping_get_byteslen(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The ping packet size.
	 * This field is not sent on the wire. byteslen zeros are sent.
	 */
	public void set_byteslen(short val) {
		bindings.Ping_set_byteslen(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new Ping given each field
	 */
	public static Ping of(short ponglen_arg, short byteslen_arg) {
		long ret = bindings.Ping_new(ponglen_arg, byteslen_arg);
		Reference.reachabilityFence(ponglen_arg);
		Reference.reachabilityFence(byteslen_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Ping ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new Ping(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.Ping_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Ping
	 */
	public Ping clone() {
		long ret = bindings.Ping_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Ping ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new Ping(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the Ping object into a byte array which can be read by Ping_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Ping_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a Ping from a byte array, created by Ping_write
	 */
	public static Result_PingDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Ping_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PingDecodeErrorZ ret_hu_conv = Result_PingDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
