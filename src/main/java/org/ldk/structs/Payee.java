package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The recipient of a payment, differing based on whether they've hidden their identity with route
 * blinding.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Payee extends CommonBase {
	private Payee(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Payee_free(ptr); }
	}
	static Payee constr_from_ptr(long ptr) {
		bindings.LDKPayee raw_val = bindings.LDKPayee_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKPayee.Blinded.class) {
			return new Blinded(ptr, (bindings.LDKPayee.Blinded)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKPayee.Clear.class) {
			return new Clear(ptr, (bindings.LDKPayee.Clear)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * The recipient provided blinded paths and payinfo to reach them. The blinded paths themselves
	 * will be included in the final [`Route`].
	 */
	public final static class Blinded extends Payee {
		/**
		 * Aggregated routing info and blinded paths, for routing to the payee without knowing their
		 * node id.
		*/
		public final TwoTuple_BlindedPayInfoBlindedPathZ[] route_hints;
		/**
		 * Features supported by the payee.
		 * 
		 * May be set from the payee's invoice. May be `None` if the invoice does not contain any
		 * features.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.Bolt12InvoiceFeatures features;
		private Blinded(long ptr, bindings.LDKPayee.Blinded obj) {
			super(null, ptr);
			long[] route_hints = obj.route_hints;
			int route_hints_conv_37_len = route_hints.length;
			TwoTuple_BlindedPayInfoBlindedPathZ[] route_hints_conv_37_arr = new TwoTuple_BlindedPayInfoBlindedPathZ[route_hints_conv_37_len];
			for (int l = 0; l < route_hints_conv_37_len; l++) {
				long route_hints_conv_37 = route_hints[l];
				TwoTuple_BlindedPayInfoBlindedPathZ route_hints_conv_37_hu_conv = new TwoTuple_BlindedPayInfoBlindedPathZ(null, route_hints_conv_37);
				if (route_hints_conv_37_hu_conv != null) { route_hints_conv_37_hu_conv.ptrs_to.add(this); };
				route_hints_conv_37_arr[l] = route_hints_conv_37_hu_conv;
			}
			this.route_hints = route_hints_conv_37_arr;
			long features = obj.features;
			org.ldk.structs.Bolt12InvoiceFeatures features_hu_conv = null; if (features < 0 || features > 4096) { features_hu_conv = new org.ldk.structs.Bolt12InvoiceFeatures(null, features); }
			if (features_hu_conv != null) { features_hu_conv.ptrs_to.add(this); };
			this.features = features_hu_conv;
		}
	}
	/**
	 * The recipient included these route hints in their BOLT11 invoice.
	 */
	public final static class Clear extends Payee {
		/**
		 * The node id of the payee.
		*/
		public final byte[] node_id;
		/**
		 * Hints for routing to the payee, containing channels connecting the payee to public nodes.
		*/
		public final RouteHint[] route_hints;
		/**
		 * Features supported by the payee.
		 * 
		 * May be set from the payee's invoice or via [`for_keysend`]. May be `None` if the invoice
		 * does not contain any features.
		 * 
		 * [`for_keysend`]: PaymentParameters::for_keysend
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.Bolt11InvoiceFeatures features;
		/**
		 * The minimum CLTV delta at the end of the route. This value must not be zero.
		*/
		public final int final_cltv_expiry_delta;
		private Clear(long ptr, bindings.LDKPayee.Clear obj) {
			super(null, ptr);
			this.node_id = obj.node_id;
			long[] route_hints = obj.route_hints;
			int route_hints_conv_11_len = route_hints.length;
			RouteHint[] route_hints_conv_11_arr = new RouteHint[route_hints_conv_11_len];
			for (int l = 0; l < route_hints_conv_11_len; l++) {
				long route_hints_conv_11 = route_hints[l];
				org.ldk.structs.RouteHint route_hints_conv_11_hu_conv = null; if (route_hints_conv_11 < 0 || route_hints_conv_11 > 4096) { route_hints_conv_11_hu_conv = new org.ldk.structs.RouteHint(null, route_hints_conv_11); }
				if (route_hints_conv_11_hu_conv != null) { route_hints_conv_11_hu_conv.ptrs_to.add(this); };
				route_hints_conv_11_arr[l] = route_hints_conv_11_hu_conv;
			}
			this.route_hints = route_hints_conv_11_arr;
			long features = obj.features;
			org.ldk.structs.Bolt11InvoiceFeatures features_hu_conv = null; if (features < 0 || features > 4096) { features_hu_conv = new org.ldk.structs.Bolt11InvoiceFeatures(null, features); }
			if (features_hu_conv != null) { features_hu_conv.ptrs_to.add(this); };
			this.features = features_hu_conv;
			this.final_cltv_expiry_delta = obj.final_cltv_expiry_delta;
		}
	}
	long clone_ptr() {
		long ret = bindings.Payee_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Payee
	 */
	public Payee clone() {
		long ret = bindings.Payee_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Payee ret_hu_conv = org.ldk.structs.Payee.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Blinded-variant Payee
	 */
	public static Payee blinded(TwoTuple_BlindedPayInfoBlindedPathZ[] route_hints, org.ldk.structs.Bolt12InvoiceFeatures features) {
		long ret = bindings.Payee_blinded(route_hints != null ? Arrays.stream(route_hints).mapToLong(route_hints_conv_37 -> route_hints_conv_37 != null ? route_hints_conv_37.ptr : 0).toArray() : null, features == null ? 0 : features.ptr);
		Reference.reachabilityFence(route_hints);
		Reference.reachabilityFence(features);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Payee ret_hu_conv = org.ldk.structs.Payee.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(features); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Clear-variant Payee
	 */
	public static Payee clear(byte[] node_id, RouteHint[] route_hints, org.ldk.structs.Bolt11InvoiceFeatures features, int final_cltv_expiry_delta) {
		long ret = bindings.Payee_clear(InternalUtils.check_arr_len(node_id, 33), route_hints != null ? Arrays.stream(route_hints).mapToLong(route_hints_conv_11 -> route_hints_conv_11 == null ? 0 : route_hints_conv_11.ptr).toArray() : null, features == null ? 0 : features.ptr, final_cltv_expiry_delta);
		Reference.reachabilityFence(node_id);
		Reference.reachabilityFence(route_hints);
		Reference.reachabilityFence(features);
		Reference.reachabilityFence(final_cltv_expiry_delta);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Payee ret_hu_conv = org.ldk.structs.Payee.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		for (RouteHint route_hints_conv_11: route_hints) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(route_hints_conv_11); }; };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(features); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Payee.
	 */
	public long hash() {
		long ret = bindings.Payee_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two Payees contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.Payee b) {
		boolean ret = bindings.Payee_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Payee)) return false;
		return this.eq((Payee)o);
	}
}
