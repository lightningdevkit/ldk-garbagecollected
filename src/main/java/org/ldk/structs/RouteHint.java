package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A list of hops along a payment path terminating with a channel to the recipient.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class RouteHint extends CommonBase {
	RouteHint(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.RouteHint_free(ptr); }
	}

	public RouteHintHop[] get_a() {
		long[] ret = bindings.RouteHint_get_a(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_14_len = ret.length;
		RouteHintHop[] ret_conv_14_arr = new RouteHintHop[ret_conv_14_len];
		for (int o = 0; o < ret_conv_14_len; o++) {
			long ret_conv_14 = ret[o];
			RouteHintHop ret_conv_14_hu_conv = null; if (ret_conv_14 < 0 || ret_conv_14 > 4096) { ret_conv_14_hu_conv = new RouteHintHop(null, ret_conv_14); }
			ret_conv_14_hu_conv.ptrs_to.add(this);
			ret_conv_14_arr[o] = ret_conv_14_hu_conv;
		}
		return ret_conv_14_arr;
	}

	public void set_a(RouteHintHop[] val) {
		bindings.RouteHint_set_a(this.ptr, val != null ? Arrays.stream(val).mapToLong(val_conv_14 -> val_conv_14 == null ? 0 : val_conv_14.ptr & ~1).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new RouteHint given each field
	 */
	public static RouteHint of(RouteHintHop[] a_arg) {
		long ret = bindings.RouteHint_new(a_arg != null ? Arrays.stream(a_arg).mapToLong(a_arg_conv_14 -> a_arg_conv_14 == null ? 0 : a_arg_conv_14.ptr & ~1).toArray() : null);
		Reference.reachabilityFence(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		RouteHint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new RouteHint(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.RouteHint_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the RouteHint
	 */
	public RouteHint clone() {
		long ret = bindings.RouteHint_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		RouteHint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new RouteHint(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two RouteHints contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.RouteHint_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two RouteHints contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(RouteHint b) {
		boolean ret = bindings.RouteHint_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		this.ptrs_to.add(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof RouteHint)) return false;
		return this.eq((RouteHint)o);
	}
	/**
	 * Serialize the RouteHint object into a byte array which can be read by RouteHint_read
	 */
	public byte[] write() {
		byte[] ret = bindings.RouteHint_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a RouteHint from a byte array, created by RouteHint_write
	 */
	public static Result_RouteHintDecodeErrorZ read(byte[] ser) {
		long ret = bindings.RouteHint_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteHintDecodeErrorZ ret_hu_conv = Result_RouteHintDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
