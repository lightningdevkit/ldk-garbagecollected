package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Routing hints for the tail of the route.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Hints extends CommonBase {
	private Hints(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Hints_free(ptr); }
	}
	static Hints constr_from_ptr(long ptr) {
		bindings.LDKHints raw_val = bindings.LDKHints_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKHints.Blinded.class) {
			return new Blinded(ptr, (bindings.LDKHints.Blinded)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKHints.Clear.class) {
			return new Clear(ptr, (bindings.LDKHints.Clear)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * The recipient provided blinded paths and payinfo to reach them. The blinded paths themselves
	 * will be included in the final [`Route`].
	 */
	public final static class Blinded extends Hints {
		public final TwoTuple_BlindedPayInfoBlindedPathZ[] blinded;
		private Blinded(long ptr, bindings.LDKHints.Blinded obj) {
			super(null, ptr);
			long[] blinded = obj.blinded;
			int blinded_conv_37_len = blinded.length;
			TwoTuple_BlindedPayInfoBlindedPathZ[] blinded_conv_37_arr = new TwoTuple_BlindedPayInfoBlindedPathZ[blinded_conv_37_len];
			for (int l = 0; l < blinded_conv_37_len; l++) {
				long blinded_conv_37 = blinded[l];
				TwoTuple_BlindedPayInfoBlindedPathZ blinded_conv_37_hu_conv = new TwoTuple_BlindedPayInfoBlindedPathZ(null, blinded_conv_37);
				if (blinded_conv_37_hu_conv != null) { blinded_conv_37_hu_conv.ptrs_to.add(this); };
				blinded_conv_37_arr[l] = blinded_conv_37_hu_conv;
			}
			this.blinded = blinded_conv_37_arr;
		}
	}
	/**
	 * The recipient included these route hints in their BOLT11 invoice.
	 */
	public final static class Clear extends Hints {
		public final RouteHint[] clear;
		private Clear(long ptr, bindings.LDKHints.Clear obj) {
			super(null, ptr);
			long[] clear = obj.clear;
			int clear_conv_11_len = clear.length;
			RouteHint[] clear_conv_11_arr = new RouteHint[clear_conv_11_len];
			for (int l = 0; l < clear_conv_11_len; l++) {
				long clear_conv_11 = clear[l];
				org.ldk.structs.RouteHint clear_conv_11_hu_conv = null; if (clear_conv_11 < 0 || clear_conv_11 > 4096) { clear_conv_11_hu_conv = new org.ldk.structs.RouteHint(null, clear_conv_11); }
				if (clear_conv_11_hu_conv != null) { clear_conv_11_hu_conv.ptrs_to.add(this); };
				clear_conv_11_arr[l] = clear_conv_11_hu_conv;
			}
			this.clear = clear_conv_11_arr;
		}
	}
	long clone_ptr() {
		long ret = bindings.Hints_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Hints
	 */
	public Hints clone() {
		long ret = bindings.Hints_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Hints ret_hu_conv = org.ldk.structs.Hints.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Blinded-variant Hints
	 */
	public static Hints blinded(TwoTuple_BlindedPayInfoBlindedPathZ[] a) {
		long ret = bindings.Hints_blinded(a != null ? Arrays.stream(a).mapToLong(a_conv_37 -> a_conv_37 != null ? a_conv_37.ptr : 0).toArray() : null);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Hints ret_hu_conv = org.ldk.structs.Hints.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Clear-variant Hints
	 */
	public static Hints clear(RouteHint[] a) {
		long ret = bindings.Hints_clear(a != null ? Arrays.stream(a).mapToLong(a_conv_11 -> a_conv_11 == null ? 0 : a_conv_11.ptr).toArray() : null);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Hints ret_hu_conv = org.ldk.structs.Hints.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		for (RouteHint a_conv_11: a) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a_conv_11); }; };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Hints.
	 */
	public long hash() {
		long ret = bindings.Hints_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two Hintss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.Hints b) {
		boolean ret = bindings.Hints_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Hints)) return false;
		return this.eq((Hints)o);
	}
}
