using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * The recipient of a payment, differing based on whether they've hidden their identity with route
 * blinding.
 */
public class Payee : CommonBase {
	protected Payee(object _dummy, long ptr) : base(ptr) { }
	~Payee() {
		if (ptr != 0) { bindings.Payee_free(ptr); }
	}

	internal static Payee constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKPayee_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Payee_Blinded(ptr);
			case 1: return new Payee_Clear(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Payee of type Blinded */
	public class Payee_Blinded : Payee {
		/**
		 * Aggregated routing info and blinded paths, for routing to the payee without knowing their
		 * node id.
		 */
		public TwoTuple_BlindedPayInfoBlindedPathZ[] route_hints;
		/**
		 * Features supported by the payee.
		 * 
		 * May be set from the payee's invoice. May be `None` if the invoice does not contain any
		 * features.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		public Bolt12InvoiceFeatures features;
		internal Payee_Blinded(long ptr) : base(null, ptr) {
			long route_hints = bindings.LDKPayee_Blinded_get_route_hints(ptr);
			int route_hints_conv_37_len = InternalUtils.getArrayLength(route_hints);
			TwoTuple_BlindedPayInfoBlindedPathZ[] route_hints_conv_37_arr = new TwoTuple_BlindedPayInfoBlindedPathZ[route_hints_conv_37_len];
			for (int l = 0; l < route_hints_conv_37_len; l++) {
				long route_hints_conv_37 = InternalUtils.getU64ArrayElem(route_hints, l);
				TwoTuple_BlindedPayInfoBlindedPathZ route_hints_conv_37_hu_conv = new TwoTuple_BlindedPayInfoBlindedPathZ(null, route_hints_conv_37);
				if (route_hints_conv_37_hu_conv != null) { route_hints_conv_37_hu_conv.ptrs_to.AddLast(this); };
				route_hints_conv_37_arr[l] = route_hints_conv_37_hu_conv;
			}
			bindings.free_buffer(route_hints);
			this.route_hints = route_hints_conv_37_arr;
			long features = bindings.LDKPayee_Blinded_get_features(ptr);
			org.ldk.structs.Bolt12InvoiceFeatures features_hu_conv = null; if (features < 0 || features > 4096) { features_hu_conv = new org.ldk.structs.Bolt12InvoiceFeatures(null, features); }
			if (features_hu_conv != null) { features_hu_conv.ptrs_to.AddLast(this); };
			this.features = features_hu_conv;
		}
	}
	/** A Payee of type Clear */
	public class Payee_Clear : Payee {
		/**
		 * The node id of the payee.
		 */
		public byte[] node_id;
		/**
		 * Hints for routing to the payee, containing channels connecting the payee to public nodes.
		 */
		public RouteHint[] route_hints;
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
		public Bolt11InvoiceFeatures features;
		/**
		 * The minimum CLTV delta at the end of the route. This value must not be zero.
		 */
		public int final_cltv_expiry_delta;
		internal Payee_Clear(long ptr) : base(null, ptr) {
			long node_id = bindings.LDKPayee_Clear_get_node_id(ptr);
			byte[] node_id_conv = InternalUtils.decodeUint8Array(node_id);
			this.node_id = node_id_conv;
			long route_hints = bindings.LDKPayee_Clear_get_route_hints(ptr);
			int route_hints_conv_11_len = InternalUtils.getArrayLength(route_hints);
			RouteHint[] route_hints_conv_11_arr = new RouteHint[route_hints_conv_11_len];
			for (int l = 0; l < route_hints_conv_11_len; l++) {
				long route_hints_conv_11 = InternalUtils.getU64ArrayElem(route_hints, l);
				org.ldk.structs.RouteHint route_hints_conv_11_hu_conv = null; if (route_hints_conv_11 < 0 || route_hints_conv_11 > 4096) { route_hints_conv_11_hu_conv = new org.ldk.structs.RouteHint(null, route_hints_conv_11); }
				if (route_hints_conv_11_hu_conv != null) { route_hints_conv_11_hu_conv.ptrs_to.AddLast(this); };
				route_hints_conv_11_arr[l] = route_hints_conv_11_hu_conv;
			}
			bindings.free_buffer(route_hints);
			this.route_hints = route_hints_conv_11_arr;
			long features = bindings.LDKPayee_Clear_get_features(ptr);
			org.ldk.structs.Bolt11InvoiceFeatures features_hu_conv = null; if (features < 0 || features > 4096) { features_hu_conv = new org.ldk.structs.Bolt11InvoiceFeatures(null, features); }
			if (features_hu_conv != null) { features_hu_conv.ptrs_to.AddLast(this); };
			this.features = features_hu_conv;
			this.final_cltv_expiry_delta = bindings.LDKPayee_Clear_get_final_cltv_expiry_delta(ptr);
		}
	}
	internal long clone_ptr() {
		long ret = bindings.Payee_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Payee
	 */
	public Payee clone() {
		long ret = bindings.Payee_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Payee ret_hu_conv = org.ldk.structs.Payee.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Blinded-variant Payee
	 */
	public static Payee blinded(TwoTuple_BlindedPayInfoBlindedPathZ[] route_hints, org.ldk.structs.Bolt12InvoiceFeatures features) {
		long ret = bindings.Payee_blinded(InternalUtils.encodeUint64Array(InternalUtils.mapArray(route_hints, route_hints_conv_37 => route_hints_conv_37 != null ? route_hints_conv_37.ptr : 0)), features == null ? 0 : features.ptr);
		GC.KeepAlive(route_hints);
		GC.KeepAlive(features);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Payee ret_hu_conv = org.ldk.structs.Payee.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(features); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Clear-variant Payee
	 */
	public static Payee clear(byte[] node_id, RouteHint[] route_hints, org.ldk.structs.Bolt11InvoiceFeatures features, int final_cltv_expiry_delta) {
		long ret = bindings.Payee_clear(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(node_id, 33)), InternalUtils.encodeUint64Array(InternalUtils.mapArray(route_hints, route_hints_conv_11 => route_hints_conv_11 == null ? 0 : route_hints_conv_11.ptr)), features == null ? 0 : features.ptr, final_cltv_expiry_delta);
		GC.KeepAlive(node_id);
		GC.KeepAlive(route_hints);
		GC.KeepAlive(features);
		GC.KeepAlive(final_cltv_expiry_delta);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Payee ret_hu_conv = org.ldk.structs.Payee.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		foreach (RouteHint route_hints_conv_11 in route_hints) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(route_hints_conv_11); }; };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(features); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Payee.
	 */
	public long hash() {
		long ret = bindings.Payee_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two Payees contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.Payee b) {
		bool ret = bindings.Payee_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is Payee)) return false;
		return this.eq((Payee)o);
	}
}
} } }
