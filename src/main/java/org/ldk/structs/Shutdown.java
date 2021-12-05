package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A shutdown message to be sent or received from a peer
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Shutdown extends CommonBase {
	Shutdown(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Shutdown_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.Shutdown_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.Shutdown_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The destination of this peer's funds on closing.
	 * Must be in one of these forms: p2pkh, p2sh, p2wpkh, p2wsh.
	 */
	public byte[] get_scriptpubkey() {
		byte[] ret = bindings.Shutdown_get_scriptpubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The destination of this peer's funds on closing.
	 * Must be in one of these forms: p2pkh, p2sh, p2wpkh, p2wsh.
	 */
	public void set_scriptpubkey(byte[] val) {
		bindings.Shutdown_set_scriptpubkey(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new Shutdown given each field
	 */
	public static Shutdown of(byte[] channel_id_arg, byte[] scriptpubkey_arg) {
		long ret = bindings.Shutdown_new(InternalUtils.check_arr_len(channel_id_arg, 32), scriptpubkey_arg);
		Reference.reachabilityFence(channel_id_arg);
		Reference.reachabilityFence(scriptpubkey_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Shutdown ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new Shutdown(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.Shutdown_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Shutdown
	 */
	public Shutdown clone() {
		long ret = bindings.Shutdown_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Shutdown ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new Shutdown(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the Shutdown object into a byte array which can be read by Shutdown_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Shutdown_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a Shutdown from a byte array, created by Shutdown_write
	 */
	public static Result_ShutdownDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Shutdown_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ShutdownDecodeErrorZ ret_hu_conv = Result_ShutdownDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
