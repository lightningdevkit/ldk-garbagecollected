package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A splice_locked message to be sent to or received from a peer.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class SpliceLocked extends CommonBase {
	SpliceLocked(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.SpliceLocked_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.SpliceLocked_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.SpliceLocked_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new SpliceLocked given each field
	 */
	public static SpliceLocked of(byte[] channel_id_arg) {
		long ret = bindings.SpliceLocked_new(InternalUtils.check_arr_len(channel_id_arg, 32));
		Reference.reachabilityFence(channel_id_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SpliceLocked ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.SpliceLocked(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.SpliceLocked_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the SpliceLocked
	 */
	public SpliceLocked clone() {
		long ret = bindings.SpliceLocked_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SpliceLocked ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.SpliceLocked(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two SpliceLockeds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.SpliceLocked b) {
		boolean ret = bindings.SpliceLocked_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof SpliceLocked)) return false;
		return this.eq((SpliceLocked)o);
	}
	/**
	 * Serialize the SpliceLocked object into a byte array which can be read by SpliceLocked_read
	 */
	public byte[] write() {
		byte[] ret = bindings.SpliceLocked_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a SpliceLocked from a byte array, created by SpliceLocked_write
	 */
	public static Result_SpliceLockedDecodeErrorZ read(byte[] ser) {
		long ret = bindings.SpliceLocked_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SpliceLockedDecodeErrorZ ret_hu_conv = Result_SpliceLockedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
