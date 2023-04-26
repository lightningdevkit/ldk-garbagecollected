package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A path in a [`Route`] to the payment recipient. Must always be at least length one.
 * If no [`Path::blinded_tail`] is present, then [`Path::hops`] length may be up to 19.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Path extends CommonBase {
	Path(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Path_free(ptr); }
	}

	/**
	 * The list of unblinded hops in this [`Path`]. Must be at least length one.
	 */
	public RouteHop[] get_hops() {
		long[] ret = bindings.Path_get_hops(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_10_len = ret.length;
		RouteHop[] ret_conv_10_arr = new RouteHop[ret_conv_10_len];
		for (int k = 0; k < ret_conv_10_len; k++) {
			long ret_conv_10 = ret[k];
			org.ldk.structs.RouteHop ret_conv_10_hu_conv = null; if (ret_conv_10 < 0 || ret_conv_10 > 4096) { ret_conv_10_hu_conv = new org.ldk.structs.RouteHop(null, ret_conv_10); }
			if (ret_conv_10_hu_conv != null) { ret_conv_10_hu_conv.ptrs_to.add(this); };
			ret_conv_10_arr[k] = ret_conv_10_hu_conv;
		}
		return ret_conv_10_arr;
	}

	/**
	 * The list of unblinded hops in this [`Path`]. Must be at least length one.
	 */
	public void set_hops(RouteHop[] val) {
		bindings.Path_set_hops(this.ptr, val != null ? Arrays.stream(val).mapToLong(val_conv_10 -> val_conv_10 == null ? 0 : val_conv_10.ptr).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		for (RouteHop val_conv_10: val) { if (this != null) { this.ptrs_to.add(val_conv_10); }; };
	}

	/**
	 * The blinded path at which this path terminates, if we're sending to one, and its metadata.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public BlindedTail get_blinded_tail() {
		long ret = bindings.Path_get_blinded_tail(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedTail ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedTail(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The blinded path at which this path terminates, if we're sending to one, and its metadata.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_blinded_tail(@Nullable org.ldk.structs.BlindedTail val) {
		bindings.Path_set_blinded_tail(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Constructs a new Path given each field
	 */
	public static Path of(RouteHop[] hops_arg, org.ldk.structs.BlindedTail blinded_tail_arg) {
		long ret = bindings.Path_new(hops_arg != null ? Arrays.stream(hops_arg).mapToLong(hops_arg_conv_10 -> hops_arg_conv_10 == null ? 0 : hops_arg_conv_10.ptr).toArray() : null, blinded_tail_arg == null ? 0 : blinded_tail_arg.ptr);
		Reference.reachabilityFence(hops_arg);
		Reference.reachabilityFence(blinded_tail_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Path ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Path(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		for (RouteHop hops_arg_conv_10: hops_arg) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(hops_arg_conv_10); }; };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(blinded_tail_arg); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.Path_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Path
	 */
	public Path clone() {
		long ret = bindings.Path_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Path ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Path(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Path.
	 */
	public long hash() {
		long ret = bindings.Path_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two Paths contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.Path b) {
		boolean ret = bindings.Path_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Path)) return false;
		return this.eq((Path)o);
	}
	/**
	 * Gets the fees for a given path, excluding any excess paid to the recipient.
	 */
	public long fee_msat() {
		long ret = bindings.Path_fee_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Gets the total amount paid on this [`Path`], excluding the fees.
	 */
	public long final_value_msat() {
		long ret = bindings.Path_final_value_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Gets the final hop's CLTV expiry delta.
	 */
	public Option_u32Z final_cltv_expiry_delta() {
		long ret = bindings.Path_final_cltv_expiry_delta(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u32Z ret_hu_conv = org.ldk.structs.Option_u32Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
